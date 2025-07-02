document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNavLinks = document.querySelector('.nav-links');
    const backToTopBtn = document.getElementById('back-to-top');
    const themeToggle = document.getElementById('theme-toggle');
    const currentYearSpan = document.getElementById('current-year');

    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();

    // --- 1. Sticky Navbar & Scroll Spy ---
    const activateNavLink = () => {
        let currentActive = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight; // Adjust for sticky header
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentActive = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActive)) {
                link.classList.add('active');
            }
        });
    };

    const handleScroll = () => {
        // Sticky header
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Scroll Spy
        activateNavLink();

        // Back to Top button visibility
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set active link and sticky state on load
    handleScroll();

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile nav after clicking a link
            if (mobileNavLinks.classList.contains('active')) {
                mobileNavLinks.classList.remove('active');
                navToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        });
    });

    // --- 2. Mobile Navigation Toggle ---
    navToggle.addEventListener('click', () => {
        mobileNavLinks.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (mobileNavLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // --- 3. Hero Section - Dynamic Typing Effect ---
    const typewriterElement = document.querySelector('.typewriter');
    const phrases = ["build websites.", "fix UI problems.", "help businesses grow."];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeWriter = () => {
        const currentPhrase = phrases[phraseIndex];
        let displayText = '';

        if (isDeleting) {
            displayText = currentPhrase.substring(0, charIndex - 1);
        } else {
            displayText = currentPhrase.substring(0, charIndex + 1);
        }

        typewriterElement.textContent = displayText;

        let typeSpeed = 100; // Typing speed
        if (isDeleting) {
            typeSpeed /= 2; // Deleting faster
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 1500; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing new phrase
        }

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        setTimeout(typeWriter, typeSpeed);
    };

    typeWriter(); // Start the typewriter effect

    // "Hire Me" button scrolls to contact form
    document.querySelector('.scroll-to-contact').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // --- 4. Services Section - Cards with Flip Effect & Entrance Animations ---
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // Intersection Observer for section entrance animations
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Adjust when section enters 50px before bottom of viewport
    });

    sections.forEach(section => {
        // Exclude hero section from general entrance animation as it has its own
        if (section.id !== 'hero') {
            sectionObserver.observe(section);
        }
    });

    // --- 5. Portfolio Section - Dynamic Projects & Modal ---
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectModal = document.getElementById('project-modal');
    const closeModalBtn = document.querySelector('.modal .close-button');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTech = document.getElementById('modal-tech');
    const modalLiveLink = document.getElementById('modal-live-link');
    const modalGithubLink = document.getElementById('modal-github-link');

    const projects = [{
            id: 'busntaxi',
            name: 'BusnTaxi.com',
            type: 'client',
            image: 'screenshot1.png',
            description: 'A comprehensive online platform for booking buses and taxis, designed for seamless user experience. I contributed to both front-end and back-end development, focusing on booking flows and UI responsiveness.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB', 'Express.js'],
            liveLink: 'https://jist-11.github.io/busntaxi.com/',
            githubLink: null
        },
        {
            id: 'personal-portfolio',
            name: 'Personal Portfolio',
            type: 'personal',
            image: 'screenshot2.png',
            description: 'This very website! Built from scratch to showcase my skills in modern web development, including interactive UI, animations, and responsive design, without relying on external frameworks.',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            liveLink: '#', // Link to itself
            githubLink: 'https://jist-11.github.io/manan.dev/' // Mock GitHub link
        },
        {
            id: 'e-commerce-dashboard',
            name: 'E-commerce Dashboard',
            type: 'personal',
            image: 'screenshot3.png',
            description: 'A responsive admin dashboard for managing e-commerce operations, including product listings, order management, and sales analytics. Features dynamic charts and data tables.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
            liveLink: 'https://example.com/ecommerce-dashboard', // Mock live link
            githubLink: 'https://github.com/manan_dev/ecommerce-dashboard' // Mock GitHub link
        },
        {
            id: 'task-manager-app',
            name: 'Task Manager App',
            type: 'personal',
            image: 'https://placehold.co/600x400/be93d4/FFFFFF?text=Coming+Soon',
            description: 'A simple, intuitive web-based task manager application allowing users to add, delete, and mark tasks as complete. Features local storage persistence and a clean interface.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
            liveLink: 'https://example.com/task-manager', // Mock live link
            githubLink: 'https://github.com/manan_dev/task-manager-app' // Mock GitHub link
        },
        {
            id: 'blog-platform',
            name: 'Simple Blog Platform',
            type: 'client',
            image: 'https://placehold.co/600x400/8a2be2/FFFFFF?text=Coming+Soon',
            description: 'Developed a basic blog platform for a small business to publish articles and engage with their audience. Includes a simple content management system for easy updates.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
            liveLink: 'https://example.com/blog', // Mock live link
            githubLink: null
        }
    ];

    const renderProjects = (filter = 'all') => {
        portfolioGrid.innerHTML = ''; // Clear existing projects
        const filteredProjects = projects.filter(project => {
            return filter === 'all' || project.type === filter;
        });

        if (filteredProjects.length === 0) {
            portfolioGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-color);">No projects found for this category.</p>';
            return;
        }

        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.setAttribute('data-id', project.id);
            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.name} Screenshot">
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <p>${project.description.substring(0, 100)}...</p>
                </div>
            `;
            portfolioGrid.appendChild(projectCard);
        });
    };

    // Initial render
    renderProjects();

    // Filter buttons event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderProjects(button.dataset.filter);
        });
    });

    // Open project modal
    portfolioGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            const projectId = card.dataset.id;
            const project = projects.find(p => p.id === projectId);

            if (project) {
                modalImage.src = project.image;
                modalImage.alt = `${project.name} Screenshot`;
                modalTitle.textContent = project.name;
                modalDescription.textContent = project.description;
                modalTech.textContent = `Technologies: ${project.technologies.join(', ')}`;

                if (project.liveLink) {
                    modalLiveLink.href = project.liveLink;
                    modalLiveLink.style.display = 'inline-block';
                } else {
                    modalLiveLink.style.display = 'none';
                }

                if (project.githubLink) {
                    modalGithubLink.href = project.githubLink;
                    modalGithubLink.style.display = 'inline-block';
                } else {
                    modalGithubLink.style.display = 'none';
                }

                projectModal.classList.add('active');
            }
        }
    });

    // Close project modal
    closeModalBtn.addEventListener('click', () => {
        projectModal.classList.remove('active');
    });

    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
        }
    });

    // --- 6. Pricing Section - Toggle Plans ---
    const pricingToggleSwitch = document.getElementById('pricing-toggle-switch');
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingToggleSwitch.addEventListener('change', () => {
        const isOneTime = pricingToggleSwitch.checked;
        pricingCards.forEach(card => {
            const priceElement = card.querySelector('.price');
            const periodElement = priceElement.querySelector('.period');
            if (isOneTime) {
                priceElement.textContent = priceElement.dataset.onetime;
                if (periodElement) periodElement.style.display = 'none';
            } else {
                priceElement.textContent = priceElement.dataset.monthly;
                if (periodElement) {
                    periodElement.textContent = '/month';
                    periodElement.style.display = 'inline';
                }
            }
        });
    });

    // --- 7. About Me Section - Animated Skill Chart & Timeline ---
    const skillsChartCanvas = document.getElementById('skillsChart');
    const timelineItems = document.querySelectorAll('.timeline-item');
    let skillsChart = null; // To store the Chart.js instance

    // Load Chart.js dynamically
    const loadChartJs = (callback) => {
        if (typeof Chart !== 'undefined') {
            callback();
            return;
        }
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js";
        script.onload = callback;
        document.head.appendChild(script);
    };

    const drawSkillsChart = () => {
        if (skillsChart) {
            skillsChart.destroy(); // Destroy previous chart instance if exists
        }

        const ctx = skillsChartCanvas.getContext('2d');
        skillsChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['HTML/CSS', 'JavaScript', 'Node.js', 'Databases', 'React', 'UI/UX'],
                datasets: [{
                    data: [95, 90, 75, 70, 80, 85], // Skill percentages
                    backgroundColor: [
                        '#6a0dad', // Primary
                        '#8a2be2', // Secondary
                        '#9b59b6', // Lighter purple
                        '#be93d4', // Even lighter purple
                        '#e0b0ff', // Lightest purple
                        '#a06cd5' // Medium purple
                    ],
                    borderColor: [
                        '#ffffff',
                        '#ffffff',
                        '#ffffff',
                        '#ffffff',
                        '#ffffff',
                        '#ffffff'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%', // Doughnut thickness
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: getComputedStyle(document.body).getPropertyValue('--text-color'),
                            font: {
                                family: var_font_family,
                                size: 14
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed + '%';
                                }
                                return label;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    };

    // Observe About Me section for chart animation
    const aboutMeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadChartJs(drawSkillsChart);
                aboutMeObserver.unobserve(entry.target); // Stop observing once chart is drawn
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });
    aboutMeObserver.observe(document.getElementById('about'));

    // Observe timeline items for animation
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% of the item is visible
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });


    // --- 8. Contact Section - Form Validation & WhatsApp Button ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const formFields = contactForm.querySelectorAll('input, textarea');

    const validateField = (field) => {
        const errorElement = document.getElementById(`${field.id}-error`);
        let isValid = true;
        let errorMessage = '';

        if (field.hasAttribute('required') && field.value.trim() === '') {
            isValid = false;
            errorMessage = 'This field is required.';
        } else if (field.type === 'email' && field.value.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }

        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('active');
            field.classList.add('invalid');
        } else {
            errorElement.textContent = '';
            errorElement.classList.remove('active');
            field.classList.remove('invalid');
        }
        return isValid;
    };

    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            // Validate on input only if it was already invalid
            if (field.classList.contains('invalid')) {
                validateField(field);
            }
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isFormValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            formStatus.style.display = 'block';
            formStatus.classList.remove('success', 'error');
            formStatus.textContent = 'Sending message...';

            // Simulate form submission to Formspree
            // In a real scenario, you would use `fetch` to send data to Formspree
            // const formData = new FormData(contactForm);
            // try {
            //     const response = await fetch(contactForm.action, {
            //         method: 'POST',
            //         body: formData,
            //         headers: {
            //             'Accept': 'application/json'
            //         }
            //     });
            //     if (response.ok) {
            //         formStatus.classList.add('success');
            //         formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
            //         contactForm.reset();
            //     } else {
            //         const data = await response.json();
            //         if (data.errors) {
            //             formStatus.classList.add('error');
            //             formStatus.textContent = data.errors.map(err => err.message).join(', ');
            //         } else {
            //             formStatus.classList.add('error');
            //             formStatus.textContent = 'Oops! There was an error sending your message.';
            //         }
            //     }
            // } catch (error) {
            //     formStatus.classList.add('error');
            //     formStatus.textContent = 'Network error. Please try again later.';
            //     console.error('Form submission error:', error);
            // }

            // Mock success/error for demonstration
            setTimeout(() => {
                const success = Math.random() > 0.1; // 90% chance of success
                if (success) {
                    formStatus.classList.add('success');
                    formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                    contactForm.reset();
                    // Clear error messages after successful submission
                    document.querySelectorAll('.error-message').forEach(el => {
                        el.textContent = '';
                        el.classList.remove('active');
                    });
                    document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
                        el.classList.remove('invalid');
                    });
                } else {
                    formStatus.classList.add('error');
                    formStatus.textContent = 'Oops! There was an error sending your message. Please try again.';
                }
            }, 1500);
        } else {
            formStatus.style.display = 'block';
            formStatus.classList.remove('success');
            formStatus.classList.add('error');
            formStatus.textContent = 'Please correct the errors in the form.';
        }
    });

    // Floating WhatsApp Button
    const whatsappButtonContainer = document.getElementById('whatsapp-button-container');
    const whatsappLink = 'https://wa.me/919911115470?text=Hello%20Manan,%20I%20saw%20your%20portfolio%20website%20and%20would%20like%20to%20discuss%20a%20project.'; // Replace with Manan's actual WhatsApp number and message
    const whatsappButton = document.createElement('a');
    whatsappButton.href = whatsappLink;
    whatsappButton.target = '_blank';
    whatsappButton.rel = 'noopener noreferrer';
    whatsappButton.classList.add('whatsapp-button');
    whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappButton.setAttribute('aria-label', 'Chat on WhatsApp');
    whatsappButtonContainer.appendChild(whatsappButton);

    // Show WhatsApp button after a delay or on scroll
    setTimeout(() => {
        whatsappButtonContainer.classList.add('active');
    }, 1000); // Show after 1 second

    // --- 9. Footer - Back to Top & Dark/Light Mode Toggle ---
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Dark/Light Mode Toggle
    const enableDarkMode = () => {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    };

    const disableDarkMode = () => {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    };

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
        enableDarkMode();
    } else {
        themeToggle.checked = false;
        disableDarkMode();
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });

    // Ensure CSS variables are accessible for Chart.js
    const getCssVariable = (variable) => getComputedStyle(document.body).getPropertyValue(variable).trim();
    const var_font_family = getCssVariable('--font-family');
});
