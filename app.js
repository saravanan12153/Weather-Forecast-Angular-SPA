// My Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// Routes
weatherApp.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'pages/home.htm',
		controller: 'homeController'
	})
	.when('/forecast', {
		templateUrl: 'pages/forecast.htm',
		controller: 'forecastController'
	})
});

// Services
weatherApp.service('cityService', function(){
	this.city = 'New York, NY'
});

// Controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
	$scope.city = cityService.city;
	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {
	$scope.city = cityService.city;
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=c1e88be5a69a53f95dda4db23e2b1591", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2 });
	$scope.convertToCelsius = function(degK) {
		return Math.round(degK - 273.15);
	}
	$scope.convertToDate = function(dt) {
		return new Date(dt * 1000);
	}
}]);
