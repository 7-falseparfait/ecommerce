//carousel
// const leftBtn = document.querySelector(".leftbtn");
// const rightBtn = document.querySelector(".rightbtn");
// const carousel = document.querySelector(".carousel");

// // const cardWidth = document.querySelector(".product-card").offsetWidth;
// // console.log(cardWidth);
// let currentScroll = 0;

// function getMaxScroll() {
//   return carousel.scrollWidth - carousel.offsetWidth;
// }

// function updateButtonState() {
//   const maxScroll = getMaxScroll();
//   leftBtn.disabled = currentScroll <= 0;
//   rightBtn.disabled = currentScroll >= maxScroll;
// }

// rightBtn.addEventListener("click", () => {
//   currentScroll += cardWidth;
//   const maxScroll = getMaxScroll();
//   currentScroll = Math.min(currentScroll, maxScroll);
//   carousel.scrollTo({
//     left: currentScroll,
//     behavior: "smooth",
//   });
//   updateButtonState();
// });

// leftBtn.addEventListener("click", () => {
//   currentScroll -= cardWidth;
//   currentScroll = Math.max(currentScroll, 0);
//   carousel.scrollTo({
//     left: currentScroll,
//     behavior: "smooth",
//   });
//   updateButtonState();
// });

// updateButtonState();

//drop-down
console.log("Tinubu");

document.querySelectorAll(".viewAll").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.stopPropagation();
    const btnSection = btn.closest("section");
    const dropContainer = btnSection.querySelector(".drop");
    console.log(dropContainer);

    if (dropContainer) {
      dropContainer.classList.toggle("show");
      if (dropContainer.classList.contains("show")) {
        btn.textContent = "Show Less";
      } else btn.textContent = btn.getAttribute("data-original-text");
    }
  });
});

//add to cart notification
const greenCheckPath = "static/check.svg";
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// function showNotification(svg,productName) {
//   const notification = document.getElementById('notification');
//   notification.innerHTML = '';
//   notification.appendChild(svg);
//   const boldProductName = document.createElement('strong');
//   boldProductName.textContent = productName;
//   notification.appendChild(boldProductName);
//   const textNode = document.createTextNode(' added to cart!');
//   notification.appendChild(textNode);
//   notification.classList.add('view');
//     setTimeout(() => {
//      notification.classList.remove('view');
//    }, 3000);
// }

function showNotification(svg, product, message) {
  const notification = document.getElementById("notification");
  notification.innerHTML = ""; // Clear previous notification
  notification.appendChild(svg);
  const boldProductName = document.createElement("strong");
  boldProductName.textContent = product;
  notification.appendChild(boldProductName);
  const textNode = document.createTextNode(` ${message}`);
  notification.appendChild(textNode);
  notification.classList.add("view");
  setTimeout(() => {
    notification.classList.remove("view");
  }, 3000);
}

function getSuccessIcon() {
  const greenCheckImg = document.createElement("img");
  greenCheckImg.setAttribute("src", greenCheckPath);
  greenCheckImg.setAttribute("alt", "Item Added");
  greenCheckImg.setAttribute("width", "20");
  greenCheckImg.setAttribute("height", "20");
  return greenCheckImg;
}

function getWarningIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.innerHTML = `<path fill="orange" d="M12 2L1 21h22L12 2Zm0 3.4L19 19H5l7-13.6ZM11 16v2h2v-2h-2Zm0-6v4h2v-4h-2Z"/>`;
  return svg;
}

addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const productCard = this.closest(".product-card");
    const productName = productCard.querySelector(".product-title").textContent;
    const priceText = productCard
      .querySelector(".price-container")
      .querySelector(".current-price")
      .textContent.trim();
    const cleanPrice = priceText.replace(/[^0-9.]/g, "");
    const image = productCard
      .querySelector(".image-container")
      .querySelector("img");

    ///----------///
    const item = {
      name: productName,
      price: parseFloat(cleanPrice),
      image: image.src,
    };
    addToCart(item);
  });
});

window.addEventListener("scroll", function () {
  const button = document.getElementById("back-to-top");
  if (window.scrollY > window.innerHeight) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const getCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart;
};

const addToCart = (item) => {
  const cart = getCart();
  //checking if item already exists in cart.
  const existingItem = cart.findIndex(
    (cartItem) => cartItem.name === item.name
  );

  if (existingItem === -1) {
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    showNotification(getSuccessIcon(), item.name, `Added To Cart`);
  } else {
    showNotification(getWarningIcon(), item.name, `Already In Cart`);
  }
};
console.log(localStorage);
localStorage.clear();
