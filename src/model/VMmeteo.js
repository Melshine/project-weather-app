export default class VMMeteo {
  constructor(model) {
    this.model = model;
  }

  bindTodayWeather(todayWeather) {
    this.todayWeather = todayWeather;
  }

  updateTodayWeather(location) {
    this.model.getTodayWeather(location).then((data) => {
      this.todayWeather.city.textContent = snakeCase(data.city);
      this.todayWeather.description.textContent = data.description;
      this.todayWeather.temperature.textContent = data.temperature;
      import(`../assets/${data.icon}.png`).then((link) => {
        this.todayWeather.icon.src = link.default;
      });
    });
  }

  bindAirConditions(airConditions) {
    this.airConditions = airConditions;
  }

  updateAirConditions(location) {
    this.model.getAirConditions(location).then((data) => {
      this.airConditions.realFeel.textContent = data.realFeel;
      this.airConditions.wind.textContent = data.wind;
      this.airConditions.rain.textContent = data.rain;
      this.airConditions.uvIndex.textContent = data.uvIndex;
    });
  }

  bindTodayForecast(todayForecast) {
    this.todayForecast = todayForecast;
  }

  updateTodayForecast(location) {
    this.model.getTodayForecast(location).then((data) => {
      //   console.log(data);
      let template = this.todayForecast
        .querySelector(".today-forecast__day")
        .cloneNode(true);
      this.todayForecast.innerHTML = "";

      for (const hour of data) {
        template.querySelector("[data-bind=time]").textContent =
          hour.datetime.slice(0, 5);
        template.querySelector("[data-bind=temp]").textContent = hour.temp;
        import(`../assets/${hour.icon}.png`).then((link) => {
          template.querySelector("[data-bind=icon]").src = link.default;
        });

        this.todayForecast.appendChild(template);
        template = this.todayForecast
          .querySelector(".today-forecast__day")
          .cloneNode(true);
      }
    });
  }
}

function snakeCase(s) {
  return s
    .split(" ")
    .map((s) => {
      const rest = s.slice(1);
      return s[0].toUpperCase() + rest;
    })
    .join(" ");
}
