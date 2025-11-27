// ========== PAGE INITIALIZATION ==========
window.scrollTo(0, 0);
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// ========== STATE ==========
let currentBrand = null;
let lockedSections = new Set();
let userSelections = {
    colorMood: null,
    industry: null,
    personality: null,
    audience: null
};

// ========== COLOR PALETTES ==========
const COLOR_PALETTES = {
    warm: [
        [
            { name: "Terracotta", hex: "#c96a4b" },
            { name: "Sunset Orange", hex: "#e8945a" },
            { name: "Warm Cream", hex: "#f5e6d3" },
            { name: "Dusty Rose", hex: "#d4a5a5" },
            { name: "Burnt Sienna", hex: "#a0522d" }
        ],
        [
            { name: "Coral", hex: "#e8a07a" },
            { name: "Peach", hex: "#f0c8a0" },
            { name: "Honey", hex: "#d4a84b" },
            { name: "Sand", hex: "#c9b896" },
            { name: "Rust", hex: "#b7472a" }
        ],
        [
            { name: "Apricot", hex: "#e8a87c" },
            { name: "Warm White", hex: "#faf5eb" },
            { name: "Cinnamon", hex: "#b5651d" },
            { name: "Blush", hex: "#de98ab" },
            { name: "Amber", hex: "#cf8a2e" }
        ],
        [
            { name: "Tangerine", hex: "#e07830" },
            { name: "Butter", hex: "#f5e6a3" },
            { name: "Clay", hex: "#b8733e" },
            { name: "Salmon", hex: "#e8a090" },
            { name: "Caramel", hex: "#a0724a" }
        ],
        [
            { name: "Paprika", hex: "#c44536" },
            { name: "Marigold", hex: "#e8a628" },
            { name: "Linen", hex: "#e8e0d5" },
            { name: "Copper", hex: "#b87333" },
            { name: "Rose Gold", hex: "#c9a0a0" }
        ],
        [
            { name: "Sienna", hex: "#a0522d" },
            { name: "Goldenrod", hex: "#daa520" },
            { name: "Ivory", hex: "#f0ebe0" },
            { name: "Melon", hex: "#e8b4a0" },
            { name: "Brick", hex: "#9c4a3a" }
        ],
        [
            { name: "Persimmon", hex: "#e85c3a" },
            { name: "Vanilla", hex: "#f5f0dc" },
            { name: "Bronze", hex: "#a67c52" },
            { name: "Flamingo", hex: "#e8838a" },
            { name: "Spice", hex: "#8b4513" }
        ],
        [
            { name: "Cantaloupe", hex: "#e89860" },
            { name: "Champagne", hex: "#f7e7ce" },
            { name: "Toffee", hex: "#8b6544" },
            { name: "Petal", hex: "#f0c0b0" },
            { name: "Auburn", hex: "#a04030" }
        ]
    ],
    cool: [
        [
            { name: "Ocean Blue", hex: "#4a90a4" },
            { name: "Silver", hex: "#c0c8d0" },
            { name: "Ice", hex: "#e8f0f5" },
            { name: "Slate", hex: "#5a6a7a" },
            { name: "Navy", hex: "#1e2a3a" }
        ],
        [
            { name: "Teal", hex: "#2a8a8a" },
            { name: "Steel", hex: "#8090a0" },
            { name: "Frost", hex: "#d0e0eb" },
            { name: "Denim", hex: "#4a6080" },
            { name: "Midnight", hex: "#1a2040" }
        ],
        [
            { name: "Cerulean", hex: "#4aa0c0" },
            { name: "Pearl", hex: "#e0e8f0" },
            { name: "Pewter", hex: "#6a7080" },
            { name: "Azure", hex: "#3a7ca5" },
            { name: "Charcoal", hex: "#36454f" }
        ],
        [
            { name: "Aqua", hex: "#5abcbc" },
            { name: "Cloud", hex: "#e0e5eb" },
            { name: "Graphite", hex: "#4a5560" },
            { name: "Cobalt", hex: "#3a5aa0" },
            { name: "Ink", hex: "#1a1a2e" }
        ],
        [
            { name: "Seafoam", hex: "#7ec8c8" },
            { name: "Moonstone", hex: "#c8d8e8" },
            { name: "Storm", hex: "#4a5a6a" },
            { name: "Sapphire", hex: "#2a4080" },
            { name: "Onyx", hex: "#1a1a1a" }
        ],
        [
            { name: "Cyan", hex: "#40b0c0" },
            { name: "Platinum", hex: "#d8e0e8" },
            { name: "Titanium", hex: "#5a6878" },
            { name: "Electric Blue", hex: "#3080c0" },
            { name: "Obsidian", hex: "#0d0d0d" }
        ],
        [
            { name: "Turquoise", hex: "#40c0b0" },
            { name: "Mist", hex: "#d0dce8" },
            { name: "Gunmetal", hex: "#4a5058" },
            { name: "Royal", hex: "#3050a0" },
            { name: "Abyss", hex: "#0a0a20" }
        ],
        [
            { name: "Arctic", hex: "#60c8d8" },
            { name: "Snow", hex: "#f0f5f8" },
            { name: "Iron", hex: "#5a6068" },
            { name: "Indigo", hex: "#2b2d5b" },
            { name: "Void", hex: "#08080f" }
        ]
    ],
    earthy: [
        [
            { name: "Sage", hex: "#9cac98" },
            { name: "Olive", hex: "#6b6b4b" },
            { name: "Sand", hex: "#c9b896" },
            { name: "Mushroom", hex: "#8a7a6a" },
            { name: "Forest", hex: "#2d4a3e" }
        ],
        [
            { name: "Moss", hex: "#4a5d23" },
            { name: "Sienna", hex: "#8b4513" },
            { name: "Oat", hex: "#d8c8b0" },
            { name: "Stone", hex: "#7a7a70" },
            { name: "Bark", hex: "#3d2e1f" }
        ],
        [
            { name: "Fern", hex: "#6b8e6b" },
            { name: "Walnut", hex: "#5c4033" },
            { name: "Wheat", hex: "#d8c090" },
            { name: "Pebble", hex: "#8a8a80" },
            { name: "Evergreen", hex: "#1a3d2e" }
        ],
        [
            { name: "Lichen", hex: "#8a9a7a" },
            { name: "Clay", hex: "#9a7a5a" },
            { name: "Flax", hex: "#d0c0a0" },
            { name: "Driftwood", hex: "#7a6a5a" },
            { name: "Pine", hex: "#2a4a30" }
        ],
        [
            { name: "Laurel", hex: "#5a7a5a" },
            { name: "Umber", hex: "#6b4423" },
            { name: "Ecru", hex: "#c8b89a" },
            { name: "Taupe", hex: "#7a706a" },
            { name: "Cedar", hex: "#3a2820" }
        ],
        [
            { name: "Pistachio", hex: "#93c572" },
            { name: "Mocha", hex: "#6a5040" },
            { name: "Bone", hex: "#e3d9c6" },
            { name: "Slate", hex: "#68685a" },
            { name: "Mahogany", hex: "#4a2020" }
        ],
        [
            { name: "Artichoke", hex: "#8a9a6a" },
            { name: "Coffee", hex: "#4a3a2a" },
            { name: "Cream", hex: "#f5f0e1" },
            { name: "Ash", hex: "#8a8a8a" },
            { name: "Espresso", hex: "#2a1a10" }
        ],
        [
            { name: "Basil", hex: "#5a8a50" },
            { name: "Chestnut", hex: "#5a3a20" },
            { name: "Parchment", hex: "#e8dcc4" },
            { name: "Boulder", hex: "#6a6a60" },
            { name: "Loam", hex: "#3a3020" }
        ]
    ],
    bold: [
        [
            { name: "Electric Red", hex: "#e83030" },
            { name: "Canary", hex: "#f0d000" },
            { name: "Pure White", hex: "#ffffff" },
            { name: "Jet Black", hex: "#0a0a0a" },
            { name: "Hot Pink", hex: "#e830a0" }
        ],
        [
            { name: "Cobalt", hex: "#0050a0" },
            { name: "Neon Green", hex: "#30e050" },
            { name: "Snow", hex: "#fafafa" },
            { name: "Carbon", hex: "#1a1a1a" },
            { name: "Magenta", hex: "#e020a0" }
        ],
        [
            { name: "Crimson", hex: "#c01030" },
            { name: "Citrus", hex: "#e8c000" },
            { name: "Chalk", hex: "#f5f5f5" },
            { name: "Onyx", hex: "#101010" },
            { name: "Violet", hex: "#8020c0" }
        ],
        [
            { name: "Scarlet", hex: "#d02020" },
            { name: "Lime", hex: "#90e030" },
            { name: "Ice", hex: "#f0f8ff" },
            { name: "Midnight", hex: "#0a0a1a" },
            { name: "Coral", hex: "#e85050" }
        ],
        [
            { name: "Vermillion", hex: "#e03010" },
            { name: "Sunshine", hex: "#f8d020" },
            { name: "Cream", hex: "#fffef8" },
            { name: "Void", hex: "#050508" },
            { name: "Cyan", hex: "#00c0d0" }
        ],
        [
            { name: "Ruby", hex: "#c01050" },
            { name: "Chartreuse", hex: "#a0e020" },
            { name: "Pearl", hex: "#f8f8f8" },
            { name: "Obsidian", hex: "#0d0d0d" },
            { name: "Tangerine", hex: "#e86020" }
        ],
        [
            { name: "Cherry", hex: "#d01040" },
            { name: "Electric Blue", hex: "#0080f0" },
            { name: "Cloud", hex: "#f5f5fa" },
            { name: "Pitch", hex: "#080808" },
            { name: "Amber", hex: "#e89000" }
        ],
        [
            { name: "Fire", hex: "#e82000" },
            { name: "Acid", hex: "#c0e020" },
            { name: "Ivory", hex: "#fffff8" },
            { name: "Shadow", hex: "#0a0a0f" },
            { name: "Orchid", hex: "#b040c0" }
        ]
    ],
    muted: [
        [
            { name: "Dusty Rose", hex: "#c9a0a0" },
            { name: "Sage", hex: "#9cac98" },
            { name: "Putty", hex: "#c8bca0" },
            { name: "Mauve", hex: "#9d7a8c" },
            { name: "Steel", hex: "#7a8a9a" }
        ],
        [
            { name: "Blush", hex: "#c8a8a8" },
            { name: "Seafoam", hex: "#90b0a8" },
            { name: "Greige", hex: "#b0a898" },
            { name: "Plum", hex: "#8a6a80" },
            { name: "Slate", hex: "#6a7a88" }
        ],
        [
            { name: "Powder", hex: "#c0b0b8" },
            { name: "Eucalyptus", hex: "#88a898" },
            { name: "Latte", hex: "#b8a890" },
            { name: "Wisteria", hex: "#9080a0" },
            { name: "Fog", hex: "#8090a0" }
        ],
        [
            { name: "Champagne", hex: "#d0c0b0" },
            { name: "Mint", hex: "#a0c0b0" },
            { name: "Oat", hex: "#c0b0a0" },
            { name: "Lavender", hex: "#a090b0" },
            { name: "Pewter", hex: "#8a8a90" }
        ],
        [
            { name: "Shell", hex: "#d8c8c0" },
            { name: "Celadon", hex: "#98b8a8" },
            { name: "Biscuit", hex: "#c8b8a8" },
            { name: "Thistle", hex: "#a898a8" },
            { name: "Ash", hex: "#909098" }
        ],
        [
            { name: "Cameo", hex: "#c8b0a8" },
            { name: "Verdigris", hex: "#88a0a0" },
            { name: "Mushroom", hex: "#b0a8a0" },
            { name: "Orchid", hex: "#a088a0" },
            { name: "Graphite", hex: "#787888" }
        ],
        [
            { name: "Bisque", hex: "#d8c0b0" },
            { name: "Moss", hex: "#8a9a88" },
            { name: "Clay", hex: "#b0a090" },
            { name: "Iris", hex: "#9888a0" },
            { name: "Smoke", hex: "#8888a0" }
        ],
        [
            { name: "Nude", hex: "#c8b8b0" },
            { name: "Lichen", hex: "#90a890" },
            { name: "Fawn", hex: "#b8a898" },
            { name: "Heather", hex: "#a090a8" },
            { name: "Stone", hex: "#888890" }
        ]
    ],
    luxe: [
        [
            { name: "Gold", hex: "#c9a227" },
            { name: "Black", hex: "#0a0a0a" },
            { name: "Cream", hex: "#f5f0e1" },
            { name: "Wine", hex: "#722f37" },
            { name: "Emerald", hex: "#2a6a4a" }
        ],
        [
            { name: "Champagne", hex: "#d4b866" },
            { name: "Onyx", hex: "#101010" },
            { name: "Ivory", hex: "#f0ebe0" },
            { name: "Burgundy", hex: "#6a1a2a" },
            { name: "Sapphire", hex: "#1a3a6a" }
        ],
        [
            { name: "Brass", hex: "#b8963a" },
            { name: "Jet", hex: "#080808" },
            { name: "Pearl", hex: "#f8f5f0" },
            { name: "Merlot", hex: "#4a1c2b" },
            { name: "Forest", hex: "#1a3a2a" }
        ],
        [
            { name: "Bronze", hex: "#a0823a" },
            { name: "Charcoal", hex: "#1a1a1a" },
            { name: "Alabaster", hex: "#f5f2e8" },
            { name: "Plum", hex: "#5c3a5a" },
            { name: "Navy", hex: "#0a1a30" }
        ],
        [
            { name: "Amber", hex: "#c09030" },
            { name: "Obsidian", hex: "#0d0d0d" },
            { name: "Bone", hex: "#f0e8d8" },
            { name: "Aubergine", hex: "#4a2040" },
            { name: "Hunter", hex: "#1a4030" }
        ],
        [
            { name: "Honey", hex: "#b89030" },
            { name: "Pitch", hex: "#050505" },
            { name: "Ecru", hex: "#e8e0d0" },
            { name: "Claret", hex: "#5a1a2a" },
            { name: "Teal", hex: "#1a4a4a" }
        ],
        [
            { name: "Antique Gold", hex: "#a88030" },
            { name: "Carbon", hex: "#121212" },
            { name: "Linen", hex: "#f0e8e0" },
            { name: "Raisin", hex: "#3a1a2a" },
            { name: "Peacock", hex: "#1a3a4a" }
        ],
        [
            { name: "Copper", hex: "#b87333" },
            { name: "Void", hex: "#080810" },
            { name: "Snow", hex: "#f8f8f5" },
            { name: "Oxblood", hex: "#4a1010" },
            { name: "Midnight", hex: "#0a1020" }
        ]
    ],
    pastel: [
        [
            { name: "Blush", hex: "#f0c0c8" },
            { name: "Mint", hex: "#c0e8d8" },
            { name: "Lavender", hex: "#d8c8e8" },
            { name: "Butter", hex: "#f8f0c0" },
            { name: "Sky", hex: "#c0d8f0" }
        ],
        [
            { name: "Rose", hex: "#e8b8c0" },
            { name: "Seafoam", hex: "#b8e0d0" },
            { name: "Lilac", hex: "#d0c0e0" },
            { name: "Lemon", hex: "#f0e8b8" },
            { name: "Periwinkle", hex: "#b8c8e8" }
        ],
        [
            { name: "Peach", hex: "#f0c8b8" },
            { name: "Pistachio", hex: "#c8e8c8" },
            { name: "Orchid", hex: "#e0c8e0" },
            { name: "Cream", hex: "#f8f0d8" },
            { name: "Baby Blue", hex: "#c0d0e8" }
        ],
        [
            { name: "Coral", hex: "#e8c0b0" },
            { name: "Sage", hex: "#c0d8c0" },
            { name: "Wisteria", hex: "#d8c0d8" },
            { name: "Vanilla", hex: "#f8f0e0" },
            { name: "Powder", hex: "#d0d8e8" }
        ],
        [
            { name: "Salmon", hex: "#f0c0b8" },
            { name: "Celadon", hex: "#c8e0c8" },
            { name: "Mauve", hex: "#d8c8d8" },
            { name: "Ivory", hex: "#f8f8e8" },
            { name: "Cornflower", hex: "#c0c8e0" }
        ],
        [
            { name: "Apricot", hex: "#f0d0c0" },
            { name: "Honeydew", hex: "#d0e8d0" },
            { name: "Thistle", hex: "#d8d0e0" },
            { name: "Champagne", hex: "#f8f0d0" },
            { name: "Mist", hex: "#d0e0e8" }
        ],
        [
            { name: "Cantaloupe", hex: "#f0d8c8" },
            { name: "Spearmint", hex: "#c8e0d8" },
            { name: "Heather", hex: "#d8c8e0" },
            { name: "Eggshell", hex: "#f8f8f0" },
            { name: "Cloud", hex: "#d8e0f0" }
        ],
        [
            { name: "Shell", hex: "#f0d0d0" },
            { name: "Tea", hex: "#d8e8d8" },
            { name: "Violet", hex: "#e0d0e8" },
            { name: "Cotton", hex: "#f8f8f8" },
            { name: "Ice", hex: "#e0e8f0" }
        ]
    ],
    mono: [
        [
            { name: "White", hex: "#ffffff" },
            { name: "Light Gray", hex: "#d0d0d0" },
            { name: "Medium Gray", hex: "#808080" },
            { name: "Dark Gray", hex: "#404040" },
            { name: "Coral Accent", hex: "#e85050" }
        ],
        [
            { name: "Off-White", hex: "#f8f8f8" },
            { name: "Silver", hex: "#c0c0c0" },
            { name: "Slate", hex: "#6a6a6a" },
            { name: "Charcoal", hex: "#303030" },
            { name: "Teal Accent", hex: "#30a0a0" }
        ],
        [
            { name: "Snow", hex: "#fafafa" },
            { name: "Ash", hex: "#b0b0b0" },
            { name: "Stone", hex: "#707070" },
            { name: "Carbon", hex: "#252525" },
            { name: "Gold Accent", hex: "#c9a227" }
        ],
        [
            { name: "Cream", hex: "#f5f5f0" },
            { name: "Platinum", hex: "#c8c8c8" },
            { name: "Pewter", hex: "#686868" },
            { name: "Jet", hex: "#202020" },
            { name: "Blue Accent", hex: "#3080c0" }
        ],
        [
            { name: "Ivory", hex: "#f0f0e8" },
            { name: "Pearl", hex: "#c0c0c0" },
            { name: "Steel", hex: "#606068" },
            { name: "Onyx", hex: "#181818" },
            { name: "Emerald Accent", hex: "#30a060" }
        ],
        [
            { name: "Bone", hex: "#f0f0f0" },
            { name: "Fog", hex: "#b8b8c0" },
            { name: "Graphite", hex: "#585860" },
            { name: "Obsidian", hex: "#101015" },
            { name: "Violet Accent", hex: "#8050a0" }
        ],
        [
            { name: "Chalk", hex: "#f5f5f5" },
            { name: "Cloud", hex: "#c0c0c8" },
            { name: "Iron", hex: "#505058" },
            { name: "Void", hex: "#0a0a10" },
            { name: "Magenta Accent", hex: "#c030a0" }
        ],
        [
            { name: "Linen", hex: "#f8f8f5" },
            { name: "Mist", hex: "#c8c8c8" },
            { name: "Smoke", hex: "#606060" },
            { name: "Black", hex: "#0a0a0a" },
            { name: "Orange Accent", hex: "#e87030" }
        ]
    ]
};

