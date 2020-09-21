score = 0;
cross = true;

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        pokemon = document.querySelector('.pokemon');
        pokemon.classList.add('animateDino');
        setTimeout(() => {
            pokemon.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) {
        pokemon = document.querySelector('.pokemon');
        dinoX = parseInt(window.getComputedStyle(pokemon, null).getPropertyValue('left'));
        pokemon.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        pokemon = document.querySelector('.pokemon');
        dinoX = parseInt(window.getComputedStyle(pokemon, null).getPropertyValue('left'));
        pokemon.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    pokemon = document.querySelector('.pokemon');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(pokemon, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(pokemon, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Collect The Pokemon Balls"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}