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
  condition.innerHTML = `${response.data.condition.description}`;
  humidityPercent.innerHTML = `Humidity: ${response.data.temperature.humidity},`;
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed}`;

  let weatherIcon = document.querySelector("#current-temperature-icon");
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" id="current-temperature-icon"/>`;
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

//toggle unit switch + getting API
function searchCity(city) {
  let apiKey = "67160eaaec4o69a29b0ff296te075931";
  let units = "metric";

  var isChecked = document.querySelector("#unitToggle").checked;

  function unitSwitch(event) {
    if (toggle.checked) {
      let apiUrlCurrent = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
      axios.get(apiUrlCurrent).then(displayTemperature);
      let unitText = document.querySelector("#current-temperature-unit");
      unitText.innerHTML = `°F`;
      let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
      axios(apiUrlForecast).then(displayForecast);
    } else {
      let apiUrlCurrent = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
      axios.get(apiUrlCurrent).then(displayTemperature);
      let unitText = document.querySelector("#current-temperature-unit");
      unitText.innerHTML = `°C`;
      let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
      axios(apiUrlForecast).then(displayForecast);
    }
  }

  let toggle = document.querySelector("#unitToggle");
  toggle.addEventListener("change", unitSwitch);

  let apiUrlCurrent = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrlCurrent).then(displayTemperature);

  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  axios(apiUrlForecast).then(displayForecast);
}

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

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let formattedDay = days[day];
  return `Your current time is <strong> ${formattedDay},${hours}:${minutes} </strong>`;
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

//clock app
function timeFormat(event) {
  setInterval(function () {
    if (document.querySelector('input[id="12hr"][value="12"]').checked) {
      londonTime.innerHTML = moment()
        .tz("Europe/London")
        .format("hh:mm:ss [<small>]A[</small>]");
    }

    if (document.querySelector('input[id="24hr"][value="24"]').checked) {
      londonTime.innerHTML = moment().tz("Europe/London").format("HH:mm:ss");
    }
  }, 1000);
}

let londonElement = document.querySelector("#london");
let londonDate = londonElement.querySelector(".timezoneInfo .date");
let londonTime = londonElement.querySelector(".timezoneInfo .time");
let timeDisplay = document.querySelector("#displayTime");
timeDisplay.addEventListener("change", timeFormat);

londonDate.innerHTML = moment().tz("Europe/London").format("ddd, DD MMMM YYYY");

timeFormat();

// weather forecast

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day) {
    forecastHtml += `
      <div class="weather-forecast-days">
       <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <img
              src="${day.condition.icon_url}"
              id="weather-forecast-icon"
        />
        <div class="weather-forecast-temp">
          <span id="max-temp">${Math.round(day.temperature.maximum)}°</span>
          <span id="min-temp">${Math.round(day.temperature.minimum)}°</span>
      </div>
    </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
