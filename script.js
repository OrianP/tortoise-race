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
let pauseMessage;
let intervalId;

// When the go button is clicked each tortoise is assigned a different random number for it's movements
// Each tortoise moves at it's own speed within a shared time interval defined by the setInterval method.
// If one of the tortoises crosses 60vw (end of race area), clear interval is called with the id variable created from the setInterval method
// an HTML element is created with a message that shows the winner

const startRace = () => {
    goButton.classList.add('racing');
    goButtonText.classList.add('hide');
    pauseIcon.classList.remove('hide');

    pauseMessage = document.createElement('p');
    pauseMessage.textContent = `Can't handle the suspense? Pause the race and catch your breath`;
    raceControls.prepend(pauseMessage);

   
    intervalId = setInterval(() => {
        tortoiseOne.style.transform =`translate(${speedOne + counterOne}vw)`;
        counterOne += speedOne;
        tortoiseTwo.style.transform =`translate(${speedTwo + counterTwo}vw)`;
        counterTwo += speedTwo;

        console.log({speedOne, speedTwo});
        console.log({counterOne, counterTwo});
        
        if (counterOne === 60 || counterTwo === 60) {
            goButton.classList.add('end-of-race')
            pauseRace();
            announceWinner();    
        }
        
    }, 500)
};

// Pause the game when the go button is clicked during the race
// Reset the tortoise positions and restart the race when go button is pressed at after the end of the race

const pauseRace = () => {
     clearInterval(intervalId);
     goButton.classList.remove('racing');
     goButtonText.classList.remove('hide');
     pauseIcon.classList.add('hide');
     pauseMessage.remove();
    }

const resetGame = () => {
    console.log('reset')
    goButton.classList.remove('end-of-race');
    tortoiseOne.style.transform =`none`;
    counterOne = 0;
    tortoiseTwo.style.transform =`none`;
    counterTwo = 0;
    startRace();
}

const announceWinner = () => {
    let message = document.createElement('p');
    if (counterOne === 60 && counterTwo === 60) {
        message.textContent = `It's a tie!`;
    } else {
        if (counterOne === 60) {
            winner = 'Tortoise One';
        } else {
            winner = 'Tortoise Two';
        }
        message.textContent = `${winner} won the race!`;
        }

    raceControls.appendChild(message);
}  

goButton.addEventListener('click', () => {
    if (goButton.classList.contains('racing')) {
        pauseRace ();
    } else if (goButton.classList.contains('end-of-race')) {
        resetGame();
    } else {
        startRace();
    }
});


// Stretch goals:
    // input custom speeds to control which tortoise moves faster
    // this should correlate to the time interval milliseconds? 
    // requires breaking up the setInterval function into two seperate functions (one for each tortoise)
    
    // change tortoise representation to cartoon or photo / emoji

    // add inputs to name the tortoises

    // add user ability to add more tortoises to the race