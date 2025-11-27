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
const NUM_SLOTS = 4;

// ========== GAME STATE ==========
let solution = [];
let clues = [];
let playerGuess = [null, null, null, null];
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

// Helper: Get all permutations (for brute force checking)
function getAllPermutations() {
    const perms = [];
    for (let a = 0; a < COLORS.length; a++) {
        for (let b = 0; b < COLORS.length; b++) {
            for (let c = 0; c < COLORS.length; c++) {
                for (let d = 0; d < COLORS.length; d++) {
                    perms.push([COLORS[a], COLORS[b], COLORS[c], COLORS[d]]);
                }
            }
        }
    }
    return perms;
}

// Clue type definitions
const CLUE_GENERATORS = [
    // Type 1: Color is not in a specific slot
    {
        generate: (sol) => {
            const slot = Math.floor(Math.random() * NUM_SLOTS);
            const wrongColors = COLORS.filter(c => c !== sol[slot]);
            const wrongColor = wrongColors[Math.floor(Math.random() * wrongColors.length)];
            return {
                text: `${COLOR_NAMES[wrongColor]} is not in slot ${slot + 1}.`,
                test: (guess) => guess[slot] !== wrongColor
            };
        }
    },
    // Type 2: Color appears at least once
    {
        generate: (sol) => {
            const presentColors = [...new Set(sol)];
            const color = presentColors[Math.floor(Math.random() * presentColors.length)];
            return {
                text: `${COLOR_NAMES[color]} appears at least once.`,
                test: (guess) => guess.includes(color)
            };
        }
    },
    // Type 3: Color does NOT appear anywhere
    {
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
    },
    // Type 4: Color is in a specific slot
    {
        generate: (sol) => {
            const slot = Math.floor(Math.random() * NUM_SLOTS);
            const color = sol[slot];
            return {
                text: `${COLOR_NAMES[color]} is in slot ${slot + 1}.`,
                test: (guess) => guess[slot] === color
            };
        }
    },
    // Type 5: One color appears before another
    {
        generate: (sol) => {
            const indices = {};
            sol.forEach((c, i) => {
                if (!indices[c]) indices[c] = [];
                indices[c].push(i);
            });
            const colors = Object.keys(indices);
            if (colors.length < 2) return null;
            
            // Pick two different colors
            const shuffled = colors.sort(() => Math.random() - 0.5);
            const color1 = shuffled[0];
            const color2 = shuffled[1];
            
            // Get first occurrence of each
            const first1 = Math.min(...indices[color1]);
            const first2 = Math.min(...indices[color2]);
            
            if (first1 === first2) return null;
            
            const [before, after] = first1 < first2 ? [color1, color2] : [color2, color1];
            
            return {
                text: `${COLOR_NAMES[before]} appears before ${COLOR_NAMES[after]} (first occurrence).`,
                test: (guess) => {
                    const idx1 = guess.indexOf(before);
                    const idx2 = guess.indexOf(after);
                    if (idx1 === -1 || idx2 === -1) return false;
                    return idx1 < idx2;
                }
            };
        }
    },
    // Type 6: Two colors are adjacent
    {
        generate: (sol) => {
            // Find adjacent pairs
            const pairs = [];
            for (let i = 0; i < NUM_SLOTS - 1; i++) {
                if (sol[i] !== sol[i + 1]) {
                    pairs.push([sol[i], sol[i + 1]]);
                }
            }
            if (pairs.length === 0) return null;
            
            const pair = pairs[Math.floor(Math.random() * pairs.length)];
            return {
                text: `${COLOR_NAMES[pair[0]]} and ${COLOR_NAMES[pair[1]]} are adjacent.`,
                test: (guess) => {
                    for (let i = 0; i < NUM_SLOTS - 1; i++) {
                        if ((guess[i] === pair[0] && guess[i + 1] === pair[1]) ||
                            (guess[i] === pair[1] && guess[i + 1] === pair[0])) {
                            return true;
                        }
                    }
                    return false;
                }
            };
        }
    },
    // Type 7: Two colors are NOT adjacent
    {
        generate: (sol) => {
            // Find non-adjacent pairs that both exist
            const presentColors = [...new Set(sol)];
            if (presentColors.length < 2) return null;
            
            // Pick two colors that are NOT adjacent in solution
            for (let attempt = 0; attempt < 10; attempt++) {
                const c1 = presentColors[Math.floor(Math.random() * presentColors.length)];
                const remaining = presentColors.filter(c => c !== c1);
                const c2 = remaining[Math.floor(Math.random() * remaining.length)];
                
                // Check if they're adjacent in solution
                let areAdjacent = false;
                for (let i = 0; i < NUM_SLOTS - 1; i++) {
                    if ((sol[i] === c1 && sol[i + 1] === c2) ||
                        (sol[i] === c2 && sol[i + 1] === c1)) {
                        areAdjacent = true;
                        break;
                    }
                }
                
                if (!areAdjacent) {
                    return {
                        text: `${COLOR_NAMES[c1]} and ${COLOR_NAMES[c2]} are not adjacent.`,
                        test: (guess) => {
                            for (let i = 0; i < NUM_SLOTS - 1; i++) {
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
    },
    // Type 8: Color appears exactly N times
    {
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
    },
    // Type 9: Slot is one of two colors
    {
        generate: (sol) => {
            const slot = Math.floor(Math.random() * NUM_SLOTS);
            const correctColor = sol[slot];
            const otherColors = COLORS.filter(c => c !== correctColor);
            const decoyColor = otherColors[Math.floor(Math.random() * otherColors.length)];
            
            // Randomize order
            const [first, second] = Math.random() < 0.5 
                ? [correctColor, decoyColor] 
                : [decoyColor, correctColor];
            
            return {
                text: `Slot ${slot + 1} is either ${COLOR_NAMES[first]} or ${COLOR_NAMES[second]}.`,
                test: (guess) => guess[slot] === first || guess[slot] === second
            };
        }
    },
    // Type 10: First/last slot restriction
    {
        generate: (sol) => {
            const isFirst = Math.random() < 0.5;
            const slot = isFirst ? 0 : NUM_SLOTS - 1;
            const slotName = isFirst ? 'first' : 'last';
            const color = sol[slot];
            
            return {
                text: `The ${slotName} slot contains ${COLOR_NAMES[color]}.`,
                test: (guess) => guess[slot] === color
            };
        }
    }
];

// Generate a random solution
function generateSolution() {
    const sol = [];
    for (let i = 0; i < NUM_SLOTS; i++) {
        sol.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
    }
    return sol;
}

// Test if a clue set has exactly one solution
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
            if (validCount > 1) return { count: validCount, solution: null };
        }
    }
    
    return { count: validCount, solution: validSolution };
}

// Generate a puzzle with unique solution
function generatePuzzle() {
    const maxAttempts = 100;
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const sol = generateSolution();
        const clueSet = [];
        const usedTypes = new Set();
        
        // Generate initial clues (5-7 clues)
        const targetClues = 5 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < 50 && clueSet.length < targetClues; i++) {
            const typeIdx = Math.floor(Math.random() * CLUE_GENERATORS.length);
            const generator = CLUE_GENERATORS[typeIdx];
            const clue = generator.generate(sol);
            
            if (clue && !clueSet.some(c => c.text === clue.text)) {
                // Test if clue is true for solution
                if (clue.test(sol)) {
                    clueSet.push(clue);
                }
            }
        }
        
        if (clueSet.length < 4) continue;
        
        // Check if unique solution
        const result = countValidSolutions(clueSet);
        
        if (result.count === 1) {
            // Verify it matches our solution
            const match = result.solution.every((c, i) => c === sol[i]);
            if (match) {
                return { solution: sol, clues: clueSet };
            }
        }
        
        // Try adding more clues to narrow down
        if (result.count > 1 && result.count < 20) {
            for (let extra = 0; extra < 20; extra++) {
                const typeIdx = Math.floor(Math.random() * CLUE_GENERATORS.length);
                const generator = CLUE_GENERATORS[typeIdx];
                const clue = generator.generate(sol);
                
                if (clue && clue.test(sol) && !clueSet.some(c => c.text === clue.text)) {
                    const testSet = [...clueSet, clue];
                    const testResult = countValidSolutions(testSet);
                    
                    if (testResult.count === 1) {
                        const match = testResult.solution.every((c, i) => c === sol[i]);
                        if (match) {
                            return { solution: sol, clues: testSet };
                        }
                    } else if (testResult.count > 0 && testResult.count < result.count) {
                        clueSet.push(clue);
                    }
                }
            }
        }
    }
    
    // Fallback: generate a simpler puzzle with direct clues
    return generateSimplePuzzle();
}

// Fallback simple puzzle generator
function generateSimplePuzzle() {
    const sol = generateSolution();
    const clueSet = [];
    
    // Add direct slot clues for some positions
    const revealedSlots = new Set();
    while (revealedSlots.size < 2) {
        revealedSlots.add(Math.floor(Math.random() * NUM_SLOTS));
    }
    
    for (const slot of revealedSlots) {
        clueSet.push({
            text: `Slot ${slot + 1} contains ${COLOR_NAMES[sol[slot]]}.`,
            test: (guess) => guess[slot] === sol[slot]
        });
    }
    
    // Add some indirect clues for remaining slots
    for (let i = 0; i < NUM_SLOTS; i++) {
        if (!revealedSlots.has(i)) {
            const wrongColors = COLORS.filter(c => c !== sol[i]);
            const wrong1 = wrongColors[Math.floor(Math.random() * wrongColors.length)];
            const wrong2 = wrongColors.filter(c => c !== wrong1)[Math.floor(Math.random() * (wrongColors.length - 1))];
            
            clueSet.push({
                text: `Slot ${i + 1} is not ${COLOR_NAMES[wrong1]} or ${COLOR_NAMES[wrong2]}.`,
                test: (guess) => guess[i] !== wrong1 && guess[i] !== wrong2
            });
        }
    }
    
    // Add a presence clue
    const presentColors = [...new Set(sol)];
    const color = presentColors[Math.floor(Math.random() * presentColors.length)];
    clueSet.push({
        text: `${COLOR_NAMES[color]} appears in the sequence.`,
        test: (guess) => guess.includes(color)
    });
    
    return { solution: sol, clues: clueSet };
}

// ========== UI RENDERING ==========

function renderSlots() {
    const container = document.getElementById('slots-container');
    const labels = document.getElementById('slot-labels');
    container.innerHTML = '';
    labels.innerHTML = '';
    
    for (let i = 0; i < NUM_SLOTS; i++) {
        // Slot
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.dataset.index = i;
        
        const orb = document.createElement('div');
        orb.className = 'orb ' + (playerGuess[i] || 'empty');
        slot.appendChild(orb);
        
        slot.addEventListener('click', () => toggleColorPicker(i, slot));
        container.appendChild(slot);
        
        // Label
        const label = document.createElement('div');
        label.className = 'slot-label';
        label.textContent = `SLOT ${i + 1}`;
        labels.appendChild(label);
    }
}

function toggleColorPicker(slotIndex, slotElement) {
    // Remove any existing picker
    const existingPicker = document.querySelector('.color-picker');
    if (existingPicker) {
        existingPicker.remove();
        document.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
        
        // If clicking same slot, just close
        if (activeSlot === slotIndex) {
            activeSlot = null;
            return;
        }
    }
    
    activeSlot = slotIndex;
    slotElement.classList.add('active');
    
    const picker = document.createElement('div');
    picker.className = 'color-picker';
    
    // Add color options
    COLORS.forEach(color => {
        const option = document.createElement('div');
        option.className = `color-option orb ${color}`;
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            selectColor(slotIndex, color);
        });
        picker.appendChild(option);
    });
    
    // Add clear option
    const clearOption = document.createElement('div');
    clearOption.className = 'color-option clear-option';
    clearOption.innerHTML = '✕';
    clearOption.addEventListener('click', (e) => {
        e.stopPropagation();
        selectColor(slotIndex, null);
    });
    picker.appendChild(clearOption);
    
    slotElement.appendChild(picker);
    
    // Close picker when clicking outside
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
    
    // Update the orb display
    const slots = document.querySelectorAll('.slot');
    const orb = slots[slotIndex].querySelector('.orb');
    orb.className = 'orb ' + (color || 'empty');
    
    // Close picker
    const picker = document.querySelector('.color-picker');
    if (picker) picker.remove();
    slots[slotIndex].classList.remove('active');
    activeSlot = null;
    
    // Hide any feedback
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
    playerGuess = [null, null, null, null];
    renderSlots();
    document.getElementById('feedback').classList.add('hidden');
}

