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

// ========== SVG ICONS ==========
const tarotIcons = {
    "The Fool": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="30" r="12" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50 42 L50 70 M50 70 L40 85 M50 70 L60 85 M35 52 L50 52 L65 52" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M70 20 L80 15 L85 25" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    
    "The Magician": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 15 L50 50 M35 25 L65 25" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="35" cy="60" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M55 55 L65 65 L55 75 L45 65 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M25 80 L35 85 L25 90" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="70" cy="80" r="6" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    
    "The High Priestess": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30 20 L30 85 M70 20 L70 85 M25 20 L75 20" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="50" cy="40" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M40 55 L60 55 M35 65 L65 65 M30 75 L70 75" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    
    "The Empress": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 20 L40 35 L50 50 L60 35 Z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" stroke-width="2"/><path d="M35 65 L50 85 L65 65" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="30" cy="40" r="3" fill="currentColor"/><circle cx="70" cy="40" r="3" fill="currentColor"/></svg>',
    
    "The Emperor": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="35" y="25" width="30" height="40" fill="none" stroke="currentColor" stroke-width="2"/><path d="M35 45 L65 45 M40 35 L60 35 M40 55 L60 55" stroke="currentColor" stroke-width="2"/><path d="M30 20 L50 10 L70 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><rect x="40" y="65" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    
    "The Hierophant": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 15 L40 25 L40 50 L60 50 L60 25 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M35 30 L65 30 M35 40 L65 40" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="60" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M40 75 L50 70 L60 75 M40 85 L50 80 L60 85" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    
    "The Lovers": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30 40 Q30 25 40 25 Q50 25 50 35 Q50 25 60 25 Q70 25 70 40 Q70 60 50 75 Q30 60 30 40 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M65 20 L75 10 L85 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    
    "The Chariot": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="35" width="40" height="35" fill="none" stroke="currentColor" stroke-width="2"/><path d="M35 70 L35 80 M65 70 L65 80" stroke="currentColor" stroke-width="2"/><circle cx="35" cy="82" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="65" cy="82" r="5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M25 25 L50 15 L75 25" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    
    "Strength": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="45" r="20" fill="none" stroke="currentColor" stroke-width="2"/><path d="M35 45 L40 50 L45 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 70 L50 80 L60 70" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="50" cy="25" r="6" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    
    "The Hermit": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 20 L50 75" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="50" cy="15" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M35 40 L50 30 L65 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="50" cy="85" r="5" fill="currentColor"/></svg>',
    
    "Wheel of Fortune": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50 25 L50 75 M25 50 L75 50" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50 15 L45 20 L55 20 Z" fill="currentColor"/></svg>',
    
    "Justice": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30 40 L70 40 M50 40 L50 70" stroke="currentColor" stroke-width="2" fill="none"/><path d="M25 35 L25 45 L35 45 L35 35 Z M65 35 L65 45 L75 45 L75 35 Z" fill="none" stroke="currentColor" stroke-width="2"/><rect x="40" y="70" width="20" height="15" fill="none" stroke="currentColor" stroke-width="2"/><path d="M30 20 L50 10 L70 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    
    "The Hanged Man": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30 30 L70 30 M50 30 L50 55" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="50" cy="65" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M40 75 L50 80 M60 75 L50 80" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    
    "Death": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="30" r="12" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50 42 L50 65 M35 50 L65 50" stroke="currentColor" stroke-width="2" fill="none"/><path d="M35 65 L50 75 L65 65" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M40 20 L45 15 M60 20 L55 15" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    
    "Temperance": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M35 30 Q35 20 45 20 L55 20 Q65 20 65 30 L65 70 Q65 80 55 80 L45 80 Q35 80 35 70 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M45 35 Q50 45 55 35 M45 55 Q50 65 55 55" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    
    "The Devil": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="40" r="15" fill="none" stroke="currentColor" stroke-width="2"/><path d="M40 30 L35 20 M60 30 L65 20" stroke="currentColor" stroke-width="2" fill="none"/><path d="M35 60 L50 55 L65 60 M50 55 L50 80" stroke="currentColor" stroke-width="2" fill="none"/><path d="M45 75 L50 80 L55 75" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    
    "The Tower": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="35" y="30" width="30" height="50" fill="none" stroke="currentColor" stroke-width="2"/><path d="M35 45 L65 45 M35 60 L65 60" stroke="currentColor" stroke-width="2"/><path d="M45 20 L50 10 L55 20" fill="currentColor"/><path d="M70 25 L80 20 L85 30 M25 40 L15 35 L20 45" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    
    "The Star": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 20 L55 40 L75 40 L60 52 L65 70 L50 58 L35 70 L40 52 L25 40 L45 40 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="30" cy="25" r="2" fill="currentColor"/><circle cx="70" cy="30" r="2" fill="currentColor"/><circle cx="25" cy="60" r="2" fill="currentColor"/><circle cx="75" cy="65" r="2" fill="currentColor"/></svg>',
    
    "The Moon": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="35" r="18" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="60" cy="35" r="15" fill="var(--night-blue)"/><path d="M30 60 Q40 70 50 60 Q60 50 70 60" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="35" cy="75" r="3" fill="currentColor"/><circle cx="65" cy="80" r="3" fill="currentColor"/></svg>',
    
    "The Sun": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="40" r="15" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50 15 L50 20 M50 60 L50 65 M25 40 L30 40 M70 40 L75 40 M32 25 L36 29 M64 25 L60 29 M32 55 L36 51 M64 55 L60 51" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M35 70 Q50 80 65 70" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    
    "Judgement": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 20 L45 30 L55 30 Z" fill="currentColor"/><path d="M50 30 L50 50" stroke="currentColor" stroke-width="2"/><rect x="35" y="50" width="10" height="30" fill="none" stroke="currentColor" stroke-width="2"/><rect x="55" y="55" width="10" height="25" fill="none" stroke="currentColor" stroke-width="2"/><path d="M30 80 L70 80" stroke="currentColor" stroke-width="2"/></svg>',
    
    "The World": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="50" rx="25" ry="30" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50 20 L50 80 M25 50 L75 50" stroke="currentColor" stroke-width="2"/><circle cx="35" cy="30" r="3" fill="currentColor"/><circle cx="65" cy="30" r="3" fill="currentColor"/><circle cx="35" cy="70" r="3" fill="currentColor"/><circle cx="65" cy="70" r="3" fill="currentColor"/></svg>'
};

