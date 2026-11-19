// ====================================
// 1. MOBILE NAVIGATION MENU
// ====================================

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", function () {

        navigation.classList.toggle("active");

        const isOpen = navigation.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

}


// ====================================
// 2. CLOSE MENU AFTER CLICKING A LINK
// ====================================

const navigationLinks = document.querySelectorAll("#navigation a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navigation.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";

    });

});


// ====================================
// 3. ACTIVE NAVIGATION HIGHLIGHTING
// ====================================

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });

    navigationLinks.forEach(function (link) {

        link.classList.remove("active-link");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active-link");

        }

    });

});


// ====================================
// 4. WEBSITE WELCOME MESSAGE
// ====================================

console.log("Welcome to LCCN Academy!");
console.log("Website successfully loaded.");

window.addEventListener("load", function () {

    console.log("All website resources have loaded.");

});


// ====================================
// 5. IMAGE SLIDER FUNCTIONALITY
// ====================================

const slides = document.querySelectorAll(".hero-slider .slide");

const prevButton = document.getElementById("prevSlide");
const nextButton = document.getElementById("nextSlide");

const dotsContainer = document.getElementById("sliderDots");
const toggleButton = document.getElementById("toggleAutoplay");

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

let currentSlide = 0;
let sliderInterval = null;

// Visitors who ask for reduced motion start paused; the control lets them opt in
let isPaused = motionQuery.matches;

let dots = [];


// CHECK IF SLIDER EXISTS

if (slides.length > 0 && dotsContainer && prevButton && nextButton) {


    // ====================================
    // 6. CREATE SLIDER DOTS
    // ====================================

    slides.forEach(function (slide, index) {

        const dot = document.createElement("button");

        dot.classList.add("dot");

        dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", function () {

            showSlide(index);
            startSlider();

        });

        dotsContainer.appendChild(dot);

        dots.push(dot);

    });


    // ====================================
    // 7. DISPLAY SLIDE
    // ====================================

    function showSlide(index) {

        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");

    }


    // ====================================
    // 8. NEXT SLIDE
    // ====================================

    function nextSlide() {

        showSlide(currentSlide + 1);

    }


    // ====================================
    // 9. PREVIOUS SLIDE
    // ====================================

    function previousSlide() {

        showSlide(currentSlide - 1);

    }


    // ====================================
    // 10. AUTOMATIC SLIDER
    // ====================================

    function startSlider() {

        clearInterval(sliderInterval);
        sliderInterval = null;

        // Paused, or nothing to advance to: stay on the current slide
        if (isPaused || slides.length < 2) {
            return;
        }

        sliderInterval = setInterval(function () {

            nextSlide();

        }, 5000);

    }


    // ====================================
    // 11. PLAY/PAUSE STATE
    // ====================================

    function updateToggleButton() {

        if (!toggleButton) {
            return;
        }

        const label = isPaused ? "Play slideshow" : "Pause slideshow";

        toggleButton.setAttribute("aria-label", label);
        toggleButton.setAttribute("title", label);

        // The glyph is decorative; the aria-label carries the meaning
        toggleButton.textContent = isPaused ? "\u25B6" : "\u275A\u275A";

    }


    function setPaused(paused) {

        isPaused = paused;

        startSlider();
        updateToggleButton();

    }


    if (toggleButton) {

        toggleButton.addEventListener("click", function () {

            setPaused(!isPaused);

        });

    }


    // Follow the operating system setting if it changes while the page is open.
    // Only ever pauses: an explicit pause by the visitor is never overridden.

    function handleMotionPreferenceChange(event) {

        if (event.matches) {

            setPaused(true);

        }

    }

    if (typeof motionQuery.addEventListener === "function") {

        motionQuery.addEventListener("change", handleMotionPreferenceChange);

    } else if (typeof motionQuery.addListener === "function") {

        motionQuery.addListener(handleMotionPreferenceChange);

    }


    // ====================================
    // 12. SLIDER BUTTON EVENTS
    // ====================================

    nextButton.addEventListener("click", function () {

        nextSlide();
        startSlider();

    });


    prevButton.addEventListener("click", function () {

        previousSlide();
        startSlider();

    });


    // ====================================
    // 13. START SLIDER
    // ====================================

    updateToggleButton();
    startSlider();

}


// ====================================
// END OF LCCN ACADEMY JAVASCRIPT
// ====================================
