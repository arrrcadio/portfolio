document.addEventListener("DOMContentLoaded", function () {
    const headerLeft = document.querySelector(".header-left"); 
    const animationContainer = document.getElementById("logo"); 

    // Load the logo animation
    const animation = lottie.loadAnimation({
        container: animationContainer,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "/assets/animations/logo-animation.json"
    });

    // Play animation on hover
    headerLeft.addEventListener("mouseenter", () => {
        animation.setDirection(1); // Play forward
        animation.play();
    });

    // Reverse animation on mouse leave
    headerLeft.addEventListener("mouseleave", () => {
        if (animation.isPaused) {
            animation.goToAndPlay(animation.totalFrames, true); // If paused, start from the end
        }
        
        animation.setDirection(-1); // Play in reverse
        animation.play();
    });

    // Make the logo block clickable
    headerLeft.style.cursor = "pointer"; // Show pointer cursor
    headerLeft.addEventListener("click", () => {
        window.location.href = "https://mochul.ski"; // Redirect to main page
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const headerRight = document.querySelector(".header-right");
    const fullscreenOverlay = document.querySelector(".fullscreen-overlay");
    const closeIcon = document.querySelector(".fullscreen-overlay .close-icon");
    const menuItems = document.querySelectorAll(".fullscreen-overlay-menu h5");

    // Show full-screen overlay on click (for smaller screens only)
    headerRight.addEventListener("click", () => {
        if (window.innerWidth <= 1000) {
            setTimeout(() => {
                fullscreenOverlay.classList.add("active");
                disableScroll(); // Disable scrolling
            }, 50);
        }
    });

    // Hide full-screen overlay when clicking the close icon
    closeIcon.addEventListener("click", () => {
        fullscreenOverlay.classList.remove("active");
        enableScroll();
    });

    // Hide full-screen overlay when clicking outside the content
    fullscreenOverlay.addEventListener("click", (event) => {
        if (event.target === fullscreenOverlay) {
            fullscreenOverlay.classList.remove("active");
            enableScroll();
        }
    });

    // Handle clicks on menu items in the full-screen overlay
    menuItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = item.querySelector("a").getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                fullscreenOverlay.classList.remove("active");
                enableScroll();
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Function to disable scrolling
    function disableScroll() {
        document.body.classList.add("scroll-locked");
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";

        document.addEventListener("wheel", preventScroll, { passive: false });
        document.addEventListener("touchmove", preventScroll, { passive: false });
    }

    // Function to enable scrolling
    function enableScroll() {
        document.body.classList.remove("scroll-locked");
        document.body.style.overflow = "auto";
        document.body.style.position = "static";
        document.body.style.width = "auto";

        document.removeEventListener("wheel", preventScroll);
        document.removeEventListener("touchmove", preventScroll);
    }

    function preventScroll(event) {
        event.preventDefault();
    }
});


// Smooth scroll for header menu
document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(".header-menu a[href^='#']");

    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});


//Footer image
document.addEventListener("DOMContentLoaded", function () {
    const footerImg = document.querySelector(".footer-img");

    footerImg.addEventListener("mouseenter", function () {
        footerImg.classList.add("hover-state");
    });

    footerImg.addEventListener("mouseleave", function () {
        footerImg.classList.remove("hover-state");
        footerImg.classList.remove("click-state");

        // Reset background image by clearing inline styles and relying on CSS
        footerImg.style.backgroundImage = "";
    });

    footerImg.addEventListener("click", function () {
        // Force Chrome to reload the GIF by appending a timestamp
        const gifPath = `/../assets/images/lightning.gif?${new Date().getTime()}`;
        footerImg.style.backgroundImage = `url('${gifPath}')`;

        // Ensure that click-state class is applied
        footerImg.classList.add("click-state");
    });
});

