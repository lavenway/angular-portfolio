(function() {

	'use strict';

	function DataFactory($http) {

		/*var urlBase = 'http://www.json-generator.com/api/json/get/bQkWdPSKMi?indent=2';*/
		var urlBase = 'HTMLResources/json/folio-data.json?callback=JSON_CALLBACK';

		var JSONHomeSection = [];
		var JSONAboutSection = [];
		var JSONAgenciesSection = [];
		var JSONWorkSection = [];
		var JSONContactSection = [];

		var dataObj = {
			JSONHomeSection: JSONHomeSection,
			JSONAboutSection: JSONAboutSection,
			JSONAgenciesSection: JSONAgenciesSection,
			JSONWorkSection: JSONWorkSection,
			JSONContactSection: JSONContactSection
		};

    $http.get(urlBase).success(function(data) {
        dataObj.JSONHomeSection = data.JSONHomeSection,
        dataObj.JSONAboutSection = data.JSONAboutSection,
        dataObj.JSONAgenciesSection = data.JSONAgenciesSection,
        dataObj.JSONWorkSection = data.JSONWorkSection,
        dataObj.JSONContactSection = data.JSONContactSection;
    });

  	return dataObj;


	}

	angular
		.module('folioFramework')
		.factory('dataService', DataFactory);

	DataFactory.$inject = ['$http'];
		
})();