// ========== FONT PAIRINGS ==========
const FONT_PAIRINGS = {
    playful: [
        { heading: "Fredoka One", body: "Nunito", headingStyle: "rounded, bubbly", bodyStyle: "friendly sans-serif" },
        { heading: "Baloo 2", body: "Quicksand", headingStyle: "bouncy, fun", bodyStyle: "modern rounded" },
        { heading: "Righteous", body: "Poppins", headingStyle: "retro playful", bodyStyle: "geometric clean" },
        { heading: "Lilita One", body: "Open Sans", headingStyle: "bold cartoon", bodyStyle: "neutral readable" }
    ],
    minimalist: [
        { heading: "Inter", body: "Inter", headingStyle: "clean geometric", bodyStyle: "highly legible" },
        { heading: "Helvetica Neue", body: "Helvetica Neue", headingStyle: "timeless swiss", bodyStyle: "professional" },
        { heading: "Archivo", body: "Work Sans", headingStyle: "sharp modern", bodyStyle: "clean grotesque" },
        { heading: "Space Grotesk", body: "IBM Plex Sans", headingStyle: "tech minimal", bodyStyle: "technical clarity" }
    ],
    sophisticated: [
        { heading: "Playfair Display", body: "Source Sans Pro", headingStyle: "elegant serif", bodyStyle: "refined sans" },
        { heading: "Cormorant Garamond", body: "Lato", headingStyle: "luxurious oldstyle", bodyStyle: "soft humanist" },
        { heading: "Libre Baskerville", body: "Open Sans", headingStyle: "classic literary", bodyStyle: "neutral modern" },
        { heading: "Fraunces", body: "DM Sans", headingStyle: "soft serif display", bodyStyle: "geometric warmth" }
    ],
    friendly: [
        { heading: "Outfit", body: "Nunito Sans", headingStyle: "approachable geometric", bodyStyle: "warm readable" },
        { heading: "DM Serif Display", body: "DM Sans", headingStyle: "warm serif", bodyStyle: "friendly geometric" },
        { heading: "Lexend", body: "Source Sans Pro", headingStyle: "readable warmth", bodyStyle: "clear professional" },
        { heading: "Sora", body: "Inter", headingStyle: "modern friendly", bodyStyle: "clean versatile" }
    ],
    bold: [
        { heading: "Bebas Neue", body: "Roboto", headingStyle: "condensed impact", bodyStyle: "neutral workhorse" },
        { heading: "Oswald", body: "Open Sans", headingStyle: "tall condensed", bodyStyle: "balanced clarity" },
        { heading: "Anton", body: "Lato", headingStyle: "ultra bold display", bodyStyle: "soft contrast" },
        { heading: "Archivo Black", body: "Archivo", headingStyle: "heavy grotesque", bodyStyle: "matching family" }
    ],
    organic: [
        { heading: "Caveat", body: "Karla", headingStyle: "handwritten natural", bodyStyle: "humanist warmth" },
        { heading: "Amatic SC", body: "Josefin Sans", headingStyle: "hand-drawn casual", bodyStyle: "elegant light" },
        { heading: "Shadows Into Light", body: "Lora", headingStyle: "scripted casual", bodyStyle: "readable serif" },
        { heading: "Sacramento", body: "Open Sans", headingStyle: "flowing script", bodyStyle: "neutral balance" }
    ],
    retro: [
        { heading: "Abril Fatface", body: "Poppins", headingStyle: "didone display", bodyStyle: "modern geometric" },
        { heading: "Playfair Display", body: "Fira Sans", headingStyle: "editorial classic", bodyStyle: "mozilla modern" },
        { heading: "Bodoni Moda", body: "Montserrat", headingStyle: "high contrast glamour", bodyStyle: "geometric elegance" },
        { heading: "Yeseva One", body: "Josefin Sans", headingStyle: "art nouveau feel", bodyStyle: "vintage modern" }
    ],
    futuristic: [
        { heading: "Orbitron", body: "Exo 2", headingStyle: "sci-fi geometric", bodyStyle: "technical modern" },
        { heading: "Rajdhani", body: "Titillium Web", headingStyle: "sharp angular", bodyStyle: "technical readable" },
        { heading: "Audiowide", body: "Electrolize", headingStyle: "digital display", bodyStyle: "electronic feel" },
        { heading: "Michroma", body: "Jura", headingStyle: "space age", bodyStyle: "sci-fi legible" }
    ]
};

