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

    const API_KEY = "86ef6e5b0d22b148a9b5d40176b455bc";

    const endpoint =
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    try {

        const res = await fetch(endpoint);
        const weatherData = await res.json();

        console.log(weatherData);

        if (weatherData.cod != 200) {
            resultBox.innerHTML = "<p>City not found.</p>";
            return;
        }

        resultBox.innerHTML = `
            <h2>${weatherData.name}</h2>
            <p>🌡 Temperature: ${weatherData.main.temp} °C</p>
            <p>☁ Weather: ${weatherData.weather[0].main}</p>
            <p>💧 Humidity: ${weatherData.main.humidity}%</p>
            <p>🌬 Wind Speed: ${weatherData.wind.speed} m/s</p>
        `;

    } catch (err) {

        console.error(err);

        resultBox.innerHTML =
            "<p>Something went wrong. Try again.</p>";
    }
}
