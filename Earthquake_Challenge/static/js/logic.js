// Add tile layer that will be the background of our map.
// Streets tile
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Satellite Streets tile
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Light tile
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds the three maps
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets,
    "Light": light
};

// Create the earthquake layer for our map
let earthquakes = new L.layerGroup();

//Create tectonic plate layer for the map
let tectonicPlates = new L.layerGroup();      //THI MODULE 13 CHALLENGE

// Define overlay
let overlays = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates         //THI MODULE 13 CHALLENGE
};

// Create the map object with center, zoom level and default layer
let map = L.map("mapid", {
    center: [25, -75],
    zoom: 3,
    layers: [streets]
});

// Pass our map layers into our layer control and add the layer control to the map
L.control.layers(baseMaps, overlays).addTo(map);

// This function returns the style data for each of the earthquakes we plot on the map.
// to calculate the radius.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
};
// This function determines the radius of the earthquake marker based on its magnitude. Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
};

// Retrieve the earthquake GeoJSON data
let earthquake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Grabbing the earthquake GeoJson data
d3.json(earthquake).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJSON(data, {
        // Turn each feature into a circleMarker
        pointToLayer: function(feature, latlng) {
            //console.log(data);
            return L.circleMarker(latlng);
        },
        // Set style
        style: styleInfo,
        // Create popup
        onEachFeature: function(feature, layer) {
          layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);}
    }).addTo(earthquakes);
    // Then add the earthquakes layer to map
    earthquakes.addTo(map);
});

// Create a legend control object.
let legend = L.control({position: 'bottomright'});
// Then add all the details for the legend.
legend.onAdd = function(map) {
  let div = L.DomUtil.create('div', 'info legend');
  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = ["#98ee00","#d4ee00","#eecc00","#ee9c00", "#ea822c", "#ea2c2c"];
  // Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    div.innerHTML +=
          '<i style="background:' + colors[i] + '"></i> ' +
          magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
  }
  return div;
};
//Add legend to map
legend.addTo(map);


//THI MODULE 13 CHALLENGE

// Retrieve the tectonic plate GeoJSON data
let tectonicPlate = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Grabbing the tectonic plate GeoJson data
d3.json(tectonicPlate).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data
  L.geoJSON(data, {
      // Style LineString data
      color: "darkred",
      weight: 2,
      // Create popup
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);}
  }).addTo(tectonicPlates);
  // Then add the earthquakes layer to map
  tectonicPlates.addTo(map);
});
