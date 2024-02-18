let totalSlides = 0,
  curr = 0;

const {
  sliderX,
  gap: sliderGapX,
  margin: sliderMargin,
} = getResponsiveValues("slider");

let prev, next;

const disabledStyles = ["grayscale-[0.9]", "opacity-75"];

const getSlideSelector = (id) => `#slider .relative:nth-child(${id + 1})`;
const getAllAfter = (id) => {
  const slidesAfter = [];
  for (let i = id + 1; i <= totalSlides; i++) {
    slidesAfter.push(getSlideSelector(i));
  }
  return slidesAfter;
};

const move = (dir = 0) => {
  const moveDistance = dir * (sliderX + sliderGapX);

  if (curr + dir < 0 || curr + dir > totalSlides - 1) {
    return;
  }

  const nextId = curr + dir;

  let free = 0;
  if (dir == 1) {
    free = animate(
      [
        {
          targets: getSlideSelector(curr),
          scale: 0.3,
          opacity: 0,
        },
        {
          targets: getAllAfter(curr),
          translateX: `-=${sliderX + sliderGapX}px`,
        },
      ],
      650,
      "slider"
    );
  } else if (dir == -1) {
    free = animate(
      [
        {
          targets: getSlideSelector(curr - 1),
          scale: 1,
          opacity: 1,
        },
        {
          targets: getAllAfter(curr - 1),
          translateX: `+=${sliderX + sliderGapX}px`,
        },
      ],
      650,
      "slider"
    );
  }

  if (free == -1) return;

  if (nextId == 0) {
    [...prev].forEach((prevBtn) => {
      prevBtn.classList.add(...disabledStyles);
    });
  } else {
    [...prev].forEach((prevBtn) => {
      prevBtn.classList.remove(...disabledStyles);
    });
  }
  if (nextId == totalSlides - 1) {
    [...next].forEach((nextBtn) => {
      nextBtn.classList.add(...disabledStyles);
    });
  } else {
    [...next].forEach((nextBtn) => {
      nextBtn.classList.remove(...disabledStyles);
    });
  }

  curr += dir;
};

const initSlider = () => {
  prev = document.getElementsByClassName("slider-prev-btn");
  next = document.getElementsByClassName("slider-next-btn");

  const slider = document.getElementById("slider");
  const slides = slider.children;
  totalSlides = slides.length;

  const sliderOffset = (sliderX + sliderGapX) * (totalSlides - 1);
  slider.style.right = `-${sliderOffset - sliderMargin}px`;

  [...prev].forEach((prevBtn) => {
    prevBtn.addEventListener("click", () => {
      move(-1);
    });
  });
  [...next].forEach((nextBtn) => {
    nextBtn.addEventListener("click", () => {
      move(1);
    });
  });
};
