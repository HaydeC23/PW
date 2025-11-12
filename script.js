// Estado global de la aplicación
let currentUser = null;
let cart = [];
let products = [];
let currentSlideIndex = 0;

// Productos iniciales
const initialProducts = [
    {
        id: 1,
        name: "Cupcakes de Vainilla",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
        description: "Deliciosos cupcakes de vainilla con frosting de crema de mantequilla y decoraciones coloridas."
    },
    {
        id: 2,
        name: "Torta de Chocolate",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
        description: "Torta de chocolate húmeda con ganache de chocolate oscuro y fresas frescas."
    },
    {
        id: 3,
        name: "Galletas Decoradas",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=300&fit=crop",
        description: "Galletas artesanales decoradas con glaseado real en diseños únicos y coloridos."
    },
    {
        id: 4,
        name: "Macarons Franceses",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=300&fit=crop",
        description: "Macarons auténticos con rellenos de ganache en sabores de frambuesa, chocolate y vainilla."
    },
    {
        id: 5,
        name: "Cheesecake de Frutos Rojos",
        price: 38.99,
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop",
        description: "Cremoso cheesecake con base de galleta y topping de frutos rojos frescos."
    },
    {
        id: 6,
        name: "Donuts Glaseadas",
        price: 18.99,
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
        description: "Donuts esponjosas con glaseados de colores y sprinkles divertidos."
    }
];

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing app...');
    initializeApp();
    setupEventListeners();
    initializeCarousel();
    startCarousel();
    addProductCardStyles();
    addSpecialNotificationStyles();
    setupCarouselInteractions();
    console.log('App initialized successfully');
});

// Configurar interacciones del carrusel
function setupCarouselInteractions() {
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        // Pausar al pasar el mouse
        carouselContainer.addEventListener('mouseenter', () => {
            pauseCarousel();
        });
        
        // Reanudar al quitar el mouse
        carouselContainer.addEventListener('mouseleave', () => {
            resumeCarousel();
        });
        
        // Pausar al tocar en móviles
        carouselContainer.addEventListener('touchstart', () => {
            pauseCarousel();
        });
        
        carouselContainer.addEventListener('touchend', () => {
            setTimeout(() => {
                resumeCarousel();
            }, 3000);
        });
    }
}

function initializeApp() {
    // Cargar productos desde localStorage o usar productos iniciales
    const savedProducts = localStorage.getItem('bakeryProducts');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    } else {
        products = [...initialProducts];
        saveProducts();
    }

    // Cargar carrito desde localStorage
    const savedCart = localStorage.getItem('bakeryCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }

    // Cargar usuario desde localStorage
    const savedUser = localStorage.getItem('bakeryUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserUI();
    }

    renderProducts();
}

function setupEventListeners() {
    // Botones del header
    const loginBtn = document.getElementById('loginBtn');
    const cartBtn = document.getElementById('cartBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLoginClick);
    } else {
        console.error('Login button not found');
    }
    
    if (cartBtn) {
        cartBtn.addEventListener('click', showCart);
    } else {
        console.error('Cart button not found');
    }

    // Modales
    setupModalListeners();

    // Formularios
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const productForm = document.getElementById('productForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    if (productForm) {
        productForm.addEventListener('submit', handleAddProduct);
    }

    // Enlace de registro
    const registerLink = document.getElementById('registerLink');
    if (registerLink) {
        registerLink.addEventListener('click', showRegisterModal);
    }

    // Botón de checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    // Panel de administración
    setupAdminPanel();
    
    // Botón de agregar producto en header
    setupQuickAddProduct();
}

function setupModalListeners() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.closest('.modal').style.display = 'none';
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
}

// Funciones del carrusel mejorado
let carouselInterval;
let progressInterval;

function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.pagination-dot');

    // Remover todas las clases active
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Activar el primer slide
    if (slides.length > 0) {
        slides[0].classList.add('active');
        if (dots.length > 0) {
            dots[0].classList.add('active');
        }
        currentSlideIndex = 0;
    }

    // Agregar efecto de mouse tracking
    slides.forEach(slide => {
        slide.addEventListener('mousemove', (e) => {
            const rect = slide.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            slide.style.setProperty('--mouse-x', `${x}%`);
            slide.style.setProperty('--mouse-y', `${y}%`);
        });
    });
}

