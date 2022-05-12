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
        <h2 id = "score">Você acertou ${quiz.score} de ${quiz.questions.length}</h2>
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
        "Qual destes não é um nome de treinamento da numera?",
        ["Boot Camp de People Analytics", "PAN", "Análise de dados de RH", "Pensamento Crítico"],
        "Análise de dados de RH"
    ),
    // 2
    new Question(
        "Qual dos construtos abaixo é tipicamente adotado como um preditor de engajamento?",
        ["Percepção de justiça", "Burnout", "Turnover", "Salário"],
        "Percepção de justiça"
    ),
    // 3
    new Question(
        "Em um dos textos do blog da numera, são citados 3 critérios principais para serem avaliados em um processo seletivo. Qual das opções não é um desses critérios?",
        ["Performance", "Engajamento", "Turnover", "Pensamento crítico"],
        "Pensamento crítico"
    ),
    // 4
    new Question(
        "Com 240 curtidas, o post mais curtido da numera é sobre o efeito Dunning-Krüger. Qual é o tema do segundo post mais curtido (atualizado em 16-05-2022)?",
        ["Distribuição do desempenho segue a lei da potência", "Estágios de maturidade de people analytics", "Gestores não entendem os principais motivos de saída dos funcionários", "Stprytelling com How I Met Your Mother"],
        "Gestores não entendem os principais motivos de saída dos funcionários"
    ),
    // 5
    new Question(
        "Da Grécia antiga aos tempos modernos, a metodologia científica se desenvolveu em vários aspectos. Um passo importante desse método veio da ideia de tentar refutar um argumento ou hipótese para um fenômeno. Quem foi o principal responsável por levantar essa ideia?",
        ["Karl Popper", "Francis Bacon", "Aristóteles", "Immanuel Kant"],
        "Karl Popper"
    ),
    // 6
    new Question(
        "Em uma aposta entre dois sócios da numera, a pessoa que perdeu a aposta teve que se vestir de porquinho. Quem perdeu essa aposta?",
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
        "Antes de criarem a numera ou de entrarem na numera, os 4 atuais sócios trabalharam na mesma empresa. Que empresa é essa?",
        ["Grupo Boticário", "Ernst & Young", "Deloitte", "Gupy"],
        "Grupo Boticário"
    ),
    // 9
    new Question(
        "A numera realiza meetups que abordam tópicos relevantes para a área de people analytics. No meetup realizado em abril-22 foi abordado o tema de burnout. Qual o número da edição desse meetup?",
        ["16", "17", "18", "19"],
        "19"
    ),
    // 10
    new Question(
        "No blog há um artigo intitulado 'Você tem interpretado seus resultados corretamente?' que fala de um erro comum ao abordar alguns tipos de problemas. Esse erro está relacionado ao:",
        ["Teorema de Bayes", "Viés de sobrevivência", "Paradoxo de Simpson", "Eficiência-X"],
        "Teorema de Bayes"
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
