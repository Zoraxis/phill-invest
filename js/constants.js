const constants = {
  caroseul: {
    desktop: {
      bigW: "39vh",
      bigH: "62vh",
      smallW: "29.4vh",
      smallH: "46.5vh",
      bigBottom: "0vh",
      smallBottom: "7.5vh",
      leftStart: "0vh",
      centerStart: "39.05vh",
      rightStart: "87.7vh",
    },
    mobile: {
      bigW: "39vh",
      bigH: "61.8vh",
      smallW: "29.4vh",
      smallH: "46.58vh",
      bigBottom: "0vh",
      smallBottom: "7.7vh",
      leftStart: "-34.2vh",
      centerStart: "-3.76vh",
      rightStart: "36vh",
    },
  },
  slider: {
    desktop: {
      width: "487px",
      height: "680px",
      sliderX: 487,
      gap: 26,
      margin: 320,
    },
    mobile: {
      width: "256px",
      height: "358px",
      sliderX: 256,
      gap: 16,
      margin: 42,
    },
  },
};

const mobileMax = 640;

const getResponsiveValues = (category) => {
  const deviceType = containerX > mobileMax ? "desktop" : "mobile";

  return constants[category][deviceType];
};

const getNum = (value) => parseFloat(value.replace(/[^\d.-]/g, ''))