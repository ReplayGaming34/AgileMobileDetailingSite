/* ---------------- Scroll Animations ---------------- */
function initScrollAnimations() {
    const elements = document.querySelectorAll(".overunderline, .fadeIn");

    if (!elements.length) return;

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
}

/* ---------------- Google Maps Init ---------------- */
function safeInitMaps() {
    if (!(window.google && window.google.maps)) return;

    initGoogleMap();
}

/* ---------------- Page Lifecycle Hooks ---------------- */

// Normal load
document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
});

// Handles back/forward cache + navigation restore
window.addEventListener("pageshow", (event) => {
    // pageshow fires on normal load + bfcache restore
    initScrollAnimations();

    // force map re-init
    if (window.google && window.google.maps) {
        initGoogleMap();
    } else {
        const interval = setInterval(() => {
            if (window.google && window.google.maps) {
                clearInterval(interval);
                initGoogleMap();
            }
        }, 100);
    }
});


function initGoogleMap() {
    const location1 = { lat: 40.23824376520867, lng: -76.96432439540757 };

    /* -------- Main Map -------- */
    const mapDiv1 = document.getElementById("googleMap");
    if (mapDiv1) {
        mapDiv1.innerHTML = ""; // 🔥 force reset DOM

        const map1 = new google.maps.Map(mapDiv1, {
            zoom: 12,
            center: location1,
        });

        new google.maps.Marker({
            position: location1,
            map: map1,
            title: "Mechanicsburg Shop",
        });
    }

    /* -------- Footer Map -------- */
    const mapDiv2 = document.getElementById("googleMap2");
    if (mapDiv2) {
        mapDiv2.innerHTML = ""; // 🔥 force reset DOM

        const map2 = new google.maps.Map(mapDiv2, {
            zoom: 12,
            center: location1,
        });

        new google.maps.Marker({
            position: location1,
            map: map2,
            title: "Philadelphia Service Area",
        });
    }
}
