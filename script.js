// ========== PAGE LOAD BEHAVIOR ==========

// Ensure page always loads at the top and tiles fade in
window.addEventListener('load', () => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Fade in mood tiles with staggered animation
    const moodTiles = document.querySelectorAll('.mood-tile');
    moodTiles.forEach((tile, index) => {
        tile.style.opacity = '0';
        
        setTimeout(() => {
            tile.style.transition = 'opacity 0.6s ease';
            tile.style.opacity = '1';
        }, index * 100);
    });
});

// Prevent scroll restoration on page reload
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// ========== MOOD TILE INTERACTIONS ==========

const moodTiles = document.querySelectorAll('.mood-tile');

moodTiles.forEach(tile => {
    // Click handler - will eventually redirect to mood-specific pages
    tile.addEventListener('click', () => {
        const mood = tile.getAttribute('data-mood');
        
        // Temporary alert (replace with actual page navigation later)
        alert(`You clicked: ${mood}!\n\n(We'll build the ${mood} mini-site next!)`);
        
        // Future implementation (uncomment when mini-sites are ready):
        // window.location.href = `${mood}.html`;
    });
    
    // Visual feedback on mousedown
    tile.addEventListener('mousedown', () => {
        tile.style.transform = tile.style.transform + ' scale(0.95)';
    });
    
    // Reset on mouseup
    tile.addEventListener('mouseup', () => {
        tile.style.transform = tile.style.transform.replace(' scale(0.95)', '');
    });
});