const duration = 1080,
  delay = 50,
  easing = "cubicBezier(.35, 0, 0, 1)";

let queue = [];

const getQueued = (id) => queue.find((x) => x.name == id) != undefined;

const animate = (anims, time = duration, name = false) => {
  if (!!name) {
    if (queue.find((x) => x.name == name) != undefined && name) return -1;
    queue.push({ name, count: anims.length });
  }

  var tl = anime.timeline({
    easing,
    duration: time,
  });
  for (const anim of anims) {
    tl.add(
      {
        easing,
        duration: time,
        ...anim,
        complete: () => {
          if(!!anim.complete) anim.complete()
          if (!name) return;

          const q = queue.find((x) => x.name == name);
          q.count--;
          if (q.count <= 0) {
            queue = queue.filter((x) => x.name != q.name);
          }
        },
      },
      0
    );
  }
};

const threadSleep = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

const container = document.querySelector("#scale-block");
const body = document.body;
const layer = document.querySelector("#scale-layer");

const containerX = container.clientWidth,
  containerY = container.clientHeight;

const widthCoef = 0.6;

layer.style.width = `${containerY * widthCoef}px`;
