var make = ['toyota','audi','nissan','ford','dodge']  
var list_cars = []
var dict_list = []
const select_start_text = "<select name ='cars' id='cars'>"
let optionValue = "<option>Please select Car</option>";
for(var i=0;i<make.length;i++){
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/cars?make=' + make[i] + '&limit=100&cylinders=4&fuel_type=gas&year=2022',
        headers: { 'X-Api-Key': 'tx/jdKoeAHJAedz1gDk66A==QQwxxpj02LLhfshR'},
        contentType: 'application/json',
        success: function(result) {
            //console.log(result)
            for(var k=0;k<result.length;k++){
                //console.log(result[k]["make"]+" "+result[k]["model"]+" "+result[k]["combination_mpg"]);
                optionValue += "<option value="+result[k]["make"]+" "+result[k]["model"]+" "+result[k]["combination_mpg"]+">"+result[k]["make"]+" "+result[k]["model"]+"</option>"
            }
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}                                      

const select_end_text =  "</select>"
const cars_container = document.getElementById("cars-container")
const myTimeout = setTimeout(loadSelectTag, 7000);



function loadSelectTag(){
    let optionValues = removeDuplicates(optionValue)
    console.log(optionValues)
    let submit_text = "<br><br><button id='carsubmit' onclick='calcMilage(dict_list,input1);'>Submit</button>"
    cars_container.innerHTML = select_start_text + optionValues + select_end_text + submit_text;
    //alert(document.getElementById("cars").value)
}

function removeDuplicates(listCars){
    
    let optionValue = "";
    var splitting_cars = listCars.split("</option>")
    //console.log(splitting_cars)
    for(var i =0;i<splitting_cars.length;i++){
        list_cars[i] = splitting_cars[i].substring(splitting_cars[i].indexOf(">")+1,splitting_cars[i].length) 
        dict_list[i] = list_cars[i]+" : "+splitting_cars[i].substring(splitting_cars[i].indexOf('>')-2).substring(0,2)
    }
    var uniqueCars = [];
    $.each(list_cars, function(i, el){
        if($.inArray(el, uniqueCars) === -1) uniqueCars.push(el);
    });
    //console.log(list_cars)
    for(var j=0;j<uniqueCars.length;j++){
        optionValue += "<option value='"+uniqueCars[j]+"'>"+uniqueCars[j]+"</option>";
    }
    return optionValue;
}
