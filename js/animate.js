const duration = 1080,
  delay = 50,
  easing = "cubicBezier(.35, 0, 0, 1)";

const body = document.body;

//#region scale img
const imgX = 2880,
  imgY = 1700;

const container = document.querySelector("#scale-box");

const containerX = container.clientWidth,
  containerY = container.clientHeight;

var originalRatios = {
  width: containerX / imgX,
  height: containerY / imgY,
};

let zoomWidth, zoomHeight;

const zoomCoef = 0.6;

var coverRatio = Math.max(originalRatios.width, originalRatios.height);

var finalWidth = imgX * coverRatio;
var finalHeight = imgY * coverRatio;

zoomWidth = finalWidth * zoomCoef;
zoomHeight = finalHeight * zoomCoef;

container.style.backgroundSize = `${finalWidth}px ${finalHeight}px`;
//#enregion

const animate = (anims) => {
  for (const anim of anims) {
    const trueDelay = anim.delay ?? 0;
    anime({
      targets: anim.targets,
      ...anim.props,
      easing,
      duration,
      delay: trueDelay,
    });
  }
};

addEventListener("scroll", (event) => {});

let lastScroll = 0,
  thisScroll = 0;

onscroll = (event) => {
  lastScroll = thisScroll;
  thisScroll = window.scrollY;

  if (thisScroll > 0 && lastScroll == 0) {
    animate([
      {
        targets: ["#scale-border"],
        props: {
          scale: 5,
        },
      },
      {
        targets: ["#scale-container", "#clip rect"],
        props: {
          width: "23.05vw", // w=332px
          height: "51.46vh", // h=527px
        },
      },
      {
        targets: ["#clip rect"],
        props: {
          x: "38.475vw",
        },
      },
      {
        targets: ["#scale-box"],
        props: {
          left: "-38.475vw",
          backgroundSize: `${zoomWidth * 1.3}px ${zoomHeight * 1.3}px`,
          backgroundPositionY: "-=80%",
          //   complete: () => {
          //     animate([
          //       {
          //         targets: ["#scale-box"],
          //         props: {
          //           backgroundSize: `${zoomWidth}px ${zoomHeight}px`,
          //           backgroundPositionY: "10%",
          //         },
          //       },
          //     ]);
          //   },
        },
      },
      {
        targets: ["#scale-box"],
        props: {
          backgroundSize: `${zoomWidth}px ${zoomHeight}px`,
          backgroundPositionY: "10%",
          duration: duration * 2,
        },
      },
      {
        targets: ["#overlay"],
        props: {
          paddingTop: "36.71vh", // pt=375px
        }
      },
      {
        targets: [".up"],
        props: {
          translateY: "-=20%",
          opacity: 0,
        },
      },
      {
        targets: [
          "#scale-content .gradient-top",
          "#scale-content .gradient-bottom",
        ],
        props: {
          top: "+=15%",
        },
      },
      {
        targets: [".play-default"],
        props: {
          width: "4.09vw",
          height: "7.63vw",
        },
      },
      {
        targets: ["#scale-content .gradient-bottom", "#scale-content"],
        props: {
          borderRadius: "120px",
        },
      },
      {
        targets: ["#scale-content"],
        props: {
          height: "100%",
        },
      },
    ]);
    body.style.overflowY = "hidden";
    setTimeout(() => {
      body.style.overflowY = "visible";
    }, duration * 1);
  } else if (thisScroll == 0 && lastScroll > 0) {
    animate([
      {
        targets: ["#scale-border"],
        props: {
          scale: 1,
        },
        delay,
      },
      {
        targets: ["#scale-container", "#clip rect"],
        props: {
          width: "35.2vw", // w=507px
          height: "98vh", // h=1022px
        },
      },
      {
        targets: ["#clip rect"],
        props: {
          x: "32.4vw",
        },
      },
      {
        targets: ["#scale-box"],
        props: {
          left: "-32.36vw",
          backgroundSize: `${finalWidth}px ${finalHeight}px`,
          backgroundPositionY: "+=40%",
        },
      },
      {
        targets: ["#overlay"],
        props: {
          paddingTop: "11.95vh", // pt=118px
        },
      },
      {
        targets: [".up"],
        props: {
          translateY: "+=20%",
          opacity: 1,
        },
      },
      {
        targets: [
          "#scale-content .gradient-top",
          "#scale-content .gradient-bottom",
        ],
        props: {
          top: "-=15%",
        },
      },
      {
        targets: [".play-default"],
        props: {
          width: "7.63vw",
          height: "7.63vw",
        },
      },
      {
        targets: ["#scale-content .gradient-bottom", "#scale-content"],
        props: {
          borderRadius: "0",
        },
      },
      {
        targets: ["#scale-content"],
        props: {
          height: "89.9%",
        },
      },
    ]);
  }
};
