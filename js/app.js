const searchBtn = document.getElementById('search-btn');
const apiKey = '2f864c3d8eddc031c35ae81d706c67ad';

searchBtn.addEventListener('click', (e) => {
    document.getElementById('input-field').innerHTML = "";
    document.getElementById("error-message").innerHTML = "";

    const inputValue = document.getElementById('input-field').value;

    if (inputValue.length > 0) {
        document.getElementById("spinner").classList.remove("d-none");
        getValue(inputValue);
    }
    else {
        document.getElementById('error-message').innerHTML = `<p class='text-center p-3 bg-warning'><b>Please enter a city name...</b></p>`;
    }
})


const getValue = (getName) => {
    displayWeather(`https://api.openweathermap.org/data/2.5/weather?q=${getName}&units=metric&APPID=${apiKey}`);
}


const fetchget = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const displayWeather = url => {
    // window.scrollTo(0, -40);
    fetchget(url)
        .then((data) => {
            document.getElementById("spinner").classList.add("d-none");
            if (data.cod === '404') {
                document.getElementById('error-message').innerHTML = `<p class='text-center p-3 bg-danger'><b>Please enter a city name...</b></p>`;
            }
            else {
                const searchResult = document.getElementById('search-result');
                searchResult.innerHTML = `
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" />
                <h1>${data.name}, ${data.sys.country}</h1>
                <h3><span>Temperature: ${Math.round(data.main.temp)}</span>&deg;C</h3>
                <h1 class="lead fw-bold">Weather: ${data.weather[0].main}</h1>
                <h1 class="lead fw-bold">Temperature Range: ${Math.round(data.main.temp_min)}&deg; to ${Math.round(data.main.temp_max)}&deg;</h1>
                `;
            }
        })
}

// default display
const defaultDisplay = (url) => {
    fetchget(url)
        .then((data) => {
            const searchResult = document.getElementById('search-result');
            const dt = new Date()
            const time = data.dt;
            searchResult.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" />
        <h1>${data.name}, ${data.sys.country}</h1>
        <h1>${(("0" + dt.getDate()).slice(-2)) + "." + (("0" + (dt.getMonth() + 1)).slice(-2)) + "." + (dt.getFullYear()) + " " + (("0" + dt.getHours()).slice(-2)) + ":" + (("0" + dt.getMinutes()).slice(-2))}</h1>
        <h3><span>Temperature: ${Math.round(data.main.temp)}</span>&deg;C</h3>
        <h1 class="lead fw-bold">Weather: ${data.weather[0].main}</h1>
        <h1 class="lead fw-bold">Temperature Range: ${Math.round(data.main.temp_min)}&deg; to ${Math.round(data.main.temp_max)}&deg;</h1>
        `;
        })
}

// default value
defaultDisplay(`https://api.openweathermap.org/data/2.5/weather?q=dhaka&units=metric&APPID=${apiKey}`);