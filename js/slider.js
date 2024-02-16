let totalSlides = 0,
  curr = 0;


const sliderX = 487,
  sliderGapX = 26,
  sliderMargin = 320;


let prev, next;

const disabledStyles = ["grayscale-[0.9]", "opacity-75"];

const getSlideSelector = (id) => `#slider .relative:nth-child(${id + 1})`;
const getAllAfter = (id) => {
  const slidesAfter = [];
  for (let i = id + 1; i <= totalSlides; i++) {
    slidesAfter.push(getSlideSelector(i));
  }
  return slidesAfter;
}

const move = (dir = 0) => {
  const moveDistance = dir * (sliderX + sliderGapX);

  if ((curr + dir < 0 || curr + dir > totalSlides)) {
    return;
  }

  const nextId = curr + dir;

  if (nextId == 0) {
    prev.classList.add(...disabledStyles);
  } else {
    prev.classList.remove(...disabledStyles);
  }
  if (nextId == totalSlides - 1) {
    next.classList.add(...disabledStyles);
  } else {
    next.classList.remove(...disabledStyles);
  }

  if(dir == 1) {
    animate([
      {
        targets: getSlideSelector(curr),
        scale: 0.3,
        opacity: 0,
        changeComplete: () => { console.log("complete") },
      },
      {
        targets: getAllAfter(curr),
        translateX: `-=${sliderX}px`,
      },
    ])
  } else if (dir == -1) {
    animate([
      {
        targets: getSlideSelector(curr - 1),
        scale: 1,
        opacity: 1
      },
      {
        targets: getAllAfter(curr - 1),
        translateX: `+=${sliderX}px`,
      },
    ])
  }
  curr += dir;
};

window.onload = () => {
  prev = document.getElementById("slider-prev-btn");
  next = document.getElementById("slider-next-btn");

  const slider = document.getElementById("slider");
  const slides = slider.children;
  totalSlides = slides.length;

  const sliderOffset = ((sliderX + sliderGapX) * (totalSlides - 1));
  slider.style.right = `-${sliderOffset - sliderMargin}px`;

  prev.onclick = () => {
    move(-1);
  };
  next.onclick = () => {
    move(1);
  };
};
