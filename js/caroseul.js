let currC = 1;

let caroseul, caroseulDots, caroseulBtns, link, linkMob;

let touchStartX = 0,
  touchEndX = 0;

function checkSwipe() {
  const carouselSwipeDir = touchendX > touchstartX ? -1 : 1;
  callCarouselAction(carouselSwipeDir);
}

const calcCaroseulDots = (newCaroseulId) => {
  caroseulDots.children[currC].classList.remove(
    "w-[1.5vh]",
    "h-[1.5vh]",
    "bg-[#878787]"
  );
  caroseulDots.children[currC].classList.add(
    "w-[1vh]",
    "h-[1vh]",
    "bg-[#C3C3C3]"
  );
  caroseulDots.children[getCaroseulIndex(newCaroseulId)].classList.remove(
    "w-[1vh]",
    "h-[1vh]",
    "bg-[#C3C3C3]"
  );
  caroseulDots.children[getCaroseulIndex(newCaroseulId)].classList.add(
    "w-[1.5vh]",
    "h-[1.5vh]",
    "bg-[#878787]"
  );
};

const setCareoseulLink = (caroseulLinkId = currC) => {
  const href = caroseul.children[getCaroseulIndex(caroseulLinkId)].dataset.link;
  link.setAttribute("href", href);
  linkMob.setAttribute("href", href);
};

const initCaroseul = () => {
  caroseul = document.getElementById("carousel-children");
  caroseulBtns = document.querySelectorAll(
    "#carousel-children .caroseul-item .btn"
  );
  caroseulDots = document.getElementById("carousel-dots");
  link = document.getElementById("scale-content-button");
  linkMob = document.getElementById("scale-content-button-mob");

  [...caroseul.children].forEach((cSlide, cSlideId) => {
    if (cSlideId == 1)
      caroseulDots.innerHTML += `<div class="btn cursor-pointer w-[1.5vh] h-[1.5vh] rounded-full bg-[#878787]"></div>`;
    else
      caroseulDots.innerHTML += `<div class="btn cursor-pointer w-[1vh] h-[1vh] rounded-full bg-[#C3C3C3]"></div>`;
    cSlide.addEventListener("click", () => {
      const target = parseInt(cSlide.dataset.num);
      callCarouselAction(target);
    });
  });

  [...caroseulBtns].forEach((cSlideButton) => {
    const parent = cSlideButton.parentElement;

    cSlideButton.addEventListener("click", () => {
      const target = parseInt(parent.dataset.num);
      callCarouselAction(target);
    });
  });

  caroseul.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
  });

  caroseul.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    checkSwipe();
  });

  caroseulDots = document.getElementById("carousel-dots");

  [...caroseulDots.children].forEach((cDot, cDotId) => {
    cDot.addEventListener("click", () => {
      caroseulScrollTo(cDotId);
    });
  });

  CaruselResizeHandle();

  setCareoseulLink();
};

const CaruselResizeHandle = () => {
  if (window.screen.width > mobileMax) {
    var originalRatios = {
      width: (containerX * 1) / 2880,
      height: (containerY * 1.1) / 1700,
    };

    var coverRatio = Math.max(originalRatios.width, originalRatios.height);

    var newImageWidth = 2880 * coverRatio;
    var newImageHeight = 1700 * coverRatio;

    caroseul.children[1].children[0].style.transformOrigin = "left top";
    caroseul.children[1].children[0].style.left = "50%";
    caroseul.children[1].children[0].style.top = `-${0}vh`;
    caroseul.children[1].children[0].style.height =`${newImageHeight}px`;
    caroseul.children[1].children[0].style.width = `${newImageWidth}px`;
    caroseul.children[1].children[0].style.maxWidth = `${newImageWidth}px`

    const carouselCenterYOffset = newImageHeight * 0.6 - containerY * 0.62;
    caroseul.children[1].children[0].style.transform = `scale(0.6) translateX(-49.5%) translateY(-${carouselCenterYOffset / 6 * 10}px)`;
  }
}

window.addEventListener("resize", CaruselResizeHandle);

const callCarouselAction = (target) => {
  if (getQueued("caroseul")) return;
  if (target != -1 && target != 1) return;
  action(target);
};

const getCaroseulTarget = (index) =>
  `#caroseul .caroseul-item:nth-child(${index + 1})`;

const getCaroseulIndex = (index) => {
  if (index < 0) return caroseul.children.length + index;
  return index % caroseul.children.length;
};

