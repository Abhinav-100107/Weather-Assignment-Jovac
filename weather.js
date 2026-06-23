const button = document.querySelector("#searchBtn");
const resultBox = document.querySelector("#weather");

button.addEventListener("click", fetchWeather);

async function fetchWeather() {

    const cityInput = document.querySelector("#city");
    const cityName = cityInput.value.trim();

    if (cityName === "") {
        resultBox.innerHTML =
            "<p>Please enter a city name.</p>";
        return;
    }const button = document.querySelector("#searchBtn");
const resultBox = document.querySelector("#weather");
const newsContainer = document.querySelector("#newsContainer");

button.addEventListener("click", fetchWeather);

async function fetchWeather() {

    const cityInput = document.querySelector("#city");
    const cityName = cityInput.value.trim();

    if (cityName === "") {
        resultBox.innerHTML =
            "<p>Please enter a city name.</p>";

        newsContainer.innerHTML = "";
        return;
    }

    const WEATHER_API_KEY =
        "957b488abec5f13f3409b072e2fad652";

    const GNEWS_API_KEY =
        "196840b35634afe21eecbcdcdf173ef9";

    const weatherEndpoint =
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`;

    const newsEndpoint =
        `https://gnews.io/api/v4/search?q=${cityName}&lang=en&max=5&apikey=${GNEWS_API_KEY}`;

    try {

        const weatherRes =
            await fetch(weatherEndpoint);

        const weatherData =
            await weatherRes.json();

        if (weatherData.cod != 200) {

            resultBox.innerHTML =
                "<p>City not found.</p>";

            newsContainer.innerHTML = "";
            return;
        }

        resultBox.innerHTML = `
            <h2>${weatherData.name}</h2>

            <p>🌡 Temperature:
            ${weatherData.main.temp} °C</p>

            <p>☁ Weather:
            ${weatherData.weather[0].main}</p>

            <p>💧 Humidity:
            ${weatherData.main.humidity}%</p>

            <p>🌬 Wind Speed:
            ${weatherData.wind.speed} m/s</p>
        `;

        try {

            const newsRes =
                await fetch(newsEndpoint);

            const newsData =
                await newsRes.json();

            if (
                !newsData.articles ||
                newsData.articles.length === 0
            ) {

                newsContainer.innerHTML =
                    "<p>No news found.</p>";

                return;
            }

            newsContainer.innerHTML =
                newsData.articles
                    .map(article => `
                        <div class="news-card">

                            <h3>
                                ${article.title}
                            </h3>

                            <a
                                href="${article.url}"
                                target="_blank"
                            >
                                Read More →
                            </a>

                        </div>
                    `)
                    .join("");

        } catch {

            newsContainer.innerHTML = `
                <p>
                    News could not be loaded.
                    (Possible CORS restriction)
                </p>
            `;
        }

    } catch (err) {

        console.error(err);

        resultBox.innerHTML =
            "<p>Something went wrong. Try again.</p>";

        newsContainer.innerHTML = "";
    }
}

    const API_KEY =
        "957b488abec5f13f3409b072e2fad652";

    const endpoint =
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    try {

        const res = await fetch(endpoint);
        const weatherData = await res.json();

        console.log(weatherData);

        if (weatherData.cod != 200) {

            resultBox.innerHTML =
                "<p>City not found.</p>";

            return;
        }

        resultBox.innerHTML = `
            <h2>${weatherData.name}</h2>

            <p>
                🌡 Temperature:
                ${weatherData.main.temp} °C
            </p>

            <p>
                ☁ Weather:
                ${weatherData.weather[0].main}
            </p>

            <p>
                💧 Humidity:
                ${weatherData.main.humidity}%
            </p>

            <p>
                🌬 Wind Speed:
                ${weatherData.wind.speed} m/s
            </p>
        `;

    } catch (err) {

        console.error(err);

        resultBox.innerHTML =
            "<p>Something went wrong. Try again.</p>";
    }
}
