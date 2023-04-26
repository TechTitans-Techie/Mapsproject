//javascript.js
//set map options
var distance = "";
var myLatLng = { lat: 38.3460, lng: -0.4907 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='drive'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value+"</div><div class='drive'> Driving distance <i class='fas fa-road'></i> : <p id='miles'>" + result.routes[0].legs[0].distance.text + "</p>Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
            directionsDisplay.setDirections(result);
            distance = result.routes[0].legs[0].distance.text
        } else {
            directionsDisplay.setDirections({ routes: [] });
            map.setCenter(myLatLng);
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });
}

function calcWalkingDistance(){

    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.WALKING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            const output1 = document.querySelector('#output1');
            output1.innerHTML = "<div class='walk'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value+"</div><div class='walk'>Walking distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br/>Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
            directionsDisplay.setDirections(result);
            distance = result.routes[0].legs[0].distance.text
        } else {
            directionsDisplay.setDirections({ routes: [] });
            map.setCenter(myLatLng);
            output1.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });
}

function calcTransist(){
    var request2 = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.TRANSIT, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    directionsService.route(request2, function (result2, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            const output2 = document.querySelector('#output2');
            output2.innerHTML = "<div class='transist'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value+"</div><div class='transist'>"+"Transist distance <i class='fas fa-road'></i> : " + result2.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result2.routes[0].legs[0].duration.text + ".</div>";
            directionsDisplay.setDirections(result2);
            distance = result2.routes[0].legs[0].distance.text
        } else {
            directionsDisplay.setDirections({ routes: [] });
            map.setCenter(myLatLng);
            output2.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance. No Route found</div>";
        }
    });
}

// function AddFromTo(){
//     const fromTo = document.querySelector("#FromAndTo");
//     fromTo.innerHTML= "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value+"</div>";
// }

function checkRide(option){
    //alert(option)
    if(option == "Driving"){
        document.getElementById("row").style.display = 'block';
        document.getElementById("output1").style.display = 'none';
        document.getElementById("output2").style.display = 'none';
        document.getElementById("output").style.display = 'block';
        document.getElementById("cars-container").style.display='block';
        //AddFromTo();
        calcRoute();
    }
    if(option == "Walking"){
        document.getElementById("row").style.display = 'block';
        document.getElementById("output").style.display = 'none';
        document.getElementById("output2").style.display = 'none';
        document.getElementById("output1").style.display = 'block';
        document.getElementById("cars-container").style.display='none';
        //AddFromTo();
        calcWalkingDistance();
    }
    if(option == "Public Transport"){
        document.getElementById("row").style.display = 'block';
        document.getElementById("output1").style.display = 'none';
        document.getElementById("output").style.display = 'none';
        document.getElementById("output2").style.display = 'block';
        document.getElementById("cars-container").style.display='none';
        //AddFromTo();
        calcTransist();
    }
    // if(option == "Own car"){
    //     document.getElementById("output1").style.display = 'none';
    //     document.getElementById("output").style.display = 'none';
    //     document.getElementById("output2").style.display = 'none';
    //     document.getElementById("cars-container").style.display='block';
    // }

}

var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);


