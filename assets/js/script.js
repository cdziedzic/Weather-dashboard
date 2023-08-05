let city = document.getElementById('city')
let temp = document.getElementById('temp')
let wind = document.getElementById('wind')
let humid = document.getElementById('humidity')
let submitBtn = document.getElementById('submit')
let cityName = document.getElementById('cityName')

submitBtn.addEventListener('click', function(event) {
    event.preventDefault()
    let enteredText = cityName.value

    fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${enteredText}&limit=5&units=imperial&appid=1ced4366f307f4ccdd38e8cd9911844f`)
    .then(response => response.json())
    .then(citiesFound => {
        let firstCity = citiesFound[0]
   

    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=1ced4366f307f4ccdd38e8cd9911844f`)
})
    .then(response => response.json())
    .then(data => {
        console.log(data.list[0].main.humidity)
                city.textContent = data.city.name + data.list[0].weather.icon;
                temp.textContent = "Temperature: " + data.list[0].main.temp;
                wind.textContent = "Wind: " + data.list[0].wind.speed;
                humid.textContent = "Humidity: " + data.list[0].main.humidity +"%";
    })
});
   

