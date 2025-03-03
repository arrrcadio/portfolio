document.addEventListener("DOMContentLoaded", function () {
    const headerLeft = document.querySelector(".header-left"); 
    const animationContainer = document.getElementById("logo"); 

    // Load the logo animation
    const animation = lottie.loadAnimation({
        container: animationContainer,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "assets/animations/logo-animation.json"
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
        window.location.href = "index.html"; // Redirect to main page
    });
});


// Overlay 
document.addEventListener("DOMContentLoaded", function () {
    const headerRight = document.querySelector(".header-right");
    const overlay = document.querySelector(".location-overlay");
    const fullscreenOverlay = document.querySelector(".fullscreen-overlay");
    const closeIcon = document.querySelector(".fullscreen-overlay .close-icon");
    const menuItems = document.querySelectorAll(".fullscreen-overlay-menu h5");

    // Show overlay on hover (for larger screens only)
    headerRight.addEventListener("mouseenter", () => {
        if (window.innerWidth > 1000) { // Only apply hover behavior on larger screens
            overlay.style.right = "0";
        }
    });

    // Hide overlay when leaving overlay (for larger screens only)
    overlay.addEventListener("mouseleave", () => {
        if (window.innerWidth > 1000) { // Only apply hover behavior on larger screens
            overlay.style.right = "-500px";
        }
    });

    // Show full-screen overlay on click (for smaller screens only)
    headerRight.addEventListener("click", () => {
        if (window.innerWidth <= 1000) { // Only apply click behavior on smaller screens
            fullscreenOverlay.classList.add("active");
            disableScroll(); // Disable scrolling
        }
    });

    // Hide full-screen overlay when clicking the close icon
    closeIcon.addEventListener("click", () => {
        fullscreenOverlay.classList.remove("active");
        enableScroll(); // Enable scrolling
    });

    // Hide full-screen overlay when clicking outside the content
    fullscreenOverlay.addEventListener("click", (event) => {
        if (event.target === fullscreenOverlay) {
            fullscreenOverlay.classList.remove("active");
            enableScroll(); // Enable scrolling
        }
    });

    // Handle clicks on menu items in the full-screen overlay
    menuItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link behavior
            const targetId = item.querySelector("a").getAttribute("href"); // Get the target section ID
            const targetElement = document.querySelector(targetId); // Find the target section

            if (targetElement) {
                // Close the overlay and enable scrolling
                fullscreenOverlay.classList.remove("active");
                enableScroll();

                // Scroll to the target section smoothly
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Function to disable scrolling
    function disableScroll() {
        // Lock the body and HTML scroll
        document.body.classList.add("scroll-locked"); // Add scroll-locked class
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh"; // Ensure the body doesn't scroll
        document.documentElement.style.overflow = "hidden"; // Lock scroll on the HTML element

        // Prevent default scroll behavior (e.g., mouse wheel, touch events)
        document.addEventListener("wheel", preventScroll, { passive: false });
        document.addEventListener("touchmove", preventScroll, { passive: false });
    }

    // Function to enable scrolling
    function enableScroll() {
        // Restore the body and HTML scroll
        document.body.classList.remove("scroll-locked"); // Remove scroll-locked class
        document.body.style.overflow = "auto";
        document.body.style.height = "auto"; // Restore the body height
        document.documentElement.style.overflow = "auto"; // Restore scroll on the HTML element

        // Remove scroll prevention listeners
        document.removeEventListener("wheel", preventScroll);
        document.removeEventListener("touchmove", preventScroll);
    }

    // Function to prevent default scroll behavior
    function preventScroll(event) {
        // Only prevent default if the event is a scroll event
        if (event.type === "wheel" || event.type === "touchmove") {
            event.preventDefault();
        }
    }
});

function updateLocalTime() {
    const localTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    document.getElementById("local-time").textContent = `Local time is ${localTime}`;
}

// Update every minute
setInterval(updateLocalTime, 60000);
updateLocalTime(); // Run on page load



// Load Lottie Animation for CTA
document.addEventListener("DOMContentLoaded", function () {
    const ctaAnimation = lottie.loadAnimation({
        container: document.getElementById("cta-animation"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "assets/animations/pulse.json" 
    });
});

// Scroll pointer
document.addEventListener("DOMContentLoaded", function () {
    const lottieContainer = document.getElementById("scrollLottie");
    const scrollDownPrompt = document.querySelector(".scroll-down-prompt");
    const h5Text = scrollDownPrompt.querySelector("h5"); 
    let lastScrollY = 0;
    let hasScrolled = false;

    if (!lottieContainer || !scrollDownPrompt || !h5Text) return;

    // Make sure the entire block is clickable
    scrollDownPrompt.style.cursor = "pointer";

    // Initialize Lottie animation
    window.lottieAnimation = lottie.loadAnimation({
        container: lottieContainer,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "assets/animations/arrow_rotate.json"
    });

    // Scroll event to detect user scrolling
    window.addEventListener("scroll", function () {
        let currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            window.lottieAnimation.setDirection(1);
            window.lottieAnimation.play();
            h5Text.style.opacity = "0"; 
            hasScrolled = true;
        } else if (currentScrollY === 0) {
            window.lottieAnimation.setDirection(-1);
            window.lottieAnimation.play();
            h5Text.style.opacity = "0.25"; 
            hasScrolled = false;
        }

        lastScrollY = currentScrollY;
    });

    // Click behavior
    scrollDownPrompt.addEventListener("click", function () {
        if (hasScrolled) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const casesSection = document.getElementById("cases");
            if (casesSection) {
                casesSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
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

// Cursor tracking for text gradient + Fix for Flickering Cursor
document.addEventListener("mousemove", function(e) {
    let x = e.clientX / window.innerWidth * 100;
    let y = e.clientY / window.innerHeight * 100;

    document.querySelector('.herotext-main').style.backgroundPosition = `${x}% ${y}%`;

    // 🔥 Force reapply custom cursor
    const menuItem = document.querySelector(".header-menu ul li:nth-child(3) a");
    if (menuItem) {
        menuItem.style.cursor = "url('assets/icons/cs_cursor.svg') 18 18, auto";
    }
});

// Rotating object background
document.addEventListener("DOMContentLoaded", function () {
    const image = document.getElementById("rotatingObject");
    const totalFrames = 17;
    const images = [];
    let lastScrollY = 0;
    let firstScrollDetected = false;

    // Preload images
    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        img.src = `assets/frames/frame_${String(i).padStart(2, '0')}.png`;
        images.push(img.src);
    }

    window.addEventListener("scroll", () => {
        let maxScroll = window.innerHeight * 0.7;
        let scrollY = window.scrollY;

        if (!firstScrollDetected && scrollY > 0) {
            firstScrollDetected = true;
            lastScrollY = scrollY - 1;
        }

        let frameIndex;
        if (scrollY >= maxScroll) {
            frameIndex = totalFrames - 1;
        } else {
            let scrollPercent = Math.max(0, (scrollY - lastScrollY) / maxScroll);
            frameIndex = Math.min(Math.floor(scrollPercent * totalFrames), totalFrames - 1);
        }

        if (image.src !== images[frameIndex]) {
            image.classList.add("hidden");
            setTimeout(() => {
                image.src = images[frameIndex];
                image.classList.remove("hidden");
            }, 70);
        }
    });
});

// Hero text change
document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.querySelector(".herotext-main");
    const textOptions = [
        "digital product designer",
        "usability analyst",
        "interaction designer",
        "user experience architect",
        "creative problem solver"
    ];
    let index = 0;

    function changeText() {
        textElement.style.opacity = "0"; // Fade out

        setTimeout(() => {
            index = (index + 1) % textOptions.length;
            textElement.textContent = textOptions[index];
            textElement.style.opacity = "1"; // Fade in
        }, 500); // Wait for fade-out before changing text
    }

    setInterval(changeText, 5000); // Change text every 5s
});



//CTA block opacity changer
document.addEventListener("DOMContentLoaded", function () {
    const cta = document.querySelector(".cta");
    let isScrolling;

    function handleScroll() {
        if (window.scrollY === 0) {
            cta.style.opacity = "1"; // Fully visible at top
        } else {
            cta.style.opacity = "0.3"; // Reduce opacity when scrolling starts
        }
    }

    window.addEventListener("scroll", function () {
        clearTimeout(isScrolling);
        handleScroll();

        // Reset opacity after scrolling stops
        isScrolling = setTimeout(() => {
            if (window.scrollY !== 0) {
                cta.style.opacity = "0.2";
            }
        }, 150);
    });

    // Ensure hover overrides the opacity change
    cta.addEventListener("mouseenter", function () {
        cta.style.opacity = "1";
    });

    cta.addEventListener("mouseleave", function () {
        if (window.scrollY !== 0) {
            cta.style.opacity = "0.2";
        }
    });
});

//Open link on press card click
document.querySelectorAll(".press-card").forEach(card => {
    card.addEventListener("click", () => {
        const url = card.getAttribute("data-url");
        if (url) {
            window.open(url, "_blank");
        }
    });
});