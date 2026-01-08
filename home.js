document.addEventListener("DOMContentLoaded", () => {
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
        {
            threshold: 0.4
        }
    );

    elements.forEach(el => observer.observe(el));
});


function initGoogleMap() {
    // Location 1: Mechanicsburg
    const location1 = { lat: 40.23824376520867, lng: -76.96432439540757 };
    
    // Location 2: Philadelphia (as an example)
    const location2 = { lat: 39.952583, lng: -75.165222 };

    // --- Initialize Map 1 ---
    const map1 = new google.maps.Map(document.getElementById("googleMap"), {
        zoom: 12,
        center: location1,
    });

    new google.maps.Marker({
        position: location1,
        map: map1,
        title: "Mechanicsburg Shop",
    });

    // --- Initialize Map 2 ---
    const map2 = new google.maps.Map(document.getElementById("googleMap2"), {
        zoom: 12,
        center: location2,
    });

    new google.maps.Marker({
        position: location2,
        map: map2,
        title: "Philadelphia Service Area",
    });
}
