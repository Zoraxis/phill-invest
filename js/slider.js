let totalSlides = 0;

let curr = 1;

const sliderX = 487,
  sliderGapX = 26;

let prev, next;

const disabledStyles = ["grayscale-[0.9]", "opacity-75"];

const move = (dir = 0) => {
  const moveDistance = dir * (sliderX + sliderGapX);

  if ((curr + dir < 0 || curr + dir > totalSlides)) {
    return;
  }
  curr += dir;

  if (curr == 0) {
    next.classList.add(...disabledStyles);
  } else {
    next.classList.remove(...disabledStyles);
  }
  if (curr == totalSlides - 1) {
    prev.classList.add(...disabledStyles);
  } else {
    prev.classList.remove(...disabledStyles);
  }

  anime({
    targets: "#slider",
    translateX: `+=${moveDistance}px`,
    easing: "easeInOutQuad",
    duration: 1050,
  });
};

window.onload = () => {
  prev = document.getElementById("slider-prev-btn");
  next = document.getElementById("slider-next-btn");

  const slides = document.getElementById("slider").children;
  totalSlides = slides.length;

  prev.onclick = () => {
    move(1);
  };
  next.onclick = () => {
    move(-1);
  };
};
