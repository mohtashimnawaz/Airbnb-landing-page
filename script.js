// Airbnb 2025 Redesign - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSearchFunctionality();
    initHeartButtons();
    initSmoothScrolling();
    initMobileMenu();
    initScrollEffects();
    initImageLazyLoading();
});

// Search Functionality
function initSearchFunctionality() {
    const searchInputs = document.querySelectorAll('.search-item input');
    const searchBtn = document.querySelector('.search-btn');
    
    // Add focus effects to search inputs
    searchInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.borderColor = '#ff385c';
            this.parentElement.style.backgroundColor = '#f8f9fa';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.borderColor = '#ebebeb';
            this.parentElement.style.backgroundColor = 'transparent';
        });
    });
    
    // Search button click handler
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchData = {
                location: searchInputs[0]?.value || '',
                checkIn: searchInputs[1]?.value || '',
                checkOut: searchInputs[2]?.value || '',
                guests: searchInputs[3]?.value || ''
            };
            
            console.log('Search initiated:', searchData);
            showSearchResults(searchData);
        });
    }
    
    // Enter key handler for search inputs
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    });
}

// Heart Button Functionality
function initHeartButtons() {
    const heartButtons = document.querySelectorAll('.heart-btn');
    
    heartButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const heartIcon = this.querySelector('i');
            const isLiked = heartIcon.classList.contains('fas');
            
            if (isLiked) {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                this.style.transform = 'scale(0.9)';
                showToast('Removed from wishlist');
            } else {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                heartIcon.style.color = '#ff385c';
                this.style.transform = 'scale(1.1)';
                showToast('Added to wishlist');
            }
            
            // Reset transform after animation
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const userMenu = document.querySelector('.user-menu');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <div class="mobile-menu-content">
            <div class="mobile-menu-header">
                <h3>Menu</h3>
                <button class="close-menu">&times;</button>
            </div>
            <div class="mobile-menu-items">
                <a href="#" class="mobile-menu-item">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </a>
                <a href="#" class="mobile-menu-item">
                    <i class="fas fa-search"></i>
                    <span>Search</span>
                </a>
                <a href="#" class="mobile-menu-item">
                    <i class="fas fa-heart"></i>
                    <span>Wishlist</span>
                </a>
                <a href="#" class="mobile-menu-item">
                    <i class="fas fa-user"></i>
                    <span>Profile</span>
                </a>
                <a href="#" class="mobile-menu-item">
                    <i class="fas fa-cog"></i>
                    <span>Settings</span>
                </a>
            </div>
        </div>
    `;
    
    document.body.appendChild(mobileMenu);
    
    // Toggle mobile menu
    userMenu.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    const closeBtn = mobileMenu.querySelector('.close-menu');
    closeBtn.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close on backdrop click
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background opacity
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Animate elements on scroll
        animateOnScroll();
    });
}

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.category-card, .destination-card, .experience-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

// Image Lazy Loading
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(1.1)';
        img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        imageObserver.observe(img);
    });
}

// Show Search Results (Mock)
function showSearchResults(searchData) {
    // In a real application, this would make an API call
    console.log('Searching for:', searchData);
    
    // Show loading state
    showToast('Searching for properties...');
    
    // Simulate search delay
    setTimeout(() => {
        showToast(`Found 1,234 properties in ${searchData.location || 'your area'}`);
    }, 1500);
}

// Toast Notification System
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Category Card Interactions
document.addEventListener('click', function(e) {
    if (e.target.closest('.category-card')) {
        const card = e.target.closest('.category-card');
        const category = card.querySelector('h3').textContent;
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        console.log('Category selected:', category);
        showToast(`Exploring ${category}...`);
    }
    
    // Destination card interactions
    if (e.target.closest('.destination-card')) {
        const card = e.target.closest('.destination-card');
        const destination = card.querySelector('h3').textContent;
        
        // Don't trigger if clicking heart button
        if (!e.target.closest('.heart-btn')) {
            console.log('Destination selected:', destination);
            showToast(`Viewing ${destination}...`);
        }
    }
    
    // Experience card interactions
    if (e.target.closest('.experience-card')) {
        const card = e.target.closest('.experience-card');
        const experience = card.querySelector('h3').textContent;
        
        console.log('Experience selected:', experience);
        showToast(`Viewing ${experience}...`);
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .mobile-menu {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .mobile-menu.active {
        opacity: 1;
        visibility: visible;
    }
    
    .mobile-menu-content {
        position: absolute;
        top: 0;
        right: 0;
        width: 300px;
        height: 100%;
        background: white;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    
    .mobile-menu.active .mobile-menu-content {
        transform: translateX(0);
    }
    
    .mobile-menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #ebebeb;
    }
    
    .mobile-menu-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
    }
    
    .close-menu {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #717171;
    }
    
    .mobile-menu-items {
        padding: 20px 0;
    }
    
    .mobile-menu-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px 20px;
        text-decoration: none;
        color: #222222;
        transition: background-color 0.3s ease;
    }
    
    .mobile-menu-item:hover {
        background-color: #f7f7f7;
    }
    
    .mobile-menu-item i {
        width: 20px;
        color: #717171;
    }
    
    .category-card,
    .destination-card,
    .experience-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .category-card.animate-in,
    .destination-card.animate-in,
    .experience-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .navbar {
        transition: all 0.3s ease;
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .toast-content i {
        font-size: 16px;
    }
`;

document.head.appendChild(style); 