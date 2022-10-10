
var questions = [
    {
        title: 'Commonly used data types DO NOT include:',
        choices: ['Strings', 'Booleans', 'alerts', 'numbers'],
        answers: 'alerts'
    },
    {
        title: 'The condition in an if / else statement is enclosed within ______.',
        choices: ['Quotes', 'Curly brackets', 'parentheses', 'Square brackets'],
        answers: 'parentheses'
    },
    {
        title: 'Arrays in Javascript can be used to store ________.',
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answers: 'all of the above'
    
    },
    {
        title:'Strings Values must be enclosed within ________ when being assigned to variables.',
        choices:['commas', 'curly brackets', 'quotes', 'parenthesis'],
        answers:'quotes'
    
    },
    {
        title: 'A very useful tool for used during development and debugging fot printing content to the debugger is:',
        choices:['Javascript', 'terminal/bash', 'for loops', 'console log'],
        answers: 'console log'
    
    },
    
    
    ];


    let score = 0;
    let questionIndex = 0;

    var currentTime =document.querySelector('#time')
    var startButton = document.querySelector('#startButton')
    var question = document.querySelector('.questions')
    var wrapper = document.querySelector('#wrapper')
    

    var secondsLeft = 75;
    var interval = 0;
    var penalty = 10;
    var createUl = document.createElement('ul')
    var timesUp = 'Time s up!'
    

    startButton.addEventListener ('click', function(){

        if (interval === 0){
            interval = setInterval(function(){
                secondsLeft--;
                currentTime.textContent =  'Time:'+secondsLeft;

             if( secondsLeft <= 0) {
                clearInterval(interval);
                allDone();
                currentTime.textContent = timesUp;
             }   
            }, 1000) 
        }
        choices(questionIndex)

    });

    function choices (questionIndex){
        question.innerHTML = '';
        createUl.innerHTML = '';
        
        for (var i = 0; i < questions.length; i++) {

            var userQuestions = questions[questionIndex].title;
            var userChoices = questions[questionIndex].choices;
            question.textContent = userQuestions

        }

    

    userChoices.forEach(function (newItem){
        var listItem = document.createElement('li');
        listItem.textContent = newItem
        createUl.appendChild(listItem);
        question.appendChild(createUl);
        listItem.addEventListener('click',(compare));
    })
    }

    function compare(event) {
        var element = event.target;

        if(element.matches('li')){

            var div = document.createElement('div');
            div.setAttribute('id', 'div1');

            if (element.textContent == questions[questionIndex].answers) {
                score++;
                div.textContent = 'Correct! the answer is ' + questions[questionIndex].answers;
            }
            else{
                secondsLeft = secondsLeft - penalty ;
                div.textContent = 'Wrong correct answer is: ' + questions[questionIndex].answers;
            }
        }
    

    questionIndex++;

    if(questionIndex >= questions.length){

        allDone();
        div.textContent = 'End of quiz' +' '+ score + '/' + questions.length + 'Correct';
    }

    else{
        choices(questionIndex)
    }
    question.appendChild(div);
}

function allDone() {

    question.innerHTML = '';
    currentTime.innerHTML = '';

    var h1 = document.createElement('h1');
    h1.setAttribute('id', 'createH1')
    h1.textContent = 'All done!'

    question.appendChild(h1)

    var createElementP =document.createElement('p');
    createElementP.setAttribute('id', 'elementP');

    question.appendChild(createElementP);

    if  (secondsLeft >= 0){
        var timeRemaining = secondsLeft;
        var createElementP2 = document.createElement('p');
        clearInterval(interval)
        
        createElementP.textContent = 'Your final score is: ' + timeRemaining;

        question.appendChild(createElementP2)
    }

    var createLabel = document.createElement('label');
    createLabel.setAttribute('id', 'createLabel');
    createLabel.textContent = 'Enter your initials: ';

    question.appendChild(createLabel);

    var createInput = document.createElement('input');
    createInput.setAttribute('type', 'text');
    createInput.setAttribute('id', 'initials')
    createInput.textContent = '';

    question.appendChild(createInput)

    var createButton = document.createElement('button');
    createButton.setAttribute('type', 'submit');
    createButton.setAttribute('id','submit');
    createButton.textContent = "Submit"

    question.appendChild(createButton);

    createButton.addEventListener('click', function(){
        var initials = createInput.value;

        if(initials === null) {

            console.log ( 'no value entered!');
        }
        else{
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem('allScores');
            if(allScores === null){
                allScores = [];

            }
            else{
                allScores= JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem('allScores', newScore)
            window.location.replace('highscores.html');

           
        }
    });



}




   