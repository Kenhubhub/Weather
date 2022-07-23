const cityForm = document.querySelector("form");
const citynameui = document.querySelector("#city-name");
const weatherui = document.querySelector("#weather-condition");
const temperatureui = document.querySelector("#temperature");
const card = document.querySelector("#card");
const iconContainer = document.querySelector("#icon");
const image_holder = document.querySelector("#image-holder");
card.style.display = "none";

const updateUI = (data) => {
    // let cityDets = data.cityDets;
    // let weather = data.weather;
    const {cityDets,weather} = data;
    
    citynameui.textContent = cityDets.LocalizedName;
    weatherui.textContent = weather.WeatherText;
    temperatureui.textContent = weather.Temperature.Metric.Value;
    let icon_number = weather.WeatherIcon;
    iconContainer.innerHTML = `<img src="icons/${icon_number}.svg">`
    if(weather.IsDayTime){
        image_holder.setAttribute("src","icons/day.svg");
    }else{
        image_holder.setAttribute("src","icons/night.svg");    
    }
    card.style.display = "";
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
    const city = cityForm.city.value;
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
    .then(data => {console.log(data); updateUI(data); })
    .catch(err => console.log(err));

    localStorage.setItem("city",city)
})


if(localStorage.getItem("city")){
    updateCity(localStorage.getItem("city"))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}