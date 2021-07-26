const tortoiseOne = document.querySelector(".tortoise-one");
const tortoiseTwo = document.querySelector(".tortoise-two");
const goButton = document.querySelector(".race-go");
let counterOne = 0;
let counterTwo = 0;
let winner;
let intervalId;
let isRacing = false;

// When the go button is clicked each tortoise is assigned a different random number for it's movements
// Each tortoise moves at it's own speed within a shared time interval defined by the setInterval method.
// If one of the tortoises crosses 60vw (end of race area), clear interval is called with the id variable created from the setInterval method
// an HTML element is created with a message that shows the winner

const startRace = () => {
    isRacing = true;
    let speedOne = Math.floor(1 + Math.random() * 5);
    let speedTwo = Math.floor(1 + Math.random() * 5);
    
    intervalId = setInterval(() => {
        tortoiseOne.style.transform =`translate(${speedOne + counterOne}vw)`;
        counterOne += speedOne;
        tortoiseTwo.style.transform =`translate(${speedTwo + counterTwo}vw)`;
        counterTwo += speedTwo;

        console.log({speedOne, speedTwo});
        console.log({counterOne, counterTwo});
        
        if (counterOne === 60 || counterTwo === 60) {
            stopRace();
            announceWinner();    
        }
        
    }, 500)
};

const stopRace = () => {
    clearInterval(intervalId);
    isRacing = false;
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
    const raceControls = document.querySelector('.race-controls');
    raceControls.appendChild(message);
}  

// Pause the game when the go button is clicked during the race
// Reset the tortoise positions and restart the race when go button is pressed at after the end of the race

// const pauseRace = () => {
//     if (isRacing) {
//         clearInterval(intervalId);
//     }
// }

goButton.addEventListener('click', startRace);

// Stretch goals:
    // input custom speeds to control which tortoise moves faster
    // this should correlate to the time interval milliseconds? 
    // requires breaking up the setInterval function into two seperate functions (one for each tortoise)
    
    // change tortoise representation to cartoon or photo / emoji

    // add inputs to name the tortoises

    // add user ability to add more tortoises to the race