document.addEventListener('DOMContentLoaded', function () {

    var map = L.map('map').setView([-8.6891546 , 115.1967416], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    var startMarker, endMarker, routeLayer;

    document.getElementById('searchRoute').addEventListener('click', function () {
        var startLocation = document.getElementById('start').value;
        var endLocation = document.getElementById('end').value;

        if (startLocation && endLocation) {
            geocodeLocation(startLocation, function (startCoords) {
                geocodeLocation(endLocation, function (endCoords) {
                    if (startMarker) map.removeLayer(startMarker);
                    if (endMarker) map.removeLayer(endMarker);
                    startMarker = L.marker(startCoords).addTo(map).bindPopup("Start: " + startLocation).openPopup();
                    endMarker = L.marker(endCoords).addTo(map).bindPopup("End: " + endLocation).openPopup();

                    var bounds = L.latLngBounds([startCoords, endCoords]);
                    map.fitBounds(bounds);

                    if (routeLayer) map.removeLayer(routeLayer);
                    routeLayer = L.polyline([startCoords, endCoords], { color: 'blue' }).addTo(map);

                    var travelTime = calculateTravelTime(startCoords, endCoords);
                    document.getElementById('timeEstimate').textContent = "Estimasi waktu perjalanan: " + travelTime + " menit";
                });
            });
        } else {
            alert('Mohon masukkan titik awal dan tujuan.');
        }
    });

    function geocodeLocation(location, callback) {
        var dummyLocations = {
            "Sentanu III": [-8.6052184,115.2172446],
            "SMPN 12 Denpasar": [-8.5982367,115.2219663],
            "Koding Akademi": [-8.6832614,115.2301241],
            "Pejeng": [-8.5121329,115.2908712]
        };
        if (dummyLocations[location]) {
            callback(dummyLocations[location]);
        } else {
            alert("Lokasi tidak ditemukan: " + location);
        }
    }

    function calculateTravelTime(startCoords, endCoords) {
        var distance = map.distance(startCoords, endCoords);
        var speed = 20000;
        var travelTimeMinutes = (distance / speed) * 60;
        return Math.round(travelTimeMinutes);
    }
});
