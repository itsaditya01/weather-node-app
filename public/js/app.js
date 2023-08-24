console.log("Client side javascript file is loaded!");

const inputForm = document.querySelector("form");
const input = document.querySelector("input");
const result = document.querySelector("#result");

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("/weather?address=" + input.value)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        result.innerHTML = `<p style="color: red">${data.error}</p>`;
      } else {
        result.innerHTML = `<h2>${data.forecast.temparature} degree C</h2>
                  <p>${data.location}</p>
                  <p>Feels like ${data.forecast.feelslike} degree C with humidity of ${data.forecast.humidity} and wind speed of ${data.forecast.wind_kph} kmph
              `;
      }
    });
});
