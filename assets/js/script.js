let city = document.getElementById('city')
let temp = document.getElementById('temp')
let wind = document.getElementById('wind')
let humid = document.getElementById('humidity')
let submitBtn = document.getElementById('submit')
let cityName = document.getElementById('cityName')
let ListEl = document.getElementById('stored-list')
let listItemEl = $(`<button href="#" class="list-group-item list-group-item-action list-group-item-secondary" id="stored-city"></button>
`)
let storedArray = []

submitBtn.addEventListener('click', function(event) {
    event.preventDefault()
    let enteredText = cityName.value
  

    fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${enteredText}&limit=5&appid=1ced4366f307f4ccdd38e8cd9911844f`)
    .then(response => response.json())
    .then(citiesFound => {
        let firstCity = citiesFound[0]
   

    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=1ced4366f307f4ccdd38e8cd9911844f&units=imperial`)
})
    .then(response => response.json())
    .then(data => {
                let icon = data.list[0].weather[0].icon
                city.innerHTML = data.city.name + `<img src="https://openweathermap.org/img/wn/${icon}.png">`
                temp.textContent = "Temperature: " + data.list[0].main.temp + "°F";
                wind.textContent = "Wind: " + data.list[0].wind.speed + " mph";
                humid.textContent = "Humidity: " + data.list[0].main.humidity +"%";
    })

    cityName.value = ''
    
    if (storedArray.includes(enteredText)) {
        return null
    }
    else    {
    storedArray.push(enteredText)
    localStorage.setItem("savedCity", JSON.stringify(storedArray))
    }
});
   

