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
        top: "-20vh",
        scale: 0.65,
      },
      // SCALE ANIAMTION END
      {
        targets: ".up",
        translateY: "-50%",
      },
      {
        targets: ".fade-out",
        opacity: "0",
      },
    ],
    { duration: scrollDurationOverride }
  );
};

const ScrollUpHandle = () => {
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
      scale: 1,
    },
    // SCALE ANIAMTION END
    {
      targets: ".up",
      translateY: "0%",
    },
    {
      targets: ".fade-out",
      opacity: "1",
    },
  ]);
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