// ========== BRAND NAME GENERATORS ==========
const BRAND_NAMES = {
    tech: ["Nexus", "Vertex", "Pulse", "Cipher", "Axiom", "Vector", "Nova", "Flux", "Quantum", "Prism", "Synth", "Helix", "Echo", "Arc", "Onyx"],
    food: ["Harvest", "Ember", "Sage", "Copper", "Marrow", "Bloom", "Clover", "Hearth", "Maple", "Basil", "Olive", "Thyme", "Butter", "Honey", "Fig"],
    fashion: ["Atelier", "Maison", "Lux", "Noir", "Blanc", "Velvet", "Silk", "Azure", "Jade", "Pearl", "Onyx", "Luxe", "Vogue", "Mode", "Chic"],
    home: ["Haven", "Nest", "Dwelling", "Abode", "Hearth", "Root", "Bower", "Habitat", "Sanctuary", "Refuge", "Retreat", "Oasis", "Domain", "Manor", "Lodge"],
    health: ["Vitality", "Zenith", "Balance", "Thrive", "Elevate", "Restore", "Revive", "Nurture", "Flourish", "Renew", "Radiant", "Vigor", "Clarity", "Serenity", "Wellness"],
    beauty: ["Glow", "Radiance", "Bloom", "Luminous", "Velvet", "Dewdrop", "Petal", "Aura", "Luster", "Silk", "Pearl", "Rose", "Iris", "Orchid", "Jasmine"],
    finance: ["Summit", "Pinnacle", "Ascent", "Legacy", "Meridian", "Sterling", "Capital", "Vanguard", "Fortress", "Keystone", "Cornerstone", "Benchmark", "Apex", "Crest", "Paragon"],
    kids: ["Sprout", "Giggle", "Bounce", "Sunny", "Rainbow", "Cuddle", "Sparkle", "Twinkle", "Bubble", "Jolly", "Merry", "Happy", "Wonder", "Joy", "Delight"],
    outdoor: ["Trailhead", "Summit", "Basecamp", "Wildwood", "Ridgeline", "Evergreen", "Alpine", "Horizon", "Frontier", "Pioneer", "Expedition", "Venture", "Trek", "Roam", "Wander"],
    creative: ["Canvas", "Palette", "Muse", "Atelier", "Studio", "Craft", "Artisan", "Workshop", "Gallery", "Mosaic", "Fresco", "Sketch", "Draft", "Vision", "Create"]
};

const BRAND_SUFFIXES = ["", " Co.", " Studio", " & Co.", " Lab", " House", " Collective", " Group", "", "", "", ""];

// ========== TAGLINES ==========
const TAGLINE_TEMPLATES = {
    playful: ["Where fun meets function", "Making everyday extraordinary", "Sparking joy in every moment", "Life's too short for boring", "Designed to delight"],
    minimalist: ["Less, but better", "Essence over excess", "Simply refined", "The art of less", "Clarity in design"],
    sophisticated: ["Timeless elegance, redefined", "Where luxury meets purpose", "Crafted for the discerning", "Excellence in every detail", "The epitome of refinement"],
    friendly: ["Here for you, always", "Your trusted companion", "Making life easier, together", "Built with care, shared with love", "Good things, good people"],
    bold: ["Dare to stand out", "Unapologetically original", "Break the mold", "Lead, don't follow", "Make your mark"],
    organic: ["Rooted in nature", "From the earth, for you", "Naturally crafted", "Where nature meets nurture", "Grown with intention"],
    retro: ["Classic never goes out of style", "A nod to the good old days", "Vintage soul, modern heart", "Timeless by design", "Heritage meets today"],
    futuristic: ["The future is now", "Tomorrow's solutions, today", "Pioneering what's next", "Beyond the horizon", "Engineered for tomorrow"]
};

// ========== MOOD WORDS ==========
const MOOD_WORDS = {
    warm: ["Inviting", "Cozy", "Welcoming", "Comforting", "Embracing", "Heartfelt", "Radiant", "Glowing"],
    cool: ["Crisp", "Refreshing", "Calm", "Serene", "Tranquil", "Pristine", "Clear", "Balanced"],
    earthy: ["Grounded", "Natural", "Authentic", "Organic", "Rooted", "Wholesome", "Honest", "Pure"],
    bold: ["Dynamic", "Powerful", "Striking", "Fearless", "Confident", "Impactful", "Vibrant", "Electric"],
    muted: ["Subtle", "Refined", "Understated", "Elegant", "Gentle", "Soft", "Thoughtful", "Nuanced"],
    luxe: ["Opulent", "Prestigious", "Exclusive", "Premium", "Distinguished", "Sophisticated", "Exquisite", "Lavish"],
    pastel: ["Delicate", "Sweet", "Dreamy", "Soft", "Gentle", "Light", "Airy", "Fresh"],
    mono: ["Timeless", "Classic", "Clean", "Modern", "Focused", "Intentional", "Sharp", "Precise"]
};

