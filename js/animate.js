const duration = 750,
  delay = 50,
  easing = "cubicBezier(.35, 0, 0, 1)";

let queue = [];

const getQueued = (id) => queue.find((x) => x.name == id) != undefined;

const animate = (
  anims,
  options = { duration },
  name = false,
  durationOverride = false
) => {
  if (!!name) {
    if (queue.find((x) => x.name == name) != undefined && name) return -1;
    queue.push({ name, count: anims.length });
  }

  const durationOverrideParameter = {};
  if (durationOverride)
    durationOverrideParameter["duration"] = durationOverride;

  // var tl = anime.timeline({
  //   easing,
  //   duration: options.duration,
  // });
  for (const anim of anims) {
    anime(
      {
        easing,
        ...options,
        ...anim,
        complete: () => {
          if (!!anim.complete) anim.complete();
          if (!name) return;

          const q = queue.find((x) => x.name == name);
          q.count--;
          if (q.count <= 0) {
            queue = queue.filter((x) => x.name != q.name);
          }
        },
        ...durationOverrideParameter,
      }
    );
  }
};

const threadSleep = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

const widthCoef = 0.6;

const layer = document.querySelector("#scale-layer");
let container = document.querySelector("#scale-block");
let containerX = container.clientWidth,
  containerY = container.clientHeight;

const SizeChangedHandle = () => {
  container = document.querySelector("#scale-block");
  containerX = container.clientWidth;
  containerY = container.clientHeight;

  layer.style.width = `${containerY * widthCoef}px`;
};

const body = document.body;
