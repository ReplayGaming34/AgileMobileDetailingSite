document.addEventListener("DOMContentLoaded", () => {
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

    // Wait until Google Maps API is actually loaded
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
