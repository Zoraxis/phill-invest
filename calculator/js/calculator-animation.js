const basicCalcAniamtion = {
  easing: "linear",
  loop: true,
  duration: 2000,
  endDelay: 0,
  direction: "alternate",
};

anime({
  ...basicCalcAniamtion,
  targets: [".anim-cloud"],
  duration: 3000,
  scale: anime.stagger([1.04, 1.08]),
});

anime({
  ...basicCalcAniamtion,
  targets: [".anim-iceberg"],
  scale: 1.01,
  duration: 6500,
  rotate: [
    { value: "+=3deg" },
    { value: "-=2deg" },
    { value: "+=1deg" },
    { value: "-=3deg" },
  ],
  translateY: [
    { value: "+=0px" },
    { value: "-=10px" },
    { value: "+=10px" },
    { value: "+=0px" },
  ],
});

anime({
  ...basicCalcAniamtion,
  duration: 6500,
  targets: ".anim-water",
  scale: [{ value: 1.1 }, { value: 1.2 }, { value: 1 }, { value: 1 }],
  rotate: [
    { value: "-=2deg" },
    { value: "+=1deg" },
    { value: "-=1deg" },
    { value: "+=2deg" },
  ],
});

anime({
  ...basicCalcAniamtion,
  duration: 6500,
  targets: ".anim-bird",
});

const fishPath = anime.path(".anim-fish-path");

anime({
  ...basicCalcAniamtion,
  targets: ".anim-fish",
  duration: 9000,
//   delay: 2000,
  easing: 'cubicBezier(.895, .03, .685, .220)',
  translateX: fishPath("x"),
  translateY: fishPath("y"),
  rotate: fishPath("angle"),
  direction: "normal"
});
