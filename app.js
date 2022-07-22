const cityForm = document.querySelector("form");
const citynameui = document.querySelector("#city-name");
const weatherui = document.querySelector("#weather-condition");
const temperatureui = document.querySelector("#temperature");

const updateUI = (data) => {
    let cityDets = data.cityDets;
    let weather = data.weather;
    console.log(cityDets.AdministrativeArea.EnglishName)
    citynameui.textContent = cityDets.AdministrativeArea.EnglishName;
    weatherui.textContent = weather.WeatherText;
    console.log(weather.Temperature.Metric.value);
    temperatureui.textContent = weather.Temperature.Metric.Value;
}
const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets,
        weather: weather
    };
}
cityForm.addEventListener("submit",e => {
    e.preventDefault();
    //get city value
    const city = cityForm.city.value;;
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
    .then(data => {console.log(data); updateUI(data); })
    .catch(err => console.log(err));
})


