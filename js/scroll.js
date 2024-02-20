const scrollStart = 10;

let lastScroll = 0,
  thisScroll = 0;

let scrollStarted = false;

const ScrollDownHandle = (scrollDurationOverride = false) => {
  animate(
    [
      {
        targets: ".up",
        translateY: "-300px",
      },
      {
        targets: [".scale-out"],
        opacity: 0,
      },
      {
        targets: "#scale-img",
        scale: 0.6,
        translateY: "-20.5vh",
        translateX: "-49.65%",
        height: { value: "110vh", delay: 0 },
      },
      {
        targets: "#scale-box",
        bottom: "10vh",
        width: "39vh",
        height: "62vh",
        borderBottomLeftRadius: "7.06vh",
        borderBottomRightRadius: "7.06vh",
        borderTopLeftRadius: "7.06vh",
        borderTopRightRadius: "7.06vh",
        borderWidth: 0,
      },
      {
        targets: "#scale-layer",
        borderTopLeftRadius: "7.06vh",
        borderTopRightRadius: "7.06vh",
        width: `${containerX}px`,
        height: "200vh",
      },
      {
        targets: "#scale-box .gradient-bottom",
        bottom: "-60vh",
        duration: duration * 0.6,
      },
      {
        targets: [".scale-down-in", ".scale-up-in"],
        translateX: "-50%",
        translateY: "0vh",
        opacity: 1,
        scale: 1,
      },
      {
        targets: "#caroseul .caroseul-item",
        left: "50vw",
      },
      {
        targets: "#caroseul .caroseul-item .gradient-bottom",
        opacity: 1,
        delay: duration,
        duration: duration * 0.5,
      },
      {
        targets: "#caroseul .caroseul-item:nth-child(3)",
        translateX: "29.1vh",
      },
      {
        targets: "#caroseul .caroseul-item:nth-child(1)",
        translateX: "-58.5vh",
      },
      {
        targets: [
          "#scale-content-title",
          "#scale-content-author",
          "#scale-content-play",
        ],
        opacity: 0,
        delay: duration * 0.8,
        duration: 100,
        zIndex: "-1",
      },
      {
        targets: ["#scale-img"],
        opacity: 0,
        delay: duration,
        duration: 100,
        zIndex: "-1",
        changeBegin: (anim) => {
          if (!scrollStarted) {
            anim.reset();
            anim.pause();
            animate(
              [
                {
                  targets: ["#scale-img"],
                  opacity: 1,
                  zIndex: "1",
                },
                {
                  targets: [
                    "#scale-content-title",
                    "#scale-content-author",
                    "#scale-content-play",
                  ],
                  opacity: 1,
                  zIndex: "1",
                },
              ],
              1
            );
          }
        },
        changeComplete: () => {
          scrollStarted = false;
        },
        begin: () => {
          scrollStarted = true;
        },
      },
      {
        targets: ["#scale-content-play"],
        opacity: 0,
        duration,
      },
      {
        targets: "#scale-content",
        paddingLeft: "0vh",
        paddingRight: "0vh",
      },
      {
        targets: "#scale-content-title",
        fontSize: "19px",
        paddingLeft: "2.9vh",
        paddingRight: "2.9vh",
      },
      {
        targets: "#scale-content-author",
        fontSize: "17px",
        translateY: "-100%",
        opacity: 0,
      },
      {
        targets: "#scale-content-equalizer",
        translateY: "65%",
        height: "7.64vh",
      },
      {
        targets: "#caroseul .caroseul-item:nth-child(2) div .caroseul-author",
        opacity: 0,
        translateY: "-100%",
      },
      {
        targets: ["#scale-content-button", "#caroseul"],
        opacity: 1,
      },
    ],
    {
      duration,
      delay: duration * 0.2,
    },
    false,
    scrollDurationOverride
  );
  body.style.overflowY = "hidden";
  setTimeout(() => {
    body.style.overflowY = "visible";
  }, duration * 0.9);
};

