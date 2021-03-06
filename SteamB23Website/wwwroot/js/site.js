// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

loaded = false;

// 로딩 지연
setTimeout(() => {
    if (!loaded) {
        let delayedLoadMessage = document.querySelector("#delayed-load");
        delayedLoadMessage.style.display = null;
    }
}, 5000);

window.addEventListener("load", () => {
    loaded = true;

    let delayedLoadMessage = document.querySelector("#delayed-load");
    delayedLoadMessage.style.display = "none";

    let head = document.querySelector("head");
    let font = document.createElement("link");
    font.href = "//cdn.jsdelivr.net/npm/font-kopubworld@1.0";
    font.rel = "stylesheet";
    head.appendChild(font);
});

window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOMContentLoaded.");
    document.querySelectorAll(".preload").forEach((item, i, list) => {
        item.classList.remove("preload");
    });

    const navElement = document.querySelector("nav");
    const navMenuElement = navElement.querySelector(".menu");
    const menuOpen = navElement.querySelector(".menu-open");
    //let menuClose = navElement.querySelector(".menu-close");
    const menuToggleEventHandler = (event) => {
        navMenuElement
        navMenuElement.classList.toggle("toggle");
    };
    menuOpen.addEventListener("click", menuToggleEventHandler);
    //menuClose.addEventListener("click", menuToggleEventHandler);


    function nav() {
        const sections = document.querySelectorAll("section");
        const nav = navElement;
        const navMenu = navMenuElement;
        const navLi = nav.querySelectorAll("ul.section-list li a");
        window.addEventListener("scroll", (event) => {
            let current = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - innerHeight / 2) {
                    current = section.getAttribute("id");
                }
            })

            navLi.forEach((li) => {
                li.classList.remove("active");
                if (li.getAttribute("href").includes(current)) {
                    li.classList.add("active");
                }
            });
        });

        if (window.innerWidth > 1500) {
            navMenu.classList.add("toggle");
        }
    }
    nav();

    function dragNav() {
        let nav = document.querySelector("nav");
        let pos = 0, delta = 0;
        let drag = false;

        function mouseDown(event, touch = null) {
            if (nav.offsetHeight < window.innerHeight)
                return;
            if (event.preventDefault)
                event.preventDefault();
            pos = event.clientY;
            drag = true;
        }

        function mouseMove(event, touch = null) {
            if (!drag)
                return;
            if (event.preventDefault)
                event.preventDefault();
            delta = pos - event.clientY;
            pos = event.clientY;
            let targetTop = (nav.offsetTop - delta);
            targetTop = Math.max(window.innerHeight - nav.offsetHeight - 20, targetTop);
            targetTop = Math.min(20, targetTop);
            nav.style.top = targetTop + "px";
            nav.style.cursor = "move";
        }

        function mouseUp(event) {
            if (!drag)
                return;
            nav.style.cursor = null;
            pos = delta = 0;
            drag = false;
        }
        nav.addEventListener("mousedown", mouseDown);
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
        nav.addEventListener("touchstart", event => {
            mouseDown(event.touches[0], event)
        }, { passive: false });
        document.addEventListener("touchmove", event => {
            mouseMove(event.touches[0], event)
        }, { passive: false });
        document.addEventListener("touchend", event => {
            mouseUp(event.touches[0])
        });
        window.addEventListener("resize", event => {
            // 리셋
            if (nav.offsetHeight < window.innerHeight)
                nav.style.top = 20 + "px";
        });
    }
    dragNav();

    function collapse() {
        const toggleButtons = document.querySelectorAll("[data-toggle='collapse']");
        toggleButtons.forEach((toggleButton) => {
            toggleButton.addEventListener("click", (event) => {
                const toggleTargetSelector = toggleButton.dataset.toggleTarget;

                /** @type {Element} */
                let toggleTarget = null;
                if (toggleTargetSelector == null) {
                    toggleTarget = toggleButton.querySelector(".collapse,.collapsing");
                    if (toggleTarget == null) {
                        toggleTarget = toggleButton.nextElementSibling;
                        while (!toggleTarget.classList.contains("collapse,.collapsing")) {
                            toggleTarget = toggleTarget.nextElementSibling;
                        }
                    }
                } else {
                    toggleTarget = document.querySelector(toggleTargetSelector);
                }

                const bsCollapse = new bootstrap.Collapse(toggleTarget);
                bsCollapse.toggle();
            });
        });
    }
    collapse();
});