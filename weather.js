const button = document.querySelector("#searchBtn");
const resultBox = document.querySelector("#weather");

button.addEventListener("click", fetchWeather);

async function fetchWeather() {

    const cityInput = document.querySelector("#city");
    const cityName = cityInput.value.trim();

    if (cityName === "") {
        resultBox.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const API_KEY = "YOUR_WEATHERAPI_KEY";

    const endpoint =
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`;

    try {

        const res = await fetch(endpoint);
        const weatherData = await res.json();

        console.log(weatherData);

        if (weatherData.error) {
            resultBox.innerHTML = "<p>City not found.</p>";
            return;
        }

        resultBox.innerHTML = `
            <h2>${weatherData.location.name}</h2>
            <p>🌡 Temperature: ${weatherData.current.temp_c} °C</p>
            <p>☁ Weather: ${weatherData.current.condition.text}</p>
            <p>💧 Humidity: ${weatherData.current.humidity}%</p>
            <p>🌬 Wind Speed: ${weatherData.current.wind_kph} km/h</p>
        `;

    } catch (err) {

        console.error(err);

        resultBox.innerHTML =
            "<p>Something went wrong. Try again.</p>";
    }
}
