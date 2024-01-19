const wrapper = document.querySelector(".wrapper");
const input_search_form = document.querySelector(".input_search");
const Text_notice = document.querySelector(".text_info");
const input_search = document.querySelector("input");
const location_button = document.querySelector("button");
const img_weather = document.querySelector("img");

document.querySelector("header").addEventListener("click", () => {
    wrapper.classList.remove("active");
})

input_search.addEventListener("keyup", (event) => {
    if (event.key == "Enter" && input_search.value != "") {
        let i = 0;
        let check_is_found = false
        const check_list = ["<", ">", "'", "-", "/", "!"]

        while (i < check_list.length) {
            if (input_search.value.search(check_list[i]) !== -1) {
                check_is_found = true
                console.log("error")
                Text_notice.classList.remove("success")
                Text_notice.innerText = "Please, Try again. Enter correct city";
                Text_notice.classList.add("error");
                break
            } else {
                i++;
            }
        }

        if (!check_is_found) {
            requestAPI(input_search.value);
        }

    }
});

location_button.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, OnError);
    } else {
        alert("Your web browser is not support geolocation api");
    }
});

function onSuccess(location) {
    Text_notice.classList.remove("error");
    console.log(location)
    const {latitude, longitude} = location.coords;
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid={API_KEY}`;
    fetchData(api);
}

function OnError(error) {
    Text_notice.innerText = error.message;
    Text_notice.classList.add("error");
}

function requestAPI(city) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={API_KEY}2`
    fetchData(api)
}

function fetchData(api){
    Text_notice.innerText = "Getting weather details...";
    Text_notice.classList.add("success");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    if (info.cod === "404") {
        Text_notice.classList.replace("success", "error");
        Text_notice.innerText = `${input_search.value} is not found.`;
    } else {
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        checkweather(id)
        document.querySelector(".location span").innerText = `${city}, ${country}`;
        document.querySelector(".temp .num").innerText = Math.floor(temp);
        document.querySelector(".weather").innerText = description;
        document.querySelector(".bottom-details .num").innerText = Math.floor(feels_like);
        document.querySelector(".humidity .num").innerText = `${humidity} %`;

        Text_notice.classList.remove("success", "error");
        wrapper.classList.add("active");
        console.log(info);
    }
    
}

function checkweather(weather_id) {
    // สามารถดูได้ที่ Open weather cons
    if (weather_id >= 200 && weather_id <= 232) {
        img_weather.src = "./images/storm.png";
    } else if (weather_id >= 300 && weather_id <= 321) {
        img_weather.src = "./images/rain.png";
    } else if (weather_id >= 500 && weather_id <= 531) {
        img_weather.src = "./images/rain.png";
    } else if (weather_id >= 600 && weather_id <= 622) {
        img_weather.src = "./images/snow.png";
    } else if (weather_id >= 701 && weather_id <= 781) {
        img_weather.src = "./images/haze.png";
    } else if (weather_id === 800) {
        img_weather.src = "./images/sun.png";
    } else if (weather_id >= 801 && weather_id <= 804) {
        img_weather.src = "./images/cloudy.png";
    }
}
