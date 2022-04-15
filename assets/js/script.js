var searchField =document.querySelector(".search-field");
var searchBtn =document.querySelector(".searchbtn");

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    console.log(searchField.value);
    getCordinates(searchField.value)
})
var apiKey = "5056fb3f5552cba986f4ea65f8eec72e"

function getCordinates (city){
    var baseUrl = "http://api.openweathermap.org/geo/1.0/direct?q="
    var restUrl = "&limit=1&appid=5056fb3f5552cba986f4ea65f8eec72e"
    fetch(baseUrl + city + restUrl)
    .then(function(response){
        response.json()
        .then(function(data){
            console.log(data);
        })
    })
}
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}