function startCarousel() {
    const duration = 5000; // 5 segundos
    let progress = 0;
    
    // Limpiar intervalos existentes
    if (carouselInterval) clearInterval(carouselInterval);
    if (progressInterval) clearInterval(progressInterval);
    
    // Intervalo para cambiar slides
    carouselInterval = setInterval(() => {
        const hero = document.querySelector('.hero');
        if (hero && !hero.classList.contains('hidden')) {
            changeSlide(1);
        }
    }, duration);
    
    // Intervalo para la barra de progreso
    progressInterval = setInterval(() => {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progress += 1;
            progressBar.style.width = `${(progress / (duration / 100)) * 100}%`;
            
            if (progress >= duration / 100) {
                progress = 0;
            }
        }
    }, 100);
}

function pauseCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
    if (progressInterval) {
        clearInterval(progressInterval);
    }
}

function resumeCarousel() {
    pauseCarousel();
    startCarousel();
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.pagination-dot');

    if (slides.length === 0) return;

    // Remover clase active del slide actual
    slides[currentSlideIndex].classList.remove('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.remove('active');
    }

    // Calcular nuevo índice
    currentSlideIndex += direction;

    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }

    // Agregar clase active al nuevo slide
    slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }

    // Reiniciar progreso
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = '0%';
    }
    
    // Reiniciar el carrusel
    resumeCarousel();
}

function currentSlideSet(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.pagination-dot');

    if (slides.length === 0) return;

    // Remover clase active del slide actual
    slides[currentSlideIndex].classList.remove('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.remove('active');
    }

    // Establecer nuevo índice (n viene de 1-based, convertir a 0-based)
    currentSlideIndex = n - 1;

    // Validar que el índice esté en rango
    if (currentSlideIndex < 0) currentSlideIndex = 0;
    if (currentSlideIndex >= slides.length) currentSlideIndex = slides.length - 1;

    // Agregar clase active al nuevo slide
    slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }

    // Reiniciar progreso
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = '0%';
    }
    
    // Reiniciar el carrusel
    resumeCarousel();
}

