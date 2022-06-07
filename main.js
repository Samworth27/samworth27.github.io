let sections = document.querySelectorAll("section");
let outerWrappers = gsap.utils.toArray(".outer");
let innerWrappers = gsap.utils.toArray(".inner");
let backgrounds = gsap.utils.toArray(".background");
let pageIndicators = gsap.utils.toArray(".page-indicator");

let currentIndex = -1;

gsap.set(outerWrappers, { yPercent: 100 });
// gsap.set(innerWrappers, { yPercent: -100 });

let wrap = (index) =>
  ((index % sections.length) + sections.length) % sections.length;

let directionToMatrix = (direction) => {
  switch (direction) {
    case "top":
      return { x: 0, y: -1 };
    case "bottom":
      return { x: 0, y: 1 };
    case "left":
      return { x: -1, y: 0 };
    case "right":
      return { x: 1, y: 0 };
    default:
      return null;
  }
};

function gotoIndex(index, direction) {
  index = wrap(index);
  moving = true;
  movement = directionToMatrix(direction);
  pageIndicators[index].classList.remove("outline");

  timeline = gsap.timeline({
    defaults: { duration: 1.25, ease: "power1.inOut" },
    onComplete: () => (moving = false),
  });

  if (currentIndex >= 0) {
    pageIndicators[currentIndex].classList.add("outline");
    gsap.set(sections[currentIndex], { zIndex: 0 });
    timeline
      .to(backgrounds[currentIndex], {
        xPercent: -15 * movement.x,
        yPercent: -15 * movement.y,
      })
      .set(sections[currentIndex], { autoAlpha: 0 });
  }

  gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });

  timeline
    .fromTo(
      [outerWrappers[index], innerWrappers[index]],
      {
        xPercent: (i) => {
          return i ? -100 * movement.x : 100 * movement.x;
        },
        yPercent: (i) => {
          return i ? -100 * movement.y : 100 * movement.y;
        },
      },
      { xPercent: 0, yPercent: 0 },
      0
    )
    .fromTo(
      backgrounds[index],
      { xPercent: 15 * movement.x, yPercent: 15 * movement.y },
      { xPercent: 0, yPercent: 0 },
      0
    );

  currentIndex = index;
}

Observer.create({
  target: window,
  wheelSpeed: -1,
  type: "wheel,touch, pointer",
  onDown: () => {
    if (!moving) {
      gotoIndex(currentIndex - 1, "top");
    }
  },
  onUp: () => {
    if (!moving) {
      gotoIndex(currentIndex + 1, "bottom");
    }
  },
  onLeft: () => {
    if (!moving) {
      gotoIndex(currentIndex + 1, "right");
    }
  },
  onRight: () => {
    if (!moving) {
      gotoIndex(currentIndex - 1, "left");
    }
  },
  tolerance: 20,
  preventDefault: true,
});

pageIndicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    if (!moving && index !== currentIndex) {
      gotoIndex(index, index > currentIndex ? "bottom" : "top");
    }
  });
});

gotoIndex(2, "bottom");

let repos = null;
let reposWrapper = document.querySelector(".github");

fetch("https://api.github.com/users/samworth27/repos").then(
  async (response) => {
    const data = await response.json();
    repos = data;
  }
);

repos.map((i) => {
  return { name: i.name };
});
