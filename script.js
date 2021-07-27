// Form variables
const forms = document.querySelectorAll('form');
const submitBtns = document.querySelectorAll('.submit-btn');
const infoBoards = document.querySelectorAll('.tortoise-info');

// Race variables
const tortoiseOne = document.querySelector(".tortoise-one");
const tortoiseTwo = document.querySelector(".tortoise-two");
const raceControls = document.querySelector('.race-controls');
const goButton = document.querySelector(".race-go");
const goButtonText = document.querySelector(".btn-txt");
const pauseIcon = document.querySelector(".race-pause");
let speedOne;
let speedTwo;
let counterOne = 0;
let counterTwo = 0;
let nameOne;
let nameTwo;
let winner;
let winnerMessage;
let pauseMessage;
let intervalId;
let interval = 500;
// let intervalOne = Math.floor(1 + Math.random() * 5);
// let intervalTwo = Math.floor(1 + Math.random() * 5);

// Event listeners

submitBtns[0].addEventListener('click', () => {
    getUserInput(forms[0], infoBoards[0])
});

submitBtns[1].addEventListener('click', () => {
    getUserInput(forms[1], infoBoards[1])
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

// Form function 
const getUserInput = (form, info) => {
    // get input values
    const name = form.querySelector('#name').value;
    const speed = form.querySelector('#speed').value; 

    // display user input on info board
    info.querySelector('.name-display').textContent = name;
    info.querySelector('.speed-display').textContent = `Speed: ${speed}mph`;

    // update race speed variables
    speedOne = parseInt(forms[0].querySelector("#speed").value);
    speedTwo = parseInt(forms[1].querySelector("#speed").value);

    // update name variables for winner announcement
    nameOne = forms[0].querySelector("#name").value;
    nameTwo = forms[1].querySelector("#name").value;
    console.log({speedOne, speedTwo});
    console.log({nameOne, nameTwo});
}

// Race functions
const startRace = () => {
    // add a 'racing' class to manipulate whether the race is on, paused or ended in subsequent race functions
    goButton.classList.add('racing');

    // hide button text and display pause icon 
    goButtonText.classList.add('hide');
    pauseIcon.classList.remove('hide');

    // create and update the DOM with a message to let the user know they can pause the race by clicking the button
    pauseMessage = document.createElement('p');
    pauseMessage.textContent = `Can't handle the suspense? Pause the race and catch your breath`;
    raceControls.prepend(pauseMessage);

    // assign each tortoise the user input speed in vw units for it's movements (distance traveled) 
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
            goButton.classList.add('end-of-race');
            goButtonText.textContent = 'Reset';
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

// reset the tortoise positions, form inputs and info board displays when go button is pressed after the end of the race
const resetGame = () => {
    // form and display reset
    forms.forEach(form => form.reset());
    infoBoards[0].querySelector('.name-display').textContent = `Tortoise One`;
    infoBoards[1].querySelector('.name-display').textContent = `Tortoise Two`;
    infoBoards.forEach(board => board.querySelector('.speed-display').textContent = '');

    // remove 'end-of-race' class
    goButton.classList.remove('end-of-race');
    // reset go button text 
    goButtonText.textContent = `Go!`
    // reset tortoise positions 
    tortoiseOne.style.transform =`none`;
    tortoiseTwo.style.transform =`none`;
    // reset counters and speeds
    counterOne = 0;
    counterTwo = 0;
    speedOne = 0;
    speedTwo = 0;
    winnerMessage.remove();
}

// create winner/tie announcement message and add to the DOM 
const announceWinner = () => {
    winnerMessage = document.createElement('p');
    winnerMessage.classList.add('winner-announcement')
    if (counterOne === 60 && counterTwo === 60) {
        winnerMessage.textContent = `It's a tie!`;
    } else {
        if (counterOne === 60) {
            winner = nameOne;
        } else {
            winner = nameTwo;
        }
        winnerMessage.textContent = `${winner} won the race!`;
        }

    raceControls.appendChild(winnerMessage);
}  

// To do:
    // Set randomly timed intervals for each tortoise
    // requires breaking up the setInterval function into two seperate functions (one for each tortoise) 

// Stretch goals
    // change tortoise representation to cartoon or photo / emoji
    // add user ability to add more tortoises to the race
    // display user message to complete form first if they try to start the race without inputing name and speed.