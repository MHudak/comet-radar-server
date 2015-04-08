var overlay;
USGSOverlay.prototype = new google.maps.OverlayView();

/***********************************************************************
 * DB CALL: Fill "cabs" with the locations of each cab
 ***********************************************************************/
var cabs = [
  ['Route 1', 32.980800, -96.750678],
  ['Route 2', 32.9856748, -96.75524339999998],
  ['Route 3', 32.9855582, -96.7499986],
  ['Route 4', 32.991000, -96.754754],
  ['Route 5', 32.990700, -96.751089]
];
var markers = [];

// Initialize the map and the custom overlay.
function initialize() {
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(32.985700, -96.750114),
    mapTypeControl: false
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var swBound = new google.maps.LatLng(32.976600, -96.761700);
  var neBound = new google.maps.LatLng(32.995650, -96.739400);
  var bounds = new google.maps.LatLngBounds(swBound, neBound);
  var srcImage = '../img/map-overlay.gif';

  // The custom USGSOverlay object contains the USGS image,
  // the bounds of the image, and a reference to the map.
  overlay = new USGSOverlay(bounds, srcImage, map);

  setMarkers(map, cabs);
}


function setMarkers(map, locations) {
  // Add markers to the map


  // Image for on-duty cart
  var image_green = {
    url: '../img/cart_green.png',
    size: new google.maps.Size(58, 58),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(29, 58)
  };

  // Image for full cart
  var image_red = {
    url: '../img/cart_red.png',
    size: new google.maps.Size(58, 58),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(29, 58)
  };

  // Image for off-duty cart
  var image_black = {
    url: '../img/cart.png',
    size: new google.maps.Size(58, 58),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(29, 58)
  };

  // Add the markers to the map
  for (var item in locations){
    var cart = locations[item];
    var myLatLng = new google.maps.LatLng(cart[1], cart[2]);


    /***********************************************************************
     * DB CALL: Get status of the cab --> store in onDuty and isFull
     ***********************************************************************/

    var onDuty = true;
    var isFull = false;
    var image;

    if (!onDuty){
      image = image_black;
    } else {
      if (isFull)
        image = image_red
      else
        image = image_green
    }

    markers[item] = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image,
        title: cart[0],
        zIndex: 3
    });
  }

  // Add listeners for each marker... 
  // this populates the cab data check the marker is clicked
  for (var item in markers){
    google.maps.event.addListener(markers[item], 'click', function() {
      var detailDiv = document.getElementById('cabDetails');
      var riderCountDiv = document.getElementById('riderCounts');


      /***********************************************************************
       * DB CALL: Get status, route, driver name, and occupancy for the cab
       * The text should go before the <br/> tags
       ***********************************************************************/
      parent.document.getElementById("cabDetails").innerHTML = "Status: " + "<br/>"
                                                              + "Route: " + "<br/>"
                                                              + "Driver: " + "<br/>"
                                                              + "Current Occupancy: " + "<br/>";


      /***********************************************************************
       * DB CALL: Get number of riders on a specific day and in the last hour
       * The text should go before the <br/> tags
       ***********************************************************************/
      parent.document.getElementById("riderCounts").innerHTML = "Today: " + "<br/>"
                                                              + "Last Hour: " + "<br/>";
    });

  }
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

google.maps.event.addDomListener(window, 'load', initialize);