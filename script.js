const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const cityNameElement = document.querySelector('.city-name'); 

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

const API_KEY = "b629686fabab4980827190210253011"; 

async function checkWeather(city){
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=en`;
    const response = await fetch(url);
    const weather_data = await response.json();

    if(weather_data.error){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        cityNameElement.innerHTML = '';
        console.error("API Error:", weather_data.error.message);
        
        inputBox.value = ''; 
        return;
    }

    console.log("WeatherAPI data received:", weather_data);
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    cityNameElement.innerHTML = `${weather_data.location.name}`;

    temperature.innerHTML = `${Math.round(weather_data.current.temp_c)} <sup>°C</sup>`;
    description.innerHTML = `${weather_data.current.condition.text}`;
    humidity.innerHTML = `${weather_data.current.humidity}%`;
    wind_speed.innerHTML = `${weather_data.current.wind_kph}Km/H`; 

    const conditionText = weather_data.current.condition.text.toLowerCase();
    if (conditionText.includes('sun') || conditionText.includes('clear')) {
        weather_img.src = "clear.png";
    } else if (conditionText.includes('cloudy') || conditionText.includes('overcast') || conditionText.includes('partly cloudy')) {
        weather_img.src = "cloud.png";
    } else if (conditionText.includes('rain') || conditionText.includes('drizzle') || conditionText.includes('shower')) {
        weather_img.src = "rain.png";
    } else if (conditionText.includes('mist') || conditionText.includes('fog') || conditionText.includes('haze')) {
        weather_img.src = "mist.png";
    } else if (conditionText.includes('snow') || conditionText.includes('sleet') || conditionText.includes('ice')) {
        weather_img.src = "snow.png";
    } else {
        weather_img.src = "cloud.png"; 
    }
    inputBox.value = '';
}
searchBtn.addEventListener('click', ()=>{
    if (inputBox.value.trim() !== '') {
        checkWeather(inputBox.value.trim());
    }
});