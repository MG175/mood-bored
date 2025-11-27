// ========== PAGE LOAD BEHAVIOR ==========
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// ========== GAME CONFIGURATION ==========
const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'white'];
const COLOR_NAMES = {
    red: 'Red',
    blue: 'Blue', 
    green: 'Green',
    yellow: 'Yellow',
    purple: 'Purple',
    white: 'White'
};

// Difficulty settings
const DIFFICULTY_CONFIG = {
    easy: {
        numSlots: 4,
        minClues: 5,
        maxClues: 7,
        allowDirectSlotClues: true,
        allowMultipleDirectClues: true,
        conditionalClueChance: 0,
        label: 'EASY'
    },
    medium: {
        numSlots: 4,
        minClues: 4,
        maxClues: 5,
        allowDirectSlotClues: true,
        allowMultipleDirectClues: false,
        conditionalClueChance: 0.2,
        label: 'MEDIUM'
    },
    hard: {
        numSlots: 5,
        minClues: 4,
        maxClues: 6,
        allowDirectSlotClues: false,
        allowMultipleDirectClues: false,
        conditionalClueChance: 0.4,
        label: 'HARD'
    }
};

// ========== GAME STATE ==========
let currentDifficulty = 'easy';
let numSlots = 4;
let solution = [];
let clues = [];
let playerGuess = [];
let puzzleCount = 0;
let totalDecoded = 0;
let activeSlot = null;

