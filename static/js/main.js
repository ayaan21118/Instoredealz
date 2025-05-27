// Instoredealz - Main JavaScript File

// Global app object
window.InstoredealsApp = {
    init: function() {
        this.setupEventListeners();
        this.initComponents();
        this.handleFormSubmissions();
        this.setupAnimations();
        this.setupUtilities();
    },

    // Setup global event listeners
    setupEventListeners: function() {
        // Smooth scrolling for anchor links
        document.addEventListener('click', function(e) {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Handle navbar background on scroll
        window.addEventListener('scroll', this.handleNavbarScroll);

        // Handle window resize
        window.addEventListener('resize', this.handleResize);

        // Handle escape key for modals
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    const modal = bootstrap.Modal.getInstance(openModal);
                    if (modal) modal.hide();
                }
            }
        });
    },

    // Initialize components
    initComponents: function() {
        this.initTooltips();
        this.initPopovers();
        this.initCarousels();
        this.initCharts();
        this.setupFormValidation();
    },

    // Initialize Bootstrap tooltips
    initTooltips: function() {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => 
            new bootstrap.Tooltip(tooltipTriggerEl)
        );
    },

    // Initialize Bootstrap popovers
    initPopovers: function() {
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => 
            new bootstrap.Popover(popoverTriggerEl)
        );
    },

    // Initialize carousels
    initCarousels: function() {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            new bootstrap.Carousel(carousel, {
                interval: 5000,
                wrap: true
            });
        });
    },

    // Initialize charts (placeholder for future implementation)
    initCharts: function() {
        // Charts will be implemented when Chart.js is needed
        console.log('Charts initialization placeholder');
    },

    // Handle navbar background on scroll
    handleNavbarScroll: function() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    },

    // Handle window resize
    handleResize: function() {
        // Adjust components on resize
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (window.innerWidth < 768) {
                card.classList.add('mobile-optimized');
            } else {
                card.classList.remove('mobile-optimized');
            }
        });
    },

    // Setup form validation
    setupFormValidation: function() {
        const forms = document.querySelectorAll('.needs-validation');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add('was-validated');
            });
        });

        // Real-time validation
        const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                this.classList.add('was-validated');
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('was-validated')) {
                    if (this.checkValidity()) {
                        this.classList.remove('is-invalid');
                        this.classList.add('is-valid');
                    } else {
                        this.classList.remove('is-valid');
                        this.classList.add('is-invalid');
                    }
                }
            });
        });
    },

    // Handle form submissions
    handleFormSubmissions: function() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin);
        }

        // Signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', this.handleSignup);
        }

        // Vendor forms
        const vendorSignupForm = document.getElementById('vendorSignupForm');
        if (vendorSignupForm) {
            vendorSignupForm.addEventListener('submit', this.handleVendorSignup);
        }

        const dealSubmissionForm = document.getElementById('dealSubmissionForm');
        if (dealSubmissionForm) {
            dealSubmissionForm.addEventListener('submit', this.handleDealSubmission);
        }

        // Admin forms
        const adminLoginForm = document.getElementById('adminLoginForm');
        if (adminLoginForm) {
            adminLoginForm.addEventListener('submit', this.handleAdminLogin);
        }

        // Super Admin forms
        const superAdminLoginForm = document.getElementById('superAdminLoginForm');
        if (superAdminLoginForm) {
            superAdminLoginForm.addEventListener('submit', this.handleSuperAdminLogin);
        }
    },

    // Handle login
    handleLogin: function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email') || document.getElementById('loginEmail').value;
        const password = formData.get('password') || document.getElementById('loginPassword').value;

        if (!email || !password) {
            InstoredealsApp.showAlert('Please fill in all fields', 'danger');
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Signing in...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Close modal and show success
            const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            if (modal) modal.hide();
            
            InstoredealsApp.showAlert('Login functionality will be implemented', 'info');
        }, 1500);
    },

    // Handle signup
    handleSignup: function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name') || document.getElementById('signupName').value;
        const email = formData.get('email') || document.getElementById('signupEmail').value;
        const password = formData.get('password') || document.getElementById('signupPassword').value;
        const role = formData.get('role') || document.getElementById('userRole').value;

        if (!name || !email || !password || !role) {
            InstoredealsApp.showAlert('Please fill in all fields', 'danger');
            return;
        }

        // Validate email
        if (!InstoredealsApp.isValidEmail(email)) {
            InstoredealsApp.showAlert('Please enter a valid email address', 'danger');
            return;
        }

        // Validate password
        if (password.length < 6) {
            InstoredealsApp.showAlert('Password must be at least 6 characters long', 'danger');
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Creating account...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Close modal and show success
            const modal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
            if (modal) modal.hide();
            
            InstoredealsApp.showAlert('Account created successfully! Welcome to Instoredealz!', 'success');
        }, 2000);
    },

    // Handle vendor signup
    handleVendorSignup: function(e) {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting application...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            InstoredealsApp.showAlert('Vendor application submitted successfully! We will review and get back to you within 24 hours.', 'success');
        }, 2000);
    },

    // Handle deal submission
    handleDealSubmission: function(e) {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Creating deal...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            InstoredealsApp.showAlert('Deal created successfully! It will be reviewed and published within 2 hours.', 'success');
        }, 1500);
    },

    // Handle admin login
    handleAdminLogin: function(e) {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Authenticating...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('adminLoginModal'));
            if (modal) modal.hide();
            
            InstoredealsApp.showAlert('Admin login functionality will be implemented', 'info');
        }, 1500);
    },

    // Handle super admin login
    handleSuperAdminLogin: function(e) {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Authenticating...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('superAdminLoginModal'));
            if (modal) modal.hide();
            
            InstoredealsApp.showAlert('Super Admin authentication functionality will be implemented', 'info');
        }, 2000);
    },

    // Setup animations
    setupAnimations: function() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.card, .pricing-card, .stats-card, .category-card');
        animateElements.forEach(el => observer.observe(el));

        // Add hover effects to cards
        document.querySelectorAll('.category-card, .store-card, .stats-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    },

    // Setup utility functions
    setupUtilities: function() {
        // Auto-hide alerts after 5 seconds
        setTimeout(() => {
            const alerts = document.querySelectorAll('.alert:not(.alert-persistent)');
            alerts.forEach(alert => {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            });
        }, 5000);

        // Setup copy to clipboard functionality
        document.querySelectorAll('[data-clipboard]').forEach(btn => {
            btn.addEventListener('click', function() {
                const text = this.getAttribute('data-clipboard');
                navigator.clipboard.writeText(text).then(() => {
                    InstoredealsApp.showAlert('Copied to clipboard!', 'success');
                });
            });
        });

        // Setup print functionality
        document.querySelectorAll('[data-print]').forEach(btn => {
            btn.addEventListener('click', function() {
                window.print();
            });
        });
    },

    // Utility functions
    showAlert: function(message, type = 'info') {
        const alertContainer = document.getElementById('alert-container') || this.createAlertContainer();
        
        const alertHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <i class="fas fa-${this.getAlertIcon(type)} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        alertContainer.insertAdjacentHTML('beforeend', alertHTML);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            const alert = alertContainer.lastElementChild;
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    },

    createAlertContainer: function() {
        const container = document.createElement('div');
        container.id = 'alert-container';
        container.className = 'position-fixed top-0 end-0 p-3';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
        return container;
    },

    getAlertIcon: function(type) {
        const icons = {
            success: 'check-circle',
            danger: 'exclamation-triangle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    },

    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    formatCurrency: function(amount, currency = '₹') {
        return currency + new Intl.NumberFormat('en-IN').format(amount);
    },

    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Local storage helpers
    setLocalStorage: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage not available:', e);
        }
    },

    getLocalStorage: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('LocalStorage not available:', e);
            return defaultValue;
        }
    },

    // Theme management
    toggleTheme: function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        this.setLocalStorage('theme', newTheme);
    },

    initTheme: function() {
        const savedTheme = this.getLocalStorage('theme', 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);
    },

    // Performance monitoring
    measurePerformance: function() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);
            });
        }
    }
};

