// Google Maps API Key: AIzaSyAlVUE0QmItEkmjVUBLhkb3ShhebQMJUdA
// Yelp API Client ID: tkj2RT67auYEQme1qPmQrw
// Yelp API Client Secret: pCNzFdeSupVOK6hXvwVQcxI6UHGrm9NZwsMSl409oaRip3bWy7ZHpjqJrutXZTVm
// Foursquare API Client_ID: HCD0LDB21MEFAHLUV0GAU32C2HR2XV4UYFZRRBAEY1EUZB0C
// Foursquare API CLIENT_SECRET: SQGAEPO5NHJ1OFEQMVIPRUEGZ4JZCND5RTUDLUV5NCWXGX5P

// Global Variable
//var map = null;


var model = {
    currentMarker: null,
    zoom: 13,
    
    
    markers: [
    {
        label: "Chicago Street Deli",
        coords: {lat:35.360686, lng: -96.929261},
        //iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        content: '<h5>Chicago Street Deli</h5>',
        selected: false,
        hover: false,
        visible: true
    },
    {
        label: "Hamburger King",
        coords: {lat:35.327623, lng: -96.918613},
 //       iconImage: 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png',
        content: '<h5>Hamburger King</h5>',
        selected: false,
        hover: false,
        visible: true
        
    },
    {
        label: "Benedict Street Marketplace",
        coords: {lat:35.335465, lng: -96.933254},
 //       iconImage: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
        content: '<h5>Benedict Street Marketplace</h5>',
        selected: false,
        hover: false,
        visible: true
    },
    {
        label: "Billy Boy Bar-B-Que",
        coords: {lat:35.362666, lng:-96.925779},
 //       iconImage: 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png',
        content: '<h5>Billy Boy Bar-B-Que</h5>',
        selected: false,
        hover: false,
        visible: true
    },
      {
        label: "The Garage",
        coords: {lat:35.384799, lng: -96.923202},
 //       iconImage: 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png',
        content: '<h5>The Garage</h5>',
        selected: false,
        hover: false,
        visible: true
    }
    ]
};

var Location = function(locationElement) {
    
    // Constructor Elements
    
    var self = this;
    
    // Observables
    
    self.label = ko.observable(locationElement.label);
    self.selected = ko.observable(locationElement.selected);
    self.hover = ko.observable(locationElement.hover);
    self.visible = ko.observable(locationElement.visible);
    
    // Non-Observables
    
    self.iconImage = locationElement.iconImage;
    self.coords = locationElement.coords;
    self.content = locationElement.content;
    self.markerInstance = null;
    
    // Create Google Maps Marker for this location instance
    
    self.markerInstance = AddMarker();
    
    // Create the info window for this location instance
    
    self.infoWindow = AddInfoWindow();
    
    // Get Yelp Data For Marker
    
    AddFSData();
    
    // Location Object Functions
    
    function AddFSData() {
        var FSclientId = "HCD0LDB21MEFAHLUV0GAU32C2HR2XV4UYFZRRBAEY1EUZB0C";
        var FSClientSecret = "SQGAEPO5NHJ1OFEQMVIPRUEGZ4JZCND5RTUDLUV5NCWXGX5P";
        var FSURL = "https://api.foursquare.com/v2/venues/search?ll="+self.coords.lat+","+self.coords.lng+"&query="+self.label()+"&limit=1&client_id="+FSclientId+"&client_secret="+FSClientSecret+"&v=20170801";
        
        var category;        // data.rating
        var userCount;         // data.price.message
        var checkinsCount; // data.stats.checkinsCount
        var name;
        
        var returnContent;
        
        $.getJSON(FSURL, function(data) {
            var dataHeader = data.response.venues[0];
            category = dataHeader.categories[0].name;
            userCount = dataHeader.stats.usersCount;
            checkinsCount = dataHeader.stats.checkinsCount;
            name = dataHeader.name;
            
            returnContent = "<h5>"+name+"</h5>" + "<hr>" + 
            "<p>Category: "+category+"</p>" +
            "<p>Number of Users: "+userCount+"</p>" +
            "<p>Number of Checkins : "+checkinsCount+"</p>";
            
             changeInfowindow(returnContent);
            
        }).fail(function() {
            alert("FourSquare API Failure!");
        });
    }
    
    self.markerHover = function() {
        self.hover(!self.hover());
    };
    
    self.markerClick = function() {
        ViewModel.disableAll();
        self.selected(!self.selected());
        if(self.selected()) {
            self.markerInstance.setAnimation(google.maps.Animation.BOUNCE);
            self.infoWindow.open(map,self.markerInstance);
        } else {
            self.infoWindow.close();
            self.markerInstance.setAnimation(null);
        }
    };
    
    self.markerDisable = function() {
        self.infoWindow.close();
        self.markerInstance.setAnimation(null);
        self.selected(false);
        console.log("markerDisable: "+self);
    };
    
    self.isVisible = ko.pureComputed(function() {
        if(self.label().toLowerCase().includes(searchInput().toLowerCase()) || searchInput() === "Search Location" || searchInput() === "") {
            self.markerInstance.setVisible(true);
            return true;
        } else {
            self.markerInstance.setVisible(false);
            self.infoWindow.close();
            return false;
        }
    }, self);
    
    self.isHover = ko.computed(function() {
        return (self.hover() || self.selected());
    }, self);
    
    function AddMarker() {
        return MapView.addMarker(self);
    }
    
    function AddInfoWindow() {
        return MapView.addInfoWindow(self);
    }
    
    function changeInfowindow(content) {
        self.infoWindow.setContent(content);                         
    }
    
};