const action = (target, caroseulDuration = 300) => {
  const carouselValues = getResponsiveValues("caroseul");

  const nextC = currC + target;
  calcCaroseulDots(nextC);
  setCareoseulLink(nextC);

  caroseul.children[getCaroseulIndex(nextC - 1)].dataset.num = -1;
  caroseul.children[getCaroseulIndex(nextC)].dataset.num = 0;
  caroseul.children[getCaroseulIndex(nextC)].style.zIndex = 2;
  caroseul.children[getCaroseulIndex(nextC + 1)].dataset.num = 1;
  animate([
    {
      targets: [
        "#scale-content-equalizer",
        "#scale-content-button",
        "#scale-content-button-mob",
        "#scale-content-equalizer-mob",
      ],
      opacity: 0,
      scale: 0.25,
      duration: 200,
      complete: () => {
        animate([
          {
            targets: [
              "#scale-content-equalizer",
              "#scale-content-button",
              "#scale-content-button-mob",
              "#scale-content-equalizer-mob",
            ],
            opacity: 1,
            scale: 1,
            duration: 200,
          },
        ]);
      },
    },
  ]);
  if (target > 0) {
    const caroseulFadeIn = caroseul.children[getCaroseulIndex(currC + 2)];
    const caroseulFadeOut = caroseul.children[getCaroseulIndex(currC - 1)];
    const caroseulRight = caroseul.children[getCaroseulIndex(currC)];

    caroseulFadeIn.style.transform = `translateX(${carouselValues.right})`;
    caroseulFadeOut.style.zIndex = "1";
    caroseulRight.style.zIndex = "2";

    const thisCarouselElement = getCaroseulTarget(
      getCaroseulIndex(getCaroseulIndex(currC))
    );
    const nextCarouselElement = getCaroseulTarget(
      getCaroseulIndex(getCaroseulIndex(currC + 1))
    );
    animate(
      [
        {
          targets: getCaroseulTarget(getCaroseulIndex(currC - 1)),
          scale: 0.8,
          opacity: 0,
        },
        {
          targets: getCaroseulTarget(currC),
          width: carouselValues.smallW,
          height: carouselValues.smallH,
          bottom: carouselValues.smallBottom,
          translateX: carouselValues.left,
          opacity: 1,
        },
        {
          targets: nextCarouselElement,
          width: carouselValues.bigW,
          height: carouselValues.bigH,
          bottom: carouselValues.bigBottom,
          translateX: carouselValues.center,
          opacity: 1,
        },
        {
          targets: getCaroseulTarget(getCaroseulIndex(currC + 2)),
          scale: 1,
          opacity: 1,
        },
        {
          targets: [
            thisCarouselElement + " div .caroseul-author",
            thisCarouselElement + " .carousel-item-play",
          ],
          translateY: "0%",
          opacity: 1,
          duration: caroseulDuration * 0.4,
        },
        {
          targets: [
            nextCarouselElement + " div .caroseul-author",
            nextCarouselElement + " .carousel-item-play",
          ],
          translateY: "-100%",
          opacity: 0,
          duration: caroseulDuration * 0.8,
        },
      ],
      { duration: caroseulDuration },
      "caroseul"
    );
  } else if (target < 0) {
    const caroseulFadeIn = caroseul.children[getCaroseulIndex(currC - 2)];
    caroseulFadeIn.style.transform = `translateX(${carouselValues.left})`;
    caroseulFadeIn.style.zIndex = "1";

    const thisCarouselElement = getCaroseulTarget(
      getCaroseulIndex(getCaroseulIndex(currC))
    );
    const nextCarouselElement = getCaroseulTarget(
      getCaroseulIndex(getCaroseulIndex(currC - 1))
    );
    animate(
      [
        {
          targets: getCaroseulTarget(getCaroseulIndex(currC - 2)),
          scale: 1,
          opacity: 1,
        },
        {
          targets: getCaroseulTarget(getCaroseulIndex(currC - 1)),
          width: carouselValues.bigW,
          height: carouselValues.bigH,
          bottom: carouselValues.bigBottom,
          translateX: carouselValues.center,
          opacity: 1,
        },
        {
          targets: getCaroseulTarget(currC),
          width: carouselValues.smallW,
          height: carouselValues.smallH,
          bottom: carouselValues.smallBottom,
          translateX: carouselValues.right,
          opacity: 1,
        },
        {
          targets: getCaroseulTarget(getCaroseulIndex(currC + 1)),
          scale: 0.8,
          opacity: 0,
        },
        {
          targets: [
            nextCarouselElement + " div .caroseul-author",
            nextCarouselElement + " .carousel-item-play",
          ],
          translateY: "-100%",
          opacity: 0,
          duration: caroseulDuration * 0.8,
        },
        {
          targets: [
            thisCarouselElement + " div .caroseul-author",
            thisCarouselElement + " .carousel-item-play",
          ],
          translateY: "0%",
          opacity: 1,
          duration: caroseulDuration * 0.4,
        },
      ],
      { duration: caroseulDuration },
      "caroseul"
    );
  }

  currC += target;
  if (nextC == -1) currC = caroseul.children.length - 1;
  else if (nextC == caroseul.children.length) currC = 0;
};

let targetIndex = -1,
  callback = null;

const caroseulScrollTo = (targetInputIndex = 1, callbackInput) => {
  callback = callbackInput;
  targetIndex = targetInputIndex;
};

let ticks = 0;
const caroseulTimer = () => {
  requestAnimationFrame(caroseulTimer);
  ticks++;

  if (targetIndex != -1) {
    if (ticks % 30 != 0) return;

    if (currC != targetIndex) {
      action(1, 100);
    } else {
      if (!!callback) callback();
      targetIndex = -1;
      callback = null;
    }
  }
};
caroseulTimer();