// Page-specific modules
window.InstoredealsApp.Customer = {
    init: function() {
        this.setupDealFilters();
        this.setupLocationServices();
        this.setupSavingsTracker();
    },

    setupDealFilters: function() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                // Filter deals logic would go here
            });
        });
    },

    setupLocationServices: function() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('User location:', latitude, longitude);
                    // Update nearby stores based on location
                },
                (error) => {
                    console.warn('Geolocation error:', error);
                }
            );
        }
    },

    setupSavingsTracker: function() {
        // Mock savings data - in real app this would come from backend
        const savingsData = {
            totalSaved: 0,
            dealsUsed: 0,
            avgDiscount: 0
        };

        // Update savings display
        document.querySelectorAll('.stat-card h3').forEach((stat, index) => {
            const values = Object.values(savingsData);
            if (values[index] !== undefined) {
                stat.textContent = index === 0 ? InstoredealsApp.formatCurrency(values[index]) : 
                                  index === 2 ? values[index] + '%' : values[index];
            }
        });
    }
};

window.InstoredealsApp.Vendor = {
    init: function() {
        this.setupDashboard();
        this.setupDealManagement();
        this.setupAnalytics();
    },

    setupDashboard: function() {
        // Initialize vendor dashboard
        this.loadVendorStats();
        this.setupDatePickers();
    },

    setupDealManagement: function() {
        // Deal creation and management
        const dealForm = document.getElementById('dealSubmissionForm');
        if (dealForm) {
            const discountType = dealForm.querySelector('#discountType');
            const discountValue = dealForm.querySelector('#discountValue');
            
            if (discountType && discountValue) {
                discountType.addEventListener('change', function() {
                    const label = discountValue.previousElementSibling;
                    if (this.value === 'percentage') {
                        label.textContent = 'Discount Percentage (%)';
                        discountValue.placeholder = 'e.g., 50';
                        discountValue.max = '100';
                    } else if (this.value === 'fixed') {
                        label.textContent = 'Discount Amount (₹)';
                        discountValue.placeholder = 'e.g., 500';
                        discountValue.removeAttribute('max');
                    }
                });
            }
        }
    },

    setupAnalytics: function() {
        // Mock analytics data
        const analyticsData = {
            views: 0,
            redemptions: 0,
            rating: 0.0,
            revenue: 0
        };

        // Update analytics display
        this.updateAnalyticsDisplay(analyticsData);
    },

    loadVendorStats: function() {
        // Load vendor statistics
        console.log('Loading vendor statistics...');
    },

    updateAnalyticsDisplay: function(data) {
        const statCards = document.querySelectorAll('.stats-card h3');
        if (statCards.length >= 4) {
            statCards[0].textContent = data.views;
            statCards[1].textContent = data.redemptions;
            statCards[2].textContent = data.rating.toFixed(1);
            statCards[3].textContent = InstoredealsApp.formatCurrency(data.revenue);
        }
    },

    setupDatePickers: function() {
        const dateInputs = document.querySelectorAll('input[type="date"]');
        dateInputs.forEach(input => {
            const today = new Date().toISOString().split('T')[0];
            if (input.id === 'validTill') {
                input.min = today;
            }
        });
    }
};