// ========== SCREEN MANAGEMENT ==========
function showScreen(screenId) {
    window.scrollTo(0, 0);
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ========== CLUE GENERATION SYSTEM ==========

function getAllPermutations() {
    const perms = [];
    const generate = (current) => {
        if (current.length === numSlots) {
            perms.push([...current]);
            return;
        }
        for (const color of COLORS) {
            current.push(color);
            generate(current);
            current.pop();
        }
    };
    generate([]);
    return perms;
}

function getClueGenerators(config) {
    const generators = [];
    
    // Type 1: Color is not in a specific slot
    generators.push({
        type: 'slot-negative',
        isDirect: false,
        generate: (sol) => {
            const slot = Math.floor(Math.random() * numSlots);
            const wrongColors = COLORS.filter(c => c !== sol[slot]);
            const wrongColor = wrongColors[Math.floor(Math.random() * wrongColors.length)];
            return {
                text: `${COLOR_NAMES[wrongColor]} is not in slot ${slot + 1}.`,
                test: (guess) => guess[slot] !== wrongColor
            };
        }
    });
    
    // Type 2: Color appears at least once
    generators.push({
        type: 'presence',
        isDirect: false,
        generate: (sol) => {
            const presentColors = [...new Set(sol)];
            const color = presentColors[Math.floor(Math.random() * presentColors.length)];
            return {
                text: `${COLOR_NAMES[color]} appears at least once.`,
                test: (guess) => guess.includes(color)
            };
        }
    });
    
    // Type 3: Color does NOT appear anywhere
    generators.push({
        type: 'absence',
        isDirect: false,
        generate: (sol) => {
            const presentColors = new Set(sol);
            const absentColors = COLORS.filter(c => !presentColors.has(c));
            if (absentColors.length === 0) return null;
            const color = absentColors[Math.floor(Math.random() * absentColors.length)];
            return {
                text: `${COLOR_NAMES[color]} does not appear in the sequence.`,
                test: (guess) => !guess.includes(color)
            };
        }
    });
    
    // Type 4: Color is in a specific slot (DIRECT)
    if (config.allowDirectSlotClues) {
        generators.push({
            type: 'slot-positive',
            isDirect: true,
            generate: (sol) => {
                const slot = Math.floor(Math.random() * numSlots);
                const color = sol[slot];
                return {
                    text: `Slot ${slot + 1} contains ${COLOR_NAMES[color]}.`,
                    test: (guess) => guess[slot] === color
                };
            }
        });
    }
    
    // Type 5: One color appears before another
    generators.push({
        type: 'order',
        isDirect: false,
        generate: (sol) => {
            const indices = {};
            sol.forEach((c, i) => {
                if (!indices[c]) indices[c] = [];
                indices[c].push(i);
            });
            const colors = Object.keys(indices);
            if (colors.length < 2) return null;
            
            const shuffled = colors.sort(() => Math.random() - 0.5);
            const color1 = shuffled[0];
            const color2 = shuffled[1];
            
            const first1 = Math.min(...indices[color1]);
            const first2 = Math.min(...indices[color2]);
            
            if (first1 === first2) return null;
            
            const [before, after] = first1 < first2 ? [color1, color2] : [color2, color1];
            
            return {
                text: `The first ${COLOR_NAMES[before]} appears before the first ${COLOR_NAMES[after]}.`,
                test: (guess) => {
                    const idx1 = guess.indexOf(before);
                    const idx2 = guess.indexOf(after);
                    if (idx1 === -1 || idx2 === -1) return false;
                    return idx1 < idx2;
                }
            };
        }
    });
    
    // Type 6: Two colors are adjacent
    generators.push({
        type: 'adjacent',
        isDirect: false,
        generate: (sol) => {
            const pairs = [];
            for (let i = 0; i < numSlots - 1; i++) {
                if (sol[i] !== sol[i + 1]) {
                    pairs.push([sol[i], sol[i + 1]]);
                }
            }
            if (pairs.length === 0) return null;
            
            const pair = pairs[Math.floor(Math.random() * pairs.length)];
            return {
                text: `${COLOR_NAMES[pair[0]]} and ${COLOR_NAMES[pair[1]]} are adjacent somewhere.`,
                test: (guess) => {
                    for (let i = 0; i < numSlots - 1; i++) {
                        if ((guess[i] === pair[0] && guess[i + 1] === pair[1]) ||
                            (guess[i] === pair[1] && guess[i + 1] === pair[0])) {
                            return true;
                        }
                    }
                    return false;
                }
            };
        }
    });
    
    // Type 7: Two colors are NOT adjacent
    generators.push({
        type: 'not-adjacent',
        isDirect: false,
        generate: (sol) => {
            const presentColors = [...new Set(sol)];
            if (presentColors.length < 2) return null;
            
            for (let attempt = 0; attempt < 10; attempt++) {
                const c1 = presentColors[Math.floor(Math.random() * presentColors.length)];
                const remaining = presentColors.filter(c => c !== c1);
                const c2 = remaining[Math.floor(Math.random() * remaining.length)];
                
                let areAdjacent = false;
                for (let i = 0; i < numSlots - 1; i++) {
                    if ((sol[i] === c1 && sol[i + 1] === c2) ||
                        (sol[i] === c2 && sol[i + 1] === c1)) {
                        areAdjacent = true;
                        break;
                    }
                }
                
                if (!areAdjacent) {
                    return {
                        text: `${COLOR_NAMES[c1]} and ${COLOR_NAMES[c2]} are never adjacent.`,
                        test: (guess) => {
                            for (let i = 0; i < numSlots - 1; i++) {
                                if ((guess[i] === c1 && guess[i + 1] === c2) ||
                                    (guess[i] === c2 && guess[i + 1] === c1)) {
                                    return false;
                                }
                            }
                            return true;
                        }
                    };
                }
            }
            return null;
        }
    });
    
    // Type 8: Color appears exactly N times
    generators.push({
        type: 'count',
        isDirect: false,
        generate: (sol) => {
            const counts = {};
            sol.forEach(c => counts[c] = (counts[c] || 0) + 1);
            const options = Object.entries(counts);
            const [color, count] = options[Math.floor(Math.random() * options.length)];
            return {
                text: `${COLOR_NAMES[color]} appears exactly ${count} time${count > 1 ? 's' : ''}.`,
                test: (guess) => guess.filter(c => c === color).length === count
            };
        }
    });
    
    // Type 9: Slot is one of two colors
    generators.push({
        type: 'slot-either',
        isDirect: false,
        generate: (sol) => {
            const slot = Math.floor(Math.random() * numSlots);
            const correctColor = sol[slot];
            const otherColors = COLORS.filter(c => c !== correctColor);
            const decoyColor = otherColors[Math.floor(Math.random() * otherColors.length)];
            
            const [first, second] = Math.random() < 0.5 
                ? [correctColor, decoyColor] 
                : [decoyColor, correctColor];
            
            return {
                text: `Slot ${slot + 1} is either ${COLOR_NAMES[first]} or ${COLOR_NAMES[second]}.`,
                test: (guess) => guess[slot] === first || guess[slot] === second
            };
        }
    });
    
    // Type 10: Slot is NOT one of two colors
    generators.push({
        type: 'slot-neither',
        isDirect: false,
        generate: (sol) => {
            const slot = Math.floor(Math.random() * numSlots);
            const correctColor = sol[slot];
            const wrongColors = COLORS.filter(c => c !== correctColor);
            const wrong1 = wrongColors[Math.floor(Math.random() * wrongColors.length)];
            const remaining = wrongColors.filter(c => c !== wrong1);
            const wrong2 = remaining[Math.floor(Math.random() * remaining.length)];
            
            return {
                text: `Slot ${slot + 1} is neither ${COLOR_NAMES[wrong1]} nor ${COLOR_NAMES[wrong2]}.`,
                test: (guess) => guess[slot] !== wrong1 && guess[slot] !== wrong2
            };
        }
    });
    
    // Type 11: Conditional clue (for medium/hard)
    if (config.conditionalClueChance > 0) {
        generators.push({
            type: 'conditional',
            isDirect: false,
            generate: (sol) => {
                if (Math.random() > config.conditionalClueChance) return null;
                
                const slot1 = Math.floor(Math.random() * numSlots);
                let slot2 = Math.floor(Math.random() * numSlots);
                while (slot2 === slot1) slot2 = Math.floor(Math.random() * numSlots);
                
                const color1 = sol[slot1];
                const color2 = sol[slot2];
                
                return {
                    text: `If ${COLOR_NAMES[color1]} is in slot ${slot1 + 1}, then ${COLOR_NAMES[color2]} is in slot ${slot2 + 1}.`,
                    test: (guess) => {
                        if (guess[slot1] === color1) {
                            return guess[slot2] === color2;
                        }
                        return true;
                    }
                };
            }
        });
    }
    
    // Type 12: Color is in one of two slots
    generators.push({
        type: 'color-slots',
        isDirect: false,
        generate: (sol) => {
            const colorIndices = {};
            sol.forEach((c, i) => {
                if (!colorIndices[c]) colorIndices[c] = [];
                colorIndices[c].push(i);
            });
            
            const singleColors = Object.entries(colorIndices).filter(([c, indices]) => indices.length === 1);
            if (singleColors.length === 0) return null;
            
            const [color, [actualSlot]] = singleColors[Math.floor(Math.random() * singleColors.length)];
            
            const otherSlots = [];
            for (let i = 0; i < numSlots; i++) {
                if (i !== actualSlot) otherSlots.push(i);
            }
            const decoySlot = otherSlots[Math.floor(Math.random() * otherSlots.length)];
            
            const [first, second] = Math.random() < 0.5 
                ? [actualSlot, decoySlot] 
                : [decoySlot, actualSlot];
            
            return {
                text: `${COLOR_NAMES[color]} is in slot ${first + 1} or slot ${second + 1}.`,
                test: (guess) => guess[first] === color || guess[second] === color
            };
        }
    });
    
    // Type 13: Exactly N different colors used
    generators.push({
        type: 'unique-count',
        isDirect: false,
        generate: (sol) => {
            const uniqueCount = new Set(sol).size;
            return {
                text: `Exactly ${uniqueCount} different colors are used.`,
                test: (guess) => new Set(guess).size === uniqueCount
            };
        }
    });
    
    return generators;
}

function generateSolution() {
    const sol = [];
    for (let i = 0; i < numSlots; i++) {
        sol.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
    }
    return sol;
}

function countValidSolutions(clueSet) {
    const allPerms = getAllPermutations();
    let validCount = 0;
    let validSolution = null;
    
    for (const perm of allPerms) {
        let valid = true;
        for (const clue of clueSet) {
            if (!clue.test(perm)) {
                valid = false;
                break;
            }
        }
        if (valid) {
            validCount++;
            validSolution = perm;
            if (validCount > 1 && validCount > 20) return { count: validCount, solution: null };
        }
    }
    
    return { count: validCount, solution: validSolution };
}

function generatePuzzle() {
    const config = DIFFICULTY_CONFIG[currentDifficulty];
    const generators = getClueGenerators(config);
    const maxAttempts = 150;
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const sol = generateSolution();
        const clueSet = [];
        let directClueCount = 0;
        const usedTexts = new Set();
        
        const targetClues = config.minClues + Math.floor(Math.random() * (config.maxClues - config.minClues + 1));
        
        for (let i = 0; i < 80 && clueSet.length < targetClues; i++) {
            const generator = generators[Math.floor(Math.random() * generators.length)];
            
            if (generator.isDirect) {
                if (!config.allowMultipleDirectClues && directClueCount >= 1) continue;
            }
            
            const clue = generator.generate(sol);
            
            if (clue && !usedTexts.has(clue.text)) {
                if (clue.test(sol)) {
                    clueSet.push(clue);
                    usedTexts.add(clue.text);
                    if (generator.isDirect) directClueCount++;
                }
            }
        }
        
        if (clueSet.length < config.minClues) continue;
        
        const result = countValidSolutions(clueSet);
        
        if (result.count === 1) {
            const match = result.solution.every((c, i) => c === sol[i]);
            if (match) {
                return { solution: sol, clues: clueSet };
            }
        }
        
        if (result.count > 1 && result.count < 50) {
            for (let extra = 0; extra < 30; extra++) {
                const generator = generators[Math.floor(Math.random() * generators.length)];
                
                if (generator.isDirect && !config.allowMultipleDirectClues && directClueCount >= 1) continue;
                
                const clue = generator.generate(sol);
                
                if (clue && clue.test(sol) && !usedTexts.has(clue.text)) {
                    const testSet = [...clueSet, clue];
                    const testResult = countValidSolutions(testSet);
                    
                    if (testResult.count === 1) {
                        const match = testResult.solution.every((c, i) => c === sol[i]);
                        if (match) {
                            return { solution: sol, clues: testSet };
                        }
                    } else if (testResult.count > 0 && testResult.count < result.count) {
                        clueSet.push(clue);
                        usedTexts.add(clue.text);
                        if (generator.isDirect) directClueCount++;
                    }
                }
            }
        }
    }
    
    return generateFallbackPuzzle(config);
}

