// // Create the map object with a center and zoom level.
var map = L.map('mapid', {
    center: [28, -100],
    zoom: 3,
});

// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
	console.log(city)
    L.circleMarker(city.location, {
        radius: city.population/100000
    }).bindPopup("<h2>"+ city.city+ ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
});

// Add tile layer that will be the background of our map.
let tile_url = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}';
let streets = L.tileLayer(tile_url, {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
})
    streets.addTo(map);