window.InstoredealsApp.Admin = {
    init: function() {
        this.setupTabs();
        this.setupDataTables();
        this.setupFilters();
    },

    setupTabs: function() {
        const tabs = document.querySelectorAll('#adminTabs button');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const target = this.getAttribute('data-bs-target');
                console.log('Switching to tab:', target);
                // Load tab-specific data
            });
        });
    },

    setupDataTables: function() {
        // Initialize data tables for admin views
        console.log('Setting up admin data tables...');
    },

    setupFilters: function() {
        const filters = document.querySelectorAll('select[class*="form-select"]');
        filters.forEach(filter => {
            filter.addEventListener('change', function() {
                console.log('Filter changed:', this.value);
                // Apply filter logic
            });
        });
    }
};

window.InstoredealsApp.SuperAdmin = {
    init: function() {
        this.setupSystemMonitoring();
        this.setupUserManagement();
        this.setupSettingsPanel();
    },

    setupSystemMonitoring: function() {
        // System monitoring functionality
        this.updateSystemStatus();
        setInterval(() => this.updateSystemStatus(), 30000); // Update every 30 seconds
    },

    setupUserManagement: function() {
        // User management functionality
        console.log('Setting up user management...');
    },

    setupSettingsPanel: function() {
        const settingsForm = document.getElementById('systemSettingsForm');
        if (settingsForm) {
            settingsForm.addEventListener('submit', function(e) {
                e.preventDefault();
                InstoredealsApp.showAlert('System settings saved successfully!', 'success');
            });
        }
    },

    updateSystemStatus: function() {
        // Update system status indicators
        const statusElements = document.querySelectorAll('.stats-card h6');
        // Mock system status - in real app this would come from backend
        console.log('System status updated');
    }
};

