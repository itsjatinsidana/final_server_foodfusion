function singleMap() {
    //   marker ------------------
    var markerIcon = {
        url: 'images/marker.png',
    }
    //   Your locations ------------------ 
    var locations = [
        ['Restabook in Manhattan', 40.7143528, -74.0059731],
        ['Restabook in Bronx', 40.7168183, -73.9973402],
        ['Restabook in Queens', 40.73334016, -73.99330616],
    ];
    //  map settings ------------------	
    var single_map = new google.maps.Map(document.getElementById('singleMap'), {
        zoom: 13,
        center: new google.maps.LatLng(40.73334016, -73.99330616),
        scrollwheel: false,
        zoomControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        scaleControl: false,
        panControl: false,
        navigationControl: false,
        streetViewControl: false,
        styles: [{
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }
        ]
    });
    var scrollEnabling = $('.scrollContorl');
    $(scrollEnabling).click(function (e) {
        e.preventDefault();
        $(this).toggleClass("enabledsroll");

        if ($(this).is(".enabledsroll")) {
            single_map.setOptions({
                'scrollwheel': true
            });
        } else {
            single_map.setOptions({
                'scrollwheel': false
            });
        }
    });
    var zoomControlDiv = document.createElement('div');
    var zoomControl = new ZoomControl(zoomControlDiv, single_map);

    function ZoomControl(controlDiv, single_map) {
        zoomControlDiv.index = 1;
        single_map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);
        controlDiv.style.padding = '5px';
        var controlWrapper = document.createElement('div');
        controlDiv.appendChild(controlWrapper);
        var zoomInButton = document.createElement('div');
        zoomInButton.className = "mapzoom-in";
        controlWrapper.appendChild(zoomInButton);
        var zoomOutButton = document.createElement('div');
        zoomOutButton.className = "mapzoom-out";
        controlWrapper.appendChild(zoomOutButton);
        google.maps.event.addDomListener(zoomInButton, 'click', function () {
            single_map.setZoom(single_map.getZoom() + 1);
        });
        google.maps.event.addDomListener(zoomOutButton, 'click', function () {
            single_map.setZoom(single_map.getZoom() - 1);
        });
    }

    var infowindow = new google.maps.InfoWindow({});
    var marker, count;
    for (count = 0; count < locations.length; count++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[count][1], locations[count][2]),
            map: single_map,
            icon: markerIcon,
            title: locations[count][0]
        });
        google.maps.event.addListener(marker, 'click', (function (marker, count) {
            return function () {
                infowindow.setContent(locations[count][0]);
                infowindow.open(singleMap, marker);
            }
        })(marker, count));
    }


}
var single_map = document.getElementById('singleMap');
if (typeof (single_map) != 'undefined' && single_map != null) {
    google.maps.event.addDomListener(window, 'load', singleMap);
}