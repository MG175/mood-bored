// ========== PAGE LOAD BEHAVIOR ==========

// Fade in mood tiles with a nice stagger on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);

    const moodTiles = document.querySelectorAll('.mood-tile');
    moodTiles.forEach((tile, index) => {
        // Reset any revealing state from previous navigation
        tile.classList.remove('revealing', 'pressed');
        
        // Remove any overlay that might be left over
        const overlay = tile.querySelector('.mood-overlay');
        if (overlay) {
            overlay.remove();
        }
        
        tile.style.opacity = '0';

        setTimeout(() => {
            tile.style.transition = 'opacity 0.6s ease';
            tile.style.opacity = '1';
        }, index * 100);
    });
});

// ========== MOOD CARD REVEAL LOGIC ==========
document.addEventListener('DOMContentLoaded', () => {
    const moodTiles = document.querySelectorAll('.mood-tile');

    // Short messages that show INSIDE the tile when clicked
    const moodMessages = {
        bored:        "Let’s fix that. I’ve got ideas for you. ✨",
        stressed:     "Deep breath. We’re about to soften the day. 🌿",
        creative:     "Time to make something ridiculously cool. 🎨",
        curious:      "Follow the clues… something fun is next. 🔍",
        silly:        "Hehehe okay, let’s get weird. 🤪",
        competitive:  "Game on. Let’s see what you’ve got. 🏆"
    };

    // Where each mood sends you
    // Adjust these paths if your folder structure is different
    const moodUrls = {
        bored:       'bored/index.html',
        stressed:    'stressed/index.html',
        creative:    'creative/index.html',
        curious:     'curious/index.html',
        silly:       'silly/index.html',
        competitive: 'competitive/index.html'
    };

    moodTiles.forEach((tile) => {
        const mood = tile.dataset.mood;

        tile.addEventListener('click', () => {
            if (!mood) return;

            // Prevent double-click spam
            if (tile.classList.contains('revealing')) return;

            const url = tile.dataset.url || moodUrls[mood];
            const message = moodMessages[mood] || "Let’s go do something fun. ✨";

            // Make sure overlay exists or create it
            let overlay = tile.querySelector('.mood-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'mood-overlay';
                overlay.innerText = message;
                tile.appendChild(overlay);
            } else {
                overlay.innerText = message;
            }

            // Trigger the "card reveal" animation
            tile.classList.add('revealing');

            // After a short beat, go to the mood page
            setTimeout(() => {
                if (url) {
                    window.location.href = url;
                } else {
                    // If you haven’t built that mood’s site yet
                    alert(`${mood.toUpperCase()} mini-site coming soon!\n\nWe’re still building this one. 🚀`);
                    tile.classList.remove('revealing');
                    if (overlay) overlay.remove();
                }
            }, 2500); // timing matches the CSS animation
        });

        // Optional: tiny press feedback on mouse down/up
        tile.addEventListener('mousedown', () => {
            if (!tile.classList.contains('revealing')) {
                tile.classList.add('pressed');
            }
        });

        tile.addEventListener('mouseup', () => {
            tile.classList.remove('pressed');
        });

        tile.addEventListener('mouseleave', () => {
            tile.classList.remove('pressed');
        });
    });
});