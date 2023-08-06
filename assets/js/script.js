let city = document.getElementById('city')
let temp = document.getElementById('temp')
let wind = document.getElementById('wind')
let humid = document.getElementById('humidity')
let submitBtn = document.getElementById('submit')
let cityName = document.getElementById('cityName')
let ListEl = document.getElementById('stored-list')
let fiveDay = document.getElementById('forecastBox')
let storedArray = []


// submit button on aside
submitBtn.addEventListener('click', function(event) {
    event.preventDefault()
    let enteredText = cityName.value
  
    //geolocator api to get coordinates for an entered city
    fetch (`https://api.openweathermap.org/geo/1.0/direct?q=${enteredText}&limit=5&appid=1ced4366f307f4ccdd38e8cd9911844f`)
    .then(response => response.json())
    .then(citiesFound => {
        let firstCity = citiesFound[0]
   
    //plugs in returned coordinates from geolocator and gets weather data for those coordinates
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=1ced4366f307f4ccdd38e8cd9911844f&units=imperial`)
    })
    .then(response => response.json())
    .then(data => {
            let icon = data.list[0].weather[0].icon
            //sets text in top box    
            city.innerHTML = data.city.name + `<img src="https://openweathermap.org/img/wn/${icon}.png">` + dayjs().format('(MM/DD/YYYY)')
                temp.textContent = "Temperature: " + data.list[0].main.temp + "°F";
                wind.textContent = "Wind: " + data.list[0].wind.speed + " mph";
                humid.textContent = "Humidity: " + data.list[0].main.humidity +"%";

            // clears fiveday area of previous cards
                fiveDay.innerHTML = ''

            // loop to create 5 forecast cards in 5 day forecast
            for (let i = 0; i < data.list.length; i++) {
            let itemsToSkip = [1,2,3,4,5,6,7,9,10,11,12,13,14,15,17,18,19,20,21,22,23,25,26,27,28,29,30,31,33,34,35,36,37,38,39,40]
            if (itemsToSkip.includes(i)) {
                    continue;
                }

            icon = data.list[i].weather[0].icon
            //create elements for bootstrap card. Needs second div for formatting
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
    //clear input box text after submit
    cityName.value = ''
    //check if an item is in array before adding to aside list
    if (storedArray.includes(enteredText)) {
        return null
    }
    // push to array
    storedArray.push(enteredText)
    localStorage.setItem("savedCity", JSON.stringify(storedArray))
    
    //add item to aside list as a button
    let listItemEl = document.createElement("button")
    listItemEl.classList = "list-group-item list-group-item-action list-group-item-secondary"
    listItemEl.id = enteredText
    listItemEl.innerHTML = enteredText
    ListEl.append(listItemEl)

    

    


    
    });
   
 // event listener of list items on aside   
ListEl.addEventListener("click", function (event) {
    let buttonText = event.target.id
    //geolocator api to get coordinates for an entered city
    fetch (`https://api.openweathermap.org/geo/1.0/direct?q=${buttonText}&limit=5&appid=1ced4366f307f4ccdd38e8cd9911844f`)

    .then(response => response.json())
    .then(citiesFound => {
        let firstCity = citiesFound[0]
     
    //plugs in returned coordinates from geolocator and gets weather data for those coordinates
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=1ced4366f307f4ccdd38e8cd9911844f&units=imperial`)
    })
    .then(response => response.json())
    .then(data => {
                let icon = data.list[0].weather[0].icon
                 //sets text in top box 
                city.innerHTML = data.city.name + `<img src="https://openweathermap.org/img/wn/${icon}.png">` + dayjs().format('(MM/DD/YYYY)')
                temp.textContent = "Temperature: " + data.list[0].main.temp + "°F";
                wind.textContent = "Wind: " + data.list[0].wind.speed + " mph";
                humid.textContent = "Humidity: " + data.list[0].main.humidity +"%"; 
                
                // clear forecast area of previous cards
                fiveDay.innerHTML = ''
                
                // loop to create 5 cards for 5 day forecast
                for (let i = 0; i < data.list.length; i++) {
                    let itemsToSkip = [1,2,3,4,5,6,7,9,10,11,12,13,14,15,18,17,19,20,21,22,23,25,26,27,28,29,30,31,33,34,35,36,37,38,39,40]
                    if (itemsToSkip.includes(i)) {
                        continue;
                    }

                    //icon for weather picture
                    icon = data.list[i].weather[0].icon
                   
                    //create elements for bootstrap card. Needs second div for formatting
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
)}
                
 
)

// load localstorage items into aside list
function populateCities() {
    storedArray = (JSON.parse(localStorage.getItem("savedCity"))) || []
    
    if (storedArray.length === 0) {
        return null
    } 
    
    else {
        
        //loop through localstorage and make a list item for each
        for (let i = 0; i < storedArray.length; i++) {
    
        let listItemEl = document.createElement("button", id = "stored-city")
        listItemEl.classList = "list-group-item list-group-item-action list-group-item-secondary"
        listItemEl.id = storedArray[i]
        listItemEl.innerHTML = storedArray[i]
        ListEl.append(listItemEl)
}
}
}

populateCities();