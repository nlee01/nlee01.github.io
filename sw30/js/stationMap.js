
/*
 *  StationMap - Object constructor function
 *  @param _parentElement 	-- HTML element in which to draw the visualization
 *  @param _data						-- Array with all stations of the bike-sharing network
 */

StationMap = function(_parentElement, _data, _mapPosition) {
	this.parentElement = _parentElement;
  this.data = _data;
  this.mapPosition = _mapPosition;

  this.initVis();
}


/*
 *  Initialize station map
 */

StationMap.prototype.initVis = function() {
	var vis = this;
	

	// Instantiate the map object
	vis.map = L.map(vis.parentElement).setView(vis.mapPosition, 13);


	// Specify directory with leaflet images
	L.Icon.Default.imagePath = 'img';


/*
	// Load and display a tile layer on the map (OpenStreetMap)
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(vis.map);
*/

	// Load and display a tile layer on the map (Stamen)
	L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		subdomains: 'abcd',
		ext: 'png'
	}).addTo(vis.map);

	// Add an empty layer group for the markers
	vis.allMarker = L.layerGroup().addTo(vis.map);


	// Defining an icon class
	var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'img/marker-shadow.png',
        iconSize: [25, 41], // size of the icon
    		iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    		popupAnchor: [0, -28] // popup position
    }
	});

	// Instantiate icons
	vis.redMarker = new LeafIcon({iconUrl:  'img/marker-red.png'});
	vis.blueMarker = new LeafIcon({iconUrl:  'img/marker-blue.png'});


	vis.wrangleData();
}


/*
 *  Data wrangling
 */

StationMap.prototype.wrangleData = function() {
	var vis = this;

	// In the first step no data wrangling/filtering needed
	vis.displayData = vis.data;

	// Update the visualization
  vis.updateVis();
}


/*
 *  The drawing function
 */

StationMap.prototype.updateVis = function() {
	var vis = this;

	// Remove all layers
	vis.allMarker.clearLayers();


	// Create a marker for each station
	vis.displayData.forEach(function(d){

		var popupContent = 	'<strong>' + d.stationName + '</strong><br/>';
				popupContent +=	'Available Bikes: ' + d.availableBikes + '<br/>';
				popupContent +=	'Available Docks: ' + d.availableDocks;

		// Set marker icon depending on the state of each station
		var markerColor = (d.availableBikes == 0 || d.availableDocks == 0) ? vis.redMarker : vis.blueMarker;

		var marker = L.marker([d.latitude, d.longitude], { icon: markerColor })
				.bindPopup(popupContent);

		vis.allMarker.addLayer(marker);
	});


	// Load GeoJSON objects (Boston MBTA lines) and render it on the map
	$.getJSON("data/MBTA-Lines.json", function (data) {

		var mbtaLines = L.geoJson(data, {
			style: vis.styleSubway,
			weight: 8,
			opacity: 0.8
		}).addTo(vis.map);

	});

}

StationMap.prototype.styleSubway = function(feature) {
	var subwayColor = feature.properties.LINE;
	return { color: subwayColor };
}
