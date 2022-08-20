const quizData = [
    { 
        question:"1+1",
        a:'10',
        b:'1',
        c:'2',
        d:'110',
        correct: 'c'
    }, 
    {
        question:"what is the most user programing language",
        a:'java',
        b:'c',
        c:'python',
        d:'javascript',
        correct: 'a'
    },
    {
        question:"who is the president of US",
        a:'florin pop',
        b:'donal trump',
        c:'ivan saldano',
        d:'mihai andrei',
        correct: 'b'
    },
    {
        question:"what does HTML stand for",
        a:'hyper text makeup language',
        b:'cascading stysle sheet',
        c:'json object Notation',
        d:'Application Programing Motorboats Lamborgini',
        correct: 'a'
    },
];

const answerEls = document.querySelectorAll(".answer");
const quiz = document.getElementById("quiz");
const questionE1 = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;

let score  = 0;

loadQuiz();

function loadQuiz() {

    deselectAnswer()

    const currentQuizData= quizData[currentQuiz]

    questionE1.innerHTML = currentQuizData.question
    
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;


}

function getSelected() {

    let answer =undefined

    answerEls.forEach((answerEl) => {
       if(answerEl.checked) {
            answer = answerEl.id;
       }
    })

    return answer
}


function deselectAnswer() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
     })
}

submitBtn.addEventListener("click", () => {

    //check to see the answer
    const answer = getSelected()

    if(answer) {
        if(answer  === quizData[currentQuiz].correct ) {
            score++
        }  

        currentQuiz++;
        if(currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
            <h2>you answer correctly 
            ${score}/${quizData.length} question 
            </h2> 
            
            <button onclick="location.reload()">Reload</button>`;
        } 
    }
})
