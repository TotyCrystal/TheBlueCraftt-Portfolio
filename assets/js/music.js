/* ===========================================================
        THEBLUECRAFTT – AMBIENT SPACE MUSIC PLAYER
        Uses external MP3, plays even when tab is inactive
=========================================================== */

(function () {

    const audio = new Audio('assets/song.mp3');
    audio.loop = true;
    audio.volume = 0.3; // Default volume

    let isPlaying = false;

    const toggleBtn = document.getElementById('musicToggle');
    const volumeSlider = document.getElementById('musicVolume');

    // ========== TOGGLE PLAY/PAUSE ==========
    function toggleMusic() {
        if (isPlaying) {
            audio.pause();
            toggleBtn.classList.remove('playing');
            toggleBtn.querySelector('.music-status').textContent = 'OFF';
            toggleBtn.querySelector('i').className = 'fas fa-volume-mute';
        } else {
            // Resume even if tab is inactive – works because we use Audio element
            audio.play().catch(err => {
                // Autoplay prevented – user must interact first
                console.log('Autoplay blocked, waiting for interaction');
            });
            toggleBtn.classList.add('playing');
            toggleBtn.querySelector('.music-status').textContent = 'ON';
            toggleBtn.querySelector('i').className = 'fas fa-music';
        }
        isPlaying = !isPlaying;
    }

    // ========== VOLUME CONTROL ==========
    function updateVolume() {
        const vol = parseInt(volumeSlider.value) / 100;
        audio.volume = vol;
    }

    // ========== EVENT LISTENERS ==========
    toggleBtn.addEventListener('click', toggleMusic);
    volumeSlider.addEventListener('input', updateVolume);

    // ========== AUTOPLAY ON USER INTERACTION ==========
    function startAutoplay() {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                toggleBtn.classList.add('playing');
                toggleBtn.querySelector('.music-status').textContent = 'ON';
                toggleBtn.querySelector('i').className = 'fas fa-music';
                console.log('🎵 Music autoplay started');
            }).catch(err => {
                console.log('Autoplay still blocked');
            });
        }
        document.removeEventListener('click', startAutoplay);
        document.removeEventListener('scroll', startAutoplay);
    }

    // Try to autoplay on first click or scroll
    document.addEventListener('click', startAutoplay);
    document.addEventListener('scroll', startAutoplay);

    // ========== KEYBOARD SHORTCUT ==========
    document.addEventListener('keydown', function (e) {
        if (e.key === ' ' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            toggleMusic();
        }
    });

    console.log('🎵 Music player ready (MP3) – press SPACE to toggle');

})();