// ========== PAGE LOAD BEHAVIOR ==========
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// ========== CARD DATA ==========
const tarotCards = [
    { name: "The Fool", meaning: "new beginnings" },
    { name: "The Magician", meaning: "manifestation" },
    { name: "The High Priestess", meaning: "intuition" },
    { name: "The Empress", meaning: "abundance" },
    { name: "The Emperor", meaning: "authority" },
    { name: "The Hierophant", meaning: "tradition" },
    { name: "The Lovers", meaning: "love" },
    { name: "The Chariot", meaning: "determination" },
    { name: "Strength", meaning: "courage" },
    { name: "The Hermit", meaning: "introspection" },
    { name: "Wheel of Fortune", meaning: "destiny" },
    { name: "Justice", meaning: "fairness" },
    { name: "The Hanged Man", meaning: "perspective" },
    { name: "Death", meaning: "transformation" },
    { name: "Temperance", meaning: "balance" },
    { name: "The Devil", meaning: "temptation" },
    { name: "The Tower", meaning: "sudden change" },
    { name: "The Star", meaning: "hope" },
    { name: "The Moon", meaning: "illusion" },
    { name: "The Sun", meaning: "joy" },
    { name: "Judgement", meaning: "renewal" },
    { name: "The World", meaning: "completion" }
];

const vibeCards = [
    "Emo", "Cottagecore", "Y2K", "Gothic", "Indie", 
    "Minimalist", "Vintage", "Cyberpunk", "Soft Girl", "Dark Academia",
    "Ethereal", "Grunge", "Pastel", "Witchy", "Retro",
    "Kawaii", "Boho", "Streetwear", "Romantic", "Chaotic"
];

// ========== GAME STATE ==========
let selectedTarot = null;
let selectedVibe = null;

// ========== SCREEN MANAGEMENT ==========
function showScreen(screenId) {
    window.scrollTo(0, 0);
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ========== PROPHECY GENERATION ==========
function generateProphecy(tarot, vibe) {
    const prophecies = [
        `A ${tarot.meaning} that's wrapped in ${vibe.toLowerCase()} energy will find you soon.`,
        `Your path to ${tarot.meaning} will be painted in ${vibe.toLowerCase()} hues.`,
        `Expect ${tarot.meaning} to arrive with a distinctly ${vibe.toLowerCase()} twist.`,
        `The universe whispers of ${tarot.meaning} through a ${vibe.toLowerCase()} lens.`,
        `${tarot.name} reveals ${tarot.meaning} that echoes ${vibe.toLowerCase()} vibes.`,
        `A ${vibe.toLowerCase()} moment of ${tarot.meaning} is written in your stars.`,
        `Your ${tarot.meaning} will manifest in the most ${vibe.toLowerCase()} way possible.`,
        `${tarot.meaning} approaches, dressed in ${vibe.toLowerCase()} aesthetic.`,
        `The cosmos aligns to bring you ${tarot.meaning} with ${vibe.toLowerCase()} flair.`,
        `${tarot.name} speaks: ${tarot.meaning} awaits in a ${vibe.toLowerCase()} form.`
    ];
    
    return prophecies[Math.floor(Math.random() * prophecies.length)];
}

// ========== CARD SELECTION ==========
function selectTarot() {
    if (selectedTarot) return; // Already selected
    
    const tarotDeck = document.getElementById('tarot-deck');
    const tarotResult = document.getElementById('tarot-result');
    const cardBack = tarotDeck.querySelector('.card-back');
    
    // Random tarot card
    selectedTarot = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    
    // Flip animation
    cardBack.classList.add('flipped');
    
    setTimeout(() => {
        cardBack.style.display = 'none';
        tarotResult.textContent = selectedTarot.name;
        tarotResult.style.animation = 'fadeIn 0.6s ease';
        checkBothSelected();
    }, 600);
}

function selectVibe() {
    if (selectedVibe) return; // Already selected
    
    const vibeDeck = document.getElementById('vibe-deck');
    const vibeResult = document.getElementById('vibe-result');
    const cardBack = vibeDeck.querySelector('.card-back');
    
    // Random vibe card
    selectedVibe = vibeCards[Math.floor(Math.random() * vibeCards.length)];
    
    // Flip animation
    cardBack.classList.add('flipped');
    
    setTimeout(() => {
        cardBack.style.display = 'none';
        vibeResult.textContent = selectedVibe;
        vibeResult.style.animation = 'fadeIn 0.6s ease';
        checkBothSelected();
    }, 600);
}

function checkBothSelected() {
    if (selectedTarot && selectedVibe) {
        const btn = document.getElementById('get-prophecy-btn');
        btn.classList.remove('hidden');
        btn.style.animation = 'fadeIn 0.6s ease';
    }
}

function showProphecy() {
    showScreen('prophecy-screen');
    
    // Display selected cards
    document.getElementById('tarot-mini').textContent = selectedTarot.name;
    document.getElementById('vibe-mini').textContent = selectedVibe;
    
    // Generate and display prophecy
    const prophecy = generateProphecy(selectedTarot, selectedVibe);
    document.getElementById('prophecy-text').textContent = prophecy;
}

function resetGame() {
    selectedTarot = null;
    selectedVibe = null;
    
    showScreen('card-screen');
    
    // Reset tarot deck
    const tarotDeck = document.getElementById('tarot-deck');
    tarotDeck.innerHTML = '<div class="card-back tarot-back"><div class="card-ornament">✦</div></div>';
    document.getElementById('tarot-result').textContent = '';
    
    // Reset vibe deck
    const vibeDeck = document.getElementById('vibe-deck');
    vibeDeck.innerHTML = '<div class="card-back vibe-back"><div class="card-ornament">✧</div></div>';
    document.getElementById('vibe-result').textContent = '';
    
    // Hide button
    document.getElementById('get-prophecy-btn').classList.add('hidden');
    
    // Re-attach event listeners
    document.getElementById('tarot-deck').addEventListener('click', selectTarot);
    document.getElementById('vibe-deck').addEventListener('click', selectVibe);
}

// ========== EVENT LISTENERS ==========
document.getElementById('start-btn').addEventListener('click', () => {
    showScreen('card-screen');
});

document.getElementById('tarot-deck').addEventListener('click', selectTarot);
document.getElementById('vibe-deck').addEventListener('click', selectVibe);

document.getElementById('get-prophecy-btn').addEventListener('click', showProphecy);
document.getElementById('try-again-btn').addEventListener('click', resetGame);