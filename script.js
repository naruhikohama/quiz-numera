// CREATE QUIZ CLASS
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        };
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex == this.questions.length;
    }
};

// CREATE QUESTION CLASS
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
};

// DISPLAY QUESITON
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for(let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

// GUESS FUNCTION
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};

// SHOW QUIZ PROGRESS
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById('progress');
    progressElement.innerHTML = `Pergunta ${currentQuestionNumber} de ${quiz.questions.length}`;
};

// SHOW SCORE
function showScores() {
    let quizEndHTML = 
    `
        <h1> Quiz finalizado </h1>
        <h2 id = "score">Voc?? acertou ${quiz.score} de ${quiz.questions.length}</h2>
        <div class="quiz-repeat">
            <a href="index.html">Fazer quiz novamente</a>
        </div>
    
    `;
    let quizElement = document.querySelector(".quiz");
    quizElement.innerHTML = quizEndHTML;
}

//  CREATE QUIZ QUESTIONS
let questions = [
    // 1
    new Question(
        "Qual destes n??o ?? um nome de treinamento da numera?",
        ["Boot Camp de People Analytics", "PAN", "An??lise de dados de RH", "Pensamento Cr??tico"],
        "An??lise de dados de RH"
    ),
    // 2
    new Question(
        "Qual dos construtos abaixo ?? tipicamente adotado como um preditor de engajamento?",
        ["Percep????o de justi??a", "Burnout", "Turnover", "Sal??rio"],
        "Percep????o de justi??a"
    ),
    // 3
    new Question(
        "Em um dos textos do blog da numera, s??o citados 3 crit??rios principais para serem avaliados em um processo seletivo. Qual das op????es n??o ?? um desses crit??rios?",
        ["Performance", "Engajamento", "Turnover", "Pensamento cr??tico"],
        "Pensamento cr??tico"
    ),
    // 4
    new Question(
        "Com 240 curtidas, o post mais curtido da numera ?? sobre o efeito Dunning-Kr??ger. Qual ?? o tema do segundo post mais curtido (atualizado em 16-05-2022)?",
        ["Distribui????o do desempenho segue a lei da pot??ncia", "Est??gios de maturidade de people analytics", "Gestores n??o entendem os principais motivos de sa??da dos funcion??rios", "Stprytelling com How I Met Your Mother"],
        "Gestores n??o entendem os principais motivos de sa??da dos funcion??rios"
    ),
    // 5
    new Question(
        "Da Gr??cia antiga aos tempos modernos, a metodologia cient??fica se desenvolveu em v??rios aspectos. Um passo importante desse m??todo veio da ideia de tentar refutar um argumento ou hip??tese para um fen??meno. Quem foi o principal respons??vel por levantar essa ideia?",
        ["Karl Popper", "Francis Bacon", "Arist??teles", "Immanuel Kant"],
        "Karl Popper"
    ),
    // 6
    new Question(
        "Em uma aposta entre dois s??cios da numera, a pessoa que perdeu a aposta teve que se vestir de porquinho. Quem perdeu essa aposta?",
        ["Giovani", "Guilherme", "Rianny", "Thiago Melo"],
        "Giovani"
    ),
    // 7
    new Question(
        "Em que data a numera foi fundada?",
        ["16-09-2016", "23-04-2017", "07-09-2016", "16-10-2017"],
        "16-09-2016"
    ),
    // 8
    new Question(
        "Antes de criarem a numera ou de entrarem na numera, os 4 atuais s??cios trabalharam na mesma empresa. Que empresa ?? essa?",
        ["Grupo Botic??rio", "Ernst & Young", "Deloitte", "Gupy"],
        "Grupo Botic??rio"
    ),
    // 9
    new Question(
        "A numera realiza meetups que abordam t??picos relevantes para a ??rea de people analytics. No meetup realizado em abril-22 foi abordado o tema de burnout. Qual o n??mero da edi????o desse meetup?",
        ["16", "17", "18", "19"],
        "19"
    ),
    // 10
    new Question(
        "No blog h?? um artigo intitulado 'Voc?? tem interpretado seus resultados corretamente?' que fala de um erro comum ao abordar alguns tipos de problemas. Esse erro est?? relacionado ao:",
        ["Teorema de Bayes", "Vi??s de sobreviv??ncia", "Paradoxo de Simpson", "Efici??ncia-X"],
        "Teorema de Bayes"
    ),
    // 11
    new Question(
        "Quantos coment??rios tem o post no instagram da numera com maior n??mero de coment??rios?",
        ["9", "18", "38", "67"],
        "67"
    ),


];

let quiz = new Quiz(questions);

// display question
displayQuestion();

// ADD A COUNTDOWN
let time = 2;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `Tempo restante: ${min}:${sec}`;
        }
    }, 1000)
}

startCountdown();
