
let now= new Date()
let hours=now.getHours()
let minutes=now.getMinutes()
let week=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let weekDay=week[now.getDay()]

function formatDay(timestamp) {
  let date=new Date(timestamp*1000)
  let day=date.getDay()
  let days=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return days[day]
}

let currentDay=document.querySelector("#today")
currentDay.innerHTML=`${weekDay}, ${hours}:${minutes}`

let searchCity=document.querySelector("#search-city")

function displayForecast(response) {
  console.log(response.data.daily)
  let forecast=response.data.daily
  let forecastElement = document.querySelector("#forecast");

  let days=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index<4) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src=https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temperature.maximum)}°</span>
          <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temperature.minimum)}° </span>
        </div>
      </div>
  `;}
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  
  let apiKey=`5e4703o0ft74dbca44181bcc0fbdd83a`
  let apiURL=`https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`

  console.log(apiURL)

  axios.get(apiURL).then(displayForecast)



}

function displayWeather(response) {
console.log(response)
let cityDisplay= document.querySelector ("#city")
cityDisplay.innerHTML= response.data.city

let temperatureDisplay= document.querySelector("#temp")
temperatureDisplay.innerHTML=Math.round(response.data.temperature.current)
celciumTemperature=response.data.temperature.current
let humidityDisplay=document.querySelector("#humidity")
humidityDisplay.innerHTML=response.data.temperature.humidity

let windDisplay=document.querySelector("#wind")
windDisplay.innerHTML= Math.round(response.data.wind.speed)
let descriptionDisplay= document.querySelector("#description")
descriptionDisplay.innerHTML=response.data.condition.description

let iconDisplay=document.querySelector("#icon")
iconDisplay.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`)
iconDisplay.setAttribute("alt", response.data.condition.description)

getForecast(response.data.coordinates)

}
let apiKey=`5e4703o0ft74dbca44181bcc0fbdd83a`
let apiURL= `https://api.shecodes.io/weather/v1/current?query=Dnipro&key=${apiKey}`

axios.get(apiURL).then(displayWeather)

function search(event){
event.preventDefault()
let searchInput= document.querySelector("#enterCity")
let city=document.querySelector("#city")
city.innerHTML=searchInput.value 

let apiKey=`5e4703o0ft74dbca44181bcc0fbdd83a`
let apiURL =
`https://api.shecodes.io/weather/v1/current?query=${searchInput.value}&key=${apiKey}&units=metric`;

function showTemperature(response) {
  
  let temp=Math.round(response.data.temperature.current)
  
  let temperature=document.querySelector("#temp")
  temperature.innerHTML=temp
  let humidity=document.querySelector("#humidity")
  humidity.innerHTML=response.data.temperature.humidity
  celciumTemperature=Math.round(response.data.temperature.current)
  let wind=document.querySelector("#wind")
  wind.innerHTML= Math.round(response.data.wind.speed)
  let description= document.querySelector("#description")
  description.innerHTML=response.data.condition.description

  let icon=document.querySelector("#icon")
  icon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`)
  icon.setAttribute("alt", response.data.condition.description)
  getForecast(response.data.coordinates)

  }

axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature)


;

}
searchCity.addEventListener("submit", search)


function searchLocation(position) {
  var apiKey = "5e4703o0ft74dbca44181bcc0fbdd83a";

  var apiUrl=`https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=5e4703o0ft74dbca44181bcc0fbdd83a`

  axios.get(apiUrl).then(showTemperature);
  function showTemperature(response) {
    
    let temp=Math.round(response.data.temperature.current)
    
    let temperature=document.querySelector("#temp")
    temperature.innerHTML=temp
    
    let currentCity=response.data.city
    let displayCity=document.querySelector("#city")
    displayCity.innerHTML=currentCity
    let humidity=document.querySelector("#humidity")
  humidity.innerHTML=response.data.temperature.humidity
  celciumTemperature=Math.round(response.data.temperature.current)
  let wind=document.querySelector("#wind")
  wind.innerHTML= Math.round(response.data.wind.speed)
  let description= document.querySelector("#description")
  description.innerHTML=response.data.condition.description

  let icon=document.querySelector("#icon")
  icon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`)
  icon.setAttribute("alt", response.data.condition.description)
  
  getForecast(response.data.coordinates)

  }
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentButton = document.querySelector("#current");

currentButton.addEventListener("click", getCurrentLocation);

let celciumTemperature=null

function fTemp(event) {
  event.preventDefault();
  let currentTemp=document.querySelector('#temp')
  let fTemp=Math.round(celciumTemperature * 1.8 + 32)
  currentTemp.innerHTML=fTemp

}
let fahrenheitTemp=document.querySelector("#fahrenheit")
fahrenheitTemp.addEventListener("click", fTemp)

function cTemp(event) {
  event.preventDefault();
  let currentTemp=document.querySelector('#temp')
  currentTemp.innerHTML=Math.round(celciumTemperature)
}

let celciumTemp=document.querySelector("#celsius")
celciumTemp.addEventListener("click",cTemp)

