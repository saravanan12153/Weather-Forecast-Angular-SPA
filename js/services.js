// Services
weatherApp.service('cityService', function () {
	this.city = 'Lahore'
});

weatherApp.service('weatherService', ['$resource', function ($resource) {
	this.GetWeather = function (city, days) {
		var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=c1e88be5a69a53f95dda4db23e2b1591", {
			callback: "JSON_CALLBACK"
		}, {
			get: {
				method: "JSONP"
			}
		});
		return weatherAPI.get({
			q: city
			, cnt: days
		});
	}
}]);