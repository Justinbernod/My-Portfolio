document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Mobile Menu Toggle Navigation
       ========================================================================== */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    /* ==========================================================================
       Navbar Scroll Styling Effect
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Run initially in case page is refreshed while scrolled down

    /* ==========================================================================
       Intersection Observer for Progress Bar Animations
       ========================================================================== */
    const progressFills = document.querySelectorAll('.progress-bar-fill');
    
    const fillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If progress fill has custom style rule for width
                const targetWidth = entry.target.style.width;
                // Temporarily reset to 0, then back to target width to trigger transition
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 100);
                
                // Stop observing this element once triggered
                fillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    progressFills.forEach(fill => {
        fillObserver.observe(fill);
    });

    /* ==========================================================================
       Scroll Reveal Animations for Section Cards
       ========================================================================== */
    const revealElements = document.querySelectorAll('.glass-card, .skill-card, .client-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        // Initial setup for reveal animation (unless screen size is mobile, where we keep it simple)
        if (window.innerWidth > 768) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(25px)';
            element.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            revealObserver.observe(element);
        } else {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });

    /* ==========================================================================
       Contact Form Submission Handler
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnContent = submitBtn.innerHTML;
            
            // Set loading state
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Simulate form submission API response
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;

                // Simple success styling & reset
                formFeedback.classList.remove('hidden', 'error');
                formFeedback.classList.add('success');
                formFeedback.innerHTML = `<strong>Success!</strong> Thank you ${name}. Your inquiry about "${subject}" has been successfully logged (simulation). I'll contact you at ${email} shortly!`;
                
                contactForm.reset();

                // Auto-fade feedback message after 10 seconds
                setTimeout(() => {
                    formFeedback.classList.add('hidden');
                }, 10000);

            }, 15000 / 10); // 1.5 seconds simulate network delay
        });
    }

});
