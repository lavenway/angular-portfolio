(function() {

	'use strict';
	angular
		.module('quizFramework')
		.controller('quizCtrl', QuizController);

		QuizController.$inject = ['quizMetrics', 'dataService'];

		function QuizController(quizMetrics, dataService) {
			// VM = Virtual model
			var vm = this;
			//GIVE ACCESS TO QUIZMETRICS IN QUIZ CONTROLLER & BIND TO VM
			vm.quizMetrics = quizMetrics;
			//Get access to dataService object in our view
			vm.dataService = dataService;
			//Named function syntax
			vm.questionAnswered = questionAnswered;
			//Set the active question
			vm.setActiveQuestion = setActiveQuestion;
			//Set the selected question
			vm.selectAnswer = selectAnswer;
			//Finalise answers
			vm.finaliseAnswers = finaliseAnswers;
			//Set the starting question
			vm.activeQuestion = 0;
			//Basic error handling if not all questions have been answered
			vm.error = false;
			//Displays a prompt to check if user wants to go to the results page
			vm.finalise = false;

			var numQuestionsAnswered = 0;

			//if this function is running then not all questions have been answered so go to the next unanswered question
			function setActiveQuestion(index){
				if(index === undefined){
					var breakOut = false;
					//Take one off the length to match number of questions, array starts at 0
					var quizLength = dataService.JSONQuizData.length - 1;

					while(!breakOut){
						//If active question is less than the length of the quiz then increment active question
						vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;

						//Error if not all questions answered
						if(vm.activeQuestion === 0){
							vm.error = true;
						}

						//If the active question hasn't yet been answered then we have found the next unanswered question
						if(dataService.JSONQuizData[vm.activeQuestion].selected === null){
							breakOut = true;
						}
					}
				} else {
					vm.activeQuestion = index;
				}
			}

			//if user has clicked continue
			function questionAnswered(){

				var quizLength = dataService.JSONQuizData.length;

				//If the current question has been answered increment the number of total questions
				if(dataService.JSONQuizData[vm.activeQuestion].selected !== null){
					numQuestionsAnswered++;

					if(numQuestionsAnswered >= quizLength){
						//finish quiz
						for(var i = 0; i < quizLength; i++){
							if(dataService.JSONQuizData[i].selected === null){
								setActiveQuestion(i);
								return;
							}
						}
						vm.error = false;
						vm.finalise = true;
						return;
					}

				}

				vm.setActiveQuestion();

			}

			//Set the selected answer to the index of the question
			function selectAnswer(index){
				dataService.JSONQuizData[vm.activeQuestion].selected = index;
			}

			//Reset everything
			function finaliseAnswers(){
				vm.finalise = false;
				numQuestionsAnswered = 0;
				vm.activeQuestion = 0;
				quizMetrics.markQuiz();
				quizMetrics.changeState('quiz', false);
				//trigger the results page
				quizMetrics.changeState('results', true);
			}

		}

})();