const PERSONALITY_WORDS = {
    playful: ["Fun", "Energetic", "Joyful", "Spirited", "Whimsical", "Cheerful", "Lively", "Bubbly"],
    minimalist: ["Essential", "Pure", "Focused", "Intentional", "Streamlined", "Uncluttered", "Refined", "Zen"],
    sophisticated: ["Elegant", "Polished", "Cultured", "Graceful", "Distinguished", "Poised", "Chic", "Tasteful"],
    friendly: ["Warm", "Approachable", "Trustworthy", "Reliable", "Kind", "Caring", "Genuine", "Open"],
    bold: ["Daring", "Confident", "Fearless", "Audacious", "Striking", "Edgy", "Provocative", "Disruptive"],
    organic: ["Natural", "Authentic", "Sustainable", "Earthy", "Handcrafted", "Artisanal", "Wholesome", "Real"],
    retro: ["Nostalgic", "Classic", "Vintage", "Timeless", "Iconic", "Heritage", "Enduring", "Traditional"],
    futuristic: ["Innovative", "Cutting-edge", "Visionary", "Progressive", "Advanced", "Revolutionary", "Forward", "Next-gen"]
};

// ========== LOGO STYLES ==========
const LOGO_STYLES = {
    playful: { keywords: ["Rounded shapes", "Hand-drawn elements", "Bright colors", "Playful icons"], description: "A friendly, approachable mark with rounded edges and possibly an illustrated mascot or icon." },
    minimalist: { keywords: ["Geometric", "Clean lines", "Negative space", "Sans-serif wordmark"], description: "A stripped-back, essential logo that relies on perfect proportions and generous white space." },
    sophisticated: { keywords: ["Elegant serif", "Refined letterforms", "Classic proportions", "Subtle details"], description: "A polished, premium mark with careful attention to typography." },
    friendly: { keywords: ["Soft edges", "Warm tones", "Approachable type", "Human touch"], description: "An inviting logo that feels trustworthy and accessible." },
    bold: { keywords: ["Heavy weights", "Strong contrast", "Geometric forms", "Impact-driven"], description: "A powerful, attention-grabbing mark with bold typography and confident presence." },
    organic: { keywords: ["Hand-crafted feel", "Natural textures", "Flowing lines", "Botanical elements"], description: "An authentic, artisanal mark that feels handmade." },
    retro: { keywords: ["Vintage type", "Classic badges", "Heritage feel", "Nostalgic details"], description: "A logo that nods to the past with vintage typography and classic design elements." },
    futuristic: { keywords: ["Angular geometry", "Tech-inspired", "Sleek lines", "Forward-thinking"], description: "A cutting-edge mark with sharp angles and modern aesthetics." }
};

// ========== PHOTOGRAPHY STYLES ==========
const PHOTO_STYLES = {
    playful: "Bright, saturated colors with dynamic compositions. Candid moments of joy and energy. Props and playful staging encouraged.",
    minimalist: "Clean, uncluttered compositions with strong negative space. Neutral backgrounds, precise product placement, and controlled lighting.",
    sophisticated: "Moody, editorial-quality imagery with rich tones and careful art direction. Think high-end magazine spreads.",
    friendly: "Warm, natural lighting with authentic moments. Real people in relatable settings. Approachable and genuine.",
    bold: "High contrast, dramatic angles, and striking compositions. Strong colors and impactful visuals that demand attention.",
    organic: "Soft, natural light with earthy tones. Textures, raw materials, and behind-the-scenes authenticity.",
    retro: "Nostalgic color grading with vintage-inspired compositions. Film grain, warm tones, and classic styling references.",
    futuristic: "Sleek, tech-forward aesthetics with cool tones and precise compositions. Abstract elements and innovative angles."
};

// ========== TEXTURES ==========
const TEXTURES = {
    playful: [
        { name: "Confetti dots", css: "radial-gradient(circle at 20% 30%, rgba(255,100,100,0.3) 0%, transparent 8%), radial-gradient(circle at 60% 70%, rgba(100,200,255,0.3) 0%, transparent 10%)" },
        { name: "Wavy lines", css: "repeating-linear-gradient(45deg, rgba(255,100,150,0.1) 0px, transparent 2px, transparent 10px)" }
    ],
    minimalist: [
        { name: "Subtle grid", css: "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(0,0,0,0.03) 0px, transparent 1px, transparent 20px)" },
        { name: "Fine grain", css: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")" }
    ],
    sophisticated: [
        { name: "Marble veins", css: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, transparent 2px, transparent 4px)" },
        { name: "Silk texture", css: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)" }
    ],
    friendly: [
        { name: "Soft waves", css: "repeating-radial-gradient(circle at 50% 50%, transparent 0px, transparent 10px, rgba(100,150,200,0.05) 10px, rgba(100,150,200,0.05) 12px)" },
        { name: "Paper texture", css: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")" }
    ],
    bold: [
        { name: "Diagonal stripes", css: "repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0px, transparent 2px, transparent 20px)" },
        { name: "Halftone dots", css: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.15) 0%, transparent 3px)" }
    ],
    organic: [
        { name: "Natural grain", css: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.1'/%3E%3C/svg%3E\")" },
        { name: "Woven texture", css: "repeating-linear-gradient(0deg, rgba(139,119,101,0.05) 0px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, rgba(139,119,101,0.05) 0px, transparent 1px, transparent 4px)" }
    ],
    retro: [
        { name: "Film grain", css: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")" },
        { name: "Vintage halftone", css: "radial-gradient(circle at 50% 50%, rgba(180,160,120,0.1) 0%, transparent 2px)" }
    ],
    futuristic: [
        { name: "Digital grid", css: "repeating-linear-gradient(0deg, rgba(0,200,255,0.05) 0px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, rgba(0,200,255,0.05) 0px, transparent 1px, transparent 30px)" },
        { name: "Scan lines", css: "repeating-linear-gradient(0deg, rgba(0,255,200,0.03) 0px, transparent 1px, transparent 3px)" }
    ]
};

// ========== VOICE STYLES ==========
const VOICE_STYLES = {
    playful: { description: "Upbeat and energetic. Uses playful language and isn't afraid to be silly.", examples: ["Let's make something awesome!", "Ready to have some fun?"] },
    minimalist: { description: "Concise and intentional. Every word earns its place. Direct without being cold.", examples: ["Simple. Effective. Yours.", "What you need. Nothing more."] },
    sophisticated: { description: "Refined and eloquent. Uses elevated vocabulary without being pretentious.", examples: ["Excellence awaits.", "For those who appreciate the finest."] },
    friendly: { description: "Warm and conversational. Speaks like a knowledgeable friend, not a corporation.", examples: ["We're here to help.", "You've got this, and we've got you."] },
    bold: { description: "Confident and unapologetic. Makes statements, not suggestions. Strong verbs.", examples: ["Make your move.", "Own it."] },
    organic: { description: "Authentic and grounded. Tells stories about origins and process.", examples: ["Crafted with care.", "From our hands to yours."] },
    retro: { description: "Nostalgic charm with modern wit. References classic phrases with a twist.", examples: ["Like the good old days, only better.", "Some things are worth keeping."] },
    futuristic: { description: "Forward-thinking and innovative. Confident about the future.", examples: ["The future is already here.", "Beyond today's limits."] }
};


