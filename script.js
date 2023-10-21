
/*  5 questions*/
questionList = [
    { question: "1) Stan Lee was one of the most popular comic book writers. His birthplace was... ",
    answer: ["New York City, New York, United States", "Manhattan, New York, United States", "Washington, DC, United States", "Arlington, Virginia, United States" ],
    correctAnswer:"Manhattan, New York, United States"
    },
    { question: "2) Poet, author, and civil rights activist Maya Angelou was a champion for black feminism... her birthplace was...",
    answer: ["Los Angeles, CA, United States", "St. Louis, Missouri, United States", "Jackson, Mississippi, United States", "Atlanta, Georgia, United States"],
    correctAnswer:"St. Louis, Missouri, United States"
    },
    { question: "3) Harper Lee was an American novelist who wrote the Pulitzer Prize-winning classic To Kill a Mockingbird. Her birthplace was...",
    answer: ["Baltimore, Maryland, United States", "Waukegan, Illinois, United States", "West Point, New York, United States", "Monroeville, Alabama, United States"],
    correctAnswer: "Monroeville, Alabama, United States"
    },
    { question: "4) Author and journalist Ta-Nehisi Coates gained international prominence while serving as the national correspondent at The Atlantic.His birthplace is...",
    answer: ["Baltimore, Maryland, United States", "Brookline, Massachusetts, United States", "Portland, Maine, United States", "Santa Monica, California, United States"],
    correctAnswer: "Baltimore, Maryland, United States"
    },
    { question: "5) Tom Clancy is best remembered for his espionage- and war-themed novels... his birthplace was..",
    answer: ["Chicago, Illinois, United States", " Providence, Rhode Island, United States", "Exeter, New Hampshire, United States", "Baltimore, Maryland, United States"],
    correctAnswer: "Baltimore, Maryland, United States"
    }
]
/*initialQuestion and initialPoint initial value 0 */

let initialQuestion = 0;   
let initialPoint= 0;

/* event listener for start quiz button. Hides first page and runs showQuestion function */
function startQuiz() {
    $('main').on('click', '#button-start', function(event){
        $('.start-question').hide();
        showQuestion();
    });
}

/*displaying quiz questions from the questionList, finally calls function of showResults */
function showQuestion() {
    if (initialQuestion < questionList.length) {
    let question =$(`<form class ="question-form">
    <legend class = "question">${questionList[initialQuestion].question}</legend>
    <ul class="radiogroup" role="radiogroup" aria-labelledby="question"></ul>`);
    let answers = questionList[initialQuestion].answer.map(function(answerValue, answerIndex){
        return `<label for="${answerValue}"><input type="radio" id="${answerValue}" name="answer" tabindex="${answerIndex}" value="${answerValue}" aria-checked="false" required>${answerValue}</label><br>`;
    });
    let button = $(`<button type="submit" id="button-submit">Submit</button></form>`)
    $('.quizOrQuestion').append(question);
    $('.radiogroup').append(answers, button);
    questionNumber();
} else {
    showResults();
}

}

/* event listener for the submit button.Verifies input and answer selected*/
function questionVerifier(){
    $('main').on('click','#button-submit', function (event){
        if ($('input:radio').is(':checked')) {
        event.preventDefault();
        let selectedAnswer= $("input[name=answer]:checked").val();
        console.log(selectedAnswer);
        if (selectedAnswer === questionList[initialQuestion].correctAnswer) {
            rightAnswer();
        } else {
                wrongAnswer();
            }
        }else {
            alert('You did not select your answer.')
        }
    });
}

/* keeps initialPoint of correct answers and displays at the end*/
function scoreHouse(){
    initialPoint++;
    $('header').find('#initialPoint').text(`${initialPoint}/5`);

}

/* shows page when answer is right, updates initialPoint*/
function rightAnswer() {
    console.log('rightAnswer ran');
    $('.question-form').hide();
    $('.questionAnswer').append(`<h2>The answer is correct. Excellent job!</h2>
    <button type="button" id ="button-next">Next Question</button>`).show();
    scoreHouse();
}

/* shows page when answer is wrong and displays correct answer */
function wrongAnswer() {
    $('.question-form').hide();
    $('.questionAnswer').append(`<h1>Oooops! ....Sorry! Your answer is not correct.</h1>
        <h2>The right answer is:</h2>
        <p><span class="correct-answer">${questionList[initialQuestion].correctAnswer}</span></p>
        <button type="button" id ="button-next">Next</button>`).show();
}

/* event listener for next question button, calls the showQuestion function to display next question */
function nextQuestion() {
    $('main').on('click','#button-next', function(event) {
        $('.questionAnswer').empty();
        $('.question-form').empty();
        initialQuestion++;
        showQuestion();
        $('question-form').show();
    });
}

/* shows final percentage initialPoint and total number of right answers */
function showResults(){
    console.log("`showResults` ran");
    let finalScore= (initialPoint/5)*100;
    $('.questionAnswer').append(`<h2>Your Quiz Results</h2> 
    <h3>${finalScore}%</h3>
    <p>You scored <span class="right-answers">${initialPoint} </span>out of 5 questions.Thanks for your participation.</p>
    <button type="button" id ="button-restart">Retake Quiz</button>`)
    
}

function retakeQuiz(){
    console.log('restart quiz ran');
 $('main').on('click', '#button-restart', function(event){
     console.log('restart button clicked');
    initialPoint= 0;
    initialQuestion = 0;
    $('.questionAnswer').empty();
    $('.question-form').empty();
    $('.start-question').show();
    $('header').find('#initialPoint').text(`${initialPoint}/5`);
    $('header').find('#question-tried').text(`${initialQuestion}`);
 });
}

function handleQuestionSite(){
    startQuiz();
    questionVerifier();
    nextQuestion();
    retakeQuiz();
}

/* calls handleQuestionSite to activate functions with event listeners */
$(handleQuestionSite);