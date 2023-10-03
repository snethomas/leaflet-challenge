function createMap(earthQuakes) {

    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });


    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
        "Street Map": streetmap
    };

    // Create an overlayMaps object to hold the overlay layer.
    let overlayMaps = {
        "Earth Quakes": earthQuakes
    };

    // Create the map object with options.
    let map = L.map("map", {
        center: [40.73, -114.0059],
        zoom: 4,
        layers: [streetmap, earthQuakes]
    });

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

    // https://stackoverflow.com/questions/59453642/how-to-add-legend-in-leaflet-map
    /*Legend specific*/
    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<p>Depth:</p>";
    div.innerHTML += '<i style="background: #7CFC00"></i><span>-10 - 10</span><br>';
    div.innerHTML += '<i style="background: #DFFF00"></i><span>10 - 30</span><br>';
    div.innerHTML += '<i style="background: #FFEC33"></i><span>30 - 50</span><br>';
    div.innerHTML += '<i style="background: #FFA233"></i><span>50 - 70</span><br>';
    div.innerHTML += '<i style="background: #FF7433"></i><span>70 - 90</span><br>';
    div.innerHTML += '<i style="background: #FF3333"></i><span>90+</span><br>';

    return div;
    };

    legend.addTo(map);
}

function createMarkers(response) {

    // Pull the "features" property from response.data.
    let features = response.features;
    
    // Initialize an array to hold markers.
    let markers = [];

    // Loop through the features array.
    for (let index = 0; index < features.length; index++) {
        let feature = features[index];

        // For each feature, create a marker, and bind a popup with the feature's place.
        let marker = L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            color: "grey",
            fillColor: getMarkerFillColor(feature.geometry.coordinates[2]),
            fillOpacity: 1,
            radius: feature.properties.mag * 20000,
        }).bindPopup("<h3> Location: " + feature.properties.place + "<h3><h3>Magnitude: " 
            + feature.properties.mag + 
            "</h3><h3>Depth: " + feature.geometry.coordinates[2] + "</h3>");

        // Add the marker to the array.
        markers.push(marker);
    }

    // Create a layer group that's made from the markers array, and pass it to the createMap function.
    createMap(L.layerGroup(markers));
}

// https://www.w3schools.com/colors/colors_picker.asp
function getMarkerFillColor(depth) {
    if (depth < 10) {
        return "#7CFC00";
    } else if (depth < 30) {
        return "#DFFF00";
    } else if (depth < 50) {
        return "#FFEC33";
    } else if (depth < 70) {
        return "#FFA233";
    } else if (depth < 90) {
        return "#FF7433";
    } else {
        return "#FF3333";
    }
}

// Perform an API call to the API to get the information. Call createMarkers when it completes.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson").then(createMarkers);