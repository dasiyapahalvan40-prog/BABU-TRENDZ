// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // Global State
const state = {
    cart: [],
    wishlist: [],
    products: [
        {
            id: 1,
            name: "Premium Wool Coat",
            price: 2999,
            originalPrice: 5999,
            discount: 50,
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "men",
            rating: 4.8,
            reviews: 124,
            amazonLink: "https://amazon.in/dp/B08N5WRWNW"
        },
        {
            id: 2,
            name: "Silk Blend Blazer",
            price: 2499,
            originalPrice: 4999,
            discount: 50,
            image: "https://images.unsplash.com/photo-1593778451990-0d8b114c3a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "men",
            rating: 4.7,
            reviews: 89,
            amazonLink: "https://amazon.in/dp/B09K2R7Q5S"
        },
        {
            id: 3,
            name: "Cashmere Sweater",
            price: 1899,
            originalPrice: 3999,
            discount: 52,
            image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "women",
            rating: 4.9,
            reviews: 156,
            amazonLink: "https://amazon.in/dp/B07XJ8G5N2"
        },
        {
            id: 4,
            name: "Leather Handbag",
            price: 3499,
            originalPrice: 6999,
            discount: 50,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "women",
            rating: 4.6,
            reviews: 203,
            amazonLink: "https://amazon.in/dp/B08L5M7N3P"
        },
        {
            id: 5,
            name: "Kids Denim Jacket",
            price: 1299,
            originalPrice: 2599,
            discount: 50,
            image: "https://images.unsplash.com/photo-1507842217343-583bb7278b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "kids",
            rating: 4.8,
            reviews: 67,
            amazonLink: "https://amazon.in/dp/B09M8K2L4R"
        },
        {
            id: 6,
            name: "Trendy Hoodie",
            price: 999,
            originalPrice: 1999,
            discount: 50,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "men",
            rating: 4.5,
            reviews: 234,
            amazonLink: "https://amazon.in/dp/B07Z5N6M2Q"
        }
    ],
    searchSuggestions: ['hoodie', 'jacket', 'dress', 'jeans', 'sneakers', 'blazer']
};

// DOM Elements
const elements = {
    loader: document.getElementById('loader'),
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    searchSuggestions: document.getElementById('searchSuggestions'),
    themeToggle: document.getElementById('themeToggle'),
    loginBtn: document.getElementById('loginBtn'),
    loginModal: document.getElementById('loginModal'),
    closeLogin: document.getElementById('closeLogin'),
    cartBtn: document.getElementById('cartBtn'),
    cartCount: document.getElementById('cartCount'),
    cartSidebar: document.getElementById('cartSidebar'),
    closeCart: document.getElementById('closeCart'),
    wishlistBtn: document.getElementById('wishlistBtn'),
    wishlistCount: document.getElementById('wishlistCount'),
    wishlistSidebar: document.getElementById('wishlistSidebar'),
    closeWishlist: document.getElementById('closeWishlist'),
    hamburger: document.getElementById('hamburger'),
    mobileMenu: document.getElementById('mobileMenu'),
    menuClose: document.getElementById('menuClose'),
    heroDots: document.querySelectorAll('.hero-dot'),
    heroSlides: document.querySelectorAll('.hero-slide'),
    discountPopup: document.getElementById('discountPopup'),
    popupClose: document.getElementById('popupClose'),
    trendingProducts: document.getElementById('trendingProducts')
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    hideLoader();
    initTheme();
    initHeroSlider();
    loadTrendingProducts();
    initEventListeners();
    showDiscountPopup();
    updateCartUI();
    updateWishlistUI();
}

// Loader
function hideLoader() {
    setTimeout(() => {
        elements.loader.classList.add('hidden');
    }, 1500);
}

// Theme Toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

elements.themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    elements.themeToggle.innerHTML = isDark ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
});

// Hero Slider
function initHeroSlider() {
    let currentSlide = 0;
    const totalSlides = elements.heroSlides.length;

    function showSlide(index) {
        elements.heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        elements.heroDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    elements.heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 5000);
}

// Search Functionality
elements.searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    showSearchSuggestions(query);
});

function showSearchSuggestions(query) {
    if (query.length === 0) {
        elements.searchSuggestions.classList.remove('show');
        return;
    }

    const suggestions = state.searchSuggestions
        .filter(suggestion => suggestion.includes(query))
        .slice(0, 5);

    elements.searchSuggestions.innerHTML = suggestions
        .map(suggestion => 
            `<div class="suggestion-item">${suggestion}</div>`
        ).join('');

    elements.searchSuggestions.classList.add('show');
}

document.addEventListener('click', function(e) {
    if (!elements.navSearch.contains(e.target)) {
        elements.searchSuggestions.classList.remove('show');
    }
});

