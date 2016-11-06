var me = {};
var mel = [];
var map;
var cord ={};
var geoQuery;
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
    function popMap() {
        var firebaseRef = firebase.database().ref();
        var geoFire = new GeoFire(firebaseRef);
        console.log("Lat " + me.lat + " : " + "Long " + me.lng);
        geoQuery = geoFire.query({
            center: [me.lat, me.lng],
            radius: 1200
        });
        geoQuery.on("key_entered", function(key, location, distance) {
            console.log("Lat " + location[0] + " : " + "Long " + location[1]);
            var lo = {
                lat : location[0],
                lng : location[1]
            };

            adPin(lo );
        });

    }
    function setMe (position) {
        var a= ""+position.coords.latitude+"";
        var b= ""+position.coords.longitude+"";
        me.lat = parseFloat(a);
        me.lng = parseFloat(b);
        dispMap(me);
    }

    function adPin(cur) {
        var ts= {};
        var a= ""+cur.lat+"";
        var b= ""+cur.lng+"";
        ts.lat = parseFloat(a);
        ts.lng = parseFloat(b);
        mel[Math.round(Math.random()*10000)] = new google.maps.Marker({
            position: ts,
            map: map
        });
        document.getElementById('map').value =map;
    }

    function dispMap(cur) {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: cur
        });
        adPin(cur);
        popMap();
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

    function addToFireBase() {
       // writeUserData(123, "daniel", "daniel@a.com", "adfsda.jpg")
        var at= " ";
        var firebaseRef = firebase.database().ref();
        var geoFire = new GeoFire(firebaseRef);
        var latarea = document.getElementById('latarea');
        var longarea = document.getElementById('longarea');
        geoFire.set(""+Math.round(Math.random()*1000000), [parseFloat(latarea.value), parseFloat(longarea.value)]).then(function() {

            at ="3";
        }, function(error) {

        });
       // var k = ref.push({name: latarea.value, text: longarea.value}).toString();
        // updates[+newPostKey]=pointData;
        latarea.value =  at;
        longarea.value = " ";
        geoQuery.updateQuery();

    }
/* Logs to the page instead of the console */
    function log(message) {
        var childDiv = document.createElement("div");
        var textNode = document.createTextNode(message);
        childDiv.appendChild(textNode);
        document.getElementById("log").appendChild(childDiv);
    }



