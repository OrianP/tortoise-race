// Form 
const tortoises = []
const submitBtns = document.querySelectorAll('.submit-btn');

// Race
const tortoiseOne = document.querySelector(".tortoise-one");
const tortoiseTwo = document.querySelector(".tortoise-two");
const raceControls = document.querySelector('.race-controls');
const goButton = document.querySelector(".race-go");
const goButtonText = document.querySelector(".btn-txt");
const pauseIcon = document.querySelector(".race-pause");

let speedOne = Math.floor(1 + Math.random() * 5);
let speedTwo = Math.floor(1 + Math.random() * 5);
let counterOne = 0;
let counterTwo = 0;
let winner;
let winnerMessage;
let pauseMessage;
let intervalId;
let interval = 500;

// Not working
// only assigning the values from the first inputs selected by query selector.
// should I ditch the object idea?
const createTortoiseObj = () => {
    let tortoise = {
        name: document.querySelector('#name').value,
        speed: document.querySelector('#speed').value
    }
    tortoises.push(tortoise);
    console.log(tortoises);
}

submitBtns.forEach(btn => {
    btn.addEventListener('click', createTortoiseObj)
});

goButton.addEventListener('click', () => {
    if (goButton.classList.contains('racing')) {
        pauseRace ();
    } else if (goButton.classList.contains('end-of-race')) {
        resetGame();
    } else {
        startRace();
    }
});

// Race functions
const startRace = () => {
    // add a 'racing' class to manipulate whether the race is on, paused or ended
    goButton.classList.add('racing');
    // hide button text and display pause icon 
    goButtonText.classList.add('hide');
    pauseIcon.classList.remove('hide');
    // create and update the DOM with a message to let the user know they can pause the race by clicking the button
    pauseMessage = document.createElement('p');
    pauseMessage.textContent = `Can't handle the suspense? Pause the race and catch your breath`;
    raceControls.prepend(pauseMessage);

    // each tortoise is assigned a different random number for it's movements (distance traveled) 
    // each tortoise moves at it's own rate within a shared time interval defined by the setInterval method
    intervalId = setInterval(() => {
        tortoiseOne.style.transform =`translate(${speedOne + counterOne}vw)`;
        counterOne += speedOne;
        tortoiseTwo.style.transform =`translate(${speedTwo + counterTwo}vw)`;
        counterTwo += speedTwo;

        console.log({speedOne, speedTwo});
        console.log({counterOne, counterTwo});

        // If one of the tortoises crosses 60vw (end of race area), pause the race and announce the winner
        if (counterOne === 60 || counterTwo === 60) {
            goButton.classList.add('end-of-race')
            pauseRace();
            announceWinner();    
        }
        
    }, interval)
};

// pause the game when the go button is clicked during the race
// call clearInterval with the variable that is assigned the id created from setInterval method
// remove 'racing' class
// show button text and hide pause icon
const pauseRace = () => {
     clearInterval(intervalId);
     goButton.classList.remove('racing');
     goButtonText.classList.remove('hide');
     pauseIcon.classList.add('hide');
     pauseMessage.remove();
    }

// reset the tortoise positions and restart the race when go button is pressed after the end of the race
const resetGame = () => {
    console.log('reset')
    goButton.classList.remove('end-of-race');
    tortoiseOne.style.transform =`none`;
    counterOne = 0;
    tortoiseTwo.style.transform =`none`;
    counterTwo = 0;
    winnerMessage.remove();
    speedOne = Math.floor(1 + Math.random() * 5);
    speedTwo = Math.floor(1 + Math.random() * 5);
    startRace();
}
// create winner/tie announcement message and add to the DOM 
const announceWinner = () => {
    winnerMessage = document.createElement('p');
    if (counterOne === 60 && counterTwo === 60) {
        winnerMessage.textContent = `It's a tie!`;
    } else {
        if (counterOne === 60) {
            winner = 'Tortoise One';
        } else {
            winner = 'Tortoise Two';
        }
        winnerMessage.textContent = `${winner} won the race!`;
        }

    raceControls.appendChild(winnerMessage);
}  

// To do:
    // update the turtle names and speeds when button is submitted

    // input custom speeds to control which tortoise moves faster
    // assign the speed input as tortoise speed variables

    // requires breaking up the setInterval function into two seperate functions (one for each tortoise) and make setInterval method timing random 

// Stretch goals
    // change tortoise representation to cartoon or photo / emoji

    // add inputs to name the tortoises

    // add user ability to add more tortoises to the race