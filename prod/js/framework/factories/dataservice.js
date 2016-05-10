(function() {

	'use strict';

	function DataFactory($http) {

		/*var urlBase = 'http://www.json-generator.com/api/json/get/bQkWdPSKMi?indent=2';*/
		var urlBase = 'HTMLResources/json/quiz-data.json?callback=JSON_CALLBACK';

		var JSONQuizData = [];
		var JSONCorrectAnswers = [];
		var JSONScoreDescription = [];

		var dataObj = {
			JSONQuizData: JSONQuizData,
			JSONCorrectAnswers: JSONCorrectAnswers,
			JSONScoreDescription: JSONScoreDescription
		};

    $http.get(urlBase).success(function(data) {
        dataObj.JSONQuizData = data.JSONQuizData,
        dataObj.JSONCorrectAnswers = data.JSONCorrectAnswers,
        dataObj.JSONScoreDescription = data.JSONScoreDescription;
    });

  	return dataObj;
	}

	angular
		.module('quizFramework')
		.factory('dataService', DataFactory);

	DataFactory.$inject = ['$http'];
		
})();