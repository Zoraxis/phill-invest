const scrollStart = 10;

let lastScroll = 0,
  thisScroll = 0;

let scrollConsts = getResponsiveValues("caroseul");

const ScrollDownHandle = (scrollDurationOverride = duration) => {
  animate(
    [
      // SCALE ANIAMTION START
      {
        targets: "#scale-bg",
        height: "100vh",
        width: `${containerX}px`,
        borderTopLeftRadius: "0vh",
        borderTopRightRadius: "0vh",
      },
      {
        targets: "#scale-box",
        borderColor: {
          value: "#FFF",
          duration: duration * 0.75,
        },
        borderBottomLeftRadius: "7.06vh",
        borderBottomRightRadius: "7.06vh",
        borderTopLeftRadius: "7.06vh",
        borderTopRightRadius: "7.06vh",
        height: scrollConsts.bigH,
        width: scrollConsts.bigW,
      },
      {
        targets: "#scale-img",
        top: "31vh",
        translateY: "-50%",
        opacity: {
          value: 0,
          delay: duration,
          duration: duration * 0.1,
        },
        scale: 0.65,
      },
      {
        targets: "#scale-box .gradient-bottom",
        bottom: "-10vh",
        duration: duration * 0.6,
      },
      // SCALE ANIAMTION END
      // PRMIMITIVES START
      {
        targets: ".up",
        translateY: "-50%",
      },
      {
        targets: ".down",
        translateY: "0%",
      },
      {
        targets: ".fade-out",
        opacity: "0",
      },
      {
        targets: ".fade-in",
        opacity: "1",
        delay: duration * 0.25,
      },
      // PRMIMITIVES END
      // CONTENT START
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
      // CONTENT END
      //CAROSEUL START
      {
        targets: "#caroseul .caroseul-item:nth-child(3)",
        translateX: scrollConsts.right,
      },
      {
        targets: "#caroseul .caroseul-item:nth-child(1)",
        translateX: scrollConsts.left,
      },
      {
        targets: "#caroseul .caroseul-item .gradient-bottom",
        opacity: 1,
        delay: duration,
        duration: duration * 0.75,
      },
      //CAROSEUL END
    ],
    { duration: scrollDurationOverride }
  );
};

const ScrollUpHandle = () => {
  caroseulScrollTo(1, () => {
    animate([
      // SCALE ANIAMTION START
      {
        targets: "#scale-bg",
        height: "86.1vh",
        width: `${containerY * 0.598}px`,
        borderTopLeftRadius: "14.1vh",
        borderTopRightRadius: "14.1vh",
      },
      {
        targets: "#scale-box",
        borderColor: {
          value: "#D4D4D4",
          delay: duration * 0.75,
        },
        borderBottomLeftRadius: "0vh",
        borderBottomRightRadius: "0vh",
        borderTopLeftRadius: "14.1vh",
        borderTopRightRadius: "14.1vh",
        height: "86.1vh",
        width: "59.6vh",
      },
      {
        targets: "#scale-img",
        top: "-13.9vh",
        translateY: "0%",
        opacity: {
          value: 1,
          duration: duration * 0.25,
        },
        scale: 1,
      },
      {
        targets: "#scale-box .gradient-bottom",
        bottom: "0vh",
        opacity: 1,
      },
      // SCALE ANIAMTION END
      // PRMIMITIVES START
      {
        targets: ".up",
        translateY: "0%",
      },
      {
        targets: ".down",
        translateY: "50%",
      },
      {
        targets: ".fade-out",
        opacity: "1",
      },
      {
        targets: ".fade-in",
        opacity: "0",
        duration: duration * 0.5,
      },
      // PRMIMITIVES END
      // CONTENT START
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
      // CONTENT END
      //CAROSEUL START
      {
        targets: "#caroseul .caroseul-item .gradient-bottom",
        opacity: 0,
        delay: duration * 0.6,
        duration: 100,
      },
      //CAROSEUL END
    ]);
  });
};

const ScrollHandle = () => {
  lastScroll = thisScroll;
  thisScroll = window.scrollY;

  if (thisScroll > scrollStart && lastScroll <= scrollStart) {
    ScrollDownHandle();
    body.style.overflowY = "hidden";
    setTimeout(() => {
      body.style.overflowY = "visible";
    }, duration * 0.9);
  } else if (thisScroll <= scrollStart && lastScroll > scrollStart) {
    ScrollUpHandle();
  }
};

const ScrollSizeChanged = () => {
  SizeChangedHandle();
  scrollConsts = getResponsiveValues("caroseul");
  if (window.scrollY > 0) ScrollDownHandle();
  else {
    ScrollUpHandle(1);
  }
};
ScrollSizeChanged();

window.addEventListener("scroll", ScrollHandle);
window.addEventListener("resize", ScrollSizeChanged);
