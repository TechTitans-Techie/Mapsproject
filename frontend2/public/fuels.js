let fuelPriceList;
let areaFuelPriceList;
let city;
function callFuels(state){
    $.ajax({
        method: 'GET',
        url: 'https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=miZ5s0yyfzTHBCJfOFN2HXJ4osBcvBz5QPxfywun&fuel_type=E85,ELEC&state='+state,
        headers: {},
        contentType: 'application/json',
        success: function(result) {
            console.log(result)
            areaFuelPriceList = result;
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
    return areaFuelPriceList;
}

function calcMilage(carMileage_list,userOrigin){
    userCar = document.getElementById('cars').value;
    
    let userCarMileage;
    userOrigin = userOrigin.value;
    for(var i =0;i<carMileage_list.length;i++){
        if(carMileage_list[i].split(" : ")[0] == userCar){
            state = userOrigin.split(", ")[1];
            city = userOrigin.split(" , ")[0];
            userCarMileage = carMileage_list[i].split(" : ")[1];
            setTimeout(() => {
                areaFuelPriceList = callFuels(state);
            }, 5000)
            break;
        }
    }
    
    let fuelPrice = getFuelPrice();
    // setTimeout(() =>{
    //     fuelPrice = getCity(areaFuelPriceList,city);
    // },5000)
    let distance = document.getElementById("miles").innerHTML.substring(0, document.getElementById("miles").innerHTML.length-2);
    //alert(distance +" "+ fuelPrice +" "+ userCarMileage);
    distance = parseInt(distance)
    fuelPrice = parseInt(fuelPrice)
    userCarMileage = parseInt(userCarMileage)
    //alert(distance +" "+ fuelPrice +" "+ userCarMileage);
    let fuel = distance / userCarMileage;
    fuel = Math.round(fuel * 100) / 100
    let trip_cost = fuel * fuelPrice
    trip_cost = Math.round(trip_cost * 100) / 100;
    //alert(Math.round(trip_cost * 100) / 100)
    var final_display = document.getElementById("final_display");
    //alert("display")
    final_display.innerHTML = "<p>The user selects "+userCar.toUpperCase()+" which has a combination mileage of "+userCarMileage+". <br>. The distance user wants to travel "+distance+"mi. So the total fuel, the user needs to cover the given distance is distance / mileage ="+fuel+".</p>";
    final_display.innerHTML = final_display.innerHTML+ "<p>Hence the trip cost would be fuel required * fuel price in the origin = $"+trip_cost+"</p>";

    // var modal = document.getElementById("myModal");

    // // Get the button that opens the modal
    // var btn = document.getElementById("carsubmit");

    // // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];

    // // When the user clicks the button, open the modal 
    // btn.onclick = function() {
    // modal.style.display = "block";
    // }

    // // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //      modal.style.display = "none";
    // }
    // var final_text = document.getElementById("final_text")
    // final_text.innerHTML ="<p>The user selects "+userCar.toUpperCase()+" which has a combination mileage of "+userCarMileage+". <br>. The distance user wants to travel "+distance+"mi. So the total fuel, the user needs to cover the given distance is distance / mileage ="+fuel+".</p>";
    // final_text.innerHTML = final_text.innerHTML+ "<p>Hence the trip cost would be fuel required * fuel price in the origin = $"+trip_cost+"</p>";
    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //         final_text.innerHTML = '';
    //     }
    // }

}

function getCity(areaFuelPriceList,city){
    let fuel_stations = areaFuelPriceList['fuel_stations']
    let fuel_price;
    for(var i =0;i<fuel_stations.length;i++){
        var obj = fuel_stations[i];
        if(obj['city'] == city){
            fuel_price = getFuelPrice();
        }    
    }
    return fuel_price;
}

function getFuelPrice(){
    let max = 4.0;
    let min = 3.0;
    let decimals = 2;
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}
