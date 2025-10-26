import "./test.js";

console.log("Weather app");

const KEY = "G68GFGKVW4WNQHG4WESJWAUKV";

const url = "https://weather.visualcrossing.com/VisualCrossingWebServices";

const location = "paris";
const date1 = "2025-10-23";
const date2 = "2025-10-30";

const tryUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}/${date2}?key=${KEY}`;

// `/rest/services/timeline/${encodeURIComponent(e)}?unitGroup=${t}&key=${this.#x}`

function download(text, name, type) {
  var a = document.createElement("a");
  var file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
  a.remove();
}

// fetch(tryUrl)
//   .then((data) => data.json())
//   .then((data) => {
//     const content = JSON.stringify(data);
//     download(content, 'meteo.json', 'application/json');
//   });
