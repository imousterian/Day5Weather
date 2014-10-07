$(window).load(function() {
    loadScript();
});

var map;

function initialize() {

    var mapOptions = {
        center: new google.maps.LatLng(37.7749300, -122.4194200), //SF location
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        panControl: true,
        scaleControl: false,
        streetViewControl: true,
        overviewMapControl: true
    };
    // initializing map
    map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
}

function codeAddress(geocoding){
    var address = $("#location").text();
    if(address.length > 0){
        geocoding.geocode({'address': address},function(results, status){
            if(status == google.maps.GeocoderStatus.OK){
                map.setCenter(results[0].geometry.location);
                map.setZoom(11);
                var marker  =  new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            }else{
            alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }else{
        alert("Search field can't be blank");
    }
}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
        '&libraries=drawing'+
        '&callback=initialize';
    document.body.appendChild(script);
}
