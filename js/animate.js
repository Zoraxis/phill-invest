let lastScroll = 0,
  thisScroll = 0;

const duration = 1080,
  delay = 50,
  easing = "cubicBezier(.35, 0, 0, 1)";

const animate = (anims) => {
  for (const anim of anims) {
    anime({
      easing,
      duration,
      ...anim,
    });
  }
};

const container = document.querySelector("#scale-block");
const layer = document.querySelector("#scale-layer");

const containerX = container.clientWidth,
  containerY = container.clientHeight;

const widthCoef = 0.6;

layer.style.width = `${containerY * widthCoef}px`;

onscroll = (event) => {
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
        scale: 0.6,
        translateX: "-50%",
        translateY: "-11.85vh",
        height: `${(62 / 60) * 100}vh`,
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
        scale: 1
      },
    ]);
  } else if (thisScroll == 0 && lastScroll > 0) {
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
        scale: 0.6
      },
      {
        targets: ".scale-up-in",
        translateX: "-50%",
        translateY: "+10vh",
        opacity: 0,
        scale: 0.6
      },
    ]);
  }
};
