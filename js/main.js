const answers = document.querySelectorAll('.question button');
const questions = document.querySelectorAll('.question');
const NUM_QUESTIONS = 20;
let score = 0, answeredCurrent = false, intro = true, currentQuestion, oldScore;

// Goes to next question on space key if current question is answered
document.addEventListener('keyup', event => {
	if (event.code === 'Space' && intro) {
		begin();
		intro = false;
	} else if (event.code === 'Space' && answeredCurrent == true) {
		nextQuestion(currentQuestion);
	}
	scoreLimit();
});

// Listen for an answer selection
Array.from(answers).forEach(answer => {
	answer.addEventListener('click', function() {
		currentQuestion = answer.parentElement.parentElement.parentElement;
		currentQuestion.querySelector('.response img').style.display = "none";
		checkAnswer(answer);
		answer.blur();
	});
});
 
function begin() {
	document.querySelector('.question').style.display = "block";
	document.querySelector('#intro').style.display = "none";
}

function nextQuestion(currentQuestion) {
	let index, nextQuestion;

	// Get next question in DOM
	for (let key of questions.keys()) {
		if (questions.item(key) === currentQuestion) {
			index = key + 1;
			nextQuestion = questions.item(index);
		}
	}

	if (nextQuestion === null) {
		answeredCurrent = false;
		currentQuestion.style.display = "none";

		displayResults(score);

		return;
	}

	currentQuestion.style.display = "none";
	nextQuestion.style.display = "block";

	answeredCurrent = false;
	currentQuestion = nextQuestion;
}

// Make sure score only increased once in last question
function scoreLimit(){
	if (score - oldScore > 1) {
		score = oldScore + 1;
	}
	oldScore = score;
}

function checkAnswer(answer){
	let correct;
	const correctAnswer = currentQuestion.querySelector('.correct');

	if (answer.classList.contains('correct')) {
		score += 1;
		correct = true;
	} else {
		correct = false;
		answer.style.backgroundColor = "#BD3520";
	}

	correctAnswer.style.backgroundColor = "#58A556";

	answeredCurrent = true;
	showFeedback(correct);
}

function showFeedback(result) {
	if (result == true) {
		currentQuestion.querySelector('.feedback .incorrect').style.display = "none";
		currentQuestion.querySelector('.feedback .correct').style.display = "flex";
	} else {
		currentQuestion.querySelector('.feedback .correct').style.display = "none";
		currentQuestion.querySelector('.feedback .incorrect').style.display = "flex";
	}
	currentQuestion.querySelector('.feedback').style.display = "flex";
}

function displayResults(score) {
	document.querySelector('#result').style.display = "flex";

	const result = document.querySelector('#result');
	let scoreText = document.createTextNode(`Your score: ${score}/${NUM_QUESTIONS}`);

	result.querySelector('h1').appendChild(scoreText);

	if (score === NUM_QUESTIONS) {
		result.style.backgroundImage = "url('https://i.imgur.com/52MZGK0.png')";
	} else if (score > 15) {
		result.style.backgroundImage = "url('https://i.imgur.com/zoxYL48.png')";
	} else if (score > 10) {
		result.style.backgroundImage = "url('https://i.imgur.com/JN7MwvQ.png)";
	} else if (score > 5) {
		result.style.backgroundImage = "url('https://i.imgur.com/wmCk6b1.png)";
 	} else {
		result.style.backgroundImage = "url('https://i.imgur.com/yk6LWi5.png')";
	}
}	