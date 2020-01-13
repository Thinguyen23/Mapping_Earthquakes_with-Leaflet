// // Create the map object with a center and zoom level.
//var map = L.map('mapid', {
  //  center: [30, 30],
    //zoom: 2,
//});

// Add tile layer that will be the background of our map.
let tile_url = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}';
let streets = L.tileLayer(tile_url, {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    Streets: streets,
    Dark: dark
};

// Create the map object with center, zoom level and default layer
let map = L.map("mapid", {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});

// Pass our map layers into our layer control and add the layer control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/Thinguyen23/Thi_Mapping_Earthquakes/master/majorAirports.json";

// Grabbing the airport GeoJson data
d3.json(airportData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            console.log(layer);
            layer.bindPopup("<h2>Airport Code: "+ feature.properties.faa +"</h2> <hr> <h3>Airport Name: " + feature.properties.name + "</h3>" );
        }
    }).addTo(map);
});

