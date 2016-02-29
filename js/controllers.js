// Controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
	$scope.city = cityService.city;
	$scope.$watch('city', function () {
		cityService.city = $scope.city;
	});
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService) {
	$scope.city = cityService.city;
	$scope.days = $routeParams.days || '1';
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=c1e88be5a69a53f95dda4db23e2b1591", {
		callback: "JSON_CALLBACK"
	}, {
		get: {
			method: "JSONP"
		}
	});
	$scope.weatherResult = $scope.weatherAPI.get({
		q: $scope.city
		, cnt: $scope.days
	});
	$scope.convertToCelsius = function (degK) {
		return Math.round(degK - 273.15);
	}
	$scope.convertToDate = function (dt) {
		return new Date(dt * 1000);
	}
}]);