function generateFallbackPuzzle(config) {
    const sol = generateSolution();
    const clueSet = [];
    
    if (config.allowDirectSlotClues) {
        const revealCount = config.allowMultipleDirectClues ? 2 : 1;
        const revealedSlots = new Set();
        while (revealedSlots.size < revealCount) {
            revealedSlots.add(Math.floor(Math.random() * numSlots));
        }
        
        for (const slot of revealedSlots) {
            clueSet.push({
                text: `Slot ${slot + 1} contains ${COLOR_NAMES[sol[slot]]}.`,
                test: (guess) => guess[slot] === sol[slot]
            });
        }
        
        for (let i = 0; i < numSlots; i++) {
            if (!revealedSlots.has(i)) {
                const wrongColors = COLORS.filter(c => c !== sol[i]);
                const wrong1 = wrongColors[Math.floor(Math.random() * wrongColors.length)];
                const wrong2 = wrongColors.filter(c => c !== wrong1)[Math.floor(Math.random() * (wrongColors.length - 1))];
                
                clueSet.push({
                    text: `Slot ${i + 1} is neither ${COLOR_NAMES[wrong1]} nor ${COLOR_NAMES[wrong2]}.`,
                    test: (guess) => guess[i] !== wrong1 && guess[i] !== wrong2
                });
            }
        }
    } else {
        for (let i = 0; i < numSlots; i++) {
            const correctColor = sol[i];
            const otherColors = COLORS.filter(c => c !== correctColor);
            const decoyColor = otherColors[Math.floor(Math.random() * otherColors.length)];
            
            clueSet.push({
                text: `Slot ${i + 1} is either ${COLOR_NAMES[correctColor]} or ${COLOR_NAMES[decoyColor]}.`,
                test: (guess) => guess[i] === correctColor || guess[i] === decoyColor
            });
        }
        
        const presentColors = [...new Set(sol)];
        const absentColors = COLORS.filter(c => !presentColors.includes(c));
        if (absentColors.length > 0) {
            const absent = absentColors[Math.floor(Math.random() * absentColors.length)];
            clueSet.push({
                text: `${COLOR_NAMES[absent]} does not appear in the sequence.`,
                test: (guess) => !guess.includes(absent)
            });
        }
    }
    
    return { solution: sol, clues: clueSet };
}