function checkSolution() {
    const feedback = document.getElementById('feedback');
    
    // Check if all slots filled
    if (playerGuess.some(g => g === null)) {
        feedback.textContent = 'Fill all slots before decoding.';
        feedback.className = 'feedback warning';
        return;
    }
    
    // Check if correct
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
    
    // Show the solution orbs
    const display = document.getElementById('decoded-display');
    display.innerHTML = '';
    solution.forEach(color => {
        const orb = document.createElement('div');
        orb.className = `orb ${color}`;
        display.appendChild(orb);
    });
    
    // Update stats
    document.getElementById('total-decoded').textContent = totalDecoded;
}

function startNewPuzzle() {
    puzzleCount++;
    playerGuess = [null, null, null, null];
    
    // Generate new puzzle
    const puzzle = generatePuzzle();
    solution = puzzle.solution;
    clues = puzzle.clues;
    
    // Update UI
    document.getElementById('puzzle-num').textContent = puzzleCount;
    document.getElementById('streak').textContent = totalDecoded;
    
    renderSlots();
    renderClues();
    
    document.getElementById('feedback').classList.add('hidden');
    
    showScreen('game-screen');
}

// ========== EVENT LISTENERS ==========
document.getElementById('start-btn').addEventListener('click', startNewPuzzle);
document.getElementById('clear-btn').addEventListener('click', clearGuess);
document.getElementById('decode-btn').addEventListener('click', checkSolution);
document.getElementById('next-btn').addEventListener('click', startNewPuzzle);

// Prevent page unload warning
window.onbeforeunload = null;