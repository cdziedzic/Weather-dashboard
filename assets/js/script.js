let city = document.getElementById('city')
let temp = document.getElementById('temp')
let wind = document.getElementById('wind')
let humid = document.getElementById('humidity')

function getApi() {
let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=1ced4366f307f4ccdd38e8cd9911844f'

fetch (requestUrl)
    .then(function (response) {
        return response.json();
    })

    .then (function (data) {
        console.log(data)
        console.log(data.list[0].main.temp)

        city.textContent = data.city.name + data.list[0].weather.icon
        temp.textContent = "Temperature: " + data.list[0].main.temp
        wind.textContent = "Wind: " + data.list[0].wind.speed
        humid.textContent = "Humidity: " + data.list[0].main.humidity
    });

}

function getCoords() {

fetch ('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=1ced4366f307f4ccdd38e8cd9911844f')
    .then(response => response.json())
    .then(citiesFound => {
        let firstCity = citiesFound[0]
        console.log(citiesFound[0])
        console.log(firstCity.lat);
        console.log(firstCity.lon);
    })
}