window.InstoredealsApp.Pricing = {
    init: function() {
        this.setupPricingToggle();
        this.setupPlanSelection();
        this.setupFAQ();
    },

    setupPricingToggle: function() {
        const toggle = document.getElementById('pricingToggle');
        if (toggle) {
            toggle.addEventListener('change', function() {
                const isAnnual = this.checked;
                const amounts = document.querySelectorAll('.amount');
                const periods = document.querySelectorAll('.period');

                amounts.forEach(amount => {
                    const annual = amount.getAttribute('data-annual');
                    const monthly = amount.getAttribute('data-monthly');
                    
                    if (annual && monthly) {
                        amount.textContent = isAnnual ? annual : monthly;
                    }
                });

                periods.forEach(period => {
                    if (period.textContent.includes('per')) {
                        period.textContent = isAnnual ? 'per year' : 'per month';
                    }
                });
            });
        }
    },

    setupPlanSelection: function() {
        const planButtons = document.querySelectorAll('.pricing-card .btn');
        planButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const planCard = this.closest('.pricing-card');
                const planName = planCard.querySelector('h4').textContent;
                
                if (planName === 'Basic') {
                    InstoredealsApp.showAlert('Basic plan is free! Sign up to get started.', 'info');
                } else {
                    InstoredealsApp.showAlert(`You selected the ${planName} plan. Redirecting to payment...`, 'success');
                }
            });
        });
    },

    setupFAQ: function() {
        const faqItems = document.querySelectorAll('.accordion-button');
        faqItems.forEach(item => {
            item.addEventListener('click', function() {
                const target = this.getAttribute('data-bs-target');
                console.log('FAQ item clicked:', target);
            });
        });
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main app
    InstoredealsApp.init();
    InstoredealsApp.initTheme();
    InstoredealsApp.measurePerformance();

    // Initialize page-specific modules based on body class
    const bodyClasses = document.body.classList;
    
    if (bodyClasses.contains('customer-page')) {
        InstoredealsApp.Customer.init();
    } else if (bodyClasses.contains('vendor-page')) {
        InstoredealsApp.Vendor.init();
    } else if (bodyClasses.contains('admin-page')) {
        InstoredealsApp.Admin.init();
    } else if (bodyClasses.contains('super-admin-page')) {
        InstoredealsApp.SuperAdmin.init();
    } else if (bodyClasses.contains('pricing-page')) {
        InstoredealsApp.Pricing.init();
    }

    // Service Worker registration (for future PWA implementation)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InstoredealsApp;
}
