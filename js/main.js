const answers = document.querySelectorAll('.question button');
const questions = document.querySelectorAll('.question');
let score = 0, answeredCurrent = false, currentQuestion, intro = true;


// Goes to next question on space key if current question is answered
document.addEventListener('keyup', event => {
	if (event.code === 'Space' && intro) {
		begin();
		intro = false;
	} else if (event.code === 'Space' && answeredCurrent == true) {
		nextQuestion(currentQuestion);
	}
});

// Listen for an answer selection
Array.from(answers).forEach(answer => {
	answer.addEventListener('click', function() {
		currentQuestion = answer.parentElement.parentElement.parentElement;
		currentQuestion.querySelector('.response img').style.display = "none";
		checkAnswer(answer);
	});
});
 
function begin() {
	document.querySelector('.question').style.display = "block";
	document.querySelector('#intro').style.display = "none";
}

function nextQuestion(currentQuestion) {
	let index, nextQuestion;

	for (let key of questions.keys()) {
		if (questions.item(key) === currentQuestion) {
			index = key + 1;
			nextQuestion = questions.item(index);
		}
	}

	currentQuestion.style.display = "none";
	nextQuestion.style.display = "block";

	answeredCurrent = false;
	currentQuestion = nextQuestion;
}


function checkAnswer(answer){
	let correct;

	if (answer.classList.contains('correct')) {
		score += 1;
		correct = true;
		answer.style.backgroundColor = "green";
	} else {
		correct = false;
	}

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