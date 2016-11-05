var me = {};
    function initMap() {
        var x = document.getElementById("demo");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setMe(position);
            });
        } else {
            var geocoder = new google.maps.Geocoder();
            if(google.loader.ClientLocation) {
                me.lat = google.loader.ClientLocation.latitude;
                me.lng = google.loader.ClientLocation.longitude;
            }
        }
        x.innerHTML = "Latitude: " + me.lat +
            "<br>Longitude: " + me.lng;
        dispMap(me);
    }

    function setMe (position) {
        me.lat = position.coords.latitude;
        me.lng = position.coords.longitude;

    }


    function dispMap(cur) {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: cur
        });
        var marker = new google.maps.Marker({
            position: cur,
            map: map
        });
    }
