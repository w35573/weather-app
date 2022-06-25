const cityName = document.querySelector('.city');
const temperature = document.querySelector('.temp');
const iconElement = document.querySelector('.icon');
const descriptionElement = document.querySelector('.description');
const humidityElement = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('.search-btn');
const loader = document.querySelector('.weather');

let weather = {
    "apiKey": "90ccad22b37128f8a8f3f3500c19d3cf",
    fetchWeather: async function (city) {
        try {
            const res = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey);
            this.displayWeather(res.data);
        } catch (error) {
            console.log(error);
            alert("City not found");
        }
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        cityName.textContent = `Weather in ${name}`;
        iconElement.src = `https://openweathermap.org/img/wn/${icon}.png`;
        temperature.textContent = `${temp}°C`;
        descriptionElement.textContent = description;
        humidityElement.textContent = `Humidity: ${humidity}%`;
        wind.textContent = `Wind Speed: ${speed} km/h`;
        loader.classList.remove('loading');
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
    }
}


// let geocode = {
//     reverseGeocode: function (latitude, longitude) {
//         let api_key = '4db2525097c645f8be5db0388d6f3d5f';

//         let api_url = 'https://api.opencagedata.com/geocode/v1/json'

//         let request_url = api_url
//             + '?'
//             + 'key=' + api_key
//             + '&q=' + encodeURIComponent(latitude + ',' + longitude)
//             + '&pretty=1'
//             + '&no_annotations=1';

//         // see full list of required and optional parameters:
//         // https://opencagedata.com/api#forward

//         let request = new XMLHttpRequest();
//         request.open('GET', request_url, true);

//         request.onload = function () {
//             // see full list of possible response codes:
//             // https://opencagedata.com/api#codes

//             if (request.status === 200) {
//                 // Success!
//                 let data = JSON.parse(request.responseText);
//                 weather.fetchWeather(data.results[0].components.city);
//                 console.log(data.results[0].components.city)

//             } else if (request.status <= 500) {
//                 // We reached our target server, but it returned an error

//                 console.log("unable to geocode! Response code: " + request.status);
//                 let data = JSON.parse(request.responseText);
//                 console.log('error msg: ' + data.status.message);
//             } else {
//                 console.log("server error");
//             }
//         };

//         request.onerror = function () {
//             // There was a connection error of some sort
//             console.log("unable to connect to server");
//         };

//         request.send();  // make the request
//     },

//     getLocation: function () {
//         function success(data) {
//             geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
//         }

//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(success, console.error);
//         }
//         else {
//             weather.fetchWeather('Mumbai');
//         }
//     }
// };


searchBtn.addEventListener('click', () => {
    if (searchBar.value) {
        weather.fetchWeather(searchBar.value);
    }
    else
        alert('Please enter a city name');
});


searchBar.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        if (searchBar.value) {
            weather.fetchWeather(searchBar.value);
        }
        else
            alert('Please enter a city name');
    }
});

function success(pos) {
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
    console.log(latitude, longitude);
    getCurrentCity(latitude, longitude);
}

async function getCurrentCity(latitude, longitude) {
    try {
        // let api_key = '4db2525097c645f8be5db0388d6f3d5f';
        // let api_url = 'https://api.opencagedata.com/geocode/v1/json'
        // let request_url = api_url
        //     + '?'
        //     + 'key=' + api_key
        //     + '&q=' + encodeURIComponent(latitude + ',' + longitude)
        //     + '&pretty=1'
        //     + '&no_annotations=1';

        // const res = await axios.get(request_url);
        // console.log(res.data.results[0].components.town);
        // weather.fetchWeather(res.data.results[0].components.town);

        const res = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${weather.apiKey}`);
        console.log(res.data[0].name);
        weather.fetchWeather(res.data[0].name);

    } catch (error) {
        console.log(error);
    }
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, console.error);
    }
    else {
        weather.fetchWeather('Mumbai');
    }
}

getCurrentLocation();



