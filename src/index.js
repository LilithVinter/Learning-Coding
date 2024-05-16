//search inputs

function displayTemperature(response) {
  let temperatureDegrees = document.querySelector("#current-temperature-value");
  let temperatureText = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  let condition = document.querySelector("#status");
  let humidityPercent = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");

  cityElement.innerHTML = response.data.city;
  temperatureDegrees.innerHTML = temperatureText;
  condition.innerHTML = `, ${response.data.condition.description}`;
  humidityPercent.innerHTML = `Humidity: ${response.data.temperature.humidity},`;
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed}`;

  let weatherIcon = document.querySelector("#current-temperature-icon");
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" id="current-temperature-icon"/>`;
}

//toggle unit switch + getting API
function searchCity(city) {
  let apiKey = "67160eaaec4o69a29b0ff296te075931";
  let units = "metric";

  var isChecked = document.querySelector("#unitToggle").checked;

  function unitSwitch(event) {
    if (toggle.checked) {
      let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
      axios.get(apiUrl).then(displayTemperature);
      let unitText = document.querySelector("#current-temperature-unit");
      unitText.innerHTML = `°F`;
    } else {
      let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
      axios.get(apiUrl).then(displayTemperature);
      let unitText = document.querySelector("#current-temperature-unit");
      unitText.innerHTML = `°C`;
    }
  }

  let toggle = document.querySelector("#unitToggle");
  toggle.addEventListener("change", unitSwitch);

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
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

// weather forecast

function displayForecast() {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml += `
      <div class="weather-forecast-days">
       <div class="weather-forecast-date">${day}</div>
        <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
              alt="weather forecast icon" id="weather-forecast-icon"
        />
        <div class="weather-forecast-temp">
          <span id="max-temp">18°</span>
          <span id="min-temp"> 12°</span>
      </div>
    </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
