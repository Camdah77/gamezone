document.addEventListener("DOMContentLoaded", function() {


const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;
let seconds = 0, /*Initial Time:seconds*/
    minutes = 0; /*Initial Time: minutes*/
let movesCount = 0, /*Initial moves*/
    winCount = 0; /*Initial win count*/

/*Array for cards:*/
    const items =[
        {name:"Memo1", image:"assets/images/mem1.webp"},
        {name:"Memo2", image:"assets/images/mem2.webp"},
        {name:"Memo3", image:"assets/images/mem3.webp"},
        {name:"Memo4", image:"assets/images/mem4.webp"},
        {name:"Memo5", image:"assets/images/mem5.webp"},
        {name:"Memo6", image:"assets/images/mem6.webp"},
        {name:"Memo7", image:"assets/images/mem7.webp"},
        {name:"Memo8", image:"assets/images/mem8.webp"},
        {name:"Memo9", image:"assets/images/mem9.webp"},
    ];

/*Timegenerator*/
const timeGenerator = () => {
  seconds += 1;
/*minutes logic*/
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }

/*format time before displaying*/
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

/*For calculating moves*/
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

/*Pick random objects from the items array*/
const generateRandom = (size = 4) => {

/*temporary array*/
  let tempArray = [...items];

/*initializes cardValues array*/
  let cardValues = [];

/*size should be double (4*4 matrix)/2 since pairs of objects would exist*/
  size = (size * size) / 2;

/*Random object selection*/
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);

  /*once selected remove the object from temp array*/
  tempArray.splice(randomIndex, 1);  }
  return cardValues;};

/*Generate card from Cardarray > Random index*/
const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];

/* shuffle cards*/
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
  
  /* Card before => front side 
     Card after => back side (contains actual image)*/
gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before"></div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
 /*Grid*/
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
  /*Cards*/
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {

/*Events match vs no match */
  if (!card.classList.contains("matched")) {
      card.classList.add("flipped"); /*Flip card*/

/*Cards match */
      if (!firstCard) {
           firstCard = card;
           firstCardValue = card.getAttribute("data-card-value");
        } else {
           movesCounter(); /*increment moves since user selected second card*/
          secondCard = card; /*Second card and value*/
          let secondCardValue = card.getAttribute("data-card-value");
       if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
             firstCard = false;
             winCount += 1; /*increase wincount*/
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>Hurray - You won!</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }

 /*Cards not match */              
          } else {
              let [tempFirst, tempSecond] = [firstCard, secondCard];
              firstCard = false;
              secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};
//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;

  //Control the visibility buttons 
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");

  //Start timer
  interval = setInterval(timeGenerator, 1000);

  //Counting moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});
//Stop game- goes back to welcome page
stopButton.addEventListener(
  "click",
  (stopGame = () =>  {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  }) 
 );
//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
})