const buttonAnimationInit = () => {
  const btns = document.getElementsByClassName("btn");

  [...btns].forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      anime({
        targets: btn,
        scale: 1.1,
      });
    });
    btn.addEventListener("mouseleave", () => {
      anime({
        targets: btn,
        scale: 1,
      });
    });
  });
};

setTimeout(() => {
    buttonAnimationInit();
}, 1000)