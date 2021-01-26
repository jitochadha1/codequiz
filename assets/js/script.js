var position = 0;
var correct = 0;


var myQuestions = [
	{
		questiontext: "What are variables used for in JavaScript programs?",
		answers: {
			a: 'Storing numbers, dates, or other values',
			b: 'Varying randomly',
			c: 'Causing high-school algebra flashbacks',
			d: 'None of the above'
		},
		correctAnswer: 'a'
	},
	{
		questiontext: "Which of the following attribute can hold the JavaScript version?",
		answers: {
			a: 'LANGUAGE',
			b: 'SCRIPT',
			c: 'VERSION',
			d: 'None of the above'
		},
		correctAnswer: 'a'
	},
	{
		questiontext: "What should appear at the end of your JavaScript?",
		answers: {
			a: 'The </script>',
			b: 'The <script>',
			c: 'The END statement',
			d: 'None of the above'
		},
		correctAnswer: 'a'
	},
	{
		questiontext: "Which of the following can't be done with client-side JavaScript?",
		answers: {
			a: 'Validating a form',
			b: 'Sending a the form contents by email',
			c: 'Storing the forms contents to a database file on the server',
			d: 'None of the above'
		},
		correctAnswer: 'c'
	}
];
var currentQuestion = myQuestions[0];
// var quizContainer = document.getElementById('question');
// var resultsContainer = document.getElementById('results');
// var submitButton = document.getElementById('submit');

// generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

// function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

// 	function showQuestions(questions, quizContainer){
// 		// we'll need a place to store the output and the answer choices
// 		var output = [];
// 		var answers;

// 		// for each question...
// 		for(var i=0; i<questions.length; i++){

// 			// first reset the list of answers
// 			answers = [];

// 			// for each available answer...
// 			for(letter in questions[i].answers){

// 				// ...add an html radio button
// 				answers.push(
// 					'<label>'
// 						+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
// 						+ letter + ': '
// 						+ questions[i].answers[letter]
// 					+ '</label>'
// 				);
// 			}

// 			// add this question and its answers to the output
// 			output.push(
// 				'<div class="question">' + questions[i].question + '</div>'
// 				+ '<div class="answers">' + answers.join('') + '</div>'
// 			);
// 		}

// 		// finally combine our output list into one string of html and put it on the page
// 		quizContainer.innerHTML = output.join('');
// 	}


// 	function showResults(questions, quizContainer, resultsContainer){

// 		// gather answer containers from our quiz
// 		var answerContainers = quizContainer.querySelectorAll('.answers');

// 		// keep track of user's answers
// 		var userAnswer = '';
// 		var numCorrect = 0;

// 		// for each question...
// 		for(var i=0; i<questions.length; i++){

// 			// find selected answer
// 			userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

// 			// if answer is correct
// 			if(userAnswer===questions[i].correctAnswer){
// 				// add to the number of correct answers
// 				numCorrect++;

// 				// color the answers green
// 				answerContainers[i].style.color = 'lightgreen';
// 			}
// 			// if answer is wrong or blank
// 			else{
// 				// color the answers red
// 				answerContainers[i].style.color = 'red';
// 			}
// 		}

// 		// show number of correct answers out of total
// 		resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
// 	}

// 	// show questions right away
// 	showQuestions(questions, quizContainer);

// 	// on submit, show results
// 	submitButton.onclick = function(){
// 		showResults(questions, quizContainer, resultsContainer);
// 	}

// }



function hideIntro() {
	let intro = document.getElementById("intro");
	intro.style.display = "none";
}

function showquestions() {
	let questions = document.getElementById("question");
	questions.style.display = "block";
}
function startquiz() {
	hideIntro();
	showquestions();
	displayCurrentQuestion();
	displayCurrentAnswerChoices();
}
function displayCurrentQuestion() {
	let questionTitle = document.getElementById("questionTitle");
	questionTitle.innerText = currentQuestion.questiontext
}
function displayCurrentAnswerChoices() {
	let answerChoice1 = document.getElementById("a1");
	answerChoice1.innerText = currentQuestion.answers.a;
	let answerChoice2 = document.getElementById("a2");
	answerChoice2.innerText = currentQuestion.answers.b;
	let answerChoice3 = document.getElementById("a3");
	answerChoice3.innerText = currentQuestion.answers.c;
	let answerChoice4 = document.getElementById("a4");
	answerChoice4.innerText = currentQuestion.answers.d;

}
function chooseAnswer(choice) {

	let correctAnswer = currentQuestion.correctAnswer;
	if (choice === correctAnswer) {
		correct = correct + 1
	}
	nextQuestion();
}
function nextQuestion() {
	if (position === myQuestions.length - 1) {
		endQuiz();
		return;
	}
		
	position = position + 1;

	currentQuestion = myQuestions[position];
	displayCurrentQuestion();
	displayCurrentAnswerChoices();
}

function endQuiz() {
	hideQuiz();
	showResults();
}

function hideQuiz() {
	let questions = document.getElementById("question");
	questions.style.display = "none";
}

function showResults() {
	let score = calculateScore();
	let resultsTitle = document.getElementById("resultsTitle");
	resultsTitle.innerText = `All Done!`
	let resultsScore = document.getElementById("resultsScore");
	resultsScore.innerText = `Your score is: ${score}`;
}

function calculateScore() {
	return 0;
}

let startbutton = document.getElementById("startquiz");
startbutton.addEventListener("click", startquiz);
let answerChoice1 = document.getElementById("a1");
answerChoice1.addEventListener("click", function () {
	chooseAnswer("a");
})
let answerChoice2 = document.getElementById("a2");
answerChoice2.addEventListener("click", function () {
	chooseAnswer("b");
})
let answerChoice3 = document.getElementById("a3");
answerChoice3.addEventListener("click", function () {
	chooseAnswer("c");
})
let answerChoice4 = document.getElementById("a4");
answerChoice4.addEventListener("click", function () {
	chooseAnswer("d");
})