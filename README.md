# leaflet-challenge

### Used the USGS dataset under "Past 30 days" - https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson

* Certain sections of code is commented with links used for reference/help like for legend and colors
* Use the D3 library to load the dataset and call the "createMarkers" function
* The "createMarkers" function is used to access the "features" key from the dataset. Each feature "geometry.coordinates" is then accessed with list indices for latitude, longitude and depth. The radius is scaled using "properties.mag"
* The "createMap" function is used to load the base map and add a placeholder for the overlay map,which is then populated by the "createMarkers" function