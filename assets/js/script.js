let position = 0;
let correct = 0;
let time = 0;
let highScores = [

];
let myQuestions = [
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
let currentQuestion = myQuestions[0];
let timeIntervalId;
function showIntro() {
	let intro = document.getElementById("intro");
	intro.style.display = "block";
}
function hideIntro() {
	let intro = document.getElementById("intro");
	intro.style.display = "none";
}
function loadHighScores() {
	highScores = JSON.parse(localStorage.getItem("highScores")) || [];
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
	startTimer();
}
function startTimer() {
	resetTimer();
	timeIntervalId = setInterval(function () {
		if (time <= 0) {
			endTime();
		} else {
			decreaseTime();
			displayCurrentTime();
		}
	}, 1000)
}
function endTime() {
	clearInterval(timeIntervalId);
}

function decreaseTime() {
	if (time > 0) {
		time = time - 1;
	} else {
		endQuiz();
	}
}
function displayCurrentTime() {
	let currentTimeElement = document.getElementById("time");
	currentTimeElement.innerText = time;
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
		correct = correct + 1;
		answerChoiceFeedback("Correct");
	} else {
		time = Math.max(time - 10, 0);
		displayCurrentTime();
		answerChoiceFeedback("Wrong");
	}
	setTimeout(function() {
		answerChoiceFeedback(""); 
	}, 1000)
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
	endTime();
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
	let results = document.getElementById("results");
	results.style.display = "block";
}

function calculateScore() {

	return correct * time;
}

function handleInitialSubmission() {
	let initialsInput = document.getElementById("initials");
	let initialsValue = initialsInput.value;
	let score = calculateScore();
	addHighScore(initialsValue, score);
	hideResults();
	showHighScores();
}

function addHighScore(initials, score) {
	highScores.push({
		initials: initials,
		score: score
	})
	saveHighScores();
}
function hideResults() {
	let results = document.getElementById("results");
	results.style.display = "none";
}

function showHighScores() {
	sortHighScores();
	let highScoresSection = document.getElementById("highscores");
	highScoresSection.style.display = "block";
	let highScoresList = document.getElementById("highScoresList");
	for (let highscore of highScores) {
		let scoreListItem = document.createElement("li");
		scoreListItem.innerText = `${highscore.initials} - ${highscore.score}`
		highScoresList.appendChild(scoreListItem);
	}

}

function sortHighScores() {
	highScores.sort(function (highscoreA, highscoreB) {
		if (highscoreA.score > highscoreB.score) {
			return -1;
		} else {
			return 1;
		}
	})
}
function saveHighScores() {
	localStorage.setItem("highScores", JSON.stringify(highScores))
}
loadHighScores();

function handleGoBack() {
	hideHighScores();
	showIntro();
	resetQuiz();
	
}
function resetTimer() {
	time = 71;
}
function handleClearHighScores() {
	highScores = [];
	saveHighScores();
	showHighScores();
}
function hideHighScores() {
	let highScoresSection = document.getElementById("highscores");
	highScoresSection.style.display = "none";
}
function answerChoiceFeedback(result) {
	let answerChoiceCheck = document.getElementById("checkanswer");
	answerChoiceCheck.innerText=result;

}
function resetQuiz() {
	resetTimer();
	resetPosition();
	resetCorrectAnswers();
}
function resetCorrectAnswers() {
	correct = 0;
}
function resetPosition() {
	position = 0;
}

let goBackButton = document.getElementById("goback");
goBackButton.addEventListener("click", handleGoBack);

let clearHighScoresButton = document.getElementById("clearhighscores");
clearHighScoresButton.addEventListener("click", handleClearHighScores);

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
let submitInitials = document.getElementById("submitscore");
submitInitials.addEventListener("click", handleInitialSubmission);