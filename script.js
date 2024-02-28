const questions = [
    {
        question: "Which keyboard shortcut is used to easily switch open workbooks?",
        answers: [
            { text: "Alt+S", correct: false },
            { text: "CTRL+S", correct: false },
            { text: "CTRL+Alt ", correct: false },
            { text: "CTRL+Tab", correct: true },
        ]
    },
    {
        question: "What is an Excel feature that displays only the data in column (s) according to specified criteria?",
        answers: [
            { text: "Filtering", correct: true },
            { text: "Sorting", correct: false },
            { text: "Formula ", correct: false },
            { text: "Pivot ", correct: false },
        ]
    },
    {
        question: "___ is not a function in Excel.",
        answers: [
            { text: "SUM", correct: false },
            { text: "MIN", correct: false },
            { text: "SUBTRACT", correct: true },
            { text: "MAX", correct: false },
        ]
    },
    {
        question: "What is MS Excel?",
        answers: [
            { text: "Presentation", correct: false },
            { text: "Spreadsheet", correct: true },
            { text: "Database Management", correct: false },
            { text: "Workbook", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }

}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

