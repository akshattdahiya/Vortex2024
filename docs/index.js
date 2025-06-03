const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)



// Icons
const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");


// Theme Vars
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;


// Icon Toggling
const iconToggle = () => {
    moonIcon.classList.toggle("display-none");
    sunIcon.classList.toggle("display-none");
};

function darklogo() {
    const logos = document.querySelectorAll('.logo-switch');
    logos.forEach(logo => {
        logo.src = "images/logo dark.png";
    });
}

function lightlogo() {
    const logos = document.querySelectorAll('.logo-switch');
    logos.forEach(logo => {
        logo.src = "images/vortex club logo.png";
    });
}

// Initial Theme Check
const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
        document.documentElement.classList.add("dark");
        darklogo();
        moonIcon.classList.add("display-none");
        return;
    }
    sunIcon.classList.add("display-none");
};


// Manual Theme Switch
const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme","light");
        lightlogo();
        iconToggle();
        return;
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme","dark");
    darklogo();
    iconToggle();
};


// Call Theme Switch on Clicking Buttons
sunIcon.addEventListener("click", () => {
    themeSwitch();
});
moonIcon.addEventListener("click", () => {
    themeSwitch();
});


// Invoke Theme Check on Initial Load
themeCheck();


lastScroll = window.scrollY || 0; // Initialize lastScroll to current scroll position
const bgdiv = document.getElementById('bg-cut');
function handleScroll() {
  // Base -28 = -7rem, so adjust from there
  const baseMargin = -7; // in rem (since -ml-28 = -7rem)
  const adjustedMargin = Math.max(-40, baseMargin - (scrollY * 0.008)); // tweak multiplier to control speed

  // Apply in rem
  bgdiv.style.marginLeft = `${adjustedMargin}rem`;

  if (window.innerWidth > 768) {
    const nav = document.querySelector('nav');
    if (window.scrollY > lastScroll) {
      nav.classList.add('md:py-2', 'shadow-lg');
      nav.classList.remove('md:py-4');
    } else {
      nav.classList.add('md:py-4');
      nav.classList.remove('md:py-2', 'shadow-lg');
    }

    lastScroll = window.scrollY;
  }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll); // Run once on page load
