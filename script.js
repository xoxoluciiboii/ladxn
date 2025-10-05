// Cart functionality
let cart = [];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    initializeButtons();
});

function initializeCart() {
    updateCart();
    
    // Cart toggle
    document.getElementById('cart-toggle').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('cart-sidebar').classList.add('active');
        document.getElementById('cart-overlay').classList.add('active');
    });
    
    document.getElementById('close-cart').addEventListener('click', function() {
        document.getElementById('cart-sidebar').classList.remove('active');
        document.getElementById('cart-overlay').classList.remove('active');
    });
    
    document.getElementById('cart-overlay').addEventListener('click', function() {
        document.getElementById('cart-sidebar').classList.remove('active');
        document.getElementById('cart-overlay').classList.remove('active');
    });
    
    // Checkout
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert('Proceeding to checkout...');
        cart = [];
        updateCart();
        document.getElementById('cart-sidebar').classList.remove('active');
        document.getElementById('cart-overlay').classList.remove('active');
        alert('Order placed successfully! Thank you for supporting LADXN!');
    });
}

function initializeButtons() {
    // Add to cart buttons
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', function() {
            const item = this.getAttribute('data-item');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(item, price);
        });
    });
    
    // Stream buttons
    document.querySelectorAll('.stream-btn').forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            alert(Redirecting to ${platform}...);
        });
    });
    
    // Ticket buttons
    document.querySelectorAll('.ticket-button').forEach(button => {
        button.addEventListener('click', function() {
            const show = this.getAttribute('data-show');
            alert(Getting tickets for ${show} show...);
        });
    });
    
    // Blog buttons
    document.querySelectorAll('.blog-btn').forEach(button => {
        button.addEventListener('click', function() {
            const article = this.getAttribute('data-article');
            alert(Loading ${article} article...);
        });
    });
    
    // Newsletter forms
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(Thank you for subscribing with: ${email}\nYou are now locked into the LADXN frequency.);
            this.reset();
        });
    });
    
    // Social links
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.textContent.trim();
            alert(Opening ${platform}...);
        });
    });
}

function addToCart(item, price) {
    const existingItem = cart.find(cartItem => cartItem.name === item);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: item,
            price: price,
            quantity: 1
        });
    }
    
    updateCart();
    alert(${item} added to cart!);
    
    // Auto-open cart
    document.getElementById('cart-sidebar').classList.add('active');
    document.getElementById('cart-overlay').classList.add('active');
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');
    
    cartItems.innerHTML = '';
    
    let total = 0;
    let itemCount = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemCount += item.quantity;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 'decrease')">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 'increase')">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        
        cartItems.appendChild(cartItemElement);
    });
    
    cartTotal.textContent = Total: $${total.toFixed(2)};
    cartCount.textContent = itemCount;
}

function updateQuantity(index, action) {
    if (action === 'increase') {
        cart[index].quantity += 1;
    } else if (action === 'decrease' && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }
    
    updateCart();
}

function removeFromCart(index) {
    const itemName = cart[index].name;
    cart.splice(index, 1);
    updateCart();
    alert(${itemName} removed from cart);
}