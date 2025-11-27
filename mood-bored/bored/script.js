// ========== PAGE LOAD BEHAVIOR ==========

// Ensure page always loads at the top
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Prevent scroll restoration on page reload
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// Also scroll to top before page unloads
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// ========== GAME STATE ==========
let targetColor = null;
let targetIndex = null;

// ========== SCREEN MANAGEMENT ==========
function showScreen(screenId) {
    // Scroll to top when changing screens
    window.scrollTo(0, 0);
    
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ========== COLOR GENERATION ==========
function generateTargetColor() {
    // Pick a random base color family
    const colorFamilies = [
        { name: 'red', h: [0, 15], s: [60, 90], l: [45, 65] },
        { name: 'orange', h: [20, 40], s: [70, 90], l: [50, 65] },
        { name: 'yellow', h: [45, 65], s: [70, 90], l: [55, 70] },
        { name: 'green', h: [90, 150], s: [50, 80], l: [40, 60] },
        { name: 'cyan', h: [160, 200], s: [60, 85], l: [45, 65] },
        { name: 'blue', h: [210, 250], s: [60, 90], l: [45, 65] },
        { name: 'purple', h: [260, 300], s: [60, 85], l: [45, 65] },
        { name: 'pink', h: [310, 350], s: [60, 90], l: [55, 75] }
    ];
    
    const family = colorFamilies[Math.floor(Math.random() * colorFamilies.length)];
    
    // Generate target color within the family range
    const h = Math.floor(Math.random() * (family.h[1] - family.h[0]) + family.h[0]);
    const s = Math.floor(Math.random() * (family.s[1] - family.s[0]) + family.s[0]);
    const l = Math.floor(Math.random() * (family.l[1] - family.l[0]) + family.l[0]);
    
    return { h, s, l };
}

function generateSimilarColors(target, count) {
    const colors = [];
    
    // Add the target color
    colors.push({ ...target, isTarget: true });
    
    // EVEN EASIER: Generate colors with BIGGER variations (very noticeable differences)
    for (let i = 0; i < count - 1; i++) {
        // EVEN EASIER variations: ±25 for hue, ±45 for saturation, ±35 for lightness
        const h = Math.max(0, Math.min(360, target.h + (Math.random() * 50 - 25)));
        const s = Math.max(0, Math.min(100, target.s + (Math.random() * 90 - 45)));
        const l = Math.max(0, Math.min(100, target.l + (Math.random() * 70 - 35)));
        
        colors.push({ h, s, l, isTarget: false });
    }
    
    return colors;
}

function hslToString(color) {
    return `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
}

// ========== GAME LOGIC ==========
function startGame() {
    showScreen('memorize-screen');
    
    // Generate target color
    targetColor = generateTargetColor();
    
    // Show target color
    const targetDisplay = document.getElementById('target-color');
    targetDisplay.style.backgroundColor = hslToString(targetColor);
    
    // Start 5-second timer
    let timeLeft = 5;
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = timeLeft;
    
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            startCountdown();
        }
    }, 1000);
}

function startCountdown() {
    showScreen('countdown-screen');
    
    let count = 3;
    const countdownDisplay = document.getElementById('countdown');
    countdownDisplay.textContent = count;
    
    const countdownInterval = setInterval(() => {
        count--;
        
        if (count > 0) {
            countdownDisplay.textContent = count;
            // Re-trigger animation
            countdownDisplay.style.animation = 'none';
            setTimeout(() => {
                countdownDisplay.style.animation = 'countdownZoom 1s ease-out';
            }, 10);
        } else {
            clearInterval(countdownInterval);
            showGameScreen();
        }
    }, 1000);
}

function showGameScreen() {
    showScreen('game-screen');
    
    // Detect screen size and adjust grid
    const isMobile = window.innerWidth <= 480;
    const colorCount = isMobile ? 48 : 60; // 6x8 for mobile, 10x6 for desktop
    
    // Generate similar colors
    const colors = generateSimilarColors(targetColor, colorCount);
    
    // Sort colors to create a PERFECT SMOOTH GRADIENT
    // Sort by: Hue first, then Saturation, then Lightness
    colors.sort((a, b) => {
        // Primary sort: Hue (creates color families)
        if (Math.abs(a.h - b.h) > 2) {
            return a.h - b.h;
        }
        // Secondary sort: Saturation (intensity)
        if (Math.abs(a.s - b.s) > 2) {
            return a.s - b.s;
        }
        // Tertiary sort: Lightness (brightness)
        return a.l - b.l;
    });
    
    // Find target index after sorting
    targetIndex = colors.findIndex(color => color.isTarget);
    
    // Create grid
    const grid = document.getElementById('color-grid');
    grid.innerHTML = '';
    
    colors.forEach((color, index) => {
        const square = document.createElement('div');
        square.className = 'color-square';
        square.style.backgroundColor = hslToString(color);
        square.dataset.index = index;
        
        square.addEventListener('click', () => handleGuess(index, color));
        
        grid.appendChild(square);
    });
}

function handleGuess(guessedIndex, guessedColor) {
    const isCorrect = guessedIndex === targetIndex;
    
    // Show result screen
    showScreen('result-screen');
    
    const resultMessage = document.getElementById('result-message');
    const yourChoice = document.getElementById('your-choice');
    const correctChoice = document.getElementById('correct-choice');
    
    yourChoice.style.backgroundColor = hslToString(guessedColor);
    correctChoice.style.backgroundColor = hslToString(targetColor);
    
    if (isCorrect) {
        resultMessage.innerHTML = 'PERFECT!';
        resultMessage.className = 'result-message correct';
    } else {
        resultMessage.innerHTML = 'SO CLOSE!';
        resultMessage.className = 'result-message wrong';
    }
}

// ========== EVENT LISTENERS ==========
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('play-again-btn').addEventListener('click', startGame);

// Prevent accidental back navigation
window.onbeforeunload = function() {
    return "Are you sure you want to leave the game?";
};