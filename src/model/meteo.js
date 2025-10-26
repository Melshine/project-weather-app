import data from "../meteo-paris.json";

const KEY = "G68GFGKVW4WNQHG4WESJWAUKV";

export default class Meteo {
  constructor() {
    this.listeners = [];
    this.data = {};
  }

  fetch(location) {
    if (location) {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today/next7days?unitGroup=metric&key=${KEY}`;

      return fetch(url)
        .then((data) => data.json())
        .then((data) => {
          this.data = data;
          //   console.log(data);
          return data;
        });
    } else {
      this.data = data;
      //   console.log(data);
      return Promise.resolve(this.data);
    }
  }

  getTodayWeather(location) {
    return this.fetch(location).then(() => {
      return {
        city: this.data.resolvedAddress,
        description: this.data.description,
        temperature: this.data.currentConditions.temp,
        icon: this.data.currentConditions.icon,
      };
    });
  }

  getTodayForecast(location, delta = 3, size = 6) {
    return this.fetch(location).then(() => {
      const currentHour = +this.data.currentConditions.datetime.split(":")[0];
      const hoursData = this.data.days[0].hours.concat(this.data.days[1].hours);
      return hoursData
        .filter((_, i) => {
          if (i <= currentHour) return false;
          if ((currentHour - i) % delta === 0) return true;
        })
        .map((hourData) => ({
          datetime: hourData.datetime,
          temp: hourData.temp,
          icon: hourData.icon,
        }))
        .slice(0, size);
    });
  }

  getAirConditions(location) {
    return this.fetch(location).then(() => {
      return {
        realFeel: this.data.currentConditions.feelslike,
        wind: this.data.currentConditions.windspeed,
        rain: this.data.currentConditions.precipprob,
        uvIndex: this.data.currentConditions.uvindex,
      };
    });
  }

  isNight(location) {
    return this.fetch(location).then(() => {
      const now = this.data.currentConditions.datetime;
      if (now < this.data.currentConditions.sunrise) return true;
      return now >= this.data.currentConditions.sunset;
    });
  }
}
