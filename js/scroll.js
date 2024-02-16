let lastScroll = 0,
  thisScroll = 0;

window.addEventListener("scroll", (event) => {
  lastScroll = thisScroll;
  thisScroll = window.scrollY;

  if (thisScroll > 0 && lastScroll == 0) {
    animate([
      {
        targets: ".up",
        translateY: "-300px",
      },
      {
        targets: ".scale-out",
        opacity: 0,
      },
      {
        targets: "#scale-img",
        scale: 0.4,
        translateX: "-49.8%",
        translateY: "-82vh",
        height: `${(62 / 40) * 100}vh`,
      },
      {
        targets: "#scale-box",
        bottom: "10vh",
        width: "39vh",
        height: "62vh",
        borderBottomLeftRadius: "80px",
        borderBottomRightRadius: "80px",
      },
      {
        targets: "#scale-layer",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        width: `${containerX}px`,
        height: "200vh",
      },
      {
        targets: "#scale-box .gradient-bottom",
        bottom: "-7vh",
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
        targets: "#caroseul .caroseul-item:nth-child(3)",
        translateX: "29.1vh",
      },
      {
        targets: "#caroseul .caroseul-item:nth-child(1)",
        translateX: "-58.5vh",
      },
      {
        targets: "#scale-box",
        opacity: 0,
        delay: duration,
        duration: 100
      },
    ]);
    body.style.overflowY = "hidden";
    setTimeout(() => {
      body.style.overflowY = "visible";
    }, duration * 0.9);
  } else if (thisScroll == 0 && lastScroll > 0) {
    caroseulScrollTo(1, () => {
      animate([
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
          translateX: "-50%",
          translateY: "0vh",
          height: `100vh`,
        },
        {
          targets: "#scale-box",
          bottom: "0vh",
          width: "60vh",
          height: "86.2vh",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        },
        {
          targets: "#scale-layer",
          borderTopLeftRadius: "80px",
          borderTopRightRadius: "80px",
          width: `${containerY * widthCoef}px`,
          height: "86.2vh",
          paddingBottom: "0vh",
          paddingTop: "0vh",
        },
        {
          targets: "#scale-box .gradient-bottom",
          bottom: "0vh",
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
          translateX: "-19.5vh"
        },
        {
          targets: "#scale-box",
          opacity: 1,
          duration: 100
        },
      ]);
    });
  }
});
