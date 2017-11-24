
var allData = [];

// Variable for the visualization instance
var stationMap;

// Start application by loading the data
loadData();


function loadData() {
	$.getJSON("data/sites.json", function(jsonData){

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

	// Instantiate visualization object
	stationMap = new StationMap("station-map", alldata, [19.45, -99.1], 8);

}

