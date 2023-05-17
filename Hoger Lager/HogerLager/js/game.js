/*
    Authors: Dawid Kaprol, Sulaiman Hussain
*/


const scoreBoard = document.querySelector('.score-counter');
const dice = document.querySelectorAll('.dice');
const rollButton = document.querySelector('.roll-button');
let playerPointsBoard;
const playerName = document.querySelector('.player-points');
const bankPointsBoard = document.querySelector('.bank-points > p');





let turn = 0;
let playerPoints = 10;
let bankPoints = 10;
let guessHigher;
let pRolled = 0;
let bRolled = 0;

const diceLookup = [
    '../media/images/dice/1.png',
    '../media/images/dice/2.png',
    '../media/images/dice/3.png',
    '../media/images/dice/4.png',
    '../media/images/dice/5.png',
    '../media/images/dice/6.png'
]


function checkWin() {
    let wonOrLost = false;
    if (playerPoints <= 0) {
        playAgain = confirm('You lost! Click ok to play again, or cancel to leave.');
    } else if (bankPoints <= 0) {
        playAgain = confirm('You won! Click ok to play again or cancel to leave.');
    }
    if (wonOrLost) {
        if (playAgain) {
                const url = document.createElement('a');
                url.setAttribute('href', window.location.href);
                const port = url.port;
                window.location.href = `http://localhost:${port}`;
        } else {
            window.close();
        }

    }
    
}

function getRandom(max) {
    return Math.max(Math.round(Math.random() * max), 1);
}

function displayDice(scores) {
    scores.forEach((d, i) => {
        dice[i].src = diceLookup[d-1];
    })
}

function updateBoard(score) {
    if (score != -1){
        scoreBoard.innerHTML = score;
    }
    playerPointsBoard.innerHTML = playerPoints;
    bankPointsBoard.innerHTML = bankPoints;
}


function roll() {
    const diceScores = [getRandom(6), getRandom(6), getRandom(6)];
    const score = diceScores[0] + diceScores[1] + diceScores[2];
    displayDice(diceScores);
    updateBoard(score);
    return score;
}

rollButton.addEventListener('mousedown', () => {
    if (turn % 2 == 0) {
        pRolled = roll();
        rollButton.innerHTML = 'bank⟳';
        turn++;
        alert(`You rolled ${pRolled}!`);
        guessHigher = confirm(`Do you think that the bank will roll higher than ${pRolled}? {Ok: Yes, Cancel: No}`);

    } else {
        bRolled = roll();
        updateBoard(bRolled);
        alert(`bank rolled ${bRolled}`);
        if (guessHigher) {
            if (bRolled > pRolled) { 
                playerPoints += bRolled - pRolled; 
                bankPoints -= bRolled - pRolled; 
                alert(`you won ${bRolled - pRolled} points!`);
            }
            else { 
                playerPoints += bRolled - pRolled; 
                bankPoints -= bRolled - pRolled; 
                alert(`you lost ${pRolled - bRolled} points!`);
            }
        } else {
            if (bRolled > pRolled) { 
                playerPoints -= bRolled - pRolled; 
                bankPoints += bRolled - pRolled; 
                alert(`you lost ${bRolled - pRolled} points!`);
            }
            else { 
                playerPoints += pRolled - bRolled; 
                bankPoints -= pRolled - bRolled; 
                alert(`you won ${pRolled - bRolled} points!`);
            }
        }
        turn++;
        rollButton.innerHTML = 'Roll';
        updateBoard(-1);
        checkWin();
    }
    
})

function initGame() {
    playerName.innerHTML = `${nickname}'s Points: <br><div></div>`;
    playerPointsBoard = document.querySelector('.player-points > div');
    updateBoard(-1);
}

