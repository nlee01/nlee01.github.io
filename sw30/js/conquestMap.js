
/*
 *  ConquestMap - Object constructor function
 */

ConquestMap = function(_parentElement, _sites, _path, _mapPosition, _mapZoom) {
	this.parentElement = _parentElement;
	this.sites = _sites;
	this.path = _path;
	this.mapPosition = _mapPosition;
	this.mapZoom = _mapZoom;
	this.initVis();
}


/*
 *  Initialize map
 */

ConquestMap.prototype.initVis = function() {
	var vis = this;
	
	// Instantiate the map object
	console.log(vis.parentElement);
	vis.map = L.map(vis.parentElement).setView(vis.mapPosition, vis.mapZoom);


	// Specify directory with leaflet images
	L.Icon.Default.imagePath = 'img';

	// Load and display a tile layer on the map (Open Street Map)
	// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
 //  		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	// }).addTo(vis.map);
	var googleLayer = new L.Google('ROADMAP');
    vis.map.addLayer(googleLayer);
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


	vis.updateVis();
}

/*
 *  The drawing function
 */

ConquestMap.prototype.updateVis = function() {
	var vis = this;

	// Remove all layers
	vis.allMarker.clearLayers();

	// Create a marker for each site
	vis.sites.forEach(function(d){
		console.log(d);
		var popupContent = 	'<strong>' + d.properties.name + '</strong><br/>' + d.properties.date;

		var markerColor = vis.redMarker;
		var marker = L.marker([d.geometry.coordinates[1],d.geometry.coordinates[0]], { icon: markerColor })
				.bindPopup(popupContent);

		vis.allMarker.addLayer(marker);
	});
	var conquest_path = L.geoJson(vis.path, {
		color: "#A90000",
		weight: 4,
		opacity: .95
	}).addTo(vis.map);
}



