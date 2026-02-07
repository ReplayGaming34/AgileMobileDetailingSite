/* ---------------- Global Map Instances ---------------- */
let map1 = null;
let map2 = null;

/* ---------------- Page Startup ---------------- */
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

    // Wait for Google Maps to be available in the window object
    waitForGoogleMaps();
}

/* ---------------- Wait For Google Maps ---------------- */
function waitForGoogleMaps() {
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
}

/* ---------------- Normal Page Load ---------------- */
document.addEventListener("DOMContentLoaded", startPage);

/* ---------------- Back / Forward Navigation ---------------- */
window.addEventListener("pageshow", (event) => {
    // Re-check and resize maps when returning to the page via back button
    if (window.google && window.google.maps) {
        initGoogleMap();
    }
});

/* ---------------- Google Maps Initialization ---------------- */
function initGoogleMap() {
    const location1 = { lat: 40.23824376520867, lng: -76.96432439540757 };

    /* -------- Main Map -------- */
    const mapDiv1 = document.getElementById("googleMap");
    if (mapDiv1) {
        if (!map1) {
            // Create map only if it doesn't exist
            map1 = new google.maps.Map(mapDiv1, {
                zoom: 12,
                center: location1,
            });
            new google.maps.Marker({
                position: location1,
                map: map1,
                title: "Mechanicsburg Shop",
            });
        } else {
            // If map exists, just trigger a resize to fix "gray box" issues
            google.maps.event.trigger(map1, "resize");
            map1.setCenter(location1);
        }
    }

    /* -------- Footer Map -------- */
    const mapDiv2 = document.getElementById("googleMap2");
    if (mapDiv2) {
        if (!map2) {
            map2 = new google.maps.Map(mapDiv2, {
                zoom: 12,
                center: location1,
            });
            new google.maps.Marker({
                position: location1,
                map: map2,
                title: "Philadelphia Service Area",
            });
        } else {
            google.maps.event.trigger(map2, "resize");
            map2.setCenter(location1);
        }
    }
}
