(function() {

	'use strict';
	angular
		.module('quizFramework')
		.factory('quizMetrics', QuizMetrics);

		QuizMetrics.$inject = ['dataService'];

		function QuizMetrics(dataService) {
			var quizObj = {
				quizActive: false,
				resultsActive: false,
				changeState: changeState,
				correctAnswers: [],
				markQuiz: markQuiz,
				numCorrect: 0
			};

			return quizObj;

			function changeState(metric, state){
				if(metric === 'quiz'){
					quizObj.quizActive = state;
				} else if(metric === 'results') {
					quizObj.resultsActive = state;
				} else {
					return false;
				}		
			}

			//Mark the answers
			function markQuiz(){
				quizObj.correctAnswers = dataService.correctAnswers;
				//Loop through questions and check answer given by the user
				for(var i = 0; i < dataService.JSONQuizData.length; i++){
					if(dataService.JSONQuizData[i].selected === dataService.correctAnswers[i]){
						//set correct flag on answer						
						dataService.JSONQuizData[i].correct = true;
						quizObj.numCorrect++;
					} else {
						//set incorrect flag on answer
						dataService.JSONQuizData[i].correct = false;
					}
				}
			}

		}
		
})();