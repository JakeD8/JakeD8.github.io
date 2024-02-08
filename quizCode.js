const quizData = [
    {
        question: "Where was our first date?",
        options: ["The Graveyard","McDonald's","The Hippie Store","My Dorm Room"],
        answer: "The Graveyard"
    },{
        question: "What is our favorite Naethan Apollo Song?",
        options: ["Cannibal","Climate Crisis Love Song","To You, From Me","Dollar Store Date"],
        answer: "To You, From Me"
    },{
        question: "How many days have we dated?",
        options: ["23","173","201","159"],
        answer: "159"
    },{
        question: "How many times have we visited the ER together?",
        options: ["2","3","1.5","4"],
        answer: "3"
    },{
        question: "What is my favorite color?",
        options: ["Midnight Black","Wine Red","Chartreuse","Baby Blue"],
        answer: "Wine Red"
    },{
        question: "What was the first gift I ever gave you?",
        options: ["T-Shirt","Squishmallow","Stickers","Blanket"],
        answer: "T-Shirt"
    },{
        question: "What day will I propose to you?",
        options: ["9/24/25","4/12/26","7/29/28","9/16/26"],
        answer: "9/16/26"
    },{
        question: "How many notes do I have from you on my wall? (including cards, letters, drawings)",
        options: ["21", "17","16","13"],
        answer: "16"
    },{
        question: "Solve: Cubed Root of(69/3). Round to the nearest tenth.",
        options: ["1.6","4.6","0.02","2.8"],
        answer: "2.8"
    },{
        question: "Do you love me?",
        options: ["Yes","Absolutely"],
        answer: "Absolutely"
    },{
        question: "Will you be my Valentine?",
        options: ["Yes","No"],
        answer: "Yes"
    },
];

const questionBox = document.getElementById('question');
const optionsBox = document.getElementById('options');
const dabloonCount = document.getElementById('dabloonCount');
const questionCount = document.getElementById('questionCount');
const loadQuiz = document.getElementById('startQuiz');

let questionIndex = 0;
let dabloons = 0;

function loadQuestion(){
    questionCount.innerText = 'Question: ' + (questionIndex+1);
    const currentQuestion = quizData[questionIndex];
    questionBox.innerText = currentQuestion.question;
    optionsBox.innerHTML = '';
    currentQuestion.options.forEach((option, index) =>{
        const optionElement = document.createElement('button');
        const breakElement = document.createElement('br');
        optionElement.innerText = option;
        optionElement.classList.add('optionButton');
        optionElement.addEventListener('click', () => checkAnswer(option));
        optionsBox.appendChild(optionElement);
        optionsBox.appendChild(breakElement);

    });   
}

function checkAnswer(selectedOption){
    const correctAnswer = quizData[questionIndex].answer;
    if(selectedOption === correctAnswer){
        updateDabloons(1);
    }
    questionIndex ++;
    if(questionIndex < quizData.length){
        loadQuestion();
    }else{
        //load next screen
        storeDabloons();
        window.location.href = "./EndScreen.html";
    }
}

function startQuiz(){
    loadQuiz.remove();
    loadQuestion();
}


const prizePool = [
    {
        prizeName: "Prize1",
        price:"1",
    },{
        prizeName: "Prize2",
        price:"2",
    },{
        prizeName: "Prize3",
        price:"3.5",
    },{
        prizeName: "Prize4",
        price:"4",
    },{
        prizeName: "Prize5",
        price:"6",
    },{
        prizeName: "Prize6",
        price:"7",
    },
]

const prizeSpot = document.getElementById('prizes');
const earned = document.getElementById('earned');
const loadButton = document.getElementById('loadPrizes');

let prizeIndex = 0;

function loadPrizes(){
    prizePool.forEach((prize) => {
        const prizeName = document.createElement('h4');
        prizeName.classList.add(prize.prizeName);
        const price = document.createElement('p');
        price.classList.add('priceListing')
        prizeName.innerText = 'Present ' + (prizeIndex+1);
        price.innerText = 'Price: ' + prize.price;
        const purchaseButton = document.createElement('button');
        const breakElement = document.createElement('br');
        purchaseButton.innerText = 'Purchase';
        purchaseButton.classList.add('purchaseButton');
        purchaseButton.addEventListener('click', () => purchase(prize));
        prizeSpot.appendChild(prizeName);
        prizeSpot.appendChild(breakElement);
        prizeName.appendChild(price);
        prizeName.appendChild(breakElement);
        price.appendChild(purchaseButton);
        prizeSpot.appendChild(breakElement);
        
        prizeIndex++;

        loadDabloons();
        loadButton.remove();

    });
}

function purchase(prize){
    if(prize.price <= dabloons){
        alert('You just bought ' + prize.prizeName + '! Claim your prize now!')
        updateDabloons(-prize.price);
        const prizeNameElement = document.querySelector('h4.' + CSS.escape(prize.prizeName));
        const priceElement = prizeNameElement.nextElementSibling;
        const purchaseButton = priceElement.nextElementSibling.nextElementSibling;
        prizeNameElement.remove();
        priceElement.remove();
        purchaseButton.remove();
    }else{
        alert("Sorry, you don't have enough for that one!");
    }
    
}

function updateDabloons(amount){
    dabloons += amount;
    dabloonCount.innerText = 'You have ' +dabloons+ ' dabloons!';
}

function storeDabloons(){
    localStorage.setItem('dabloonCount',JSON.stringify(dabloons));
}
function loadDabloons(){
    dabloons = JSON.parse(localStorage.getItem('dabloonCount'));
    dabloonCount.innerText = 'You have ' +dabloons+ ' dabloons!';
}


