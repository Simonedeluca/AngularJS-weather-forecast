(function(){
	var weatherApp = angular.module('weatherApp', []);

	weatherApp.service('Weather', function($http) {
		this.requestWeather = function(city){
			return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric');
		};
	});

	weatherApp.controller('weatherController', function($scope, $http, Weather) {
		$scope.weatherForecast = {};
		$scope.requestError = false;
		$scope.cityNotFound = false;

		$scope.getWeather = function() {
			if($scope.city) {
				Weather.requestWeather($scope.city)
				.then(function(result) {
					if($scope.city == result.data.name) {
						$scope.weatherForecast = result.data;
						$scope.requestError = false;
						$scope.cityNotFound = false;
						console.log($scope.weatherForecast);
					} else {
						$scope.cityNotFound = true;
					}
				}, function() {
					$scope.requestError = true;
				});
			}
		};
	});	
})();