let currC = 1;

let caroseul, caroseulDots;

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

const initCaroseul = () => {
  caroseul = document.getElementById("caroseul");
  caroseulDots = document.getElementById("carousel-dots");

  [...caroseul.children].forEach((cSlide, cSlideId) => {
    if (cSlideId == 1)
      caroseulDots.innerHTML += `<div class="cursor-pointer w-[1.5vh] h-[1.5vh] rounded-full bg-[#878787]"></div>`;
    else
      caroseulDots.innerHTML += `<div class="cursor-pointer w-[1vh] h-[1vh] rounded-full bg-[#C3C3C3]"></div>`;
    cSlide.addEventListener("click", () => {
      const target = parseInt(cSlide.dataset.num);
      console.log("🚀 ~ cSlide.addEventListener ~ target:", target);

      if (getQueued("caroseul")) return;
      action(target);
    });
  });

  caroseulDots = document.getElementById("carousel-dots");

  [...caroseulDots.children].forEach((cDot, cDotId) => {
    cDot.addEventListener("click", () => {
      caroseulScrollTo(cDotId);
    });
  });
};

const getCaroseulTarget = (index) =>
  `#caroseul .caroseul-item:nth-child(${index + 1})`;

const getCaroseulIndex = (index) => {
  if (index < 0) return caroseul.children.length + index;
  return index % caroseul.children.length;
};

const action = (target, caroseulDuration = 300) => {
  const nextC = currC + target;
  calcCaroseulDots(nextC);

  caroseul.children[getCaroseulIndex(nextC - 1)].dataset.num = -1;
  caroseul.children[getCaroseulIndex(nextC)].dataset.num = 0;
  caroseul.children[getCaroseulIndex(nextC)].style.zIndex = 2;
  caroseul.children[getCaroseulIndex(nextC + 1)].dataset.num = 1;
  if (target > 0) {
    console.log(getCaroseulIndex(currC + 2), currC);
    const caroseulFadeIn = caroseul.children[getCaroseulIndex(currC + 2)];
    const caroseulFadeOut = caroseul.children[getCaroseulIndex(currC - 1)];
    const caroseulRight = caroseul.children[getCaroseulIndex(currC)];

    caroseulFadeIn.style.transform = `translateX(${29.1}vh)`;
    caroseulFadeOut.style.zIndex = "1";
    caroseulRight.style.zIndex = "2";
    animate(
      [
        {
          targets: getCaroseulTarget(getCaroseulIndex(currC - 1)),
          scale: 0.8,
          opacity: 0,
        },
        {
          targets: getCaroseulTarget(currC),
          width: "29.4vh",
          height: "46.6vh",
          bottom: "17.5vh",
          translateX: "-58.5vh",
          opacity: 1,
        },
        {
          targets: getCaroseulTarget(getCaroseulIndex(currC + 1)),
          width: "39vh",
          height: "62vh",
          bottom: "10vh",
          translateX: "-19.5vh",
          opacity: 1,
        },
        {
          targets: getCaroseulTarget(getCaroseulIndex(currC + 2)),
          scale: 1,
          opacity: 1,
        },
        {
          targets: getCaroseulTarget(getCaroseulIndex(currC)) + " div .caroseul-author",
          translateY: "0%",
          opacity: 1,
        },
        {
          targets:
            getCaroseulTarget(getCaroseulIndex(getCaroseulIndex(currC + 1))) +
            " div .caroseul-author",
          translateY: "-100%",
          opacity: 0,
        },
        {
          targets: "#scale-content-equalizer",
          opacity: 1
        },
      ],
      caroseulDuration,
      "caroseul"
    );
  } else if (target < 0) {
    const caroseulFadeIn = caroseul.children[getCaroseulIndex(currC - 2)];
    caroseulFadeIn.style.transform = `translateX(${-58.5}vh)`;
    caroseulFadeIn.style.zIndex = "1";

    animate(
      [
        {
          targets: getCaroseulTarget(getCaroseulIndex(currC - 2)),
          scale: 1,
          opacity: 1,
        },
        {
          targets: getCaroseulTarget(getCaroseulIndex(currC - 1)),
          width: "39vh",
          height: "62vh",
          bottom: "10vh",
          translateX: "-19.5vh",
          opacity: 1,
        },
        {
          targets: getCaroseulTarget(currC),
          width: "29.4vh",
          height: "46.6vh",
          bottom: "17.5vh",
          translateX: "29.1vh",
          opacity: 1,
        },
        {
          targets: getCaroseulTarget(getCaroseulIndex(currC + 1)),
          scale: 0.8,
          opacity: 0,
        },
        {
          targets: getCaroseulTarget(getCaroseulIndex(currC - 1)) + " div .caroseul-author",
          translateY: "-100%",
          opacity: 0,
        },
        {
          targets:
            getCaroseulTarget(getCaroseulIndex(getCaroseulIndex(currC))) +
            " div .caroseul-author",
          translateY: "0%",
          opacity: 1,
        },
      ],
      caroseulDuration,
      "caroseul"
    );
  }

  currC += target;
  if (nextC == -1) currC = caroseul.children.length - 1;
  else if (nextC == caroseul.children.length) currC = 0;
};

const caroseulScrollTo = async (targetIndex = 1, callback) => {
  while (currC != targetIndex) {
    action(1, 100);
    await threadSleep(150);
  }
  if (!!callback) callback();
};
