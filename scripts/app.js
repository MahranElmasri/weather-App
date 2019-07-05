const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const updateUI = data => {
  const { weather, cityInfo } = data;
  //update details temp
  details.innerHTML = `
    <h5 class="my-3">${cityInfo.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span
        </div>
  `;

  //update the night/day
  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  time.setAttribute("src", timeSrc);

  //update icon
  let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  //remove hiden class
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};
const updateCity = async city => {
  const cityInfo = await getCity(city);
  const weather = await getWeather(cityInfo.Key);
  //   console.log(weather);
  return { cityInfo, weather };
};
cityForm.addEventListener("submit", e => {
  e.preventDefault();
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the UI with new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
  //set local storage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
