anime({
  targets: ".equalizer g path",
  scaleY: 1.25,
  delay: anime.stagger(50, { from: "center" }),
  direction: "alternate",
  endDelay: -50,
  loop: true,
});