// ========== UI RENDERING ==========

function renderSlots() {
    const container = document.getElementById('slots-container');
    const labels = document.getElementById('slot-labels');
    container.innerHTML = '';
    labels.innerHTML = '';
    
    for (let i = 0; i < numSlots; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.dataset.index = i;
        
        const orb = document.createElement('div');
        orb.className = 'orb ' + (playerGuess[i] || 'empty');
        slot.appendChild(orb);
        
        slot.addEventListener('click', () => toggleColorPicker(i, slot));
        container.appendChild(slot);
        
        const label = document.createElement('div');
        label.className = 'slot-label';
        label.textContent = `SLOT ${i + 1}`;
        labels.appendChild(label);
    }
}

function toggleColorPicker(slotIndex, slotElement) {
    const existingPicker = document.querySelector('.color-picker');
    if (existingPicker) {
        existingPicker.remove();
        document.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
        
        if (activeSlot === slotIndex) {
            activeSlot = null;
            return;
        }
    }
    
    activeSlot = slotIndex;
    slotElement.classList.add('active');
    
    const picker = document.createElement('div');
    picker.className = 'color-picker';
    
    COLORS.forEach(color => {
        const option = document.createElement('div');
        option.className = `color-option orb ${color}`;
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            selectColor(slotIndex, color);
        });
        picker.appendChild(option);
    });
    
    const clearOption = document.createElement('div');
    clearOption.className = 'color-option clear-option';
    clearOption.innerHTML = '✕';
    clearOption.addEventListener('click', (e) => {
        e.stopPropagation();
        selectColor(slotIndex, null);
    });
    picker.appendChild(clearOption);
    
    slotElement.appendChild(picker);
    
    setTimeout(() => {
        document.addEventListener('click', closePicker);
    }, 10);
}