// Función para scroll suave a productos
function scrollToProducts() {
    const productosSection = document.getElementById('productos');
    if (productosSection) {
        productosSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Funciones de productos
function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <button class="btn-add-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i>
                Agregar al Carrito
            </button>
        </div>
    `;
    return card;
}

function handleAddProduct(e) {
    e.preventDefault();

    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const image = document.getElementById('productImage').value;
    const description = document.getElementById('productDescription').value;

    const newProduct = {
        id: Date.now(),
        name,
        price,
        image,
        description
    };

    products.push(newProduct);
    saveProducts();
    renderProducts();

    // Limpiar formulario
    document.getElementById('productForm').reset();

    showNotification('Producto agregado exitosamente', 'success');
}

function saveProducts() {
    localStorage.setItem('bakeryProducts', JSON.stringify(products));
}

// Funciones del carrito
function addToCart(productId) {
    if (!currentUser) {
        showLoginModal();
        return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showNotification('Producto agregado al carrito', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderCartItems();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartUI();
        renderCartItems();
    }
}

function saveCart() {
    localStorage.setItem('bakeryCart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function showCart() {
    if (!currentUser) {
        showLoginModal();
        return;
    }

    renderCartItems();
    document.getElementById('cartModal').style.display = 'block';
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">Tu carrito está vacío</p>';
        cartTotal.textContent = '0.00';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" 
                           onchange="updateQuantity(${item.id}, parseInt(this.value))" min="1">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
}

function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'error');
        return;
    }

    // Simular proceso de pago
    showNotification('¡Compra realizada exitosamente! Gracias por tu pedido.', 'success');

    // Limpiar carrito
    cart = [];
    saveCart();
    updateCartUI();

    // Cerrar modal
    document.getElementById('cartModal').style.display = 'none';
}

// Funciones de autenticación
function handleLoginClick() {
    console.log('Login button clicked, currentUser:', currentUser);
    if (currentUser) {
        logout();
    } else {
        showLoginModal();
    }
}

function showLoginModal() {
    console.log('Showing login modal');
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
        console.log('Login modal displayed');
    } else {
        console.error('Login modal not found');
    }
}

function showRegisterModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('registerModal').style.display = 'block';
}

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulación de login (en una app real, esto sería una llamada al servidor)
    if (email && password) {
        currentUser = {
            email: email,
            name: email.split('@')[0],
            isAdmin: email === 'admin@dulceencanto.com'
        };

        localStorage.setItem('bakeryUser', JSON.stringify(currentUser));
        updateUserUI();
        document.getElementById('loginModal').style.display = 'none';
        showNotification('¡Bienvenido de vuelta!', 'success');

        // Limpiar formulario
        document.getElementById('loginForm').reset();
    }
}

function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (name && email && password) {
        currentUser = {
            email: email,
            name: name,
            isAdmin: false
        };

        localStorage.setItem('bakeryUser', JSON.stringify(currentUser));
        updateUserUI();
        document.getElementById('registerModal').style.display = 'none';
        showNotification('¡Cuenta creada exitosamente!', 'success');

        // Limpiar formulario
        document.getElementById('registerForm').reset();
    }
}

function logout() {
    currentUser = null;
    cart = [];
    localStorage.removeItem('bakeryUser');
    localStorage.removeItem('bakeryCart');
    updateUserUI();
    updateCartUI();
    showNotification('Sesión cerrada exitosamente', 'success');
}

function updateUserUI() {
    const loginBtn = document.getElementById('loginBtn');
    const loginText = document.getElementById('loginText');
    const adminPanel = document.getElementById('adminPanel');
    const addProductBtn = document.getElementById('addProductBtn');

    if (currentUser) {
        loginText.textContent = `Cerrar Sesión (${currentUser.name})`;
        loginBtn.classList.add('user-logged-in');
        document.body.classList.add('user-logged-in');

        // Mostrar panel de admin si es administrador
        if (currentUser.isAdmin) {
            adminPanel.style.display = 'block';
            if (addProductBtn) {
                addProductBtn.style.display = 'flex'; // Mostrar botón de agregar producto
            }
        }
    } else {
        loginText.textContent = 'Iniciar Sesión';
        loginBtn.classList.remove('user-logged-in');
        document.body.classList.remove('user-logged-in');
        adminPanel.style.display = 'none';
        if (addProductBtn) {
            addProductBtn.style.display = 'none'; // Ocultar botón de agregar producto
        }
    }
}

// Función de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00b894' : type === 'error' ? '#d63031' : '#0984e3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;

    // Agregar estilos de animación si no existen
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Funciones globales para el carrusel (llamadas desde HTML)
window.changeSlide = changeSlide;
window.currentSlide = function (n) {
    currentSlideSet(n);
};
window.scrollToProducts = scrollToProducts;

// Funciones globales para el carrito (llamadas desde HTML)
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;

// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Comportamiento del carrusel al hacer scroll
let isCarouselHidden = false;
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const scrollDirection = scrolled > lastScrollTop ? 'down' : 'up';
    
    if (hero) {
        // Ocultar carrusel cuando se hace scroll significativo hacia abajo
        if (scrolled > 300 && scrollDirection === 'down') {
            if (!isCarouselHidden) {
                hero.classList.add('hidden');
                pauseCarousel();
                isCarouselHidden = true;
            }
        } else if (scrolled < 100) {
            if (isCarouselHidden) {
                hero.classList.remove('hidden');
                resumeCarousel();
                isCarouselHidden = false;
            }
        }
    }
    
    lastScrollTop = scrolled;
});

// Animación de aparición de productos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar productos cuando se cargan
function observeProducts() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Llamar después de renderizar productos
setTimeout(observeProducts, 100);

// Funciones del panel de administración mejorado
function setupAdminPanel() {
    // Tabs del panel de administración
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remover clase active de todos los tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activar tab seleccionado
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Cargar contenido específico del tab
            if (targetTab === 'manage-products') {
                loadProductsManager();
            }
        });
    });
    
    // Botón de vista previa
    document.getElementById('previewProduct').addEventListener('click', showProductPreview);
    
    // Búsqueda y filtros en el gestor
    document.getElementById('searchProducts').addEventListener('input', filterProducts);
    document.getElementById('filterCategory').addEventListener('change', filterProducts);
    
    // Toggle del panel de administración
    document.getElementById('toggleAdminPanel').addEventListener('click', toggleAdminPanel);
}

function toggleAdminPanel() {
    const adminContent = document.querySelector('.admin-content');
    const toggleBtn = document.getElementById('toggleAdminPanel');
    const icon = toggleBtn.querySelector('i');
    
    if (adminContent.style.display === 'none') {
        adminContent.style.display = 'block';
        icon.className = 'fas fa-chevron-up';
    } else {
        adminContent.style.display = 'none';
        icon.className = 'fas fa-chevron-down';
    }
}

function showProductPreview() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value;
    const description = document.getElementById('productDescription').value;
    const ingredients = document.getElementById('productIngredients').value;
    
    if (!name || !price || !image || !description) {
        showNotification('Por favor completa los campos obligatorios', 'error');
        return;
    }
    
    const previewContent = document.getElementById('previewContent');
    previewContent.innerHTML = `
        <div class="preview-card">
            <img src="${image}" alt="${name}" onerror="this.src='https://via.placeholder.com/400x300?text=Imagen+no+disponible'">
            <div class="preview-info">
                <h3 class="preview-name">${name}</h3>
                <p class="preview-price">$${parseFloat(price).toFixed(2)}</p>
                ${category ? `<span class="preview-category">${getCategoryName(category)}</span>` : ''}
                <p class="preview-description">${description}</p>
                ${ingredients ? `
                    <div class="preview-ingredients">
                        <h6>Ingredientes:</h6>
                        <p>${ingredients}</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    document.getElementById('previewModal').style.display = 'block';
}

function getCategoryName(category) {
    const categories = {
        'cupcakes': 'Cupcakes',
        'tortas': 'Tortas',
        'galletas': 'Galletas',
        'macarons': 'Macarons',
        'donuts': 'Donuts',
        'cheesecakes': 'Cheesecakes',
        'otros': 'Otros'
    };
    return categories[category] || category;
}

function handleAddProduct(e) {
    e.preventDefault();
    
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value;
    const description = document.getElementById('productDescription').value;
    const ingredients = document.getElementById('productIngredients').value;
    
    // Validar imagen
    if (!isValidImageUrl(image)) {
        showNotification('Por favor ingresa una URL de imagen válida', 'error');
        return;
    }
    
    const newProduct = {
        id: Date.now(),
        name,
        price,
        category,
        image,
        description,
        ingredients: ingredients || null,
        dateAdded: new Date().toISOString()
    };
    
    products.push(newProduct);
    saveProducts();
    renderProducts();
    
    // Limpiar formulario
    document.getElementById('productForm').reset();
    
    showNotification('Producto agregado exitosamente', 'success');
    
    // Actualizar gestor si está activo
    if (document.getElementById('manage-products').classList.contains('active')) {
        loadProductsManager();
    }
}

function isValidImageUrl(url) {
    try {
        new URL(url);
        return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) || url.includes('unsplash.com') || url.includes('images.');
    } catch {
        return false;
    }
}

function loadProductsManager() {
    const managerList = document.getElementById('productsManagerList');
    
    if (products.length === 0) {
        managerList.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">No hay productos agregados</p>';
        return;
    }
    
    managerList.innerHTML = products.map(product => `
        <div class="product-item" data-id="${product.id}" data-category="${product.category || ''}">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/60x60?text=?'">
            <div class="product-item-info">
                <div class="product-item-name">${product.name}</div>
                <div class="product-item-price">$${product.price.toFixed(2)}</div>
                ${product.category ? `<small>${getCategoryName(product.category)}</small>` : ''}
            </div>
            <div class="product-item-actions">
                <button class="btn-edit" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function filterProducts() {
    const searchTerm = document.getElementById('searchProducts').value.toLowerCase();
    const categoryFilter = document.getElementById('filterCategory').value;
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        const name = item.querySelector('.product-item-name').textContent.toLowerCase();
        const category = item.getAttribute('data-category');
        
        const matchesSearch = name.includes(searchTerm);
        const matchesCategory = !categoryFilter || category === categoryFilter;
        
        if (matchesSearch && matchesCategory) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Llenar el formulario con los datos del producto
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category || '';
    document.getElementById('productImage').value = product.image;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productIngredients').value = product.ingredients || '';
    
    // Cambiar al tab de agregar producto
    document.querySelector('[data-tab="add-product"]').click();
    
    // Cambiar el botón de submit temporalmente
    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Actualizar Producto';
    submitBtn.style.background = 'linear-gradient(135deg, #fdcb6e, #e17055)';
    
    // Remover el producto actual para que se reemplace
    products = products.filter(p => p.id !== productId);
    
    // Restaurar el botón después de un tiempo
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
    }, 10000);
    
    showNotification('Producto cargado para edición', 'info');
}

function deleteProduct(productId) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        products = products.filter(p => p.id !== productId);
        saveProducts();
        renderProducts();
        loadProductsManager();
        showNotification('Producto eliminado exitosamente', 'success');
    }
}

