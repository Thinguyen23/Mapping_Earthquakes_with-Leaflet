// Add tile layer that will be the background of our map.
let tile_url = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}';
let streets = L.tileLayer(tile_url, {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass our map layers into our layer control and add the layer control to the map
L.control.layers(baseMaps).addTo(map);

// Retrieve the earthquake GeoJSON data
let earthquake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grabbing the airport GeoJson data
d3.json(earthquake).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJSON(data).addTo(map);
});


