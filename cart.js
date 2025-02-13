function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const emptyCartContainer = document.querySelector('.empty-cart');
  const cartInfo = document.querySelector('.cart-info'); 

  document.querySelectorAll('.cart-row').forEach(row => row.remove());

  const existingButtons = document.querySelector(".cart-buttons");
  if (existingButtons) {
    existingButtons.remove();
  }

  if (cart.length === 0) {
   emptyCartContainer.classList.remove('display-none'); 
   cartInfo.classList.add('display-none');
  } else {
    emptyCartContainer.classList.add('display-none'); 
   cartInfo.classList.remove('display-none');
    cart.forEach((item, index) => {
      const cartRow = document.createElement("div");
     cartRow.classList.add("cart-row", "flex", "space-btw",);
     

      cartRow.innerHTML = `
  <div class="cart-item flex align-center">
    <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
    <span class="cart-item-name">${item.name}</span>
 <svg class="delete-icon" data-index="${index}" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="9" fill="#DB4444"/>
  <path d="M9 15L12 12M15 9L12 12M12 12L9 9M12 12L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


  </div>
  <div class="cart-item-price-container y"><span class="cart-item-price">$${item.price}</span> </div>
  <div class="cart-quantity-container y">
    <input type="number" class="cart-item-quantity" value="${item.quantity || 1}" min="1" data-index="${index}" />
  </div>
  <span class="cart-item-total y">$${(item.price * (item.quantity || 1)).toFixed(2)}</span>
`;

     cartInfo.appendChild(cartRow);
      document.querySelectorAll('.cart-item-quantity').forEach(input => {
      input.addEventListener('change', updateCartTotal);
      });
    });
  }
    const cartButtons = document.createElement("div");
    cartButtons.classList.add("cart-buttons", "flex", "space-btw", "mt-3");
    cartButtons.innerHTML = `
      <button class="btn return-shop" onclick="window.location.href='home.html'">Return To Shop</button>
      <button class="btn update-cart display-none">Update Cart</button>
    `;
    cartInfo.appendChild(cartButtons);
}
 

function updateCartTotal(event) {
  const input = event.target;  
  const index = input.dataset.index;
  console.log(index);
  console.log(input);
  
  
 const newQuantity = parseInt(input.value, 10);
 if (newQuantity < 1 || isNaN(newQuantity)) {
    input.value = 1;
    return;
}
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart[index]) {
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update subtotal
    const totalElement = document.querySelectorAll('.cart-item-total')[index];
    totalElement.textContent = `$${(cart[index].price * newQuantity).toFixed(2)}`;
  }
   updateCartSummary();
}

document.addEventListener("DOMContentLoaded", displayCartItems);

function createCartSummary() {
  const cartSummary = document.createElement("div");
  cartSummary.classList.add("cart-summary");

  cartSummary.innerHTML = `
    <h3 class = "cart-total">Cart Total</h3>
    <div class="summary-item">
      <span>Subtotal:</span>
      <span class="subtotal-amount">$0</span>
    </div>
    <div class="summary-item">
      <span>Shipping:</span>
      <span>Free</span>
    </div>
    <div class="summary-item total">
      <span>Total:</span>
      <span class="total-amount">$0</span>
    </div>
    <button class="checkout-btn">Proceed to checkout</button>
  `;

  document.querySelector(".cart-info").appendChild(cartSummary);
  updateCartSummary(); 
}


document.addEventListener("DOMContentLoaded", createCartSummary);

function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * (item.quantity || 1);
  });

  document.querySelector(".subtotal-amount").textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector(".total-amount").textContent = `$${subtotal.toFixed(2)}`;
}

document.querySelector(".cart-info").addEventListener("click", function (event) {
  const deleteButton = event.target.closest(".delete-icon"); 
  if (deleteButton) {
    const index = deleteButton.dataset.index;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index]) {
      cart.splice(index, 1); 
      localStorage.setItem("cart", JSON.stringify(cart)); 
      displayCartItems(); 
    }
  }
});


