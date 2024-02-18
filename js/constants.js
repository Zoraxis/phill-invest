const constants = {
  "caroseul": {
    "desktop": {
      left: "-58.5vh",
      center: "-19.5vh",
      right: "29.1vh",
      bigW: "39vh",
      bigH: "62vh",
      smallW: "29.4vh",
      smallH: "46.6vh",
      bigBottom: "10vh",
      smallBottom: "17.5vh",
      leftStart: "-19.5vh",
      centerStart: "-19.5vh",
      rightStart: "-19.5vh",
    },
    "mobile": {
      left: "-509px",
      center: "-235px",
      right: "115px",
      bigW: "332px",
      bigH: "526px",
      smallW: "250px",
      smallH: "396px",
      bigBottom: "0px",
      smallBottom: "65.5px",
      leftStart: "-509px",
      centerStart: "-235px",
      rightStart: "115px",
    },
  },
};

const mobileMax = 640;

const getResponsiveValues = (category) => {
  const deviceType = containerX > mobileMax ? "desktop" : "mobile";

  return constants[category][deviceType];
};
