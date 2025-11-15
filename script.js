// Scroll to top on page load/reload
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// Also ensure we're at the top when the page loads
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Get all mood tiles
const moodTiles = document.querySelectorAll('.mood-tile');

// Add click event to each tile
moodTiles.forEach(tile => {
    tile.addEventListener('click', () => {
        const mood = tile.getAttribute('data-mood');
        
        // For now, we'll alert which mood was clicked
        // Later, we'll redirect to the specific mood page
        alert(`You clicked: ${mood}! 
        
(We'll build the ${mood} mini-site next!)`);
        
        // Once we build the mini-sites, we'll use this instead:
        // window.location.href = `${mood}.html`;
    });
    
    // Add a subtle scale effect on click
    tile.addEventListener('mousedown', () => {
        tile.style.transform = tile.style.transform + ' scale(0.95)';
    });
    
    tile.addEventListener('mouseup', () => {
        tile.style.transform = tile.style.transform.replace(' scale(0.95)', '');
    });
});

// Add some extra sparkle - random subtle animations on page load
window.addEventListener('load', () => {
    moodTiles.forEach((tile, index) => {
        // Set initial opacity to 0 for fade in effect
        tile.style.opacity = '0';

        setTimeout(() => {
            // Fade in without disrupting the background color animation
            tile.style.transition = 'opacity 0.6s ease';
            tile.style.opacity = '1';
        }, index * 100);
    });
});