// ========== HELPER FUNCTIONS ==========
function pick(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function pickMultiple(array, count) {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function getContrastColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#1a1a1a' : '#ffffff';
}

// Get the best light color from a palette (for text on dark backgrounds)
function getLightColor(colors) {
    // Find the color with highest luminance
    let lightest = colors[0];
    let maxLuminance = 0;
    
    colors.forEach(color => {
        const r = parseInt(color.hex.slice(1, 3), 16);
        const g = parseInt(color.hex.slice(3, 5), 16);
        const b = parseInt(color.hex.slice(5, 7), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        if (luminance > maxLuminance) {
            maxLuminance = luminance;
            lightest = color;
        }
    });
    
    return lightest.hex;
}

// Get the best dark color from a palette (for text on light backgrounds)
function getDarkColor(colors) {
    // Find the color with lowest luminance
    let darkest = colors[0];
    let minLuminance = 1;
    
    colors.forEach(color => {
        const r = parseInt(color.hex.slice(1, 3), 16);
        const g = parseInt(color.hex.slice(3, 5), 16);
        const b = parseInt(color.hex.slice(5, 7), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        if (luminance < minLuminance) {
            minLuminance = luminance;
            darkest = color;
        }
    });
    
    // If the darkest color is still too light (luminance > 0.4), return a dark fallback
    if (minLuminance > 0.4) {
        return '#2d2d2d';
    }
    
    return darkest.hex;
}

// ========== BRAND GENERATION ==========
function generateBrand() {
    const { colorMood, industry, personality, audience } = userSelections;
    
    // Generate each section (skip if locked)
    const brand = {};
    
    // Brand Name
    if (!lockedSections.has('name')) {
        const names = BRAND_NAMES[industry] || BRAND_NAMES.creative;
        brand.name = pick(names) + pick(BRAND_SUFFIXES);
        brand.tagline = pick(TAGLINE_TEMPLATES[personality] || TAGLINE_TEMPLATES.friendly);
    } else {
        brand.name = currentBrand.name;
        brand.tagline = currentBrand.tagline;
    }
    
    // Color Palette
    if (!lockedSections.has('palette')) {
        const palettes = COLOR_PALETTES[colorMood] || COLOR_PALETTES.muted;
        brand.colors = pick(palettes);
    } else {
        brand.colors = currentBrand.colors;
    }
    
    // Typography
    if (!lockedSections.has('typography')) {
        const fonts = FONT_PAIRINGS[personality] || FONT_PAIRINGS.friendly;
        brand.typography = pick(fonts);
    } else {
        brand.typography = currentBrand.typography;
    }
    
    // Mood Words
    if (!lockedSections.has('mood')) {
        const colorWords = MOOD_WORDS[colorMood] || MOOD_WORDS.muted;
        const personalityWords = PERSONALITY_WORDS[personality] || PERSONALITY_WORDS.friendly;
        brand.moodWords = [
            ...pickMultiple(colorWords, 2),
            ...pickMultiple(personalityWords, 2)
        ];
    } else {
        brand.moodWords = currentBrand.moodWords;
    }
    
    // Logo Style
    if (!lockedSections.has('logo')) {
        brand.logoStyle = LOGO_STYLES[personality] || LOGO_STYLES.friendly;
    } else {
        brand.logoStyle = currentBrand.logoStyle;
    }
    
    // Photography Style
    if (!lockedSections.has('photo')) {
        brand.photoStyle = PHOTO_STYLES[personality] || PHOTO_STYLES.friendly;
    } else {
        brand.photoStyle = currentBrand.photoStyle;
    }
    
    // Texture
    if (!lockedSections.has('texture')) {
        const textures = TEXTURES[personality] || TEXTURES.friendly;
        brand.texture = pick(textures);
    } else {
        brand.texture = currentBrand.texture;
    }
    
    // Voice Style
    if (!lockedSections.has('tagline')) {
        brand.voiceStyle = VOICE_STYLES[personality] || VOICE_STYLES.friendly;
    } else {
        brand.voiceStyle = currentBrand.voiceStyle;
    }
    
    return brand;
}

// ========== DYNAMIC FONT LOADING ==========
function loadBrandFonts(headingFont, bodyFont) {
    const fontsToLoad = [headingFont, bodyFont].filter(f => f);
    const fontFamilies = fontsToLoad.map(f => f.replace(/ /g, '+')).join('&family=');
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamilies}:wght@300;400;500;600;700&display=swap`;
    
    const linkEl = document.getElementById('dynamic-fonts');
    if (linkEl) {
        linkEl.href = fontUrl;
    }
}

// ========== LIVING BRAND RENDERING ==========

// ========== DASHBOARD RENDERING ==========
function renderBrand(brand) {
    currentBrand = brand;
    const personality = userSelections.personality;
    
    // Load the actual fonts
    loadBrandFonts(brand.typography.heading, brand.typography.body);
    
    // Set CSS variables for brand colors
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', brand.colors[0].hex);
    root.style.setProperty('--brand-secondary', brand.colors[1].hex);
    root.style.setProperty('--brand-accent', brand.colors[4]?.hex || brand.colors[2].hex);
    root.style.setProperty('--brand-light', getLightColor(brand.colors));
    root.style.setProperty('--brand-dark', getDarkColor(brand.colors));
    
    // Determine text colors based on primary color luminance
    const textColor = getContrastColor(brand.colors[0].hex);
    const textColorDark = getDarkColor(brand.colors);
    root.style.setProperty('--brand-text', textColor);
    root.style.setProperty('--brand-text-dark', textColorDark);
    
    // Set dashboard background gradient
    const dashboard = document.getElementById('dashboard');
    dashboard.style.background = `
        linear-gradient(135deg, 
            ${brand.colors[0].hex} 0%, 
            ${brand.colors[1].hex} 35%,
            ${brand.colors[2].hex} 65%,
            ${brand.colors[3]?.hex || brand.colors[1].hex} 100%)
    `;
    dashboard.style.color = textColorDark;
    
    // ===== BRAND NAME & TAGLINE =====
    const brandNameEl = document.getElementById('brand-name');
    brandNameEl.textContent = brand.name;
    brandNameEl.style.fontFamily = `'${brand.typography.heading}', serif`;
    brandNameEl.style.color = textColorDark;
    
    const taglineEl = document.getElementById('brand-tagline');
    taglineEl.textContent = brand.tagline;
    taglineEl.style.fontFamily = `'${brand.typography.body}', sans-serif`;
    taglineEl.style.color = textColorDark;
    
    // ===== COLOR PALETTE WITH HEX CODES =====
    const paletteContainer = document.getElementById('dash-palette');
    paletteContainer.innerHTML = '';
    brand.colors.forEach(color => {
        const colorItem = document.createElement('div');
        colorItem.className = 'dash-color-item';
        
        const swatch = document.createElement('div');
        swatch.className = 'dash-color-swatch';
        swatch.style.background = color.hex;
        swatch.title = `Click to copy ${color.hex}`;
        swatch.onclick = () => {
            navigator.clipboard.writeText(color.hex);
            swatch.style.transform = 'scale(1.2)';
            setTimeout(() => swatch.style.transform = '', 200);
        };
        
        const hexCode = document.createElement('span');
        hexCode.className = 'dash-color-hex';
        hexCode.textContent = color.hex;
        
        const colorName = document.createElement('span');
        colorName.className = 'dash-color-name';
        colorName.textContent = color.name;
        
        colorItem.appendChild(swatch);
        colorItem.appendChild(hexCode);
        colorItem.appendChild(colorName);
        paletteContainer.appendChild(colorItem);
    });
    
    // ===== TYPOGRAPHY =====
    const headingFontEl = document.getElementById('dash-heading-font');
    const bodyFontEl = document.getElementById('dash-body-font');
    const headingSampleEl = document.getElementById('dash-heading-sample');
    const bodySampleEl = document.getElementById('dash-body-sample');
    
    headingFontEl.textContent = brand.typography.heading;
    headingFontEl.style.fontFamily = `'${brand.typography.heading}', serif`;
    headingSampleEl.style.fontFamily = `'${brand.typography.heading}', serif`;
    
    bodyFontEl.textContent = brand.typography.body;
    bodyFontEl.style.fontFamily = `'${brand.typography.body}', sans-serif`;
    bodySampleEl.style.fontFamily = `'${brand.typography.body}', sans-serif`;
    
    // ===== ABOUT SECTION =====
    const aboutHeadline = getIndustryContent(userSelections.industry, 'aboutHeadline');
    const aboutText = getIndustryContent(userSelections.industry, 'aboutText');
    
    document.getElementById('dash-about-headline').textContent = aboutHeadline;
    document.getElementById('dash-about-headline').style.fontFamily = `'${brand.typography.heading}', serif`;
    document.getElementById('dash-about-text').textContent = aboutText;
    
    // Core values
    const valuesContainer = document.getElementById('dash-values-list');
    valuesContainer.innerHTML = '';
    const coreValues = getCoreValues(personality, userSelections.industry);
    coreValues.forEach(value => {
        const valueEl = document.createElement('span');
        valueEl.className = 'dash-value-item';
        valueEl.textContent = value;
        valuesContainer.appendChild(valueEl);
    });
    
    // ===== PERSONALITY SECTION =====
    document.getElementById('dash-personality-badge').textContent = personality;
    document.getElementById('dash-personality-desc').textContent = getPersonalityDescription(personality);
    
    // Mood words
    const moodContainer = document.getElementById('dash-mood-words');
    moodContainer.innerHTML = '';
    brand.moodWords.forEach(word => {
        const wordEl = document.createElement('span');
        wordEl.className = 'dash-mood-word';
        wordEl.textContent = word;
        moodContainer.appendChild(wordEl);
    });
    
    // Personality traits
    const traitsContainer = document.getElementById('dash-traits-list');
    traitsContainer.innerHTML = '';
    const traits = getPersonalityTraits(personality);
    traits.forEach(trait => {
        const traitEl = document.createElement('span');
        traitEl.className = 'dash-trait-item';
        traitEl.textContent = trait;
        traitsContainer.appendChild(traitEl);
    });
    
    // ===== VOICE SECTION =====
    document.getElementById('dash-voice-tone').textContent = brand.voiceStyle.tone || getVoiceTone(personality);
    document.getElementById('dash-voice-text').textContent = brand.voiceStyle.description;
    
    // Voice example phrases
    const phrasesContainer = document.getElementById('dash-voice-phrases');
    phrasesContainer.innerHTML = '';
    const examplePhrases = getVoiceExamples(personality, userSelections.industry);
    examplePhrases.forEach(phrase => {
        const li = document.createElement('li');
        li.textContent = phrase;
        phrasesContainer.appendChild(li);
    });
    
    // Voice things to avoid
    const avoidContainer = document.getElementById('dash-voice-avoid');
    avoidContainer.innerHTML = '';
    const avoidList = getVoiceAvoid(personality);
    avoidList.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        avoidContainer.appendChild(li);
    });
    
    // ===== LOGO DIRECTION =====
    document.getElementById('dash-logo-desc').textContent = brand.logoStyle.description;
    const logoKeywordsContainer = document.getElementById('dash-logo-keywords');
    logoKeywordsContainer.innerHTML = '';
    brand.logoStyle.keywords.forEach(keyword => {
        const keywordEl = document.createElement('span');
        keywordEl.className = 'dash-logo-keyword';
        keywordEl.textContent = keyword;
        logoKeywordsContainer.appendChild(keywordEl);
    });
    
    // ===== PHOTOGRAPHY =====
    document.getElementById('dash-photo-desc').textContent = brand.photoStyle;
    
    // ===== DECORATIVE SHAPES =====
    createDecorativeShapes(brand.colors, personality);
}

// Helper function: Get core values based on personality and industry
function getCoreValues(personality, industry) {
    const valuesByPersonality = {
        playful: ['Joy', 'Creativity', 'Fun', 'Connection'],
        minimalist: ['Simplicity', 'Clarity', 'Quality', 'Purpose'],
        sophisticated: ['Excellence', 'Refinement', 'Trust', 'Timelessness'],
        friendly: ['Warmth', 'Care', 'Community', 'Support'],
        bold: ['Innovation', 'Courage', 'Impact', 'Leadership'],
        organic: ['Sustainability', 'Authenticity', 'Nature', 'Wellness'],
        retro: ['Heritage', 'Nostalgia', 'Character', 'Craftsmanship'],
        futuristic: ['Innovation', 'Progress', 'Vision', 'Technology']
    };
    return valuesByPersonality[personality] || valuesByPersonality.friendly;
}

// Helper function: Get personality description
function getPersonalityDescription(personality) {
    const descriptions = {
        playful: 'Your brand radiates joy and creativity. You connect with your audience through humor, whimsy, and a sense of wonder that makes every interaction memorable.',
        minimalist: 'Your brand speaks through restraint and intention. Every element serves a purpose, creating a sense of calm sophistication that lets quality shine through.',
        sophisticated: 'Your brand exudes refined elegance and timeless appeal. You attract discerning customers who appreciate attention to detail and understated luxury.',
        friendly: 'Your brand feels like a trusted friend. Approachable and genuine, you create warm connections that make people feel welcome and understood.',
        bold: 'Your brand commands attention and inspires action. You\'re not afraid to stand out, challenge conventions, and lead your industry with confidence.',
        organic: 'Your brand embodies natural beauty and conscious living. You connect with those who value authenticity, sustainability, and harmony with nature.',
        retro: 'Your brand celebrates timeless style with a nostalgic twist. You blend classic charm with modern sensibility, creating something both familiar and fresh.',
        futuristic: 'Your brand pushes boundaries and imagines what\'s next. You appeal to forward-thinkers who are excited by innovation and new possibilities.'
    };
    return descriptions[personality] || descriptions.friendly;
}

// Helper function: Get personality traits
function getPersonalityTraits(personality) {
    const traits = {
        playful: ['Energetic', 'Spontaneous', 'Optimistic', 'Imaginative', 'Approachable'],
        minimalist: ['Clean', 'Focused', 'Intentional', 'Elegant', 'Efficient'],
        sophisticated: ['Refined', 'Polished', 'Exclusive', 'Cultured', 'Prestigious'],
        friendly: ['Warm', 'Genuine', 'Helpful', 'Reliable', 'Caring'],
        bold: ['Confident', 'Dynamic', 'Fearless', 'Ambitious', 'Impactful'],
        organic: ['Natural', 'Earthy', 'Mindful', 'Holistic', 'Sustainable'],
        retro: ['Classic', 'Charming', 'Authentic', 'Nostalgic', 'Distinctive'],
        futuristic: ['Innovative', 'Visionary', 'Cutting-edge', 'Progressive', 'Tech-forward']
    };
    return traits[personality] || traits.friendly;
}

// Helper function: Get voice tone
function getVoiceTone(personality) {
    const tones = {
        playful: 'Fun & Enthusiastic',
        minimalist: 'Clear & Intentional',
        sophisticated: 'Refined & Eloquent',
        friendly: 'Warm & Conversational',
        bold: 'Confident & Direct',
        organic: 'Gentle & Authentic',
        retro: 'Charming & Nostalgic',
        futuristic: 'Smart & Visionary'
    };
    return tones[personality] || tones.friendly;
}

// Helper function: Get voice example phrases
function getVoiceExamples(personality, industry) {
    const examples = {
        playful: ['Let\'s make something amazing together!', 'Ready for an adventure?', 'Life\'s too short for boring.'],
        minimalist: ['Less, but better.', 'Designed with intention.', 'Simply exceptional.'],
        sophisticated: ['Excellence is in the details.', 'For those who appreciate the finer things.', 'Timeless by design.'],
        friendly: ['We\'re here to help!', 'You\'ve got this, and we\'ve got you.', 'Welcome to the family.'],
        bold: ['Lead the change.', 'No limits. No compromises.', 'Make your mark.'],
        organic: ['Rooted in nature.', 'Good for you, good for the earth.', 'Naturally beautiful.'],
        retro: ['Some things never go out of style.', 'Made the way it used to be.', 'Classic never fades.'],
        futuristic: ['The future starts now.', 'Ahead of the curve.', 'Innovation in action.']
    };
    return examples[personality] || examples.friendly;
}

// Helper function: Get things to avoid in voice
function getVoiceAvoid(personality) {
    const avoid = {
        playful: ['Being too serious', 'Corporate jargon', 'Negative language'],
        minimalist: ['Unnecessary words', 'Cluttered messaging', 'Over-explaining'],
        sophisticated: ['Casual slang', 'Exclamation marks', 'Trendy buzzwords'],
        friendly: ['Cold formality', 'Technical jargon', 'Pushy sales talk'],
        bold: ['Wishy-washy language', 'Apologetic tone', 'Playing it safe'],
        organic: ['Artificial claims', 'Aggressive selling', 'Chemical terminology'],
        retro: ['Overly modern slang', 'Tech-heavy language', 'Disposable trends'],
        futuristic: ['Outdated references', 'Conservative messaging', 'Fear of change']
    };
    return avoid[personality] || avoid.friendly;
}



// Render the brand details side panel
function renderDetailsPanel(brand) {
    // Check if panel elements exist (they don't in dashboard layout)
    const paletteDisplay = document.getElementById('palette-display');
    if (!paletteDisplay) return;
    
    // Color Palette
    paletteDisplay.innerHTML = '';
    brand.colors.forEach(color => {
        const colorEl = document.createElement('div');
        colorEl.className = 'palette-color';
        colorEl.innerHTML = `
            <div class="color-swatch" style="background: ${color.hex}"></div>
            <div class="color-info">
                <span class="color-name">${color.name}</span>
                <span class="color-hex">${color.hex}</span>
            </div>
        `;
        paletteDisplay.appendChild(colorEl);
    });
    
    // Typography
    document.getElementById('heading-name').textContent = brand.typography.heading;
    document.getElementById('body-name').textContent = brand.typography.body;
    
    // Mood Words
    const moodWordsEl = document.getElementById('mood-words');
    moodWordsEl.innerHTML = '';
    brand.moodWords.forEach(word => {
        const wordEl = document.createElement('span');
        wordEl.className = 'mood-word';
        wordEl.textContent = word;
        moodWordsEl.appendChild(wordEl);
    });
    
    // Logo Style
    document.getElementById('logo-keywords').textContent = brand.logoStyle.keywords.join(' • ');
    document.getElementById('logo-description').textContent = brand.logoStyle.description;
    
    // Photography Style
    document.getElementById('photo-description').textContent = brand.photoStyle;
    
    // Voice Style
    document.getElementById('voice-description').textContent = brand.voiceStyle.description;
}

// Render the brand specifications section (compact version)
function renderSpecsSection(brand) {
    // Check if spec elements exist (they don't in dashboard layout)
    const specPalette = document.getElementById('spec-palette');
    if (!specPalette) return;
    
    // Color swatches (horizontal)
    specPalette.innerHTML = '';
    brand.colors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.className = 'spec-color-swatch';
        swatch.style.background = color.hex;
        swatch.setAttribute('data-hex', color.hex);
        swatch.title = `${color.name} - Click to copy`;
        swatch.addEventListener('click', () => {
            navigator.clipboard.writeText(color.hex);
            swatch.style.transform = 'scale(1.3)';
            setTimeout(() => {
                swatch.style.transform = '';
            }, 200);
        });
        specPalette.appendChild(swatch);
    });
    
    // Typography
    document.getElementById('spec-heading-font').textContent = brand.typography.heading;
    document.getElementById('spec-body-font').textContent = brand.typography.body;
    
    // Mood Words
    const specMoodWords = document.getElementById('spec-mood-words');
    specMoodWords.innerHTML = '';
    brand.moodWords.forEach(word => {
        const wordEl = document.createElement('span');
        wordEl.className = 'spec-mood-word';
        wordEl.textContent = word;
        specMoodWords.appendChild(wordEl);
    });
    
    // Logo Direction (in details)
    document.getElementById('spec-logo-keywords').textContent = brand.logoStyle.keywords.join(' • ');
    
    // Photography Style (in details)
    document.getElementById('spec-photo-desc').textContent = brand.photoStyle;
    
    // Voice Style (in details)
    document.getElementById('spec-voice-desc').textContent = brand.voiceStyle.description;
}

// Render floating color bar
function renderFloatingColorBar(brand) {
    const swatchesContainer = document.getElementById('color-bar-swatches');
    if (!swatchesContainer) return;
    
    swatchesContainer.innerHTML = '';
    
    brand.colors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.className = 'color-bar-swatch';
        swatch.style.background = color.hex;
        swatch.title = `${color.name} - ${color.hex}`;
        swatch.addEventListener('click', () => {
            navigator.clipboard.writeText(color.hex);
            swatch.style.transform = 'scale(1.3)';
            setTimeout(() => {
                swatch.style.transform = '';
            }, 200);
        });
        swatchesContainer.appendChild(swatch);
    });
    
    // Update fonts display
    const fontsEl = document.getElementById('color-bar-fonts');
    if (fontsEl) fontsEl.textContent = `${brand.typography.heading} + ${brand.typography.body}`;
}

// Create floating decorative shapes based on personality
function createDecorativeShapes(colors, personality) {
    const container = document.getElementById('decorative-shapes');
    container.innerHTML = '';
    
    // Shape configurations per personality
    const shapeConfigs = {
        playful: { shapes: ['circle', 'star', 'square'], count: 15, sizeRange: [20, 80] },
        minimalist: { shapes: ['square'], count: 5, sizeRange: [1, 1] }, // Lines
        sophisticated: { shapes: ['circle'], count: 20, sizeRange: [3, 6] },
        friendly: { shapes: ['circle', 'blob'], count: 10, sizeRange: [40, 100] },
        bold: { shapes: ['square', 'triangle'], count: 12, sizeRange: [30, 70] },
        organic: { shapes: ['blob', 'leaf'], count: 10, sizeRange: [50, 150] },
        retro: { shapes: ['circle'], count: 25, sizeRange: [10, 40] },
        futuristic: { shapes: ['hexagon', 'square'], count: 15, sizeRange: [5, 15] }
    };
    
    const config = shapeConfigs[personality] || shapeConfigs.friendly;
    
    for (let i = 0; i < config.count; i++) {
        const shape = document.createElement('div');
        const shapeType = pick(config.shapes);
        const size = config.sizeRange[0] + Math.random() * (config.sizeRange[1] - config.sizeRange[0]);
        
        shape.className = `floating-shape shape-${shapeType}`;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.background = colors[i % colors.length].hex;
        shape.style.animationDelay = `${Math.random() * 10}s`;
        shape.style.animationDuration = `${15 + Math.random() * 15}s`;
        
        container.appendChild(shape);
    }
}

// ========== AMBIENT PARTICLES ==========
function createAmbientParticles() {
    const container = document.getElementById('ambient-particles');
    if (!container) return;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'ambient-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${18 + Math.random() * 12}s`;
        container.appendChild(particle);
    }
}

// ========== SCREEN MANAGEMENT ==========
function showScreen(screenId) {
    const landingScreen = document.getElementById('landing-screen');
    const resultScreen = document.getElementById('result-screen');
    
    if (screenId === 'result-screen') {
        // Add exiting class to landing screen
        landingScreen.classList.add('exiting');
        
        // After animation, switch screens
        setTimeout(() => {
            window.scrollTo(0, 0);
            landingScreen.classList.remove('active', 'exiting');
            resultScreen.classList.add('active');
            document.body.classList.add('brand-active');
            
            // Initialize micro-interactions
            initMicroInteractions();
        }, 500);
        
    } else if (screenId === 'landing-screen') {
        // Remove brand styling
        document.body.classList.remove('brand-active');
        document.body.className = document.body.className.replace(/personality-\w+/g, '');
        
        // Close details panel if open
        const detailsPanel = document.getElementById('brand-details-panel');
        if (detailsPanel) detailsPanel.classList.remove('open');
        
        // Fade out result screen
        resultScreen.classList.remove('active');
        
        setTimeout(() => {
            window.scrollTo(0, 0);
            landingScreen.classList.add('active');
        }, 300);
    }
}

// ========== FLOATING COLOR BAR VISIBILITY ==========
function initFloatingBarVisibility() {
    const floatingBar = document.getElementById('floating-color-bar');
    const specsSection = document.getElementById('specs-section');
    
    if (!floatingBar || !specsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                floatingBar.classList.add('at-specs');
            } else {
                floatingBar.classList.remove('at-specs');
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(specsSection);
}

// Scroll to specs section
function scrollToSpecs() {
    const specsSection = document.getElementById('specs-section');
    if (specsSection) {
        specsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========== COPY ALL SPECS ==========
function copyAllSpecs() {
    if (!currentBrand) return;
    
    const specs = `
═══════════════════════════════════
    ${currentBrand.name.toUpperCase()}
    "${currentBrand.tagline}"
═══════════════════════════════════

COLOR PALETTE
${currentBrand.colors.map(c => `  ${c.name}: ${c.hex}`).join('\n')}

TYPOGRAPHY
  Headings: ${currentBrand.typography.heading}
  Body: ${currentBrand.typography.body}

BRAND ESSENCE
  ${currentBrand.moodWords.join(' • ')}

LOGO DIRECTION
  ${currentBrand.logoStyle.keywords.join(' • ')}
  ${currentBrand.logoStyle.description}

PHOTOGRAPHY STYLE
  ${currentBrand.photoStyle}

VOICE & TONE
  ${currentBrand.voiceStyle.description}

═══════════════════════════════════
Created with Bloom & Brand
https://mg175.github.io/mood-bored/creative/
═══════════════════════════════════
`.trim();

    navigator.clipboard.writeText(specs).then(() => {
        const btn = document.getElementById('copy-specs-btn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

// ========== LOADING STATE ==========
function showLoading() {
    const loader = document.getElementById('brand-loading');
    if (loader) {
        loader.classList.remove('fade-out');
        loader.style.background = currentBrand?.colors?.[0]?.hex || '#4a7c4a';
    }
}

function hideLoading() {
    const loader = document.getElementById('brand-loading');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 800); // Give fonts time to load
    }
}

// ========== PANEL MANAGEMENT ==========
function openPanel() {
    const panel = document.getElementById('brand-details-panel');
    const overlay = document.getElementById('panel-overlay');
    if (panel) panel.classList.add('open');
    if (overlay) overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closePanel() {
    const panel = document.getElementById('brand-details-panel');
    const overlay = document.getElementById('panel-overlay');
    if (panel) panel.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
    document.body.style.overflow = '';
}

// ========== KEYBOARD NAVIGATION ==========
function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        // Escape to close panel
        if (e.key === 'Escape') {
            closePanel();
        }
        
        // R to regenerate (when panel is closed and on result screen)
        if (e.key === 'r' && !document.getElementById('brand-details-panel').classList.contains('open')) {
            if (document.body.classList.contains('brand-active')) {
                triggerRegenerate();
            }
        }
    });
}

// ========== ENHANCED REGENERATE ==========
function triggerRegenerate() {
    const resultScreen = document.getElementById('result-screen');
    resultScreen.classList.add('regenerating');
    
    setTimeout(() => {
        const brand = generateBrand();
        renderBrand(brand);
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        setTimeout(() => {
            resultScreen.classList.remove('regenerating');
        }, 600);
    }, 300);
}

// ========== COPY ALL COLORS ==========
function copyAllColors() {
    if (!currentBrand?.colors) return;
    
    const colorText = currentBrand.colors
        .map(c => `${c.name}: ${c.hex}`)
        .join('\n');
    
    navigator.clipboard.writeText(colorText).then(() => {
        const btn = document.getElementById('copy-all-colors');
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied All!';
        btn.style.background = 'var(--brand-primary)';
        btn.style.color = 'white';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    });
}

// ========== INDUSTRY-SPECIFIC CONTENT ==========
const INDUSTRY_CONTENT = {
    tech: {
        aboutHeadlines: ['Innovation at our core.', 'Building the future.', 'Technology with purpose.'],
        aboutTexts: [
            'We create digital experiences that transform how people work and live. Our commitment to innovation drives everything we do.',
            'From concept to code, we build solutions that make a difference. Technology should empower, not complicate.',
            'We believe in the power of technology to solve real problems. Simple, elegant, effective.'
        ],
        ctaSubtext: 'Join thousands of teams already transforming their workflow.'
    },
    food: {
        aboutHeadlines: ['Crafted with passion.', 'Flavor is everything.', 'From our kitchen to yours.'],
        aboutTexts: [
            'Every recipe tells a story. We source the finest ingredients and prepare them with the care they deserve.',
            'Good food brings people together. That\'s why we pour our hearts into every dish, every day.',
            'Taste the difference that quality makes. Fresh ingredients, traditional techniques, unforgettable flavors.'
        ],
        ctaSubtext: 'Join our community of food lovers.'
    },
    fashion: {
        aboutHeadlines: ['Style without compromise.', 'Wear your story.', 'Fashion forward, always.'],
        aboutTexts: [
            'We design for those who dare to express themselves. Every piece is crafted to make you feel extraordinary.',
            'Fashion is personal. We create pieces that let your unique style shine through.',
            'Quality materials, timeless design, modern sensibility. Clothing that moves with you.'
        ],
        ctaSubtext: 'Discover your new favorite pieces.'
    },
    home: {
        aboutHeadlines: ['Make it yours.', 'Home is where the heart is.', 'Living beautifully.'],
        aboutTexts: [
            'Your space should reflect who you are. We create pieces that transform houses into homes.',
            'Thoughtful design for everyday living. Comfort meets style in everything we make.',
            'From the living room to the bedroom, we help you create spaces you\'ll love coming home to.'
        ],
        ctaSubtext: 'Start transforming your space today.'
    },
    health: {
        aboutHeadlines: ['Wellness redefined.', 'Your health journey starts here.', 'Feel your best.'],
        aboutTexts: [
            'We believe everyone deserves to feel amazing. Our approach combines science with care.',
            'Health is holistic. We support your journey with products and guidance that actually work.',
            'Real results, real people, real transformation. Join us on the path to wellness.'
        ],
        ctaSubtext: 'Start your wellness journey today.'
    },
    beauty: {
        aboutHeadlines: ['Beauty in every detail.', 'Glow from within.', 'Your skin, perfected.'],
        aboutTexts: [
            'We believe in beauty that enhances, not masks. Clean formulas, visible results, confidence restored.',
            'Self-care is not selfish. Our products are rituals that help you feel your absolute best.',
            'Skincare backed by science, inspired by nature. Discover what works for you.'
        ],
        ctaSubtext: 'Discover your perfect routine.'
    },
    finance: {
        aboutHeadlines: ['Your financial future.', 'Money made simple.', 'Invest in tomorrow.'],
        aboutTexts: [
            'Financial freedom is possible. We provide the tools and expertise to help you get there.',
            'Complex problems, simple solutions. We cut through the jargon to help you make smart decisions.',
            'Your money should work as hard as you do. Let us show you how.'
        ],
        ctaSubtext: 'Take control of your finances today.'
    },
    kids: {
        aboutHeadlines: ['Made for little ones.', 'Childhood magic.', 'Growing up happy.'],
        aboutTexts: [
            'Kids deserve the best. We create products that are safe, fun, and built to last through every adventure.',
            'Imagination has no limits. Our products inspire creativity and bring joy to families everywhere.',
            'Parenting is hard enough. We make it easier with thoughtful products that kids love and parents trust.'
        ],
        ctaSubtext: 'Join families who trust us.'
    },
    outdoor: {
        aboutHeadlines: ['Adventure awaits.', 'Built for the wild.', 'Explore without limits.'],
        aboutTexts: [
            'The great outdoors is calling. We build gear that performs when it matters most.',
            'From mountain peaks to forest trails, our products are tested in the places you love.',
            'Adventure is out there. We just help you get there safely and in style.'
        ],
        ctaSubtext: 'Gear up for your next adventure.'
    },
    creative: {
        aboutHeadlines: ['Create without limits.', 'Art is our language.', 'Imagination unleashed.'],
        aboutTexts: [
            'Creativity lives here. We build tools and spaces that help you bring your vision to life.',
            'Every artist needs the right tools. We provide them, you provide the magic.',
            'Where others see blank canvases, we see infinite possibilities. Let\'s create together.'
        ],
        ctaSubtext: 'Start creating today.'
    }
};

// Update renderBrand to use industry content
function getIndustryContent(industry, type) {
    const content = INDUSTRY_CONTENT[industry] || INDUSTRY_CONTENT.creative;
    
    switch(type) {
        case 'aboutHeadline':
            return pick(content.aboutHeadlines);
        case 'aboutText':
            return pick(content.aboutTexts);
        case 'ctaSubtext':
            return content.ctaSubtext;
        default:
            return '';
    }
}

// ========== MICRO-INTERACTIONS ==========

// Custom cursor
let cursor = null;
let cursorTrails = [];
const trailCount = 5;

function initCustomCursor() {
    // Only on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;
    
    // Create main cursor
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Create trail elements
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = (trailCount - i) / trailCount * 0.3;
        trail.style.transform = 'scale(' + (trailCount - i) / trailCount + ')';
        document.body.appendChild(trail);
        cursorTrails.push({ el: trail, x: 0, y: 0 });
    }
    
    // Track mouse position
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Move main cursor
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Animate trail
    function animateTrail() {
        let x = mouseX, y = mouseY;
        
        cursorTrails.forEach((trail, i) => {
            const nextX = x;
            const nextY = y;
            
            trail.x += (nextX - trail.x) * (0.3 - i * 0.04);
            trail.y += (nextY - trail.y) * (0.3 - i * 0.04);
            
            trail.el.style.left = trail.x + 'px';
            trail.el.style.top = trail.y + 'px';
            
            x = trail.x;
            y = trail.y;
        });
        
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
    
    // Hover states
    const hoverTargets = 'a, button, .feature-card, .nav-item, .palette-color, .control-btn';
    
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
    
    // Click state
    document.addEventListener('mousedown', () => cursor.classList.add('cursor-click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('cursor-click'));
}

// Scroll progress bar
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        if (!document.body.classList.contains('brand-active')) {
            progressBar.style.transform = 'scaleX(0)';
            return;
        }
        
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollTop / docHeight;
        
        progressBar.style.transform = `scaleX(${progress})`;
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.brand-section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe stagger children containers
    document.querySelectorAll('.stagger-children').forEach(container => {
        observer.observe(container);
    });
}

// Magnetic button effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.hero-cta, .cta-button');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Ripple effect on buttons
function initRippleEffect() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.hero-cta, .cta-button, .control-btn');
        if (!btn) return;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        btn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
}

// Copy color hex on click
function initColorCopy() {
    document.addEventListener('click', (e) => {
        const colorEl = e.target.closest('.palette-color');
        if (!colorEl) return;
        
        const hex = colorEl.querySelector('.color-hex')?.textContent;
        if (!hex) return;
        
        navigator.clipboard.writeText(hex).then(() => {
            colorEl.classList.add('copied');
            
            // Add feedback text if not exists
            if (!colorEl.querySelector('.copy-feedback')) {
                const feedback = document.createElement('span');
                feedback.className = 'copy-feedback';
                feedback.textContent = 'Copied!';
                colorEl.appendChild(feedback);
            }
            
            setTimeout(() => colorEl.classList.remove('copied'), 1500);
        });
    });
}

// Parallax effect on scroll
function initParallax() {
    const parallaxElements = document.querySelectorAll('.visual-block, .floating-shape');
    
    window.addEventListener('scroll', () => {
        if (!document.body.classList.contains('brand-active')) return;
        
        const scrollY = window.scrollY;
        
        parallaxElements.forEach((el, i) => {
            const speed = 0.05 + (i % 3) * 0.02;
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Text scramble effect for brand name
function scrambleText(element, finalText, duration = 1000) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const iterations = 10;
    const interval = duration / iterations;
    let i = 0;
    
    const scramble = setInterval(() => {
        element.textContent = finalText
            .split('')
            .map((char, index) => {
                if (index < i) return finalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        if (i >= finalText.length) {
            clearInterval(scramble);
            element.textContent = finalText;
        }
        
        i += finalText.length / iterations;
    }, interval);
}

// Initialize all micro-interactions when brand is shown
function initMicroInteractions() {
    // Small delay to let DOM update
    setTimeout(() => {
        initScrollAnimations();
        initMagneticButtons();
        initRippleEffect();
        initColorCopy();
        initParallax();
        initFloatingBarVisibility();
        
        // Scramble effect for brand name (optional - personality based)
        const personality = userSelections.personality;
        if (personality === 'futuristic' || personality === 'bold') {
            const brandName = document.getElementById('brand-name');
            const name = brandName.textContent;
            scrambleText(brandName, name, 800);
        }
    }, 100);
}

// ========== SHARE FUNCTIONALITY ==========
function shareBrand() {
    const brand = currentBrand;
    
    const shareText = `✿ ${brand.name} ✿

Brand Essence: ${brand.moodWords.join(' • ')}

"${brand.tagline}"

Color Palette:
${brand.colors.map(c => `${c.name} ${c.hex}`).join('\n')}

Typography: ${brand.typography.heading} + ${brand.typography.body}

Created with 🌱 Bloom & Brand
https://mg175.github.io/mood-bored/creative/`;

    if (navigator.share) {
        navigator.share({
            title: `${brand.name} - Brand Board`,
            text: shareText
        }).catch(() => copyToClipboard(shareText));
    } else {
        copyToClipboard(shareText);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('share-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Copied!';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
    });
}

// ========== PDF EXPORT ==========
function exportPDF() {
    window.print();
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', () => {
    createAmbientParticles();
    initCustomCursor();
    initScrollProgress();
    initKeyboardNav();
    
    // Selection dropdowns with indicator updates
    const selects = ['color-mood', 'industry', 'personality', 'audience'];
    const indicators = ['ind-1', 'ind-2', 'ind-3', 'ind-4'];
    
    selects.forEach((id, index) => {
        const el = document.getElementById(id);
        if (!el) return;
        
        el.addEventListener('change', (e) => {
            const keyMap = {
                'color-mood': 'colorMood',
                'industry': 'industry', 
                'personality': 'personality',
                'audience': 'audience'
            };
            userSelections[keyMap[id]] = e.target.value || null;
            
            // Update station state
            e.target.closest('.ingredient-station').classList.toggle('selected', !!e.target.value);
            
            // Update indicator
            const indicator = document.getElementById(indicators[index]);
            if (indicator) {
                indicator.classList.toggle('active', !!e.target.value);
            }
            
            // Check if all selected
            const allSelected = Object.values(userSelections).every(v => v);
            document.getElementById('grow-btn').disabled = !allSelected;
            
            // Update status text
            const statusText = document.getElementById('synthesis-status');
            if (statusText) {
                const count = Object.values(userSelections).filter(v => v).length;
                if (allSelected) {
                    statusText.textContent = 'Ready to synthesize';
                } else {
                    statusText.textContent = `${4 - count} ingredient${4 - count !== 1 ? 's' : ''} remaining`;
                }
            }
        });
    });
    
    // Synthesize button
    const growBtn = document.getElementById('grow-btn');
    growBtn.addEventListener('click', () => {
        const btn = document.getElementById('grow-btn');
        
        // Add animation
        btn.classList.add('blooming');
        
        // Generate brand while animation plays
        const brand = generateBrand();
        renderBrand(brand);
        
        // Show loading
        showLoading();
        
        // Wait for animation, then transition
        setTimeout(() => {
            showScreen('result-screen');
            btn.classList.remove('blooming');
            
            // Hide loading after fonts load
            hideLoading();
        }, 600);
    });
    
    // Back button
    document.getElementById('back-btn').addEventListener('click', () => {
        closePanel();
        showScreen('landing-screen');
    });
    
    // Regenerate button
    document.getElementById('regenerate-btn').addEventListener('click', triggerRegenerate);
    
    // These elements may not exist in dashboard layout - add safely
    const toggleDetailsBtn = document.getElementById('toggle-details-btn');
    if (toggleDetailsBtn) toggleDetailsBtn.addEventListener('click', openPanel);
    
    const closePanelBtn = document.getElementById('close-panel');
    if (closePanelBtn) closePanelBtn.addEventListener('click', closePanel);
    
    const panelOverlay = document.getElementById('panel-overlay');
    if (panelOverlay) panelOverlay.addEventListener('click', closePanel);
    
    const copyAllColorsBtn = document.getElementById('copy-all-colors');
    if (copyAllColorsBtn) copyAllColorsBtn.addEventListener('click', copyAllColors);
    
    const colorBarExpand = document.getElementById('color-bar-expand');
    if (colorBarExpand) colorBarExpand.addEventListener('click', scrollToSpecs);
    
    const copySpecsBtn = document.getElementById('copy-specs-btn');
    if (copySpecsBtn) copySpecsBtn.addEventListener('click', copyAllSpecs);
    
    const shareSpecsBtn = document.getElementById('share-specs-btn');
    if (shareSpecsBtn) shareSpecsBtn.addEventListener('click', shareBrand);
    
    const exportSpecsBtn = document.getElementById('export-specs-btn');
    if (exportSpecsBtn) exportSpecsBtn.addEventListener('click', exportPDF);
    
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) shareBtn.addEventListener('click', shareBrand);
    
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) exportBtn.addEventListener('click', exportPDF);
});