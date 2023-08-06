let city = document.getElementById('city')
let temp = document.getElementById('temp')
let wind = document.getElementById('wind')
let humid = document.getElementById('humidity')
let submitBtn = document.getElementById('submit')
let cityName = document.getElementById('cityName')
let ListEl = document.getElementById('stored-list')
let fiveDay = document.getElementById('forecastBox')
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
                city.innerHTML = data.city.name + `<img src="https://openweathermap.org/img/wn/${icon}.png">` + dayjs().format('(MM/DD/YYYY)')
                temp.textContent = "Temperature: " + data.list[0].main.temp + "°F";
                wind.textContent = "Wind: " + data.list[0].wind.speed + " mph";
                humid.textContent = "Humidity: " + data.list[0].main.humidity +"%";



            for (let i = 0; i < 5; i++) {
            
            icon = data.list[i].weather[0].icon
            let forecastCard = document.createElement('div')
            forecastCard.classList = "card bg-dark text-light"
            forecastCard.style = "width: 14rem;"
            fiveDay.append(forecastCard) 

            let forecastCardHeader = document.createElement('div')
            forecastCardHeader.classList = "card-title text-light"
            forecastCardHeader.innerHTML = data.city.name + `<img src="https://openweathermap.org/img/wn/${icon}.png">` + `<p>${dayjs(data.list[i].dt_txt).format('MM/DD/YYYY')}</p>` + `<p>Temp: ${data.list[i].main.temp} °F</p>` + `<p>Wind: ${data.list[i].wind.speed} mph</p>` + `<p>Humidity: ${data.list[i].main.humidity}%`
            forecastCard.append(forecastCardHeader)
        }
    })

    cityName.value = ''
    
    if (storedArray.includes(enteredText)) {
        return null
    }

    storedArray.push(enteredText)
    localStorage.setItem("savedCity", JSON.stringify(storedArray))
    

    let listItemEl = document.createElement("button")
    listItemEl.classList = "list-group-item list-group-item-action list-group-item-secondary"
    listItemEl.id = enteredText
    listItemEl.innerHTML = enteredText
    ListEl.append(listItemEl)

    

    


    
    });
   
ListEl.addEventListener("click", function (event) {
    let buttonText = event.target.id
    
    fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${buttonText}&limit=5&appid=1ced4366f307f4ccdd38e8cd9911844f`)

    .then(response => response.json())
    .then(citiesFound => {
        let firstCity = citiesFound[0]
    
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=1ced4366f307f4ccdd38e8cd9911844f&units=imperial`)
    })
    .then(response => response.json())
    .then(data => {
                let icon = data.list[0].weather[0].icon
                city.innerHTML = data.city.name + `<img src="https://openweathermap.org/img/wn/${icon}.png">` + dayjs().format('(MM/DD/YYYY)')
                wind.textContent = "Wind: " + data.list[0].wind.speed + " mph";
                humid.textContent = "Humidity: " + data.list[0].main.humidity +"%"; 
                
                for (let i = 0; i < 5; i++) {
            
                    icon = data.list[i].weather[0].icon
                    let forecastCard = document.createElement('div')
                    forecastCard.classList = "card bg-dark text-light"
                    forecastCard.style = "width: 14rem;"
                    fiveDay.append(forecastCard) 
        
                    let forecastCardHeader = document.createElement('div')
                    forecastCardHeader.classList = "card-title text-light"
                    forecastCardHeader.innerHTML = data.city.name + `<img src="https://openweathermap.org/img/wn/${icon}.png">` + `<p>${dayjs(data.list[i].dt_txt).format('MM/DD/YYYY')}</p>` + `<p>Temp: ${data.list[i].main.temp} °F</p>` + `<p>Wind: ${data.list[i].wind.speed} mph</p>` + `<p>Humidity: ${data.list[i].main.humidity}%`
                    forecastCard.append(forecastCardHeader)


                }
    }
)})


function populateCities() {
    storedArray = (JSON.parse(localStorage.getItem("savedCity"))) || []
    
    if (storedArray.length === 0) {
        return null
    } 
    
    else {
        for (let i = 0; i < storedArray.length; i++) {
    
        let listItemEl = document.createElement("button", id = "stored-city")
        listItemEl.classList = "list-group-item list-group-item-action list-group-item-secondary"
        listItemEl.id = storedArray[i]
        listItemEl.innerHTML = storedArray[i]
        ListEl.append(listItemEl)
}
}
}

populateCities()