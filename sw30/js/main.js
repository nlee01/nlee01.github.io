
var sites = [];
var path = [];

// Variable for the visualization instance
var map;

// Start application by loading the data
loadData();


function loadData() {
	$.getJSON("data/features.json", function(jsonData){

	    // Extract list with stations from JSON response
	    sites = jsonData.sites;
	    path = jsonData.path;
		createVis();
	});

}

function createVis() {
	// Instantiate visualization object
	map = new ConquestMap("conquest-map", sites, path, [19.40, -97.70], 9);
	setTimeout(function() {
		$("#title").fadeTo(800, 1);
	}, 100);
	setTimeout(function() {
		$(".historical-map img").fadeTo(800, 1);
	}, 1000);
	setTimeout(function() {
		$(".begin").fadeTo(800, 1);
	}, 1500);
}