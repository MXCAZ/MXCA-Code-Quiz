

var highscores = document.querySelector('#highscore')
var clear = document.querySelector('#clear')
var goBack = document.querySelector('#go-back')


clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
});

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null){

    for( var i = 0; i < allScores.length; i ++){

        var createLi = document.createElement('li');
        createLi.setAttribute('id', 'box')
        createLi.textContent = allScores[i].initials + ' ' + allScores[i].score;
        highscores.appendChild(createLi);
    }
}

goBack.addEventListener('click', function(){
    window.location.replace('index.html')
})