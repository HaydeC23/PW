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
        { id: 1, name: "Cheesecake de Maracuyá", price: 11.99, image: "https://i.pinimg.com/736x/2f/da/39/2fda39f79e80a91d61e69e31bed31605.jpg" },
        { id: 2, name: "Brownies", price: 0.99, image: "https://i.pinimg.com/736x/80/f1/72/80f17283179869fff96dd0265feeca6b.jpg" },
        { id: 3, name: "Flan", price: 1.99, image: "https://i.pinimg.com/736x/53/d7/55/53d755814f25108a379df91451264eee.jpg" },
        { id: 4, name: "Pastel de zanahoria", price: 15.99, image: "https://i.pinimg.com/736x/72/b9/3a/72b93a13c258cdb5a954768c252938c6.jpg" },
        { id: 5, name: "Pastel de chocolate", price: 19.99, image: "https://i.pinimg.com/1200x/81/d1/a5/81d1a5e9ab4fa39f206f4c90e711df4f.jpg" },
        { id: 6, name: "Pastel red velvet", price: 14.99, image: "https://i.pinimg.com/736x/8a/1e/b6/8a1eb6049e5e19d9383bdd3043c096d8.jpg" },
        { id: 7, name: "Rebanada de postre tres leches", price: 1.50, image: "https://i.pinimg.com/1200x/cf/99/33/cf993358a182e48e5c345ea3d1f328ea.jpg" },
        { id: 8, name: "Donas Gourmet", price: 2.50, image: "https://i.pinimg.com/1200x/ea/66/93/ea66938d7bc0e38d808e51ab08504e84.jpg" },
        { id: 9, name: "Carlota de limón", price: 11.99, image: "https://i.pinimg.com/736x/eb/22/00/eb2200225289ebfbfec27fdf739674bc.jpg" },
        { id: 10, name: "Pie de Limón", price: 10.99, image: "https://i.pinimg.com/736x/0b/c5/c8/0bc5c83f9c47650503e6fbeaa4992d0b.jpg" }
    ],
    panaderia: [
        { id: 11, name: "bagels de salmon", price: 2.50, image: "https://i.pinimg.com/736x/d8/d2/0d/d8d20d68b88de5e84199f593172fdfeb.jpg" },
        { id: 12, name: "Croissant de jamón y queso", price: 2.50, image: "https://i.pinimg.com/736x/57/f7/b9/57f7b921ad2b432f2be85e8b393ee571.jpg" },
        { id: 13, name: "Plantintá", price: 0.99, image: "https://i.pinimg.com/1200x/f3/96/fd/f396fd6e5b5428325d81bffef76244b1.jpg" },
        { id: 14, name: "Empanada de Pollo", price: 0.99, image: "https://i.pinimg.com/1200x/c1/0b/05/c10b05872d00ac7a79a33e56750a664f.jpg" },
        { id: 15, name: "Pan de ajo", price: 0.99, image: "https://i.pinimg.com/1200x/58/5b/b7/585bb77bcceae48e050e6184395334bf.jpg" },
        { id: 16, name: "Sandwich de Pollo", price: 1.99, image: "https://i.pinimg.com/736x/1e/a7/a2/1ea7a2ff13305cc691c17ddfbe1952a4.jpg" },
        { id: 17, name: "Focaccia", price: 2.50, image: "https://i.pinimg.com/736x/85/5a/dc/855adcec0bd5de1efae320cf93c84a9e.jpg" },
        { id: 18, name: "Pan pita relleno", price: 1.99, image: "https://i.pinimg.com/1200x/8d/a8/3b/8da83bded588023f71301f51a5b56a2d.jpg" },
        { id: 19, name: "Pretzel", price: 1.80, image: "https://i.pinimg.com/736x/58/7d/57/587d57c3936d5754a7c38e396ee0c081.jpg" },
        { id: 20, name: "Pan pizza", price: 1.99, image: "https://i.pinimg.com/1200x/d4/15/3c/d4153cb1c95df230684bd4c688e79998.jpg" }
    ],
    bebidas: [
        { id: 21, name: "Mocaccino", price: 2.50, image: "https://i.pinimg.com/1200x/d6/b8/ec/d6b8ec52c915daa3d588cefdd47a3554.jpg" },
        { id: 22, name: "Café negro", price: 1.50, image: "https://i.pinimg.com/1200x/17/bd/c8/17bdc8437fc78b9fce18e11b170421ad.jpg" },
        { id: 23, name: "Té de canela", price: 1.25, image: "https://i.pinimg.com/736x/e4/28/3e/e4283e1329dc7389e571164591f2d935.jpg" },
        { id: 24, name: "Cappuccino", price: 2.75, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop" },
        { id: 25, name: "Limonada", price: 1.50, image: "https://i.pinimg.com/1200x/5e/d2/42/5ed242c6e1b94b61c9a9daac6a2e901f.jpg" },
        { id: 26, name: "Té Frío", price: 1.50, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop" },
        { id: 27, name: "Chocolate Caliente", price: 1.75, image: "https://i.pinimg.com/736x/03/89/6b/03896bfdd6aae501967a378097dcc135.jpg" },
        { id: 28, name: "Café Latte", price: 2.50, image: "https://i.pinimg.com/1200x/d2/0c/e6/d20ce6b882f53f35c58738dab963434b.jpg" },
        { id: 29, name: "Jugo de Naranja Natural", price: 1.99, image: "https://i.pinimg.com/1200x/9b/13/c5/9b13c540fb5fbba2be4efc7c0db35d8c.jpg" },
        { id: 30, name: "Limonada Fresca", price: 1.99, image: "https://i.pinimg.com/1200x/ad/b6/73/adb673d4b3526a7cce289ce22eecdf7b.jpg" }
    ]
}

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
    
    // Versión del código (cambia esto cada vez que edites productos)
    const CODE_VERSION = '1.0';
    const savedVersion = localStorage.getItem('bakeryVersion');
    
    // Si la versión cambió, limpiar localStorage
    if (savedVersion !== CODE_VERSION) {
        console.log('Nueva versión detectada, limpiando datos antiguos...');
        localStorage.removeItem('bakeryProducts');
        localStorage.setItem('bakeryVersion', CODE_VERSION);
    }
    
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
