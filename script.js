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
const test = document.querySelector(".test");
const buttonTest = document.querySelector(".buttonTest")


const newButton =document.createElement("button");
newButton.setAttribute("type", "button"); 
newButton.setAttribute("class", "newButton"); 
newButton.textContent = "Play Again";

let score = 0;
if (localStorage.getItem("maxScore")===null) {
    localStorage.setItem("maxScore", 0);
}

function colorBox() {
    let maxScoreGlobal = localStorage.getItem("maxScore");
    highest.textContent = "HIGHEST SCORE: "+ maxScoreGlobal;
    let lives = 3;
    colorToGuess.style.color = "white";
    


    

    display2.innerText = "";
    displayScore.textContent = `your score: ${score}`;
    displayLives.textContent = `lives left: ${lives}`;
    


    const boxes = document.querySelectorAll(".box");  
   

    for (const box of boxes) {

        box.addEventListener("click", minusLife);
        box.addEventListener("click", () => {
            
           
        });
        let color = randomColor();
        box.style.backgroundColor = color;
        

    }

    let mysteryColor = (window.getComputedStyle(boxes[getRandomInt(0,boxes.length)]).getPropertyValue("background-color"));
    colorToGuess.textContent = mysteryColor;
    

    function minusLife() {
        display2.innerText = "nope...";
        display2.style.color = "black";
        setTimeout(()=>{
            display2.style.color = "red";}, 100

        )
        

     //   display2.classList.add("lose");

        lives--;
        displayLives.textContent = `lives left: ${lives}`;

        if (lives === 0) { // you lose
            display2.innerText = "You lost. ";
            display2.appendChild(newButton);
            display2.style.color = "white";

     //       display2.classList.add("lose");
            displayScore.textContent = `your score: ${score}`;
            displayLives.textContent = ``;

          

            score = 0;

            for (const box of boxes) {
                box.removeEventListener("click", minusLife);
                box.removeEventListener("click", youWin);


            }
        }
    }
    function youWin() { // plus point

            display2.innerText = "That's right!";
            display2.appendChild(newButton);
            display2.style.color = "white";
            display2.style.color = mysteryColor;
            colorToGuess.style.color = mysteryColor;
        //    this.classList.add("flashBorder");
            
            score++;
            if (score > localStorage.getItem("maxScore")) {
                localStorage.setItem("maxScore", score);
            }
            
           let maxScore = localStorage.getItem("maxScore");
           console.log(maxScore);
            displayScore.textContent = `your score: ${score}`;
            displayLives.textContent = "";



            for (const box of boxes) {
                box.removeEventListener("click", minusLife);
                box.removeEventListener("click", youWin);


            }
        
    }
    

    for (const box of boxes) {
        if (window.getComputedStyle(box).getPropertyValue("background-color") === mysteryColor) {
            
            box.removeEventListener("click", minusLife);
            box.addEventListener("click", youWin);
        } 
       
      
    }



    
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

// let storedTest;

// buttonTest.addEventListener("click", () => {
//     localStorage.setItem('testStorage', "lulululu");
//     storedTest = localStorage.getItem("testStorage");
//     test2();

// })
// test.textContent = localStorage.getItem("testStorage");



