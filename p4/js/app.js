// Google Maps API Key: AIzaSyAlVUE0QmItEkmjVUBLhkb3ShhebQMJUdA

var model = {
    currentMarker: null,
    zoom: 14,
    
    
    markers: [
    {
        label: "Chicago Street Deli",
        coords: {lat:35.360905,lng:-96.929272},
        //iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        content: '<h5>Chicago Street Deli</h5>',
        selected: false,
        hover: false
    },
    {
        label: "Shawnee High School",
        coords: {lat:35.341585,lng:-96.937751},
        iconImage: 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png',
        content: '<h5>Shawnee High School</h5>',
        selected: false,
        hover: false
        
    },
    {
        label: "Home",
        coords: {lat:35.354716, lng:-96.925655},
        iconImage: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
        content: '<h5>My Home</h5>',
        selected: false,
        hover: false
    },
    {
        label: "Shawnee Mall",
        coords: {lat:35.387257,lng: -96.925982},
        iconImage: 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png',
        content: '<h5>Shawnee Mall</h5>',
        selected: false,
        hover: false
    }
    ]
};

function ViewModel() {
    self = this;
    
    this.marker = ko.observable();
        
    model.currentMarker = model.markers[0];
        
    markersObservable = ko.observableArray(getMarkers());
        
    getMarkers().forEach(function(marker) {
        selected = ko.observable(marker.selected);
        hover = ko.observable(marker.hover);
        label = ko.observable(marker.label);
    });
    console.log("test 1");

    
    function getCurrentMarker() {
        return model.currentMarker;
    };
    function getMarkers() {
        return model.markers;
    };
    function setCurrentMarker(loc) {
        model.currentMarker = loc;
    };
    function getZoom() {
        return model.zoom;
    };
    function setZoom(newZoom) {
        model.zoom = newZoom;
    };
    markerHover = function(item) {
        console.log("item: "+item.label);
        console.log("this: "+this);
        console.log("hover: "+item.hover);
        item.label = "Hover";
        console.log("item: "+item.label);
        hover(!hover());
        item.valueHasMutated();
    };
    
    // If you think about server design, I think the viewmodel would pull information from the server and store it in the model.
    // I can toggle classes to highlight hovered elements.
    
    
    // listView is not currently used
    var listView = {
        init: function() {
            var models = ViewModel.getMarkers();
            for(k = 0; k < models.length; k++) {
                $('.marker-list').append('<li class="marker-list-item" data-bind="event: {mouseover: markerHoverOn, mouseout: markerHoverOff }">' + models[k].label + '</li>');
            }
        },
        render: function() {
            // More to come
            var dummy = 1;
        }
    }

    var MapView = {
        map: null,
        init: function() {

            centerModel = getCurrentMarker();
            console.log(centerModel);
        
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: getZoom(),
                center: getCurrentMarker().coords,
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
        
            for(var i = 0;i < model.markers.length;i++){
                MapView.addMarker(model.markers[i]);
            }
        },

        addMarker: function(props){
            var marker = new google.maps.Marker({
                position: props.coords,
                map:map
            });

            if(props.iconImage) {
                marker.setIcon(props.iconImage);
            }
            if(props.content){ 
                var infoWindow = new google.maps.InfoWindow({
                    content:props.content
                });
                
                marker.addListener('click', function() {
                    infoWindow.open(map,marker);
                });
            }
        },
        
        render: function() {
            // More to come
            var dummy = 1;
        }
    };
    MapView.init();
}

function initMap() {
    ko.applyBindings(new ViewModel());
    //MapView.init();
    //MapView.render();
}


