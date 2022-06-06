let sections = document.querySelectorAll("section");
let outerWrappers = gsap.utils.toArray(".outer");
let innerWrappers = gsap.utils.toArray(".inner");
let backgrounds = gsap.utils.toArray(".background");

let currentIndex = -1;

gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

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
  console.log(`index: ${index},\ncurrentIndex: ${currentIndex},\ndirection: ${direction}`);
  index = wrap(index);
  moving = true;
  movement = directionToMatrix(direction);
  timeline = gsap.timeline({
    defaults: { duration: 1.25, ease: "power1.inOut" },
    onComplete: () => (moving = false),
  });

  if (currentIndex >= 0) {
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
        yPercent: (i) => {
          console.log(i*-1, movement.y)
          return i ? -100 * movement.y : 100 * movement.y;
        },
      },
      { yPercent: 0 },
      0
    )
    .fromTo(
      backgrounds[index],
      { yPercent: 15 * movement.y },
      { yPercent: 0 },
      0
    );

  currentIndex = index;
}

Observer.create({
  target: window, // can be any element (selector text is fine)
  wheelSpeed: -1,
  type: "wheel,touch, pointer", // comma-delimited list of what to listen for ("wheel,touch,scroll,pointer")
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
  tolerance: 20,
  preventDefault: true
});


gotoIndex(0, "bottom");
