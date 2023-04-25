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
    //alert(userCar)
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
    let fuel = distance / userCarMileage;
    fuel = Math.round(fuel * 100) / 100
    let trip_cost = fuel * fuelPrice
    trip_cost = Math.round(trip_cost * 100) / 100;
    //alert(Math.round(trip_cost * 100) / 100)
    var final_display = document.querySelector("#final_display");
    final_display.innerHTML = "<p>The user selects "+userCar.toUpperCase()+" which has a combination mileage of "+userCarMileage+". <br>. The distance user wants to travel "+distance+"mi. So the total fuel, the user needs to cover the given distance is distance / mileage ="+fuel+".</p>";
    final_display.innerHTML = final_display.innerHTML+ "<p>Hence the trip cost would be fuel required * fuel price in the origin = $"+trip_cost+"</p>";

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
