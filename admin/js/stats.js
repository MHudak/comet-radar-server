// Initalize jQuery Datepicker
$(function() {
	$( "#datepicker" ).datepicker();
});
      
var myDate = new Date();
var prettyDate =(myDate.getMonth()+1) + '/' + myDate.getDate() + '/' + myDate.getFullYear();
$("#datepicker").val(prettyDate);



USGSOverlay.prototype = new google.maps.OverlayView();

var overlay, map, pointarray, heatmap;

// Dummy data for heatmap
var cabData = [
	new google.maps.LatLng(32.980800, -96.750678),
	new google.maps.LatLng(32.980800, -96.750950),
	new google.maps.LatLng(32.980800, -96.750900),
	new google.maps.LatLng(32.980900, -96.750950),
	new google.maps.LatLng(32.981000, -96.750950),
	new google.maps.LatLng(32.981000, -96.750950),
	new google.maps.LatLng(32.981200, -96.750950),
	new google.maps.LatLng(32.981300, -96.750950),
	new google.maps.LatLng(32.981300, -96.751050),
	new google.maps.LatLng(32.981300, -96.751150),
	new google.maps.LatLng(32.981300, -96.751250),
	new google.maps.LatLng(32.981300, -96.751350),
	new google.maps.LatLng(32.981300, -96.751450),
	new google.maps.LatLng(32.981300, -96.751750),
	new google.maps.LatLng(32.981300, -96.751850),
	new google.maps.LatLng(32.981300, -96.751950),
	new google.maps.LatLng(32.981300, -96.752050),
	new google.maps.LatLng(32.981300, -96.752150),
	new google.maps.LatLng(32.981300, -96.752250),
	new google.maps.LatLng(32.981300, -96.752350),
	new google.maps.LatLng(32.981300, -96.752450),
	new google.maps.LatLng(32.981300, -96.752450),
	new google.maps.LatLng(32.981300, -96.752550),
	new google.maps.LatLng(32.981300, -96.752650),
	new google.maps.LatLng(32.981300, -96.752750),
	new google.maps.LatLng(32.981300, -96.752850),
	new google.maps.LatLng(32.981300, -96.752950),
	new google.maps.LatLng(32.981300, -96.753150),
	new google.maps.LatLng(32.981300, -96.753450),
	new google.maps.LatLng(32.981300, -96.753650),
	new google.maps.LatLng(32.981300, -96.753750),
	new google.maps.LatLng(32.981300, -96.753950),
	new google.maps.LatLng(32.981300, -96.754150),
	new google.maps.LatLng(32.981300, -96.754350),
	new google.maps.LatLng(32.981300, -96.754300),
	new google.maps.LatLng(32.981400, -96.754300),
	new google.maps.LatLng(32.981500, -96.754300),
	new google.maps.LatLng(32.981700, -96.754300),
	new google.maps.LatLng(32.981800, -96.754300),
	new google.maps.LatLng(32.982000, -96.754300),
	new google.maps.LatLng(32.982200, -96.754300),
	new google.maps.LatLng(32.982300, -96.754300),
	new google.maps.LatLng(32.982500, -96.754300),
	new google.maps.LatLng(32.982600, -96.754300),
	new google.maps.LatLng(32.982600, -96.754300),
	new google.maps.LatLng(32.983000, -96.754200),
	new google.maps.LatLng(32.983400, -96.754200),
	new google.maps.LatLng(32.983600, -96.754200),
	new google.maps.LatLng(32.982600, -96.754300),
	new google.maps.LatLng(32.983000, -96.754200),
	new google.maps.LatLng(32.983400, -96.754200),
	new google.maps.LatLng(32.983600, -96.754200),

	new google.maps.LatLng(32.985708, -96.750900),
	new google.maps.LatLng(32.985708, -96.750000),
	new google.maps.LatLng(32.985708, -96.750000),
	new google.maps.LatLng(32.985708, -96.750200),
	new google.maps.LatLng(32.985708, -96.750400),
	new google.maps.LatLng(32.985708, -96.750380),
	new google.maps.LatLng(32.985708, -96.750480),
	new google.maps.LatLng(32.985708, -96.750780),
	new google.maps.LatLng(32.985708, -96.750960),
	new google.maps.LatLng(32.985708, -96.751000),
	new google.maps.LatLng(32.985908, -96.751000),
	new google.maps.LatLng(32.986008, -96.751000),
	new google.maps.LatLng(32.986008, -96.751000),
	new google.maps.LatLng(32.986108, -96.751000),
	new google.maps.LatLng(32.986108, -96.751000),
	new google.maps.LatLng(32.986208, -96.751000),
	new google.maps.LatLng(32.986308, -96.751000),
	new google.maps.LatLng(32.986408, -96.751000),
	new google.maps.LatLng(32.986408, -96.751000),
	new google.maps.LatLng(32.986508, -96.751000),
	new google.maps.LatLng(32.986608, -96.751000),
	new google.maps.LatLng(32.986708, -96.751000),
	new google.maps.LatLng(32.986808, -96.751000),
	new google.maps.LatLng(32.986908, -96.751000),
	new google.maps.LatLng(32.987008, -96.751000),
	new google.maps.LatLng(32.987208, -96.751000),
	new google.maps.LatLng(32.987508, -96.751000),
	new google.maps.LatLng(32.987808, -96.751000),
	new google.maps.LatLng(32.987208, -96.751000),
	new google.maps.LatLng(32.987508, -96.751000),
	new google.maps.LatLng(32.987808, -96.751000),
	new google.maps.LatLng(32.987208, -96.751000),
	new google.maps.LatLng(32.987508, -96.751000),
	new google.maps.LatLng(32.987808, -96.751000),
	new google.maps.LatLng(32.987208, -96.751000),
	new google.maps.LatLng(32.987508, -96.751000),
	new google.maps.LatLng(32.987808, -96.751000),
	new google.maps.LatLng(32.988008, -96.751000),
	new google.maps.LatLng(32.988208, -96.751000),
	new google.maps.LatLng(32.988308, -96.751000),
	new google.maps.LatLng(32.988408, -96.751000),
	new google.maps.LatLng(32.988608, -96.751000),
	new google.maps.LatLng(32.989208, -96.751000),
	new google.maps.LatLng(32.989508, -96.751000),
	new google.maps.LatLng(32.990108, -96.751000),
	new google.maps.LatLng(32.990108, -96.751000),
	new google.maps.LatLng(32.990108, -96.751000),
	new google.maps.LatLng(32.990108, -96.751000),
	new google.maps.LatLng(32.990308, -96.751000),
	new google.maps.LatLng(32.990508, -96.751000),
	new google.maps.LatLng(32.990508, -96.751000),
	new google.maps.LatLng(32.990508, -96.751000),
	new google.maps.LatLng(32.990508, -96.751000),
	new google.maps.LatLng(32.990708, -96.751000),
	new google.maps.LatLng(32.990808, -96.751000),
	new google.maps.LatLng(32.991008, -96.751000),
	new google.maps.LatLng(32.991108, -96.751000),
	new google.maps.LatLng(32.991308, -96.751000),
	new google.maps.LatLng(32.991508, -96.751000),
	new google.maps.LatLng(32.991708, -96.751000),
	new google.maps.LatLng(32.991808, -96.751000),
	new google.maps.LatLng(32.992008, -96.751000),
	new google.maps.LatLng(32.985708, -96.751100),
	new google.maps.LatLng(32.985708, -96.751380),
	new google.maps.LatLng(32.985708, -96.751480),
	new google.maps.LatLng(32.985708, -96.751680),
	new google.maps.LatLng(32.985708, -96.752080),
	new google.maps.LatLng(32.985708, -96.752280),
	new google.maps.LatLng(32.985708, -96.752580),
	new google.maps.LatLng(32.985708, -96.752780),
	new google.maps.LatLng(32.985708, -96.752900),
	new google.maps.LatLng(32.985708, -96.753080),
	new google.maps.LatLng(32.985708, -96.753180),
	new google.maps.LatLng(32.985708, -96.753380),
	new google.maps.LatLng(32.985708, -96.753480),
	new google.maps.LatLng(32.985708, -96.753500),
	new google.maps.LatLng(32.985708, -96.753750),

	new google.maps.LatLng(32.985708, -96.753700),
	new google.maps.LatLng(32.985708, -96.753800),
	new google.maps.LatLng(32.985708, -96.753800),
	new google.maps.LatLng(32.985908, -96.753800),
	new google.maps.LatLng(32.986108, -96.753800),
	new google.maps.LatLng(32.986208, -96.753800),
	new google.maps.LatLng(32.986408, -96.753800),
	new google.maps.LatLng(32.986608, -96.753800),
	new google.maps.LatLng(32.986708, -96.753800),
	new google.maps.LatLng(32.986908, -96.753800),
	new google.maps.LatLng(32.987108, -96.753800),
	new google.maps.LatLng(32.987308, -96.753800),
	new google.maps.LatLng(32.987408, -96.753800),
	new google.maps.LatLng(32.987608, -96.753800),
	new google.maps.LatLng(32.987708, -96.753800),
	new google.maps.LatLng(32.987908, -96.753800),
	new google.maps.LatLng(32.987608, -96.753800),
	new google.maps.LatLng(32.987708, -96.753800),
	new google.maps.LatLng(32.987908, -96.753800),
	new google.maps.LatLng(32.988108, -96.753800),
	new google.maps.LatLng(32.988308, -96.753800),
	new google.maps.LatLng(32.988408, -96.753800),
	new google.maps.LatLng(32.988408, -96.753800),
	new google.maps.LatLng(32.988408, -96.753800),

	new google.maps.LatLng(32.990698, -96.751589),
	new google.maps.LatLng(32.990698, -96.751689),
	new google.maps.LatLng(32.990698, -96.751889),
	new google.maps.LatLng(32.990698, -96.751989),
	new google.maps.LatLng(32.990698, -96.752089),
	new google.maps.LatLng(32.990698, -96.752389),
	new google.maps.LatLng(32.990698, -96.752489),
	new google.maps.LatLng(32.990698, -96.752689),
	new google.maps.LatLng(32.990698, -96.752789),
	new google.maps.LatLng(32.990698, -96.752989),
	new google.maps.LatLng(32.990698, -96.753089),
	new google.maps.LatLng(32.990698, -96.753389),
	new google.maps.LatLng(32.990698, -96.753589),
	new google.maps.LatLng(32.990698, -96.753689),
	new google.maps.LatLng(32.990698, -96.753989),
	new google.maps.LatLng(32.990698, -96.754189),
	new google.maps.LatLng(32.990698, -96.754389),
	new google.maps.LatLng(32.990698, -96.752089)
];

