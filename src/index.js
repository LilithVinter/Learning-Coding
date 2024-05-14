//🕵️‍♀️Feature #2
//Add a search engine: a search bar with a button. When searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

function searchBar(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let cityInput = document.querySelector("#city");

  cityInput.innerHTML = searchInputElement.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchBar);

//⏰Feature #1
//In your project, display the current date and time using JavaScript: Tuesday 16:00

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

let currentDate = new Date();
let currentDateElement = document.querySelector("#current-date");

currentDateElement.innerHTML = formatDate(currentDate);
