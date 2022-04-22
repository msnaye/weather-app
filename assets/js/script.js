var searchField =document.querySelector(".search-field");
var searchBtn =document.querySelector(".searchbtn");
var forecastContainer=document.querySelector(".forecastCards")


searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    console.log(searchField.value);
    getCordinates(searchField.value)
})
var apiKey = "5056fb3f5552cba986f4ea65f8eec72e"

function getCordinates (city){
    var baseUrl = "http://api.openweathermap.org/geo/1.0/direct?q="
    var restUrl = "&limit=1&appid=5056fb3f5552cba986f4ea65f8eec72e"
    //Make a request to the url 
    fetch(baseUrl + city + restUrl)
    .then(function(response){
        //request was successful
        response.json()
        .then(function(data){
            console.log(data);
            //displayCordinates(data)
            getCurrent(data[0].lat,data[0].lon)
            displayCityName(data[0].name,data[0].state)
            getForecast(data[0].lat,data[0].lon)
        })
    })
}
//create a span element to hold searched city names
//var titleEl = document.createElement("span");

//titleEl.textContent = (cityName);

//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
function getCurrent(lat,lon){
    var baseUrl="https://api.openweathermap.org/data/2.5/onecall?"
    var getLatLon="lat=" + lat+ "&lon=" + lon
    var restUrl="&units=imperial&exclude=minutely,hourly,daily,alerts&appid="
    fetch(baseUrl+getLatLon+restUrl+apiKey)
    .then(function(response){
        //request was successful
        response.json()
        .then(function(data){
            console.log(data);
            //displayCordinates(data)
            displayCurrent(data)
        })
    })
}      

function getForecast(lat,lon){
    var baseUrl="https://api.openweathermap.org/data/2.5/onecall?"
    var getLatLon="lat=" + lat+ "&lon=" + lon
    var restUrl="&units=imperial&exclude=minutely,hourly,current,alerts&appid="
    fetch(baseUrl+getLatLon+restUrl+apiKey)
    .then(function(response){
        //request was successful
        response.json()
        .then(function(data){
            console.log(data);
        
            displayForecast(data)
        })
    })

}

//for loop for five day forecast
function displayForecast (data){
    
    for(var i=1;i<6; i++){
            var day= document.createElement("div");
        day.classList.add("card", "col-sm-12", "col-lg-2","m-2","text-center"); 
        var temp=document.createElement("p");
        temp.textContent= "Temperature: " + data.daily[i].temp.day;
        day.appendChild(temp)
        
        var humidity=document.createElement("p");
        humidity.textContent= "Humidity: " + data.daily[i].humidity;
        day.appendChild(humidity)
        
        var windspeed=document.createElement("p");
        windspeed.textContent="Windspeed: " + data.daily[i].wind_speed;
        day.appendChild(windspeed)
        forecastContainer.appendChild(day)
       
    }
}

//var forecastContainer=function(data){


  
function displayCurrent (data){
    var currentTemp=document.querySelector(".current-temp")
    currentTemp.textContent="Temperature: " +data.current.temp+"°F"
    var currentHumid=document.querySelector(".current-humidity")
    currentHumid.textContent="Humidity: " +data.current.humidity+"%"
    var currentWind=document.querySelector(".current-windspeed")
    currentWind.textContent="Windspeed: "+data.current.wind_speed+" MPH"
    var currentUvi=document.querySelector(".current-uvi")
    currentUvi.textContent="Uvi: "+data.current.uvi
}

    
    
function displayCityName(city,state){
    var cityNameEl=document.querySelector(".cityname")
    cityNameEl.textContent=city+", "+state
}

function displayDate(){
    var date=moment().format('MMMM Do YYYY')
    console.log(date)
    var dateEl=document.querySelector(".date")
    dateEl.textContent=date 

}
displayDate()





// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}