// Initialize the map and the custom overlay.
function initialize() {
	var mapOptions = {
	  zoom: 16,
	  center: new google.maps.LatLng(32.985700, -96.750114),
	  mapTypeControl: false
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	var swBound = new google.maps.LatLng(32.976600, -96.761700);
	var neBound = new google.maps.LatLng(32.995650, -96.739400);
	var bounds = new google.maps.LatLngBounds(swBound, neBound);
	var srcImage = '../img/map-overlay.gif';

	// The custom USGSOverlay object contains the USGS image,
	// the bounds of the image, and a reference to the map.
	overlay = new USGSOverlay(bounds, srcImage, map);

	// create heatmap
	var pointArray = new google.maps.MVCArray(cabData);

	heatmap = new google.maps.visualization.HeatmapLayer({
	  data: pointArray
	});

	heatmap.setMap(map);
	changeRadius();
	changeGradient();
}

function USGSOverlay(bounds, image, map) {

	// Initialize all properties.
	this.bounds_ = bounds;
	this.image_ = image;
	this.map_ = map;

	// Define a property to hold the image's div. We'll
	// actually create this div upon receipt of the onAdd()
	// method so we'll leave it null for now.
	this.div_ = null;

	// Explicitly call setMap on this overlay.
	this.setMap(map);
}


// onAdd is called when the map's panes are ready and the overlay has been
// added to the map.
USGSOverlay.prototype.onAdd = function() {

	var div = document.createElement('div');
	div.style.borderStyle = 'none';
	div.style.borderWidth = '0px';
	div.style.position = 'absolute';

	// Create the img element and attach it to the div.
	var img = document.createElement('img');
	img.src = this.image_;
	img.style.width = '100%';
	img.style.height = '100%';
	img.style.position = 'absolute';
	div.appendChild(img);

	this.div_ = div;

	// Add the element to the "overlayLayer" pane.
	var panes = this.getPanes();
	panes.overlayLayer.appendChild(div);
};

USGSOverlay.prototype.draw = function() {

	// We use the south-west and north-east
	// coordinates of the overlay to peg it to the correct position and size.
	// To do this, we need to retrieve the projection from the overlay.
	var overlayProjection = this.getProjection();

	// Retrieve the south-west and north-east coordinates of this overlay
	// in LatLngs and convert them to pixel coordinates.
	// We'll use these coordinates to resize the div.
	var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
	var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

	// Resize the image's div to fit the indicated dimensions.
	var div = this.div_;
	div.style.left = sw.x + 'px';
	div.style.top = ne.y + 'px';
	div.style.width = (ne.x - sw.x) + 'px';
	div.style.height = (sw.y - ne.y) + 'px';
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
USGSOverlay.prototype.onRemove = function() {
	this.div_.parentNode.removeChild(this.div_);
	this.div_ = null;
};

function toggleHeatmap() {
	heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
	var gradient = [
	  'rgba(0, 255, 255, 0)',
	  'rgba(0, 255, 255, 1)',
	  'rgba(0, 191, 255, 1)',
	  'rgba(0, 127, 255, 1)',
	  'rgba(0, 63, 255, 1)',
	  'rgba(0, 0, 255, 1)',
	  'rgba(0, 0, 223, 1)',
	  'rgba(0, 0, 191, 1)',
	  'rgba(0, 0, 159, 1)',
	  'rgba(0, 0, 127, 1)',
	  'rgba(63, 0, 91, 1)',
	  'rgba(127, 0, 63, 1)',	
	  'rgba(191, 0, 31, 1)',
	  'rgba(255, 0, 0, 1)'
	]
	heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
	heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
	heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

google.maps.event.addDomListener(window, 'load', initialize);