const ScrollUpHandle = (scrollDurationOverride) => {
  caroseulScrollTo(1, () => {
    animate(
      [
        {
          targets: ".up",
          translateY: "0px",
        },
        {
          targets: ".scale-out",
          opacity: 1,
        },
        {
          targets: "#scale-img",
          scale: 1,
          translateY: "0vh",
          translateX: "-50%",
          height: "100vh",
          begin: () => {
            scrollStarted = false;
          },
        },
        {
          targets: "#scale-box",
          bottom: "0vh",
          width: "60vh",
          height: "86.2vh",
          borderBottomLeftRadius: "0vh",
          borderBottomRightRadius: "0vh",
          borderTopLeftRadius: "14.1vh",
          borderTopRightRadius: "14.1vh",
          borderWidth: "1px",
          borderBottomWidth: "0px",
        },
        {
          targets: "#scale-layer",
          borderTopLeftRadius: "14.1vh",
          borderTopRightRadius: "14.1vh",
          width: `${containerY * widthCoef}px`,
          height: "86.2vh",
          paddingBottom: "0vh",
          paddingTop: "0vh",
        },
        {
          targets: "#scale-box .gradient-bottom",
          bottom: "0vh",
          opacity: 1,
        },
        {
          targets: ".scale-down-in",
          translateX: "-50%",
          translateY: "-10vh",
          opacity: 0,
          scale: 0.6,
        },
        {
          targets: ".scale-up-in",
          translateX: "-50%",
          translateY: "+10vh",
          opacity: 0,
          scale: 0.6,
        },
        {
          targets: "#caroseul .caroseul-item",
          left: "17.7vw",
          translateX: "-19.5vh",
        },
        {
          targets: [
            "#scale-content-title",
            "#scale-content-author",
            "#scale-content-play",
          ],
          opacity: 1,
          duration: 100,
          zIndex: "1",
        },
        {
          targets: ["#scale-img"],
          opacity: 1,
          duration: 100,
          zIndex: "1",
        },
        {
          targets: "#scale-content",
          paddingLeft: "5.2vh",
          paddingRight: "5.2vh",
        },
        {
          targets: "#scale-content-title",
          fontSize: "28px",
          paddingLeft: "0vh",
          paddingRight: "0vh",
        },
        {
          targets: "#scale-content-author",
          fontSize: "22px",
          translateY: "0%",
          opacity: 1,
        },
        {
          targets: "#scale-content-equalizer",
          translateY: "0%",
          height: "10vh",
          scale: 1,
        },
        {
          targets: "#scale-content-play",
          width: "13vh",
        },
        {
          targets: "#caroseul .caroseul-item .gradient-bottom",
          opacity: 0,
          delay: duration * 0.6,
          duration: 100,
        },
        {
          targets: "#caroseul .caroseul-item:nth-child(2) div .caroseul-author",
          opacity: 1,
          translateY: "0%",
        },
        {
          targets: ["#scale-content-button", "#caroseul"],
          opacity: 0,
        },
      ],
      {
        duration,
        // delay: duration * 0.3,
      },
      false,
      scrollDurationOverride
    );
  });
  setTimeout(() => {
    caroseulScrollTo(1);
  }, 700);
};

const ScrollHandle = () => {
  lastScroll = thisScroll;
  thisScroll = window.scrollY;

  if (thisScroll > scrollStart && lastScroll <= scrollStart) {
    ScrollDownHandle();
  } else if (thisScroll <= scrollStart && lastScroll > scrollStart) {
    ScrollUpHandle();
  }
};

const ScrollSizeChanged = () => {
  SizeChangedHandle();
  if (window.scrollY > 0) ScrollDownHandle();
  else if (window.scrollY <= 0) ScrollUpHandle();
};

window.addEventListener("scroll", ScrollHandle);
window.addEventListener("resize", ScrollSizeChanged);
