
const key = `a6b17eeb828640a086d71334231901`
const form = document.querySelector("form")
const search = document.querySelector("#search")
const weather = document.querySelector("#weather")
const showWeatheronly = document.querySelector(".weatherDescription");
const showTimeonly = document.querySelector("#dt");
// const bgimg=document.querySelector(".bg-image")  
 


// function to get weather details
let getWeather = async (city) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}`
    const response = await fetch(url);
    const data = await response.json()
    return showWeather(data);
}
// function to show weather details
let showWeather = (data) => {
    if (data.error) {
        weather.innerHTML = `<h2> City not Found <h2>`
    }
    else {
        // bgimg.src=`https://source.unsplash.com/random/30*20/?${data.current.condition.text}`
        weather.innerHTML = `
    <div>
    <h3>Location: ${data.location.name}, ${data.location.country}</h3>
    <h3>Sunrise: ${data.forecast.forecastday[0].astro.sunrise} </h3>
    <h3> Sunset: ${data.forecast.forecastday[0].astro.sunset}  </h3>
    <h3>Temperature: ${data.current.temp_c}&#8451;  </h3>
    <h3>Weather: ${data.current.condition.text} 
    <img src="${data.current.condition.icon}"</img>
    </h3>
<h3>Forecast:${data.forecast.forecastday[0].day.condition.text} </h3>

    </div>`}
}
// on click fetch weather
showWeatheronly.addEventListener(
    "click",
    function (event) {
        getWeather(search.value)
        event.preventDefault();
    }

)
// function to get date and time 
let getTime = async (city) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}`
    const response = await fetch(url);
    const data = await response.json()
    return showTime(data);
}
// function to show date and time
let showTime = (data) => {
    if (data.error) {
        weather.innerHTML = `<h2> City not Found <h2>`
    }
    else {
        // bgimg.src=`https://source.unsplash.com/random/30*20/?${data.current.condition.text}`
        weather.innerHTML = ` 
<h2>Location :${data.location.name}  ${data.location.country}</h2>
<h2>D&T : ${data.location.localtime} </h2>`
    }
}
// on click fetch date and time
showTimeonly.addEventListener(
    "click",
    function (event) {
        getTime(search.value)
        event.preventDefault();
    }

)
// fetch the user location and show the weather
const findLocation = () => {
    // const status=document.querySelector('.status');
    const success = (position) => {
        console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                weather.innerHTML = `
    <div>
    <h3>Location: ${data.location.name}, ${data.location.country}</h3>
    <h3>Latitude: ${data.location.lat}, Longitude:${data.location.lon}</h3>

    <h3>Temperature: ${data.current.temp_c}&#8451;  </h3>
   
    <h3>Weather: ${data.current.condition.text} 
    <img src="${data.current.condition.icon}"</img>
    </h3>
<h3>Forecast: ${data.forecast.forecastday[0].day.condition.text} </h3>
</div>`

                console.log(data)
            })
    }
    const error = () => {
        weather.textContent = "unable to load your lcation";
    }
    navigator.geolocation.getCurrentPosition(success, error);
}
document.querySelector('.find-loc').addEventListener("click", findLocation);

