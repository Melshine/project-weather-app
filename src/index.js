import "./styles/index.css";
import Meteo from "./model/meteo.js";
import VMMeteo from "./model/VMmeteo.js";

const meteo = new Meteo();
const vmmeteo = new VMMeteo(meteo);

// bindings
vmmeteo.bindTodayWeather({
  city: document.querySelector(".today-weather__location"),
  description: document.querySelector(".today-weather__desc"),
  temperature: document.querySelector(".today-weather__temp span"),
  icon: document.querySelector(".today-weather__icon img"),
});

vmmeteo.bindAirConditions({
  realFeel: document.querySelector("[data-bind=realFeel]"),
  wind: document.querySelector("[data-bind=wind]"),
  rain: document.querySelector("[data-bind=rain]"),
  uvIndex: document.querySelector("[data-bind=uvIndex]"),
});

vmmeteo.bindTodayForecast(document.querySelector(".today-forecast__info"));

// listeners
const button = document.querySelector(".search__button");
const input = document.querySelector(".search__input");

function update() {
  const location = input.value || "paris";
  vmmeteo.updateTodayWeather(location);
  vmmeteo.updateAirConditions(location);
  vmmeteo.updateTodayForecast(location);
  meteo.isNight(location).then((is_night) => {
    if (is_night) document.body.classList.remove("light-theme");
    else document.body.classList.add("light-theme");
  });
}

button.addEventListener("click", () => update());
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") update();
});

// first load
update();
