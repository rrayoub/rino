document.addEventListener('DOMContentLoaded', () => {
    // Audio Player Functionality
    const audio = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    const progressSlider = document.getElementById('progress-slider');
    const progressBar = document.querySelector('.progress-bar');
    const volumeSlider = document.getElementById('volume-slider');

    // Remove autoplay
    // audio.play().catch(error => {
    //    console.error('Autoplay failed:', error);
    // });

    // Play/Pause button
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playIcon.classList.remove('active');
            pauseIcon.classList.add('active');
        } else {
            audio.pause();
            pauseIcon.classList.remove('active');
            playIcon.classList.add('active');
        }
    });

    // Update progress slider and bar
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressSlider.value = progress;
        progressBar.style.width = `${progress}%`;
    });

    // Seek audio
    progressSlider.addEventListener('input', () => {
        const seekTime = (progressSlider.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    // Volume control
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value;
    });

    // Smooth Scrolling Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Favorites Section Preview
    const favoriteItems = document.querySelectorAll('.favorites-column li');
    const previewImage = document.getElementById('preview-image');

    favoriteItems.forEach(item => {
        const itemImage = item.querySelector('img');

        item.addEventListener('mouseenter', () => {
            const imagePath = itemImage.src;
            previewImage.src = imagePath;
            previewImage.style.opacity = '1';
        });

        item.addEventListener('mouseleave', () => {
            previewImage.style.opacity = '0';
        });
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    sections.forEach(section => {
        const content = section.querySelector('.section-container');
        if (content) {
            gsap.fromTo(content, 
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        end: 'bottom 25%',
                        toggleActions: 'play none none reverse',
                        once: false
                    }
                }
            );
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Function to pause music and open beats.html
function pauseMusicAndOpenBeats() {
    const audio = document.getElementById('background-music');
    audio.pause();
    window.open('beats.html', '_blank');
}
document.addEventListener('DOMContentLoaded', () => {
    const profilePic = document.querySelector('.profile-pic');

    // Disable right-click context menu
    profilePic.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

    // Prevent dragging the image
    profilePic.setAttribute('draggable', 'false');
});
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', (event) => {
    if (
        event.ctrlKey && (event.key === 'u' || event.key === 'U') || // View source
        event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'i') || // DevTools
        event.key === 'F12' || event.key === 'f12' || // F12
        event.ctrlKey && (event.key === 's' || event.key === 'S') || // Save As
        event.ctrlKey && (event.key === 'p' || event.key === 'P') // Print
    ) {
        event.preventDefault();
    }
});
setInterval(function () {
    let devtools = window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200;
    if (devtools) {
        alert("DevTools is disabled on this site!");
        window.location.replace("about:blank");
    }
}, 1000);
