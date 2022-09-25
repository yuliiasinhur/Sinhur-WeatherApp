
let now= new Date()
let hours=now.getHours()
let minutes=now.getMinutes()
let week=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let weekDay=week[now.getDay()]


let currentDay=document.querySelector("#today")
currentDay.innerHTML=`${weekDay}, ${hours}:${minutes}`

let searchCity=document.querySelector("#search-city")

function search(event){
event.preventDefault()
let searchInput= document.querySelector("#enterCity")
let city=document.querySelector("#city")
city.innerHTML=searchInput.value 

let apiKey = `25fad9f7e87157d33dde0f82ab269ee8`;
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;

function showTemperature(response) {
  console.log(response)
  
  let temp=Math.round(response.data.main.temp)
  
  let temperature=document.querySelector("#temp")
  temperature.innerHTML=temp
}

axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);

}
searchCity.addEventListener("submit", search)


function searchLocation(position) {
  var apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(position.coords.latitude, "&lon=").concat(position.coords.longitude, "&appid=").concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(showTemperature);
  function showTemperature(response) {
    console.log(response)
    
    let temp=Math.round(response.data.main.temp)
    
    let temperature=document.querySelector("#temp")
    temperature.innerHTML=temp
    
    let currentCity=response.data.name
    let displayCity=document.querySelector("#city")
    displayCity.innerHTML=currentCity
  }
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentButton = document.querySelector("#current");

currentButton.addEventListener("click", getCurrentLocation);

// function fTemp(event) {
//   event.preventDefault();
//   let currentTemp=document.querySelector('#temp')
//   let fTemp=Math.round(26 * 1.8 + 32)
//   currentTemp.innerHTML=fTemp

// }
// let fahrenheitTemp=document.querySelector("#fahrenheit")
// fahrenheitTemp.addEventListener("click", fTemp)

// function cTemp(event) {
//   event.preventDefault();
//   let currentTemp=document.querySelector('#temp')
//   currentTemp.innerHTML=26
// }

// let celciumTemp=document.querySelector("#celsius")
// celciumTemp.addEventListener("click",cTemp)