// Mejorar la función de renderizado de productos
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" 
             onerror="this.src='https://via.placeholder.com/400x300?text=Imagen+no+disponible'">
        <div class="product-info">
            ${product.category ? `<span class="product-category">${getCategoryName(product.category)}</span>` : ''}
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            ${product.ingredients ? `
                <div class="product-ingredients">
                    <small><strong>Ingredientes:</strong> ${product.ingredients}</small>
                </div>
            ` : ''}
            <button class="btn-add-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i>
                Agregar al Carrito
            </button>
        </div>
    `;
    return card;
}

// Agregar estilos para las categorías en las tarjetas de productos
function addProductCardStyles() {
    if (!document.getElementById('productCardStyles')) {
        const style = document.createElement('style');
        style.id = 'productCardStyles';
        style.textContent = `
            .product-category {
                background: #e17055;
                color: white;
                padding: 0.3rem 0.8rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 500;
                display: inline-block;
                margin-bottom: 0.5rem;
            }
            
            .product-ingredients {
                background: #f8f9fa;
                padding: 0.8rem;
                border-radius: 8px;
                margin: 1rem 0;
            }
            
            .product-ingredients small {
                color: #636e72;
                line-height: 1.4;
            }
        `;
        document.head.appendChild(style);
    }
}

// Función de estilos ya llamada en la inicialización principal

// Funciones de gestión de productos eliminadas - ahora solo se usa el modal rápido del header

// Funciones para Agregar Producto Rápido desde Header


function toggleProductForm() {
    const container = document.getElementById('productFormContainer');
    const button = document.getElementById('toggleProductForm');
    const icon = button.querySelector('i');
    
    if (container.style.display === 'none') {
        container.style.display = 'block';
        button.innerHTML = '<i class="fas fa-minus"></i> Cerrar Formulario';
        button.style.background = 'rgba(214, 48, 49, 0.2)';
    } else {
        container.style.display = 'none';
        button.innerHTML = '<i class="fas fa-plus"></i> Nuevo Producto';
        button.style.background = 'rgba(255,255,255,0.2)';
    }
}

function handleNewProduct(e) {
    e.preventDefault();
    
    const name = document.getElementById('newProductName').value.trim();
    const price = parseFloat(document.getElementById('newProductPrice').value);
    const category = document.getElementById('newProductCategory').value;
    const image = document.getElementById('newProductImage').value.trim();
    const description = document.getElementById('newProductDescription').value.trim();
    
    // Validaciones
    if (!name || !price || !image || !description) {
        showNotification('Por favor completa todos los campos obligatorios', 'error');
        return;
    }
    
    if (price <= 0) {
        showNotification('El precio debe ser mayor a 0', 'error');
        return;
    }
    
    if (!isValidImageUrl(image)) {
        showNotification('Por favor ingresa una URL de imagen válida', 'error');
        return;
    }
    
    // Crear nuevo producto
    const newProduct = {
        id: Date.now(),
        name: name,
        price: price,
        category: category || 'otros',
        image: image,
        description: description,
        dateAdded: new Date().toISOString(),
        isActive: true
    };
    
    // Agregar a la lista de productos
    products.push(newProduct);
    saveProducts();
    
    // Actualizar vistas
    renderProducts();
    loadProductsGallery();
    
    // Limpiar formulario
    clearProductForm();
    
    // Cerrar formulario
    toggleProductForm();
    
    showNotification('¡Producto agregado exitosamente!', 'success');
}

function clearProductForm() {
    document.getElementById('newProductForm').reset();
    showNotification('Formulario limpiado', 'info');
}

function testProductImage() {
    const imageUrl = document.getElementById('newProductImage').value.trim();
    
    if (!imageUrl) {
        showNotification('Por favor ingresa una URL de imagen', 'error');
        return;
    }
    
    const modal = document.getElementById('imageTestModal');
    const content = document.getElementById('imageTestContent');
    
    content.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #e17055;"></i>
            <p>Cargando imagen...</p>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Crear imagen para probar
    const img = new Image();
    
    img.onload = function() {
        content.innerHTML = `
            <img src="${imageUrl}" alt="Vista previa" class="test-image-preview">
            <div class="image-test-info">
                <p class="image-test-success">
                    <i class="fas fa-check-circle"></i> 
                    Imagen cargada correctamente
                </p>
                <p><strong>Dimensiones:</strong> ${this.naturalWidth} x ${this.naturalHeight}px</p>
                <p><strong>URL:</strong> ${imageUrl}</p>
            </div>
        `;
    };
    
    img.onerror = function() {
        content.innerHTML = `
            <div class="image-test-info">
                <p class="image-test-error">
                    <i class="fas fa-exclamation-triangle"></i> 
                    No se pudo cargar la imagen
                </p>
                <p>Verifica que la URL sea correcta y que la imagen esté disponible.</p>
                <p><strong>URL probada:</strong> ${imageUrl}</p>
            </div>
        `;
    };
    
    img.src = imageUrl;
}

function showNewProductPreview() {
    const name = document.getElementById('newProductName').value.trim();
    const price = document.getElementById('newProductPrice').value;
    const category = document.getElementById('newProductCategory').value;
    const image = document.getElementById('newProductImage').value.trim();
    const description = document.getElementById('newProductDescription').value.trim();
    
    if (!name || !price || !image || !description) {
        showNotification('Por favor completa los campos obligatorios para ver la vista previa', 'error');
        return;
    }
    
    const previewContent = document.getElementById('newProductPreviewContent');
    previewContent.innerHTML = `
        <div class="gallery-product-card" style="max-width: 400px; margin: 0 auto;">
            <img src="${image}" alt="${name}" class="gallery-product-image" 
                 onerror="this.src='https://via.placeholder.com/400x220?text=Imagen+no+disponible'">
            <div class="gallery-product-info">
                ${category ? `<span class="gallery-product-category">${getCategoryName(category)}</span>` : ''}
                <h3 class="gallery-product-name">${name}</h3>
                <p class="gallery-product-price">$${parseFloat(price).toFixed(2)}</p>
                <p class="gallery-product-description">${description}</p>
                <div class="gallery-product-actions">
                    <button class="btn-add-cart" style="width: 100%;">
                        <i class="fas fa-shopping-cart"></i>
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('newProductPreviewModal').style.display = 'block';
}

