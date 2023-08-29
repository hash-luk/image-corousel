const carousel = document.querySelector(".carousel-inner");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const banners = document.querySelectorAll(".carousel-slide");
const dotsContainer = document.querySelector(".dots-container");

let currentIndex = 0;
let animateTimer;
let touchStartX = 0;


function handleCarousel() {
  if (currentIndex < 0) {
    currentIndex = banners.length - 1;
  } else if (currentIndex >= banners.length) {
    currentIndex = 0;
  }

  const offset = -currentIndex * 950;
  carousel.style.transform = `translateX(${offset}px)`;

  const activeDot = dotsContainer.querySelector(".active-dot");

  if (activeDot) {
    activeDot.classList.remove("active-dot");
  }

  dotsContainer.children[currentIndex].classList.add("active-dot");

  clearInterval(animateTimer);
  animateTimer = setInterval(next, 5000);
}

function createDots() {
  for (let i = 0; i < banners.length; i++) {
    const dot = document.createElement("button");
    dot.classList.add("dot");

    if (i === currentIndex) {
      dot.classList.add("active-dot");
    }

    dot.addEventListener("click", () => {
      currentIndex = i;
      handleCarousel();
    });

    dotsContainer.appendChild(dot);
  }
}

function prev() {
  currentIndex = (currentIndex - 1 + banners.length) % banners.length;
  handleCarousel();
}

function next() {
  currentIndex = (currentIndex + 1) % banners.length;
  handleCarousel();
}

carousel.addEventListener("mouseenter", () => {
  clearInterval(animateTimer);
});

carousel.addEventListener("mouseleave", () => {
  if (banners.length > 1) {
    animateTimer = setInterval(next, 5000);
  }
});

if (banners.length > 1) {
  createDots();
  handleCarousel();
}
