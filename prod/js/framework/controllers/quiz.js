(function() {

	'use strict';

	function QuizController(quizMetrics, dataService) {
		// VM = Virtual model
		var vm = this;
		
		var numQuestionsAnswered = 0;

		//if the back button is clicked determine if we can go back and hide the button accordingly
		function backQuestion(){
			//if the previous question hasn't been answered - prevents click on progress showing unwanted back link
			if(vm.activeQuestion < 1){
				vm.back = false;
				vm.feedback = false;
			} else {
				//if we click the progress bar and the previous question hasn't been answered and the answer screen is not in view
				if(dataService.JSONQuizData[vm.activeQuestion].selected === null && vm.feedback ===false){
					vm.activeQuestion--;
					vm.feedback = false;
				} else {
						//First question so hide the back button
						if(vm.activeQuestion < 1){
							vm.back = false;
						} else {
								//go back to the question screen
								if(vm.feedback === true){									
									vm.feedback = false;
									vm.activeQuestion--;
								}
								//go back to the answer screen
								else {								
									vm.feedback = true;
									vm.activeQuestion--;
								}
						}
				}
			}
		}

		//if this function is running then not all questions have been answered so go to the next unanswered question
		function setActiveQuestion(index){
			vm.feedback = false;

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

		//if user has clicked submit answer
		function questionAnswered(){
			vm.feedback = true;
			vm.back = true;
		}

		//if user has clicked continue in the answer feedback screen
		function questionContinue(){

			vm.feedback = false;

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

				//If we are on the last question swap the next question button to a find out score button
				if(numQuestionsAnswered === quizLength - 1){
					vm.lastQuestion = true;
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
			vm.back = false;
			vm.lastQuestion = false;
			numQuestionsAnswered = 0;
			vm.activeQuestion = 0;
			quizMetrics.markQuiz();
			quizMetrics.changeState('quiz', false);
			//trigger the results page
			quizMetrics.changeState('results', true);
		}

		//GIVE ACCESS TO QUIZMETRICS IN QUIZ CONTROLLER & BIND TO VM
		vm.quizMetrics = quizMetrics;
		//Get access to dataService object in our view
		vm.dataService = dataService;
		//Named function syntax
		vm.questionAnswered = questionAnswered;
		//Show the feedback for the question
		vm.questionContinue = questionContinue;
		//Set the active question
		vm.setActiveQuestion = setActiveQuestion;
		//Go back a question
		vm.backQuestion = backQuestion;
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
		//Displays the feedback to the answer
		vm.feedback = false;
		//Switch the button in the last answer screen
		vm.lastQuestion = false;
		//Back link after first question answered
		vm.back = false;

	}

	angular
		.module('quizFramework')
		.controller('quizCtrl', QuizController);

	QuizController.$inject = ['quizMetrics', 'dataService'];

})();