const vibeIcons = {
    "Emo": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30 40 Q50 20 70 40 L70 60 Q50 80 30 60 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M40 45 L45 50 M60 45 L55 50" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M40 65 Q50 60 60 65" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    
    "Cottagecore": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 20 L30 40 L30 75 L70 75 L70 40 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><rect x="40" y="55" width="10" height="20" fill="none" stroke="currentColor" stroke-width="2"/><rect x="55" y="45" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M35 65 Q40 60 45 65 M50 55 Q55 50 60 55" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>',
    
    "Y2K": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="2"/><path d="M35 45 L40 50 L35 55 M65 45 L60 50 L65 55" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/><circle cx="30" cy="30" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="70" cy="30" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="30" cy="70" r="4" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    
    "Gothic": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 20 L40 35 L50 50 L60 35 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><rect x="35" y="50" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2"/><path d="M35 60 L65 60 M35 70 L65 70" stroke="currentColor" stroke-width="2"/></svg>',
    
    "Indie": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="40" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="65" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M25 65 Q35 55 45 65 Q55 75 65 65 Q75 55 85 65" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    
    "Minimalist": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="40" r="15" fill="none" stroke="currentColor" stroke-width="2"/><path d="M35 65 L65 65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    
    "Vintage": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="40" height="40" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" stroke-width="2"/><path d="M30 45 L25 45 M70 45 L75 45 M50 30 L50 25 M50 70 L50 75" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    
    "Cyberpunk": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30 30 L50 20 L70 30 L70 70 L50 80 L30 70 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M30 45 L70 45 M30 55 L70 55" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="35" r="3" fill="currentColor"/></svg>',
    
    "Soft Girl": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 30 Q30 30 30 45 Q30 60 50 65 Q70 60 70 45 Q70 30 50 30" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="42" cy="45" r="3" fill="currentColor"/><circle cx="58" cy="45" r="3" fill="currentColor"/><path d="M45 55 Q50 58 55 55" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    
    "Dark Academia": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="35" width="40" height="45" fill="none" stroke="currentColor" stroke-width="2"/><path d="M30 50 L70 50 M30 60 L70 60 M30 70 L70 70" stroke="currentColor" stroke-width="2"/><path d="M25 30 L50 20 L75 30" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    
    "Ethereal": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 25 Q30 35 35 55 Q40 75 50 75 Q60 75 65 55 Q70 35 50 25" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="45" cy="45" r="2" fill="currentColor"/><circle cx="55" cy="45" r="2" fill="currentColor"/><path d="M35 35 Q30 30 35 25 M65 35 Q70 30 65 25" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>',
    
    "Grunge": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30 40 L35 35 L45 45 L40 50 M55 45 L65 35 L70 40 L60 50" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M35 65 Q50 60 65 65" stroke="currentColor" stroke-width="2" fill="none"/><path d="M25 55 L30 50 M70 50 L75 55" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    
    "Pastel": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="12" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="60" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="45" cy="65" r="8" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    
    "Witchy": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 20 L40 35 L50 50 L60 35 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="50" cy="60" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50 68 L50 80 M40 75 L50 72 L60 75" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    
    "Retro": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="45" r="20" fill="none" stroke="currentColor" stroke-width="2"/><rect x="30" y="60" width="40" height="20" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="42" cy="70" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="58" cy="70" r="4" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    
    "Kawaii": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="45" r="20" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="42" cy="42" r="3" fill="currentColor"/><circle cx="58" cy="42" r="3" fill="currentColor"/><path d="M42 52 Q50 57 58 52" stroke="currentColor" stroke-width="2" fill="none"/><path d="M35 38 Q32 35 35 32 M65 38 Q68 35 65 32" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>',
    
    "Boho": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 25 Q35 35 35 50 Q35 65 50 75 Q65 65 65 50 Q65 35 50 25" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M40 40 Q35 45 40 50 M60 40 Q65 45 60 50" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>',
    
    "Streetwear": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="35" y="30" width="30" height="35" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M35 45 L65 45 M35 55 L65 55" stroke="currentColor" stroke-width="2"/><path d="M30 30 L35 25 M70 30 L65 25" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="43" y="65" width="14" height="15" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    
    "Romantic": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 70 Q30 50 30 40 Q30 25 40 25 Q50 25 50 35 Q50 25 60 25 Q70 25 70 40 Q70 50 50 70" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M40 35 Q45 30 50 35 M60 35 Q55 30 50 35" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>',
    
    "Chaotic": '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M25 30 L40 50 L30 70 M50 25 L50 75 M75 35 L60 50 L70 65" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="35" cy="30" r="3" fill="currentColor"/><circle cx="50" cy="50" r="3" fill="currentColor"/><circle cx="65" cy="65" r="3" fill="currentColor"/></svg>'
};

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
    // 5 outlandish descriptions for each vibe
    const vibeDescriptions = {
        "Emo": [
            "dripping with black eyeliner tears and poetry written on bathroom stalls",
            "carved into your heart with a safety pin while My Chemical Romance plays in the distance",
            "scrawled in sharpie on the back of a Warped Tour poster that smells like teenage angst",
            "bleeding through journal pages written at 2am to Dashboard Confessional",
            "stitched onto a studded belt with feelings you can't quite explain to your parents"
        ],
        "Cottagecore": [
            "baked into sourdough bread by forest fairies at golden hour",
            "harvested from a wildflower meadow by someone who definitely talks to bees",
            "knitted into a chunky cardigan by your great-grandmother's ghost",
            "preserved in a mason jar with hand-pressed flowers and unrealistic life expectations",
            "churned into butter by a milkmaid who has never seen a smartphone"
        ],
        "Y2K": [
            "glitching through a bedazzled flip phone in a low-rise jean pocket",
            "encoded in a Tamagotchi that somehow achieved sentience",
            "transmitted via AIM away message with way too many emojis and sparkle gifs",
            "burned onto a CD with 'SUMMER MIX' written in gel pen",
            "downloaded from LimeWire along with 47 viruses and a Brittney Spears song"
        ],
        "Gothic": [
            "carved into cathedral stones by ravens at midnight",
            "whispered by gargoyles during a thunderstorm in an abandoned chapel",
            "written in blood-red wine on Victorian wallpaper that's definitely haunted",
            "etched into a silver locket that opens to reveal someone else's sorrow",
            "bound in black leather and locked with a key that was lost in 1842"
        ],
        "Indie": [
            "strummed on a thrifted ukulele in a basement show nobody heard about",
            "recorded on a cassette tape in someone's garage by a band that definitely broke up",
            "hummed by a barista with a philosophy degree and unresolved daddy issues",
            "played at an open mic night where everyone pretends they're not on their phones",
            "scribbled on a napkin at a coffee shop that only serves oat milk"
        ],
        "Minimalist": [
            "whispered in helvetica font on a white canvas in an empty room",
            "expressed through the absence of clutter and the presence of existential dread",
            "communicated via a single black line on a page that cost $47",
            "embodied by owning exactly three items and being annoying about it",
            "manifested in negative space and positive vibes only"
        ],
        "Vintage": [
            "discovered in your grandmother's attic inside a velvet box that shouldn't exist",
            "pressed between pages of a 1950s cookbook with mysterious stains",
            "found at a garage sale by someone who definitely watches too much Antiques Roadshow",
            "preserved in sepia tone and the smell of mothballs",
            "transmitted through a rotary phone that still works for some reason"
        ],
        "Cyberpunk": [
            "downloaded directly into your consciousness through neon-lit neural implants",
            "hacked from a megacorporation server by someone in a gas mask at 4am",
            "uploaded to the black market with a price tag in cryptocurrency you can't pronounce",
            "streamed through cybernetic eyes in a rain-soaked alley full of questionable choices",
            "encrypted in binary and delivered by a drone with trust issues"
        ],
        "Soft Girl": [
            "tied with strawberry ribbons and sprinkled with heart-shaped glitter",
            "packaged in a cloud made of cotton candy and the tears of care bears",
            "delivered in a pink envelope that smells like vanilla and false confidence",
            "wrapped in fuzzy sweaters and the delusion that everything will be okay",
            "garnished with butterfly clips and an unsustainable amount of optimism"
        ],
        "Dark Academia": [
            "scribbled in the margins of a forbidden leather-bound manuscript",
            "discovered in a library book that was never checked out and possibly cursed",
            "whispered in Latin by a ghost with unresolved academic pressure",
            "analyzed over black coffee and the works of dead philosophers at 3am",
            "debated in a secret society that meets in a basement and takes itself too seriously"
        ],
        "Ethereal": [
            "floating through a cloud of iridescent moth wings and moonbeams",
            "drifting on cosmic dust particles that taste like stardust and existential wonder",
            "suspended in the moment between dreaming and waking where logic doesn't exist",
            "woven from spider silk and the whispers of things that never quite were",
            "crystallized in dewdrops on flowers that only bloom during solar eclipses"
        ],
        "Grunge": [
            "spray-painted on a coffee-stained flannel in a Seattle alley",
            "screamed into a distorted microphone by someone who refuses to wash their hair",
            "discovered under the stage at a show where everyone moshed too hard",
            "scrawled on Converse that have seen things they'll never talk about",
            "found in the pocket of thrifted jeans along with someone else's trauma"
        ],
        "Pastel": [
            "melted into cotton candy clouds and served on a holographic plate",
            "dusted with powdered sugar and the aesthetic of a cupcake that's too pretty to eat",
            "swirled in soft serve ice cream colors that don't exist in nature",
            "painted with watercolors that bleed into each other like a Pinterest fantasy",
            "dipped in bubble solution and photographed with an Instagram filter from 2014"
        ],
        "Witchy": [
            "brewed in a cauldron under a blood moon with herbs nobody can pronounce",
            "channeled through tarot cards that somehow always pull The Tower",
            "conjured in a salt circle at midnight by someone with 47 crystals",
            "whispered by ancestors who are honestly just confused by your life choices",
            "manifested during mercury retrograde because of course it is"
        ],
        "Retro": [
            "transmitted through a wood-paneled television from a dimension stuck in 1973",
            "broadcast on VHS tapes that were recorded over your family's home videos",
            "displayed on an arcade machine that only accepts quarters from 1985",
            "announced by a game show host with suspiciously white teeth and questionable morals",
            "captured on Polaroid film that develops into something completely different"
        ],
        "Kawaii": [
            "squeezed out of a tube of sparkly strawberry toothpaste by a pink stuffed bear",
            "drawn in gel pens with too many hearts and stars to be legally allowed",
            "delivered by a kitten riding a rainbow into your unsuspecting consciousness",
            "packaged in a bento box that's almost too cute to function",
            "sung by a tiny animated character that exists purely to make you say 'awww'"
        ],
        "Boho": [
            "woven into a macrame wall hanging by someone who definitely lives in a van",
            "discovered at a music festival by someone who hasn't showered in four days",
            "strung together with hemp rope and the belief that mercury is definitely in retrograde",
            "embroidered on a tapestry purchased from a woman named Moon at a farmer's market",
            "manifested during a sound bath that cost more than your rent"
        ],
        "Streetwear": [
            "stitched onto limited-edition sneakers that dropped while you were sleeping",
            "printed on a hoodie that costs more than your car payment",
            "spray-painted on a Supreme brick that someone actually bought",
            "dropped in a collab that sold out in 0.003 seconds to resellers and bots",
            "tagged on a wall by someone wearing $800 shoes to look 'authentic'"
        ],
        "Romantic": [
            "pressed between rose petals in a love letter that time-traveled from the 1800s",
            "sealed with wax and the tears of poets who felt too much",
            "written in calligraphy on parchment by candlelight during a thunderstorm",
            "whispered in French even though neither of you speak French",
            "delivered via carrier pigeon that's honestly just winging it at this point"
        ],
        "Chaotic": [
            "assembled by a raccoon having an existential crisis at 3am in a Denny's parking lot",
            "manifested during a Mercury retrograde inside a retrograde inside another retrograde",
            "constructed from gas station sushi and the confidence of someone who's about to make a mistake",
            "spawned in the multiverse where chaos reigns and nothing makes sense (this one)",
            "created by throwing darts at a board while blindfolded and riding a unicycle"
        ]
    };
    
    // Pick a random description from the vibe's array
    const descriptions = vibeDescriptions[vibe] || [`wrapped in ${vibe.toLowerCase()} energy`];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    const prophecies = [
        `Your ${tarot.meaning} is ${description}.`,
        `${tarot.name} reveals: ${tarot.meaning} will arrive ${description}.`,
        `The cosmos predicts ${tarot.meaning} ${description}.`,
        `Behold! ${tarot.meaning} manifesting ${description}.`,
        `The universe screams: your ${tarot.meaning} comes ${description}.`,
        `${tarot.name} whispers of ${tarot.meaning} ${description}.`,
        `Fate demands ${tarot.meaning} be delivered ${description}.`,
        `The stars align: ${tarot.meaning} approaches ${description}.`,
        `Ancient prophecy foretells ${tarot.meaning} ${description}.`,
        `Your destiny? ${tarot.meaning} ${description}. Obviously.`
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
        // Add icon and text
        tarotResult.innerHTML = `
            <div class="card-icon">${tarotIcons[selectedTarot.name]}</div>
            <div class="card-name">${selectedTarot.name}</div>
        `;
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
        // Add icon and text
        vibeResult.innerHTML = `
            <div class="card-icon">${vibeIcons[selectedVibe]}</div>
            <div class="card-name">${selectedVibe}</div>
        `;
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
    
    // Display selected cards with icons
    document.getElementById('tarot-mini').innerHTML = `
        <div class="mini-icon">${tarotIcons[selectedTarot.name]}</div>
        <div class="mini-name">${selectedTarot.name}</div>
    `;
    document.getElementById('vibe-mini').innerHTML = `
        <div class="mini-icon">${vibeIcons[selectedVibe]}</div>
        <div class="mini-name">${selectedVibe}</div>
    `;
    
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
    document.getElementById('tarot-result').innerHTML = '';
    
    // Reset vibe deck
    const vibeDeck = document.getElementById('vibe-deck');
    vibeDeck.innerHTML = '<div class="card-back vibe-back"><div class="card-ornament">✧</div></div>';
    document.getElementById('vibe-result').innerHTML = '';
    
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