function loadProductsGallery() {
    const galleryGrid = document.getElementById('productsGalleryGrid');
    
    if (products.length === 0) {
        galleryGrid.innerHTML = `
            <div class="gallery-empty">
                <i class="fas fa-store-slash"></i>
                <h3>No hay productos agregados</h3>
                <p>Usa el formulario de arriba para agregar tu primer producto</p>
            </div>
        `;
        return;
    }
    
    galleryGrid.innerHTML = products.map(product => `
        <div class="gallery-product-card" data-id="${product.id}" data-category="${product.category || ''}" data-name="${product.name.toLowerCase()}">
            <img src="${product.image}" alt="${product.name}" class="gallery-product-image" 
                 onerror="this.src='https://via.placeholder.com/400x220?text=Imagen+no+disponible'">
            <div class="gallery-product-info">
                ${product.category ? `<span class="gallery-product-category">${getCategoryName(product.category)}</span>` : ''}
                <h3 class="gallery-product-name">${product.name}</h3>
                <p class="gallery-product-price">$${product.price.toFixed(2)}</p>
                <p class="gallery-product-description">${product.description}</p>
                <div class="gallery-product-actions">
                    <button class="btn-edit-gallery" onclick="editGalleryProduct(${product.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-delete-gallery" onclick="deleteGalleryProduct(${product.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterGalleryProducts() {
    const searchTerm = document.getElementById('searchGallery').value.toLowerCase();
    const categoryFilter = document.getElementById('filterGallery').value;
    const productCards = document.querySelectorAll('.gallery-product-card');
    
    productCards.forEach(card => {
        const name = card.getAttribute('data-name');
        const category = card.getAttribute('data-category');
        
        const matchesSearch = name.includes(searchTerm);
        const matchesCategory = !categoryFilter || category === categoryFilter;
        
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            card.style.animation = 'bounceIn 0.6s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

function editGalleryProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Mostrar formulario si está oculto
    const container = document.getElementById('productFormContainer');
    if (container.style.display === 'none') {
        toggleProductForm();
    }
    
    // Llenar formulario con datos del producto
    document.getElementById('newProductName').value = product.name;
    document.getElementById('newProductPrice').value = product.price;
    document.getElementById('newProductCategory').value = product.category || '';
    document.getElementById('newProductImage').value = product.image;
    document.getElementById('newProductDescription').value = product.description;
    
    // Cambiar el botón de submit temporalmente
    const submitBtn = document.querySelector('.btn-add-product');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Actualizar Producto';
    submitBtn.style.background = 'linear-gradient(135deg, #fdcb6e, #e17055)';
    
    // Remover el producto actual para que se reemplace
    products = products.filter(p => p.id !== productId);
    saveProducts();
    
    // Scroll al formulario
    document.getElementById('productFormContainer').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
    
    // Restaurar el botón después de un tiempo o cuando se envíe el formulario
    const restoreButton = () => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';
    };
    
    setTimeout(restoreButton, 15000); // Auto-restaurar después de 15 segundos
    
    showNotification('Producto cargado para edición', 'info');
}

function deleteGalleryProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`)) {
        products = products.filter(p => p.id !== productId);
        saveProducts();
        renderProducts();
        loadProductsGallery();
        showNotification('Producto eliminado exitosamente', 'success');
    }
}

