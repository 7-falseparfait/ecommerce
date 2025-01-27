//carousel
const leftBtn = document.querySelector('.leftbtn');
const rightBtn = document.querySelector('.rightbtn');
const carousel = document.querySelector('.carousel');
const cardWidth = document.querySelector('.product-card').offsetWidth;

let currentScroll = 0;

function getMaxScroll() {
  return carousel.scrollWidth - carousel.offsetWidth;
}


function updateButtonState() {
 const maxScroll = getMaxScroll();
 leftBtn.disabled = currentScroll <= 0;
 rightBtn.disabled = currentScroll >= maxScroll;
}



rightBtn.addEventListener('click', () => {
 currentScroll += cardWidth;
 const maxScroll = getMaxScroll();
 currentScroll = Math.min(currentScroll, maxScroll);
    carousel.scrollTo({
        left: currentScroll,
        behavior: 'smooth'
    });
 updateButtonState();
});

leftBtn.addEventListener('click', () => {
 currentScroll -= cardWidth;
 currentScroll = Math.max(currentScroll, 0);
    carousel.scrollTo({
        left: currentScroll,
        behavior: 'smooth'
    });
 updateButtonState();
});

 updateButtonState();

//drop-down

const viewAllBtn = document.querySelector('.viewAll');

const dropContainer = document.querySelector('.drop');
viewAllBtn.addEventListener('click', () => {


 if (dropContainer.classList.contains('show')) {
  dropContainer.classList.remove('show');
  viewAllBtn.textContent = 'View All'; 
 }
 else {
  dropContainer.classList.add('show');
   viewAllBtn.textContent = 'Show Less'; 
 }
})

//add to cart notification
const greenCheckPath = 'static/check.svg';
const addToCartButtons = document.querySelectorAll('.add-to-cart');



function showNotification(svg,productName) {
  const notification = document.getElementById('notification');
  notification.innerHTML = '';
  notification.appendChild(svg);
  const boldProductName = document.createElement('strong');
  boldProductName.textContent = productName;
  notification.appendChild(boldProductName);
  const textNode = document.createTextNode(' added to cart!');
  notification.appendChild(textNode);
  notification.classList.add('view');
    setTimeout(() => {
     notification.classList.remove('view');
   }, 3000);
}

addToCartButtons.forEach(button => {
  
    button.addEventListener('click', function () {
      const greenCheckImg = document.createElement('img');
      greenCheckImg.setAttribute('src', greenCheckPath);
      greenCheckImg.setAttribute('alt', 'Item Added');
      greenCheckImg.setAttribute('width', '20');
      greenCheckImg.setAttribute('height', '20');
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('.product-title').textContent;
      showNotification(greenCheckImg, productName);
    });
    });