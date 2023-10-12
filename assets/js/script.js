document.addEventListener("DOMContentLoaded", function () {

  /**Art of memory variables*/
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
  let seconds = 0; /**Initial Time:seconds*/
  let minutes = 0; /**Initial Time: minutes*/
  let movesCount = 0; /**Initial moves*/
  let winCount = 0; /**Initial win count*/


  /**Array for cards:
   * Used in: 
   * - generateRandom
   * - tempArray
   * - randomIndex
   * - matrixGenerator 
   * @return cardvalue */

  const items = [{
      name: "Memo1",
      image: "assets/images/mem1.webp"
    },
    {
      name: "Memo2",
      image: "assets/images/mem2.webp"
    },
    {
      name: "Memo3",
      image: "assets/images/mem3.webp"
    },
    {
      name: "Memo4",
      image: "assets/images/mem4.webp"
    },
    {
      name: "Memo5",
      image: "assets/images/mem5.webp"
    },
    {
      name: "Memo6",
      image: "assets/images/mem6.webp"
    },
    {
      name: "Memo7",
      image: "assets/images/mem7.webp"
    },
    {
      name: "Memo8",
      image: "assets/images/mem8.webp"
    },
  ];

 /**Time calcultor:
   * Used in: 
   * timeGenerator
   * Format time befor display
   * @return ${minutesValue}:${secondsValue} */
 
  const timeGenerator = () => {
        seconds += 1;
          if (seconds >= 60) {
          minutes += 1;
          seconds = 0;
    }
      let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
      let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
      timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

/**Move counter:
   * Used in: 
   * movesCounter
   * @return ${movesCount} */
  const movesCounter = () => {
        movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
  };

   /**select cards in ArtMemeory:
   * Used in: 
   * generateRandom
   * tempArray
   * randomIndex
   * matrixGenerator 
   * once selected remove the object from temp array in tempArray.splice
   * @return cardValues*/
 
  const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
      size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
  const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }
  return cardValues;
  };

/**Shuffle cards in ArtMemeory:
   * Used in: 
   * matrixGenerator : Generate card from Cardarray > Random index
   * shuffle cards: cardValues.sort(() => Math.random() - 0.5)
   * @return cardValues*/

  const matrixGenerator = (cardValues, size = 4) => {
        gameContainer.innerHTML = "";
        cardValues = [...cardValues, ...cardValues];
  
        cardValues.sort(() => Math.random() - 0.5);
      for (let i = 0; i < size * size; i++) {

/**Display cards in game container:
    * Card before => front side  
    * Card after => back side (selected card when flipped)
    * Eventlistener active: onclick */
   
   
    gameContainer.innerHTML += 
      `<div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before"> </div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/> </div></div>  `;
    
        gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
        cards = document.querySelectorAll(".card-container");
        cards.forEach((card) => {
        card.addEventListener("click", () => {

/** functions when match and no match:
    * If: firstCardValue == secondCardValue
    * increment moves since user selected second card
    * increase wincount if match
    * if: winCount == half of cardValues
    * if no match: flip back to front card */
   
        if (!card.classList.contains("matched")) {
            card.classList.add("flipped"); 

        if (!firstCard) {
            firstCard = card;
            firstCardValue = card.getAttribute("data-card-value");  } 
        else {
            movesCounter();
            secondCard = card;

        let secondCardValue = card.getAttribute("data-card-value");
            if (firstCardValue == secondCardValue) {
                firstCard.classList.add("matched");
                secondCard.classList.add("matched");
                firstCard = false;
                winCount += 1; 
           
        if (winCount == Math.floor(cardValues.length / 2)) {
            result.innerHTML = `<h2>Hurray - You won!</h2>
                                <h4>Moves: ${movesCount}</h4>`;
                                stopGame();
         }

          } 
             else {
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


 /** functions when user start game:
    * When click on startbutton: control visibility of startbutton
    * Timer and moves counter shows in game area*/

          startButton.addEventListener("click", () => {
          movesCount = 0;
          seconds = 0;
          minutes = 0;
          
            controls.classList.add("hide");
            stopButton.classList.remove("hide");
            startButton.classList.add("hide");
                  
            interval = setInterval(timeGenerator, 1000);
            moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
            initializer();
  });

   /** functions when user stop the game:
    * When click on stop button: control visibility of buttons
    * Goes back to welcome page*/
  
        stopButton.addEventListener( "click", (stopGame = () => {
            controls.classList.remove("hide");
            stopButton.classList.add("hide");
            startButton.classList.remove("hide");
            clearInterval(interval);
    })
  );
 /** Inizilize function and call of values */
        const initializer = () => {
              result.innerText = "";
              winCount = 0;
        let cardValues = generateRandom();
            console.log(cardValues);
            matrixGenerator(cardValues);
  };
  }})