// Mejorar la función getCategoryName
function getCategoryName(category) {
    const categories = {
        'cupcakes': '🧁 Cupcakes',
        'tortas': '🎂 Tortas',
        'galletas': '🍪 Galletas',
        'macarons': '🌈 Macarons',
        'donuts': '🍩 Donuts',
        'cheesecakes': '🍰 Cheesecakes',
        'brownies': '🍫 Brownies',
        'muffins': '🧁 Muffins',
        'otros': '🍯 Otros'
    };
    return categories[category] || category;
}

// Configuración de gestión de productos ya incluida en la inicialización principal

// Funciones para Agregar Producto Rápido desde Header
function setupQuickAddProduct() {
    // Botón del header
    document.getElementById('addProductBtn').addEventListener('click', showQuickAddModal);
    
    // Formulario rápido
    document.getElementById('quickProductForm').addEventListener('submit', handleQuickAddProduct);
    
    // Botones de acción
    document.getElementById('quickClearForm').addEventListener('click', clearQuickForm);
    document.getElementById('quickPreviewProduct').addEventListener('click', showQuickPreview);
    document.getElementById('quickTestImage').addEventListener('click', quickTestImage);
    
    // Test de imagen en tiempo real
    document.getElementById('quickProductImage').addEventListener('blur', quickTestImageAuto);
}

