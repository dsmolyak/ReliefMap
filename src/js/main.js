var me = {};
var mel;
var map;
var cord ={};
    function initMap() {
        var x = document.getElementById("demo");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setMe);
        } else {
            var geocoder = new google.maps.Geocoder();
            if (google.loader.ClientLocation) {
                me.lat = google.loader.ClientLocation.latitude;
                me.lng = google.loader.ClientLocation.longitude;
                dispMap(me);
            }
        }
    }

    function setMe (position) {
        var a= ""+position.coords.latitude+"";
        var b= ""+position.coords.longitude+"";
        me.lat = parseFloat(a);
        me.lng = parseFloat(b);
        dispMap(me);
    }

    function dispMap(cur) {
         map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: cur
        });
        mel = new google.maps.Marker({
            position: cur,
            map: map
        });
    }

    function myCord() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setCord);
        } else {
            var geocoder = new google.maps.Geocoder();
            if (google.loader.ClientLocation) {
                cord.lat = google.loader.ClientLocation.latitude;
                cord.lng = google.loader.ClientLocation.longitude;
                cCord(cord);
            }
        }
    }

    function setCord(position) {
        var a= ""+position.coords.latitude+"";
        var b= ""+position.coords.longitude+"";
        cord.lat = parseFloat(a);
        cord.lng = parseFloat(b);
        cCord(cord);
    }

    function cCord(cur) {
        var lat = document.getElementById("latarea");
        var lng = document.getElementById("longarea");

        lat.value = cur.lat;
        lng.value = cur.lng;

    }

    function clearContents(element) {
        element.value = '';
    }