var MapView = {
    map: null,
        init: function() {

            centerModel = model.markers[0];
        
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: model.zoom,
                center: centerModel.coords,
                styles: [
                {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
                {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
                {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{color: '#263c3f'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#6b9a76'}]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{color: '#38414e'}]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#212a37'}]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#9ca5b3'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{color: '#746855'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#1f2835'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#f3d19c'}]
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{color: '#2f3948'}]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{color: '#17263c'}]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#515c6d'}]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{color: '#17263c'}]
                }
                ]
            });

        },

        addMarker: function(venue){
            var marker = new google.maps.Marker({
                position: venue.coords,
                map:map
            });

            if(venue.iconImage) {
                marker.setIcon(venue.iconImage);
            }
            
            return marker;
        },
        
        addInfoWindow: function(venue) {
            if(venue.content) {
                var infoWindow = new google.maps.InfoWindow({
                    content: venue.content
                });
                venue.markerInstance.addListener('click', function() {
                    venue.markerClick();
                });
                return infoWindow;
            } else{
                return null;
            }
            
        }
        
    };

var ViewModel = {
    
    markersObservable: null,
    searchInput: null,
    initialInputClick: null,
    
    init: function() {
    
        markersObservable = ko.observableArray([]);
        searchInput = ko.observable("Search Location");
        initialInputClick = true;
    
        model.markers.forEach(function(locationObject) {
            markersObservable.push(new Location(locationObject));
        });

         
        inputClick = function() {
            if(initialInputClick) {        // Just erase default text on first click. Don't erase text after second click.
                initialInputClick = false;
                searchInput("");
            }
        };
    },
    getZoom: function() {
        return model.zoom;
    },
    setZoom: function(newZoom) {
        model.zoom = newZoom;
    },
    getSearchInput: function() {
        return searchInput();
    },
    
    disableAll: function() {
        markersObservable().forEach(function(locationInstance) {
            console.log(locationInstance);
            locationInstance.disableMarker();
        });
    }
};

function initMap() {
    MapView.init();
    ko.applyBindings(ViewModel.init());
}

function googleMapError() {
    alert("Google Maps is not available at this moment.");
}


