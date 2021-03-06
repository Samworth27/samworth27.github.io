let sections = document.querySelectorAll("section");
let outerWrappers = gsap.utils.toArray(".outer");
let innerWrappers = gsap.utils.toArray(".inner");
let backgrounds = gsap.utils.toArray(".background");
let pageIndicators = gsap.utils.toArray(".page-indicator");
let aboutArticles = gsap.utils.toArray(".about-article");
let currentIndex = -1;
let interacting = false;

// Utility functions

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

// Page Control

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
      sessionStorage.setItem('index', currentIndex)
}

observer = Observer.create({
  target: window,
  wheelSpeed: -1,
  type: "wheel,touch, pointer",
  onDown: () => {
    if (!moving && !interacting) {
      gotoIndex(currentIndex - 1, "top");
    }
  },
  onUp: () => {
    if (!moving && !interacting) {
      gotoIndex(currentIndex + 1, "bottom");
    }
  },
  onLeft: () => {
    if (!moving && !interacting) {
      gotoIndex(currentIndex + 1, "right");
    }
  },
  onRight: () => {
    if (!moving && !interacting) {
      gotoIndex(currentIndex - 1, "left");
    }
  },
  tolerance: 20,
  preventDefault: true,
});

let inputs = document.querySelectorAll("input, textarea")
for (input of inputs) {
  input.addEventListener('mouseover', () => {
    observer.disable();
    interacting = true
  })
  input.addEventListener('mouseout', () => {
    observer.enable();
    interacting = false
  })
}

// Page Indicators
pageIndicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    if (!moving && index !== currentIndex) {
      gotoIndex(index, index > currentIndex ? "bottom" : "top");
    }
  });
});

// About Articles
let aboutArticleActive = null;
function aboutArticleGoto(target) {
  let targetImage = target.querySelector("img");
  let targetText = target.querySelector(".about-article-text");
  if (aboutArticleActive !== null) {
    let previousImage = aboutArticleActive.querySelector("img");
    let previousText = aboutArticleActive.querySelector(".about-article-text");
    previousImage.classList.remove("w-12", "h-12");
    previousImage.classList.add("w-32", "h-32");
    previousText.classList.remove("block");
    previousText.classList.add("hidden");
  }
  targetImage.classList.add("w-12", "h-12");
  targetImage.classList.remove("w-32", "h-32");
  targetText.classList.add("block");
  targetText.classList.remove("hidden");
  aboutArticleActive = target;
}

for (article of aboutArticles) {
  article.addEventListener(
    "click",
    (event) => {
      let target = event.currentTarget;
      if (target !== aboutArticleActive) {
        aboutArticleGoto(target);
      }
    },
    true
  );
}

let repos = null;
let reposWrapper = document.querySelector(".github");

fetch("https://api.github.com/users/samworth27/repos").then(
  async (response) => {
    const data = await response.json();
    repos = data;
  }
);

// repos.map((i) => {
//   return { name: i.name };
// });



// Initialise Page

gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

aboutArticleGoto(aboutArticles[0]);

index = sessionStorage.getItem("index");
index = index? index : 0

gotoIndex(index, "bottom");