function closePicker(e) {
    if (!e.target.closest('.color-picker') && !e.target.closest('.slot')) {
        const picker = document.querySelector('.color-picker');
        if (picker) picker.remove();
        document.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
        activeSlot = null;
        document.removeEventListener('click', closePicker);
    }
}

function selectColor(slotIndex, color) {
    playerGuess[slotIndex] = color;
    
    const slots = document.querySelectorAll('.slot');
    const orb = slots[slotIndex].querySelector('.orb');
    orb.className = 'orb ' + (color || 'empty');
    
    const picker = document.querySelector('.color-picker');
    if (picker) picker.remove();
    slots[slotIndex].classList.remove('active');
    activeSlot = null;
    
    document.getElementById('feedback').classList.add('hidden');
    
    document.removeEventListener('click', closePicker);
}

function renderClues() {
    const container = document.getElementById('clues-container');
    container.innerHTML = '';
    
    clues.forEach((clue, index) => {
        const clueEl = document.createElement('div');
        clueEl.className = 'clue';
        clueEl.innerHTML = `
            <span class="clue-number">${String(index + 1).padStart(2, '0')}</span>
            <span class="clue-text">${clue.text}</span>
        `;
        container.appendChild(clueEl);
    });
    
    document.getElementById('clue-count').textContent = `${clues.length} CLUES`;
}

function clearGuess() {
    playerGuess = new Array(numSlots).fill(null);
    renderSlots();
    document.getElementById('feedback').classList.add('hidden');
}

function checkSolution() {
    const feedback = document.getElementById('feedback');
    
    if (playerGuess.some(g => g === null)) {
        feedback.textContent = 'Fill all slots before decoding.';
        feedback.className = 'feedback warning';
        return;
    }
    
    const isCorrect = solution.every((c, i) => c === playerGuess[i]);
    
    if (isCorrect) {
        totalDecoded++;
        showSuccess();
    } else {
        feedback.textContent = 'Incorrect sequence. All clues are still valid—analyze again.';
        feedback.className = 'feedback error';
    }
}

function showSuccess() {
    showScreen('success-screen');
    
    const display = document.getElementById('decoded-display');
    display.innerHTML = '';
    solution.forEach(color => {
        const orb = document.createElement('div');
        orb.className = `orb ${color}`;
        display.appendChild(orb);
    });
    
    document.getElementById('total-decoded').textContent = totalDecoded;
}

function startNewPuzzle() {
    const config = DIFFICULTY_CONFIG[currentDifficulty];
    numSlots = config.numSlots;
    
    puzzleCount++;
    playerGuess = new Array(numSlots).fill(null);
    
    const puzzle = generatePuzzle();
    solution = puzzle.solution;
    clues = puzzle.clues;
    
    document.getElementById('puzzle-num').textContent = puzzleCount;
    document.getElementById('streak').textContent = totalDecoded;
    
    const diffDisplay = document.getElementById('difficulty-display');
    diffDisplay.textContent = config.label;
    diffDisplay.className = `difficulty-display ${currentDifficulty}`;
    
    renderSlots();
    renderClues();
    
    document.getElementById('feedback').classList.add('hidden');
    
    showScreen('game-screen');
}

function setDifficulty(difficulty) {
    currentDifficulty = difficulty;
    
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
    });
}

// ========== EVENT LISTENERS ==========
document.getElementById('start-btn').addEventListener('click', startNewPuzzle);
document.getElementById('clear-btn').addEventListener('click', clearGuess);
document.getElementById('decode-btn').addEventListener('click', checkSolution);
document.getElementById('next-btn').addEventListener('click', startNewPuzzle);

document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        setDifficulty(btn.dataset.difficulty);
    });
});

window.onbeforeunload = null;