// Product Rendering
function renderProducts(container, products = state.products, limit = 6) {
    container.innerHTML = products.slice(0, limit).map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-actions">
                    <button class="btn-wishlist" data-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="btn-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
                ${product.discount ? `<div class="discount-badge">${product.discount}% OFF</div>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    <i class="fas fa-star"></i>
                    <span>${product.rating}</span>
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="price">₹${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                </div>
                <div class="product-buttons">
                    <button class="btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <a href="${product.amazonLink}" class="btn-secondary amazon-buy" target="_blank">
                        <i class="fab fa-amazon"></i> Buy on Amazon
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

function loadTrendingProducts() {
    if (elements.trendingProducts) {
        renderProducts(elements.trendingProducts);
        initProductListeners();
    }
}

// Cart & Wishlist
function addToCart(productId) {
    const product = state.products.find(p => p.id === productId);
    const existingItem = state.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showNotification('Added to cart!', 'success');
}

function addToWishlist(productId) {
    const product = state.products.find(p => p.id === productId);
    const existingItem = state.wishlist.find(item => item.id === productId);
    
    if (existingItem) {
        state.wishlist = state.wishlist.filter(item => item.id !== productId);
        showNotification('Removed from wishlist!', 'info');
    } else {
        state.wishlist.push(product);
        showNotification('Added to wishlist!', 'success');
    }
    
    updateWishlistUI();
}

function updateCartUI() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = totalItems;
    elements.cartCount.style.display = totalItems > 0 ? 'block' : 'none';
}

function updateWishlistUI() {
    const totalItems = state.wishlist.length;
    elements.wishlistCount.textContent = totalItems;
    elements.wishlistCount.style.display = totalItems > 0 ? 'block' : 'none';
}

function renderCart() {
    const cartItemsEl = document.getElementById('cartItems');
    if (state.cart.length === 0) {
        cartItemsEl.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
        return;
    }

    cartItemsEl.innerHTML = state.cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">₹${item.price}</div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');

    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = `₹${total}`;
}

function renderWishlist() {
    const wishlistItemsEl = document.getElementById('wishlistItems');
    if (state.wishlist.length === 0) {
        wishlistItemsEl.innerHTML = '<p style="text-align: center; padding: 2rem;">Your wishlist is empty</p>';
        return;
    }

    wishlistItemsEl.innerHTML = state.wishlist.map(item => `
        <div class="wishlist-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="wishlist-item-info">
                <h4>${item.name}</h4>
                <div class="wishlist-item-price">₹${item.price}</div>
            </div>
            <div class="wishlist-actions">
                <button class="btn-cart" onclick="addToCart(${item.id})">
                    <i class="fas fa-shopping-cart"></i>
                </button>
                <button class="btn-remove" onclick="removeFromWishlist(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function updateQuantity(productId, change) {
    const item = state.cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            renderCart();
            updateCartUI();
        }
    }
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    renderCart();
    updateCartUI();
}

function removeFromWishlist(productId) {
    state.wishlist = state.wishlist.filter(item => item.id !== productId);
    renderWishlist();
    updateWishlistUI();
}

// Event Listeners
function initEventListeners() {
    // Login Modal
    elements.loginBtn.addEventListener('click', () => {
        elements.loginModal.style.display = 'flex';
    });

    elements.closeLogin.addEventListener('click', () => {
        elements.loginModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === elements.loginModal) {
            elements.loginModal.style.display = 'none';
        }
    });

    // Cart Sidebar
    elements.cartBtn.addEventListener('click', () => {
        elements.cartSidebar.classList.add('active');
        renderCart();
    });

    elements.closeCart.addEventListener('click', () => {
        elements.cartSidebar.classList.remove('active');
    });

    // Wishlist Sidebar
    elements.wishlistBtn.addEventListener('click', () => {
        elements.wishlistSidebar.classList.add('active');
        renderWishlist();
    });

    elements.closeWishlist.addEventListener('click', () => {
        elements.wishlistSidebar.classList.remove('active');
    });

    // Mobile Menu
    elements.hamburger.addEventListener('click', () => {
        elements.mobileMenu.classList.add('active');
    });

    elements.menuClose.addEventListener('click', () => {
        elements.mobileMenu.classList.remove('active');
    });

    // Checkout
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('checkout-btn')) {
            alert('Redirecting to checkout... (Demo)');
        }
    });

    // Auth Form
    document.querySelector('.auth-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login successful! (Demo)');
        elements.loginModal.style.display = 'none';
    });
}

function initProductListeners() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }

        if (e.target.closest('.btn-wishlist')) {
            const productId = parseInt(e.target.closest('.btn-wishlist').dataset.id);
            addToWishlist(productId);
        }

        if (e.target.classList.contains('btn-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });
}

// Notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Discount Popup
function showDiscountPopup() {
    setTimeout(() => {
        elements.discountPopup.classList.add('show');
    }, 3000);

    elements.popupClose.addEventListener('click', () => {
        elements.discountPopup.classList.remove('show');
    });

    elements.discountPopup.querySelector('.btn-primary').addEventListener('click', () => {
        elements.discountPopup.classList.remove('show');
        showNotification('Use code BABU60 at checkout!', 'success');
    });
}

// Expose functions globally for dynamic HTML
window.addToCart = addToCart;
window.addToWishlist = addToWishlist;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.removeFromWishlist = removeFromWishlist;
  });
