// ========================================
// AMRUTHA STORE - MAIN JAVASCRIPT
// ========================================


// ================= CART =================

let cart = [];


// Add product to cart

function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert(name + " added to cart! 🛒");
}


// Update cart

function updateCart() {

    const cartItems = document.getElementById("cart-items");

    const cartCount = document.getElementById("cart-count");

    const cartTotal = document.getElementById("cart-total");

    const cartItemsCount =
        document.getElementById("cart-items-count");


    let total = 0;

    let totalQuantity = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;

        totalQuantity += item.quantity;

    });


    cartCount.textContent = totalQuantity;

    cartItemsCount.textContent =
        totalQuantity + (totalQuantity === 1 ? " item" : " items");

    cartTotal.textContent = total;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div>🛒</div>

                <h3>Your cart is empty</h3>

                <p>Add some products to get started.</p>

                <button onclick="scrollToProducts()">
                    Start Shopping
                </button>

            </div>

        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>₹${item.price} each</p>

            </div>


            <div class="quantity-controls">

                <button onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <strong>
                    ${item.quantity}
                </strong>

                <button onclick="changeQuantity(${index}, 1)">
                    +
                </button>

            </div>


            <strong>
                ₹${itemTotal}
            </strong>


            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">

                ❌ Remove

            </button>

        `;


        cartItems.appendChild(cartItem);

    });

}


// Change quantity

function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


// Remove product

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ================= SEARCH =================

let selectedCategory = "all";


function filterProducts() {

    const searchInput =
        document.getElementById("searchInput");


    const searchText =
        searchInput.value.toLowerCase().trim();


    const products =
        document.querySelectorAll(".product");


    let visibleProducts = 0;


    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();


        const category =
            product.dataset.category;


        const matchesSearch =
            name.includes(searchText);


        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;


        if (
            matchesSearch &&
            matchesCategory
        ) {

            product.style.display = "block";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });


    const noProducts =
        document.getElementById("no-products");


    if (visibleProducts === 0) {

        noProducts.style.display = "block";

    } else {

        noProducts.style.display = "none";

    }

}


// Category filter

function filterCategory(category, button) {

    selectedCategory = category;


    document
        .querySelectorAll(".category-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    filterProducts();

}


// ================= WISHLIST =================

let wishlist = [];


function toggleWishlist(productName) {

    if (wishlist.includes(productName)) {

        wishlist =
            wishlist.filter(
                item => item !== productName
            );

        alert(
            productName +
            " removed from wishlist ❤️"
        );

    } else {

        wishlist.push(productName);

        alert(
            productName +
            " added to wishlist ❤️"
        );

    }


    document.getElementById(
        "wishlist-count"
    ).textContent = wishlist.length;

}


// Show wishlist

function showWishlist() {

    if (wishlist.length === 0) {

        alert(
            "Your wishlist is empty ❤️"
        );

        return;

    }


    alert(
        "❤️ Your Wishlist:\n\n" +
        wishlist.join("\n")
    );

}


// ================= CHECKOUT =================

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty! Please add a product first. 🛒"
        );

        return;

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    document.getElementById(
        "checkout-total"
    ).textContent = total;


    document.getElementById(
        "checkoutModal"
    ).style.display = "flex";

}


// Close checkout

function closeCheckout() {

    document.getElementById(
        "checkoutModal"
    ).style.display = "none";

}


// Place order

function placeOrder(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "customerName"
        ).value;


    if (!name) {

        alert("Please enter your name.");

        return;

    }


    closeCheckout();


    document.getElementById(
        "successModal"
    ).style.display = "flex";


    // Clear cart

    cart = [];

    updateCart();


    // Reset form

    document.getElementById(
        "checkoutForm"
    ).reset();

}


// Close success

function closeSuccess() {

    document.getElementById(
        "successModal"
    ).style.display = "none";


    scrollToProducts();

}


// ================= NAVIGATION =================

function scrollToProducts() {

    const products =
        document.getElementById("products");


    products.scrollIntoView({
        behavior: "smooth"
    });

}


function scrollToCart() {

    const cart =
        document.getElementById(
            "shopping-cart"
        );


    cart.scrollIntoView({
        behavior: "smooth"
    });

}


// ================= CLOSE MODAL =================

window.onclick = function(event) {

    const checkoutModal =
        document.getElementById(
            "checkoutModal"
        );


    const successModal =
        document.getElementById(
            "successModal"
        );


    if (event.target === checkoutModal) {

        closeCheckout();

    }


    if (event.target === successModal) {

        closeSuccess();

    }

};


// ================= INITIAL LOAD =================

updateCart();