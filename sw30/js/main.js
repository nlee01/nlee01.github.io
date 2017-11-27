
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
	map = new ConquestMap("conquest-map", sites, path, [19.40, -97.55], 9);
	setTimeout(function() {
		$("#title").fadeTo(500, 1);
	}, 100);
	setTimeout(function() {
		$("#subtitle").fadeTo(500, 1);
	}, 1000);
	setTimeout(function() {
		$(".historical-map img").fadeTo(500, 1);
	}, 2000);
	setTimeout(function() {
		$(".begin").fadeTo(500, 1);
	}, 2800);
}
$(".begin").click(function() {
	$("#conquest-map").show();
	$(".historical-map").fadeTo(1500, 0);
	setTimeout(function() {
		$(".historical-map").hide();
	}, 1500);
	setTimeout(function() {
		$(".leaflet-control-container, .leaflet-control-attribution").fadeTo(500, 1);
	}, 1500);
	setTimeout(function() {
		$(".leaflet-shadow-pane, .leaflet-marker-pane, .sources").fadeTo(500, 1);
	}, 1800);
});
$(".back").click(function() {
	$(".historical-map").show();
	$(".historical-map").fadeTo(500, 1);
	$(".leaflet-control-container, .leaflet-control-attribution").fadeTo(500, 0);
	setTimeout(function() {
		$("#conquest-map").hide();
	}, 500);
});