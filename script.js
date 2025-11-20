// Estado global de la aplicación
let currentUser = null;
let cart = [];
let products = {
    reposteria: [],
    panaderia: [],
    bebidas: []
};

// Productos iniciales por categoría
const initialProducts = {
    reposteria: [
        { id: 1, name: "Cupcake de Vainilla", price: 3.50, image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=300&fit=crop" },
        { id: 2, name: "Cupcake de Chocolate", price: 3.50, image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=300&fit=crop" },
        { id: 3, name: "Cupcake Red Velvet", price: 4.00, image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&h=300&fit=crop" },
        { id: 4, name: "Torta de Chocolate", price: 45.00, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop" },
        { id: 5, name: "Torta de Fresa", price: 42.00, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop" },
        { id: 6, name: "Cheesecake Clásico", price: 38.00, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop" },
        { id: 7, name: "Macarons Franceses", price: 24.00, image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=300&fit=crop" },
        { id: 8, name: "Donas Glaseadas", price: 2.50, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop" },
        { id: 9, name: "Brownies de Chocolate", price: 18.00, image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400&h=300&fit=crop" },
        { id: 10, name: "Tarta de Manzana", price: 35.00, image: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=400&h=300&fit=crop" }
    ],
    panaderia: [
        { id: 11, name: "Pan Francés", price: 2.50, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop" },
        { id: 12, name: "Croissant de Mantequilla", price: 3.00, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop" },
        { id: 13, name: "Pan Integral", price: 3.50, image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop" },
        { id: 14, name: "Baguette Francesa", price: 2.00, image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop" },
        { id: 15, name: "Pan de Centeno", price: 4.00, image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&h=300&fit=crop" },
        { id: 16, name: "Bagels Artesanales", price: 2.50, image: "https://images.unsplash.com/photo-1551106652-a5bcf4b29f51?w=400&h=300&fit=crop" },
        { id: 17, name: "Focaccia Italiana", price: 5.00, image: "https://images.unsplash.com/photo-1600289031464-74d374b64991?w=400&h=300&fit=crop" },
        { id: 18, name: "Pan de Masa Madre", price: 6.00, image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&h=300&fit=crop" },
        { id: 19, name: "Pretzel Alemán", price: 2.80, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop" },
        { id: 20, name: "Empanadas Caseras", price: 3.00, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop" }
    ],
    bebidas: [
        { id: 21, name: "Café Americano", price: 2.50, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop" },
        { id: 22, name: "Café Latte", price: 3.50, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop" },
        { id: 23, name: "Cappuccino", price: 3.50, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop" },
        { id: 24, name: "Espresso Doble", price: 2.00, image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop" },
        { id: 25, name: "Mocha Especial", price: 4.00, image: "https://images.unsplash.com/photo-1578374173705-0a5c3e0b2d4e?w=400&h=300&fit=crop" },
        { id: 26, name: "Té Verde Matcha", price: 3.50, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop" },
        { id: 27, name: "Chocolate Caliente", price: 3.50, image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=300&fit=crop" },
        { id: 28, name: "Smoothie de Fresa", price: 4.50, image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop" },
        { id: 29, name: "Jugo de Naranja Natural", price: 3.00, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop" },
        { id: 30, name: "Limonada Fresca", price: 2.50, image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=400&h=300&fit=crop" }
    ]
};

let currentSlideIndex = 0;
let carouselInterval;
let progressInterval;

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
    setupEventListeners();
    initializeCarousel();
    startCarousel();
});

function initializeApp() {
    console.log('Inicializando aplicación...');
    
    // Cargar productos desde localStorage o usar productos iniciales
    const savedProducts = localStorage.getItem('bakeryProducts');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
        console.log('Productos cargados desde localStorage');
    } else {
        products = JSON.parse(JSON.stringify(initialProducts));
        saveProducts();
        console.log('Productos iniciales cargados');
    }
    
    console.log('Productos cargados:', products);
    console.log('Total repostería:', products.reposteria?.length);
    console.log('Total panadería:', products.panaderia?.length);
    console.log('Total bebidas:', products.bebidas?.length);

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

    // Renderizar todos los productos
    renderAllProducts();
    console.log('Productos renderizados');
}

function setupEventListeners() {
    // Botones del header
    const loginBtn = document.getElementById('loginBtn');
    const cartBtn = document.getElementById('cartBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLoginClick);
    }
    
    if (cartBtn) {
        cartBtn.addEventListener('click', showCart);
    }

    // Modales
    setupModalListeners();

    // Formularios
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const editForm = document.getElementById('editForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    if (editForm) {
        editForm.addEventListener('submit', handleEditProduct);
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

// Función para mostrar categorías
function showCategory(categoryName) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.products-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const selectedSection = document.getElementById(`${categoryName}-section`);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Actualizar botones
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`[data-category="${categoryName}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Funciones de productos
function renderAllProducts() {
    console.log('Renderizando todos los productos...');
    console.log('Productos:', products);
    renderCategoryProducts('reposteria');
    renderCategoryProducts('panaderia');
    renderCategoryProducts('bebidas');
}

function renderCategoryProducts(category) {
    console.log(`Renderizando categoría: ${category}`);
    const grid = document.getElementById(`${category}-grid`);
    
    if (!grid) {
        console.error(`No se encontró el grid para: ${category}`);
        return;
    }
    
    console.log(`Productos en ${category}:`, products[category]);
    grid.innerHTML = '';
    
    if (!products[category] || products[category].length === 0) {
        console.warn(`No hay productos en ${category}`);
        return;
    }
    
    products[category].forEach(product => {
        const productCard = createProductCard(product, category);
        grid.appendChild(productCard);
    });
    
    console.log(`${products[category].length} productos renderizados en ${category}`);
}

function createProductCard(product, category) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const isAdmin = currentUser && currentUser.isAdmin;
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <div class="product-actions">
                <button class="btn-add-cart" onclick="addToCart(${product.id}, '${category}')">
                    <i class="fas fa-shopping-cart"></i>
                    Agregar al Carrito
                </button>
                ${isAdmin ? `<button class="btn-edit-product" onclick="editProduct(${product.id}, '${category}')">
                    <i class="fas fa-edit"></i>
                    Editar
                </button>` : ''}
            </div>
        </div>
    `;
    return card;
}

function saveProducts() {
    localStorage.setItem('bakeryProducts', JSON.stringify(products));
}

// Funciones del carrito
function addToCart(productId, category) {
    if (!currentUser) {
        showLoginModal();
        return;
    }

    const product = products[category].find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            category: category
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

    showNotification('¡Compra realizada exitosamente! Gracias por tu pedido.', 'success');

    cart = [];
    saveCart();
    updateCartUI();
    document.getElementById('cartModal').style.display = 'none';
}

// Funciones de edición de productos
function editProduct(productId, category) {
    const product = products[category].find(p => p.id === productId);
    if (!product) return;

    document.getElementById('editProductId').value = productId;
    document.getElementById('editProductId').dataset.category = category;
    document.getElementById('editName').value = product.name;
    document.getElementById('editPrice').value = product.price;
    document.getElementById('editImage').value = product.image;

    document.getElementById('editModal').style.display = 'block';
}

function handleEditProduct(e) {
    e.preventDefault();

    const productId = parseInt(document.getElementById('editProductId').value);
    const category = document.getElementById('editProductId').dataset.category;
    const name = document.getElementById('editName').value;
    const price = parseFloat(document.getElementById('editPrice').value);
    const image = document.getElementById('editImage').value;

    const productIndex = products[category].findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        products[category][productIndex] = {
            ...products[category][productIndex],
            name,
            price,
            image
        };

        saveProducts();
        renderCategoryProducts(category);
        document.getElementById('editModal').style.display = 'none';
        showNotification('Producto actualizado exitosamente', 'success');
    }
}

// Funciones de autenticación
function handleLoginClick() {
    if (currentUser) {
        logout();
    } else {
        showLoginModal();
    }
}

function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
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
        document.getElementById('loginForm').reset();
        
        // Re-renderizar productos para mostrar botones de edición
        renderAllProducts();
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
    
    // Re-renderizar productos para ocultar botones de edición
    renderAllProducts();
}

function updateUserUI() {
    const loginBtn = document.getElementById('loginBtn');
    const loginText = document.getElementById('loginText');
    const adminPanel = document.getElementById('adminPanel');

    if (currentUser) {
        loginText.textContent = `Cerrar Sesión (${currentUser.name})`;
        loginBtn.classList.add('user-logged-in');

        if (currentUser.isAdmin) {
            adminPanel.style.display = 'block';
        }
    } else {
        loginText.textContent = 'Iniciar Sesión';
        loginBtn.classList.remove('user-logged-in');
        adminPanel.style.display = 'none';
    }
}

// Función de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

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
    `;

    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(100%); }
                to { opacity: 1; transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Funciones del carrusel
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.pagination-dot');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides.length > 0) {
        slides[0].classList.add('active');
        if (dots.length > 0) {
            dots[0].classList.add('active');
        }
        currentSlideIndex = 0;
    }
}

function startCarousel() {
    const duration = 5000;
    let progress = 0;
    
    if (carouselInterval) clearInterval(carouselInterval);
    if (progressInterval) clearInterval(progressInterval);
    
    carouselInterval = setInterval(() => {
        changeSlide(1);
    }, duration);
    
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

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.pagination-dot');

    if (slides.length === 0) return;

    slides[currentSlideIndex].classList.remove('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.remove('active');
    }

    currentSlideIndex += direction;

    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }

    slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }

    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = '0%';
    }
}

function currentSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.pagination-dot');

    if (slides.length === 0) return;

    slides[currentSlideIndex].classList.remove('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.remove('active');
    }

    currentSlideIndex = n - 1;

    if (currentSlideIndex < 0) currentSlideIndex = 0;
    if (currentSlideIndex >= slides.length) currentSlideIndex = slides.length - 1;

    slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }

    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = '0%';
    }
}

function scrollToProducts() {
    const productosSection = document.getElementById('productos');
    if (productosSection) {
        productosSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Funciones globales
window.showCategory = showCategory;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.editProduct = editProduct;
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;
window.scrollToProducts = scrollToProducts;
