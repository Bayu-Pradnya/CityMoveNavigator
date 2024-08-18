$(document).ready(function(){
    var map = L.map('map').setView([-8.6891546 , 115.1967416], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var trafficConditions = [
        { lat: -8.578805, lng: 115.2153219, description: 'Kemacetan ringan', color: 'red' },
        { lat: -8.6063078, lng: 115.2173971, description: 'Jalan ditutup', color: 'orange' },
        { lat: -8.5610002, lng: 115.2602384, description: 'Kecelakaan', color: 'darkred' }
    ];

    trafficConditions.forEach(function(condition) {
        L.circle([condition.lat, condition.lng], {
            color: condition.color,
            fillColor: condition.color,
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map).bindPopup(condition.description);
    });

});
