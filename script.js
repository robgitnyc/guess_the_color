const box1 = document.querySelector(".box-one");
const box2 = document.querySelector(".box-two");
const box3 = document.querySelector(".box-three");
const box4 = document.querySelector(".box-four");
const box5 = document.querySelector(".box-five");
const box6 = document.querySelector(".box-six");
const colorToGuess = document.querySelector(".colorToGuess");
const winLose = document.querySelector(".winLose");
const display2 = document.querySelector(".display2");
const playAgain = document.querySelector(".playAgain")
const displayLives = document.querySelector(".lives")
const displayScore = document.querySelector(".score")
const highest = document.querySelector(".highest")

let lives;
let score = 0;
let highestScore = 0;

const newButton =document.createElement("button");
newButton.setAttribute("type", "button"); 
newButton.setAttribute("class", "newButton"); 
newButton.textContent = "Play Again"


function colorBox() {
    display2.innerText = "";
    lives = 4;
    displayScore.textContent = `your score: ${score}`;
    displayLives.textContent = `lives left: ${lives}`;
    let storedHighest = localStorage.getItem('highestScore');
    highest.textContent = `highest score: ${storedHighest}`;


    const boxes = document.querySelectorAll(".box");  
   

    for (const box of boxes) {

        box.addEventListener("click", youLose);

        
        let color = randomColor();
        box.style.backgroundColor = color;

        console.log(window.getComputedStyle(box).getPropertyValue("background-color"));
    }

    let mysteryColor = (window.getComputedStyle(boxes[getRandomInt(0,boxes.length)]).getPropertyValue("background-color"));
    colorToGuess.textContent = mysteryColor;
    
    function youLose() {
        display2.innerText = "nope...";
        display2.classList.remove("win")

        display2.classList.add("lose");

        lives--;
        displayLives.textContent = `lives left: ${lives}`;

        if (lives === 0) {
            display2.innerText = "You lost. ";
            display2.appendChild(newButton);
            display2.classList.remove("win")

            display2.classList.add("lose");
            displayScore.textContent = `your score: ${score}`;
            
            score = 0;

            for (const box of boxes) {
                box.removeEventListener("click", youLose);
                box.removeEventListener("click", youWin);


            }
        }
    }
    function youWin() {

            display2.innerText = "...Yes! You WON. ";
            display2.appendChild(newButton);
            display2.classList.remove("lose")
            display2.classList.add("win");
            score++;
            displayScore.textContent = `your score: ${score}`;

            for (const box of boxes) {
                box.removeEventListener("click", youLose);
                box.removeEventListener("click", youWin);


            }
        
    }
    

    for (const box of boxes) {
        if (window.getComputedStyle(box).getPropertyValue("background-color") === mysteryColor) {
            
            box.removeEventListener("click", youLose);
            box.addEventListener("click", youWin);
        } 
       
      
    }

    if (score > highestScore) {
        highestScore = score;
    }

    localStorage.setItem('highestScore',highestScore);



}


function randomColor() {
    return `rgb(${getRandomInt(0,256)},${getRandomInt(0,256)},${getRandomInt(0,256)})`;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

colorBox();

newButton.addEventListener("click", () => {
    colorBox();
})