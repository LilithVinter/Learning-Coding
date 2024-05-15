//search inputs

function displayTemperature(response) {
  console.log(response);
  let temperatureDegrees = document.querySelector("#current-temperature-value");
  let temperatureText = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  let condition = document.querySelector("#status");
  let humidityPercent = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");

  cityElement.innerHTML = response.data.city;
  temperatureDegrees.innerHTML = temperatureText;
  condition.innerHTML = response.data.condition.description;
  humidityPercent.innerHTML = `${response.data.temperature.humidity} %`;
  windSpeed.innerHTML = `${response.data.wind.speed} km/h`;

  let weatherIcon = document.querySelector("#current-temperature-icon");
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" id="current-temperature-icon"/>`;
}

function searchCity(city) {
  let apiKey = "67160eaaec4o69a29b0ff296te075931";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//dates
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
