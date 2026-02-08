/* ---------------- Page Startup Wrapper ---------------- */
function startPage() {
    /* ---------------- Scroll Animations ---------------- */
    const elements = document.querySelectorAll(".overunderline, .fadeIn");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4 }
    );

    elements.forEach(el => observer.observe(el));

    /* ---------------- Google Maps Init ---------------- */
    waitForGoogleMaps();
}

/* ---------------- Normal Page Load ---------------- */
document.addEventListener("DOMContentLoaded", startPage);

/* ---------------- Back/Forward Cache Restore ---------------- */
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        waitForGoogleMaps();
    }
});

