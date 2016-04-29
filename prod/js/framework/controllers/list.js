(function() {

	'use strict';
	angular
		.module('quizFramework')
		.controller('listCtrl', ListController);

		ListController.$inject = ['quizMetrics', 'dataService'];

		function ListController(quizMetrics, dataService) {
			// VM = Virtual model
			var vm = this;
			//GIVE ACCESS TO QUIZMETRICS IN LIST CONTROLLER & BIND TO VM
			vm.quizMetrics = quizMetrics;
			//
			vm.data = dataService.JSONQuizData;
			//
			vm.activateQuiz = activateQuiz;

			function activateQuiz(){
				quizMetrics.changeState('quiz', true);
			}
		}

})();