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


// Must be global (NOT inside DOMContentLoaded)
function initGoogleMap() {
    const location = { lat: 40.23824376520867, lng: -76.96432439540757 };

    const map = new google.maps.Map(
    document.getElementById("googleMap"),
    {
        zoom: 12,
        center: location,
    }
    );

    new google.maps.Marker({
    position: location,
    map,
    title: "Philadelphia",
    });
}