function showQuickAddModal() {
    document.getElementById('quickAddProductModal').style.display = 'block';
    // Focus en el primer campo
    setTimeout(() => {
        document.getElementById('quickProductName').focus();
    }, 100);
}

function handleQuickAddProduct(e) {
    e.preventDefault();
    
    const name = document.getElementById('quickProductName').value.trim();
    const price = parseFloat(document.getElementById('quickProductPrice').value);
    const image = document.getElementById('quickProductImage').value.trim();
    const category = document.getElementById('quickProductCategory').value;
    const description = document.getElementById('quickProductDescription').value.trim();
    
    // Validaciones
    if (!name || !price || !image || !description) {
        showNotification('Por favor completa todos los campos obligatorios', 'error');
        return;
    }
    
    if (price <= 0) {
        showNotification('El precio debe ser mayor a 0', 'error');
        return;
    }
    
    if (!isValidImageUrl(image)) {
        showNotification('Por favor ingresa una URL de imagen válida', 'error');
        return;
    }
    
    // Crear nuevo producto
    const newProduct = {
        id: Date.now(),
        name: name,
        price: price,
        category: category || 'otros',
        image: image,
        description: description,
        dateAdded: new Date().toISOString(),
        isActive: true,
        addedFrom: 'quick-header'
    };
    
    // Agregar a la lista de productos
    products.push(newProduct);
    saveProducts();
    
    // Actualizar todas las vistas
    renderProducts();
    if (typeof loadProductsGallery === 'function') {
        loadProductsGallery();
    }
    
    // Limpiar y cerrar modal
    clearQuickForm();
    document.getElementById('quickAddProductModal').style.display = 'none';
    
    // Mostrar notificación de éxito con animación especial
    showNotification('¡Producto agregado exitosamente! 🎉', 'success');
    
    // Scroll suave a la sección de productos
    setTimeout(() => {
        document.getElementById('productos').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 500);
}

function clearQuickForm() {
    document.getElementById('quickProductForm').reset();
    document.getElementById('quickImagePreview').innerHTML = '';
    showNotification('Formulario limpiado', 'info');
}

function quickTestImage() {
    const imageUrl = document.getElementById('quickProductImage').value.trim();
    
    if (!imageUrl) {
        showNotification('Por favor ingresa una URL de imagen', 'error');
        return;
    }
    
    quickTestImageAuto();
}

function quickTestImageAuto() {
    const imageUrl = document.getElementById('quickProductImage').value.trim();
    const previewContainer = document.getElementById('quickImagePreview');
    
    if (!imageUrl) {
        previewContainer.innerHTML = '';
        return;
    }
    
    previewContainer.innerHTML = `
        <div style="color: #636e72;">
            <i class="fas fa-spinner fa-spin"></i> Cargando imagen...
        </div>
    `;
    
    const img = new Image();
    
    img.onload = function() {
        previewContainer.innerHTML = `
            <img src="${imageUrl}" alt="Vista previa" class="quick-preview-image">
            <div class="quick-preview-success">
                <i class="fas fa-check-circle"></i> 
                Imagen válida (${this.naturalWidth}x${this.naturalHeight}px)
            </div>
        `;
    };
    
    img.onerror = function() {
        previewContainer.innerHTML = `
            <div class="quick-preview-error">
                <i class="fas fa-exclamation-triangle"></i> 
                No se pudo cargar la imagen
            </div>
        `;
    };
    
    img.src = imageUrl;
}

function showQuickPreview() {
    const name = document.getElementById('quickProductName').value.trim();
    const price = document.getElementById('quickProductPrice').value;
    const category = document.getElementById('quickProductCategory').value;
    const image = document.getElementById('quickProductImage').value.trim();
    const description = document.getElementById('quickProductDescription').value.trim();
    
    if (!name || !price || !image || !description) {
        showNotification('Por favor completa los campos obligatorios para ver la vista previa', 'error');
        return;
    }
    
    const previewContent = document.getElementById('newProductPreviewContent');
    previewContent.innerHTML = `
        <div class="gallery-product-card" style="max-width: 400px; margin: 0 auto;">
            <img src="${image}" alt="${name}" class="gallery-product-image" 
                 onerror="this.src='https://via.placeholder.com/400x220?text=Imagen+no+disponible'">
            <div class="gallery-product-info">
                ${category ? `<span class="gallery-product-category">${getCategoryName(category)}</span>` : ''}
                <h3 class="gallery-product-name">${name}</h3>
                <p class="gallery-product-price">$${parseFloat(price).toFixed(2)}</p>
                <p class="gallery-product-description">${description}</p>
                <div class="gallery-product-actions">
                    <button class="btn-add-cart" style="width: 100%;">
                        <i class="fas fa-shopping-cart"></i>
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('newProductPreviewModal').style.display = 'block';
}

// Función updateUserUI ya definida arriba - duplicado eliminado

// Mejorar la notificación para productos agregados desde header
function showProductAddedNotification() {
    // Crear una notificación especial con confetti
    const notification = document.createElement('div');
    notification.className = 'notification notification-success special-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <div>
                <strong>¡Producto agregado!</strong>
                <p>Tu nuevo producto ya está disponible para la venta</p>
            </div>
        </div>
        <div class="confetti">🎉</div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00b894, #00cec9);
        color: white;
        padding: 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,184,148,0.3);
        z-index: 3000;
        max-width: 350px;
        animation: slideInRight 0.5s ease, pulse 2s infinite;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 4000);
}

// Agregar estilos para la notificación especial
function addSpecialNotificationStyles() {
    if (!document.getElementById('specialNotificationStyles')) {
        const style = document.createElement('style');
        style.id = 'specialNotificationStyles';
        style.textContent = `
            .special-notification .notification-content {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .special-notification .confetti {
                position: absolute;
                top: -10px;
                right: -10px;
                font-size: 1.5rem;
                animation: bounce 1s infinite;
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Función de estilos especiales ya incluida en la inicialización principal