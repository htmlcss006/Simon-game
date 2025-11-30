let defaultColors = ['green', 'red', 'blue', 'yellow']
let level = 1
let computerSequ = []
let userSequ = []


$('.start-btn').click(function () {
    $('.start-btn').hide()
    $('#title-level').html('Level: ' + level)
    computerSequence();
    userSequence();
});


function computerSequence() {
    let random = Math.round(Math.random() * 3)
    let randomColor = defaultColors[random]
    computerSequ.push(randomColor)
    
    $('.' + defaultColors[random]).fadeIn(180).fadeOut(180).fadeIn(180);
    playAudio(randomColor);
    
};


function userSequence() {
    $('.btn').click(function () {
        $(this).addClass('pressed')
        
        setTimeout(() => {
            $(this).removeClass('pressed')
        }, 120);
        
        let whichId = $(this).attr('id')
        playAudio(whichId);
        userSequ.push(whichId);
        
        
        console.log(computerSequ);
        console.log(userSequ);
        answerCheck();
    })
}

function answerCheck() {
    if (userSequ[userSequ.length - 1] === computerSequ[userSequ.length - 1]) {
        console.log('success');
        
        if (computerSequ.length === userSequ.length) {
            nextRound();
        };
        
    } else {
        gameOver();
    }
}

function nextRound() {
    userSequ = []
    
    level++
    $('#title-level').html('Level: ' + level)
    
    
    setTimeout(() => {
        
        computerSequence();
    }, 400);
};


function gameOver() {
    $('#title-level').html('Oops, try again!!')
    
    $('body').addClass('gameOver')
    setTimeout(() => {
        $('body').removeClass('gameOver')
    }, 100);
    
    playAudio('wrong');
    
    $('.btn').addClass('disable')
    
    $('.start-btn').parent().append('<button class="try-btn">Try Again!</button>')
    
    $('.try-btn').click(function () {
        
        $('.try-btn').remove()
        
        level = 1;
        userSequ = []
        computerSequ = []
        
        $('#title-level').html('Level: ' + level)
        
        $('.btn').removeClass('disable')

        setTimeout(function(){
            computerSequence();
        }, 300)
    })

};



function playAudio(src) {
    new Audio('sounds/' + src + '.mp3').play();
};

