
var allData = [];

// Variable for the visualization instance
var stationMap;

// Start application by loading the data
loadData();


function loadData() {

	// Hubway XML station feed
	var url = 'https://www.thehubway.com/data/stations/bikeStations.xml';
	var proxy = 'http://michaeloppermann.com/proxy.php?format=xml&url=';


/*
	// ************* YQL SOLUTION *************

	// Build YQL query (request XML feed and convert it to JSON)
	var proxy = 'http://query.yahooapis.com/v1/public/yql?q='
		+ encodeURIComponent('SELECT * FROM xml WHERE url="' + url + '"')
		+ '&format=json&callback=?';

	// Send an asynchronous HTTP request with jQuery
	$.getJSON(proxy, function(jsonData){

	    // Extract list with stations from JSON response
	    alldata = jsonData.query.results.stations.station;

	    // Prepare data
	    alldata.forEach(function(d){
				d.availableBikes = +d.nbBikes;
				d.availableDocks = +d.nbEmptyDocks;
				d.stationName = d.name;
				d.latitude = d.lat;
				d.longitude = d.long;
			});

			createVis();
	});

*/

	// ************* PROXY SOLUTION *************

	// Send an asynchronous HTTP request with jQuery
	$.getJSON(proxy + url, function(jsonData){

	    // Extract list with stations from JSON response
	    alldata = jsonData.station;

	    // Prepare data
	    alldata.forEach(function(d){
				d.availableBikes = +d.nbBikes;
				d.availableDocks = +d.nbEmptyDocks;
				d.stationName = d.name;
				d.latitude = d.lat;
				d.longitude = d.long;
			});

			createVis();
	});

}

function createVis() {

	// Number of stations
	$("#station-count").text(alldata.length);

	// Instantiate visualization object (bike-sharing stations in Boston)
	stationMap = new StationMap("station-map", alldata, [42.360082, -71.058880]);

}

