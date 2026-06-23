const button = document.querySelector("#searchBtn");
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
        "YOUR_OPENWEATHER_API_KEY";

    const GNEWS_API_KEY =
        "YOUR_GNEWS_API_KEY";

    const weatherEndpoint =
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`;

    const newsEndpoint =
        `https://gnews.io/api/v4/search?q=${cityName}&lang=en&max=5&apikey=${GNEWS_API_KEY}`;

    try {

        const [weatherRes, newsRes] =
            await Promise.all([
                fetch(weatherEndpoint),
                fetch(newsEndpoint)
            ]);

        const weatherData =
            await weatherRes.json();

        const newsData =
            await newsRes.json();

        console.log(weatherData);
        console.log(newsData);

        if (weatherData.cod != 200) {

            resultBox.innerHTML =
                "<p>City not found.</p>";

            newsContainer.innerHTML = "";

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

                        <img
                            src="${article.image || ""}"
                            alt="News Image"
                            class="news-image"
                        >

                        <h3>
                            ${article.title}
                        </h3>

                        <p>
                            ${article.description || ""}
                        </p>

                        <a
                            href="${article.url}"
                            target="_blank"
                        >
                            Read More
                        </a>

                    </div>
                `)
                .join("");

    } catch (err) {

        console.error(err);

        resultBox.innerHTML =
            "<p>Something went wrong. Try again.</p>";

        newsContainer.innerHTML = "";
    }
}
