const apiKey = "a423f42ae1579453ad7e88bf0c48cf6f"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();

        console.log(data); // Debugging

        document.getElementById("cityName").innerHTML = data.name;
        document.getElementById("temperature").innerHTML = Math.round(data.main.temp) + "°C";
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("wind").innerHTML = data.wind.speed + " km/h";

        document.getElementById("weatherIcon").src = "images/" + getWeatherIcon(data.weather[0].main);
    } catch (error) {
        alert(error.message);
    }
}

function getWeatherIcon(weather) {
    switch (weather.toLowerCase()) {
        case "clouds": return "clouds.png";
        case "clear": return "clear.png";
        case "rain": return "rain.png";
        case "drizzle": return "drizzle.png";
        case "mist": return "mist.png";
        case "snow": return "snow.png";
        default: return "clear.png";
    }
}

// Search button click
searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

// Press Enter key
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

