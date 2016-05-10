(function() {

	'use strict';
	
	function ListController(quizMetrics, dataService) {
		// VM = Virtual model
		var vm = this;

		function activateQuiz(){
			quizMetrics.changeState('quiz', true);
		}

		//GIVE ACCESS TO QUIZMETRICS IN LIST CONTROLLER & BIND TO VM
		vm.quizMetrics = quizMetrics;
		//
		vm.data = dataService.JSONQuizData;
		//
		vm.activateQuiz = activateQuiz;
	}

	angular
		.module('quizFramework')
		.controller('listCtrl', ListController);

	ListController.$inject = ['quizMetrics', 'dataService'];

})();