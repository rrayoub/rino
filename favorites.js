document.addEventListener('DOMContentLoaded', () => {
  // GSAP and ScrollTrigger Initialization with Enhanced Configuration
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Enhanced Navigation and Section Management
  const sections = {
    movies: document.getElementById('movies'),
    games: document.getElementById('games'),
    music: document.getElementById('music')
  };

  let currentSection = 'movies';

  // Navigation Buttons Setup
  const setupNavigation = () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const navArrows = document.querySelectorAll('.arrow-left, .arrow-right');

    navButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetSection = button.getAttribute('data-target');
        navigateToSection(targetSection);
      });
    });

    navArrows.forEach(arrow => {
      arrow.addEventListener('click', () => {
        const direction = arrow.classList.contains('arrow-left') ? 'left' : 'right';
        navigateThroughItems(direction);
      });
    });
  };

  // Advanced Section Navigation
  const navigateToSection = (sectionName) => {
    if (sections[sectionName]) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: sections[sectionName], offsetY: 50 },
        ease: 'power3.inOut',
        onComplete: () => {
          currentSection = sectionName;
          updateActiveSection(sectionName);
        }
      });
    }
  };

  // Update Active Section Styling
  const updateActiveSection = (sectionName) => {
    Object.values(sections).forEach(section => {
      section.classList.remove('active');
    });
    sections[sectionName].classList.add('active');
  };

  // Advanced Item Navigation with Smooth Transitions
  window.navigateThroughItems = function(direction) {
    const activeSection = document.querySelector('.favorites-section.active');
    if (!activeSection) return;

    const grid = activeSection.querySelector('.favorites-grid');
    const items = Array.from(grid.querySelectorAll('.favorite-item'));
    const currentFocusedIndex = items.findIndex(item => item.classList.contains('focused'));

    let newIndex;
    if (direction === 'left') {
      newIndex = currentFocusedIndex > 0 ? currentFocusedIndex - 1 : items.length - 1;
    } else {
      newIndex = currentFocusedIndex < items.length - 1 ? currentFocusedIndex + 1 : 0;
    }

    // Reset previous item
    if (currentFocusedIndex !== -1) {
      gsap.to(items[currentFocusedIndex], {
        scale: 1,
        boxShadow: 'var(--shadow-subtle)',
        duration: 0.3
      });
      items[currentFocusedIndex].classList.remove('focused');
    }

    // Animate new item
    gsap.to(items[newIndex], {
      scale: 1.05,
      boxShadow: 'var(--shadow-large)',
      duration: 0.3,
      onComplete: () => {
        items[newIndex].classList.add('focused');
        playItemAudio(items[newIndex]);
      }
    });
  };

  // Audio Interaction with Enhanced Effects
  const playItemAudio = (item) => {
    const audioId = item.getAttribute('data-audio-id');
    const audioElement = document.getElementById(audioId);

    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play().catch(error => console.log('Audio play failed:', error));
    }
  };

  // Section Scroll Animations
  const setupSectionAnimations = () => {
    gsap.utils.toArray('.favorites-section').forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        animation: gsap.fromTo(section, 
          { opacity: 0, y: 100 }, 
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        ),
        once: true
      });
    });
  };

  // Audio Hover Interactions
  const setupAudioHoverInteractions = () => {
    const favoriteItems = document.querySelectorAll('.favorite-item');

    favoriteItems.forEach(item => {
      const audioId = item.getAttribute('data-audio-id');
      const audioElement = document.getElementById(audioId);

      if (audioElement) {
        item.addEventListener('mouseenter', () => {
          audioElement.currentTime = 0;
          audioElement.play().catch(error => console.log('Audio play failed:', error));

          gsap.to(item, {
            scale: 1.05,
            boxShadow: 'var(--shadow-large)',
            duration: 0.3,
            ease: 'power1.inOut'
          });
        });

        item.addEventListener('mouseleave', () => {
          audioElement.pause();
          audioElement.currentTime = 0;

          gsap.to(item, {
            scale: 1,
            boxShadow: 'var(--shadow-subtle)',
            duration: 0.3,
            ease: 'power1.inOut'
          });
        });
      }
    });
  };

  // Keyboard Navigation
  const setupKeyboardNavigation = () => {
    document.addEventListener('keydown', (event) => {
      switch(event.key) {
        case 'ArrowLeft':
          navigateThroughItems('left');
          break;
        case 'ArrowRight':
          navigateThroughItems('right');
          break;
        case '1':
          navigateToSection('movies');
          break;
        case '2':
          navigateToSection('games');
          break;
          navigateToSection("mangas")
        case '3':
          navigateToSection('music');
          break;
      }
    });
  };

  // Initialize All Functions
  setupNavigation();
  setupSectionAnimations();
  setupAudioHoverInteractions();
  setupKeyboardNavigation();

  // Initially focus first item in movies section
  const firstMovieItem = document.querySelector('#movies .favorite-item');
  if (firstMovieItem) {
    firstMovieItem.classList.add('focused');
  }
});