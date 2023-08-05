

function getApi() {
let requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=1ced4366f307f4ccdd38e8cd9911844f'

fetch (requestUrl)
    .then(function (response) {
        return response.json();
    })

    .then (function (data) {
        console.log(data)
    });

}