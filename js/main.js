// Visual Impairment Teacher Support Slides - Main JavaScript

class Presentation {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;

        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentSlideDisplay = document.querySelector('.current-slide');
        this.totalSlidesDisplay = document.querySelector('.total-slides');
        this.progressFill = document.querySelector('.progress-fill');

        // Sound effects
        this.sounds = {
            start: document.getElementById('sound-start'),
            next: document.getElementById('sound-next'),
            prev: document.getElementById('sound-prev'),
            end: document.getElementById('sound-end')
        };

        this.soundEnabled = true;
        this.isFirstLoad = true;

        this.init();
    }

    init() {
        // Initialize display
        this.updateSlideDisplay();
        this.updateProgress();

        // Set up event listeners
        this.setupEventListeners();

        // Show first slide (without title narration yet)
        this.slides[0].classList.add('active');
        this.updateButtonStates();

        // Play start sound and title narration after a brief delay
        setTimeout(() => {
            this.playSound('start');
            // Play first slide title narration after start sound
            this.playTitleNarration(0);
            this.isFirstLoad = false;
        }, 500);

        console.log('Presentation initialized successfully');
        console.log(`Total slides: ${this.totalSlides}`);
    }

    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                case 'PageDown':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    break;
            }
        });

        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        };

        this.handleSwipe = handleSwipe;
    }

    showSlide(index) {
        // Stop all currently playing audio
        this.stopAllAudio();

        // Remove active class from all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Add active class to current slide
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
            this.currentSlide = index;
            this.updateSlideDisplay();
            this.updateProgress();
            this.updateButtonStates();

            // Announce slide change for screen readers
            this.announceSlideChange();

            // Play title narration after slide change
            this.playTitleNarration(index);
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.showSlide(this.currentSlide + 1);
            // Play next sound unless it's the last slide
            if (this.currentSlide + 1 === this.totalSlides - 1) {
                this.playSound('end');
            } else {
                this.playSound('next');
            }
        }
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
            this.playSound('prev');
        }
    }

    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.showSlide(index);
        }
    }

    updateSlideDisplay() {
        this.currentSlideDisplay.textContent = this.currentSlide + 1;
        this.totalSlidesDisplay.textContent = this.totalSlides;
    }

    updateProgress() {
        const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
        this.progressFill.style.width = `${progress}%`;
    }

    updateButtonStates() {
        // Disable/enable navigation buttons
        this.prevBtn.disabled = this.currentSlide === 0;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }

    announceSlideChange() {
        // Create or update screen reader announcement
        let announcer = document.getElementById('slide-announcer');

        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'slide-announcer';
            announcer.className = 'sr-only';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            document.body.appendChild(announcer);
        }

        const slideTitle = this.slides[this.currentSlide].querySelector('.slide-title, .main-title');
        const title = slideTitle ? slideTitle.textContent : `슬라이드 ${this.currentSlide + 1}`;

        announcer.textContent = `${title}. 슬라이드 ${this.currentSlide + 1} / ${this.totalSlides}`;
    }

    // Stop all audio playback
    stopAllAudio() {
        // Stop sound effects
        Object.values(this.sounds).forEach(sound => {
            if (sound) {
                sound.pause();
                sound.currentTime = 0;
            }
        });

        // Stop all title narrations
        for (let i = 1; i <= this.totalSlides; i++) {
            const titleAudio = document.getElementById(`title-${i}`);
            if (titleAudio) {
                titleAudio.pause();
                titleAudio.currentTime = 0;
            }
        }
    }

    // Sound playback
    playSound(soundName) {
        if (!this.soundEnabled || this.isFirstLoad) return;

        const sound = this.sounds[soundName];
        if (sound) {
            // Reset sound to beginning and play
            sound.currentTime = 0;
            sound.play().catch(err => {
                console.log('Sound play failed:', err);
            });
        }
    }

    // Play title narration after sound effect
    playTitleNarration(slideIndex) {
        if (!this.soundEnabled) return;

        const titleAudio = document.getElementById(`title-${slideIndex + 1}`);
        if (titleAudio) {
            // Wait for sound effect to finish, then play title
            const soundEffect = this.isFirstLoad ? this.sounds.start :
                               (slideIndex === this.totalSlides - 1) ? this.sounds.end : this.sounds.next;

            if (soundEffect && soundEffect.duration) {
                // Calculate delay based on sound effect duration
                const delay = (soundEffect.duration * 1000) + 200; // Add 200ms buffer

                setTimeout(() => {
                    titleAudio.currentTime = 0;
                    titleAudio.play().catch(err => {
                        console.log('Title narration play failed:', err);
                    });
                }, delay);
            } else {
                // If duration not available, use default delay
                setTimeout(() => {
                    titleAudio.currentTime = 0;
                    titleAudio.play().catch(err => {
                        console.log('Title narration play failed:', err);
                    });
                }, 800); // Default 800ms delay
            }
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        return this.soundEnabled;
    }

    // Public API
    getCurrentSlide() {
        return this.currentSlide;
    }

    getTotalSlides() {
        return this.totalSlides;
    }

    isSoundEnabled() {
        return this.soundEnabled;
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const presentation = new Presentation();

    // Expose presentation instance globally for debugging
    window.presentation = presentation;

    // Add print support
    window.addEventListener('beforeprint', function() {
        // Show all slides when printing
        document.querySelectorAll('.slide').forEach(slide => {
            slide.style.opacity = '1';
            slide.style.visibility = 'visible';
            slide.style.position = 'relative';
        });
    });

    window.addEventListener('afterprint', function() {
        // Restore presentation state after printing
        location.reload();
    });

    console.log('Presentation loaded successfully');
    console.log('Navigation: Arrow keys, Space, Page Up/Down, Home, End');
    console.log('Touch: Swipe left/right on mobile devices');
});
