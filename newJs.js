globalFunction();
function globalFunction() {
  // current issues:
  // when page loads user can input 1 but it does not count since the user input is
  async function gainsheet() {
    const response = await fetch("https://sudoku-api.vercel.app/api/dosuku");
    const rawAPI = await response.json();
    setGame(rawAPI);
  }
  window.load = gainsheet();

  //fetch function

  var timerCount = 0;
  var error = 0;
  var timer;
  var fin = false;
  var saveUserChoice = 0;
  var gameResultList = [];

  var emptyStartTile_Number;
  var solvedTile_Number;

  endGameJump = document.querySelector("#endGameJump");
  endGameJump.addEventListener("click", () => {
    endGame();
    console.log("Cheat-Actv");
  });

  let numberBarGeneration = () => {
    for (let i = 1; i <= 9; i++) {
      
      //<div id=i class number> i <div>
      //for each i repeat <div> above
      let numberBox = document.createElement("div");
      numberBox.id = i;
      numberBox.innerText = i;
     
  
      //interactive with selectNumber()

      numberBox.addEventListener("click", function () {
        userChoice = numberBox.id;
        if (saveUserChoice != userChoice) {
          let removeShading = document.getElementById(saveUserChoice);
          //the problem here is there is no numberBox.id = i = 0 // however this try catch will circumvent this issue
          try {
            removeShading.classList.remove("number-selected");
          } catch {
            console.log("0 start");
          }
          // removeShading.classList.remove('number-selected')
        }
        saveUserChoice = numberBox.id;
        numberBox.classList.add("number-selected");
      });
      numberBox.classList.add("number");

      document.getElementById("digits").appendChild(numberBox);
     
    }
  };
  let box_text;
  function sudokuGridGeneration() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        let box = document.createElement("div");
        box_text = document.createElement("div");
        //isolation of text to edit text
        box.id = r + "-" + c;
        box.appendChild(box_text);
        if (boardValue[r][c] != "0") {
          box_text.innerText = boardValue[r][c];
          box.classList.add("box-start");
        } else {
          box.classList.add("fiftyfifty");
          box.classList.add("box-empty");
          box_text.classList.add("hidden");
        }
        if (r == 2 || r == 5) {
          box.classList.add("horizontal-line");
        }
        if (c == 2 || c == 5) {
          box.classList.add("vertical-line");
        }
        box.classList.add("box");
        document.getElementById("board").append(box);
      }
    }
    let emptyStartTile_Class = ".box-empty";
    emptyStartTile_Number = get_class_Number(emptyStartTile_Class);
    console.log(emptyStartTile_Number);
  }

  var boardSolution;
  var boardValue;
  let userChoice;

  function setGame(rawAPI) {
    boardSolution = rawAPI.newboard.grids[0].solution;
    boardValue = rawAPI.newboard.grids[0].value;

    console.log(boardValue);
    //digit 1-9 input bar
    numberBarGeneration();
    //board 9x9
    sudokuGridGeneration();
    boxempty();
    timerGo();

    console.log;
  }

  let userBoxSelected;
  let boxempty = () => {
    const boxStart = document.querySelectorAll(".box-empty");
    //add eventlistener to each emptybox that has a class .box-empty
    boxStart.forEach((emptyBox) => {
      emptyBox.addEventListener("click", () => {
        //click functions!
        console.log(error);
        if (error > 10) {
          alert("You lost, need to redo");
          newPuz();
        } else {
          console.log("haven't lose yet");
        }

        document.getElementById("myAudio").play();
        //music!
        if (saveUserChoice != 0) {
          box_text.classList.remove("hidden");
          userBoxSelected = document.getElementById(`${emptyBox.id}`);

          const r = emptyBox.id.split("-")[0];
          const c = emptyBox.id.split("-")[1];
          userBoxSelected.textContent = saveUserChoice;
          //parses the user input into value array to compare for endgame

          // userboxslected = users chosen box from bottom row however saveuserchoice = 1
          if (userChoice == boardSolution[r][c]) {
            userBoxSelected.classList.add("solved");
            try {
              userBoxSelected.classList.remove("red-text");
            } catch {
              console.log("no red text");
            }
          } else if (userChoice != boardSolution[r][c]) {
            increaseTimer(5);
            error_bar = document.querySelector(".error_bar");
            error_bar.textContent += "X";
            error = error + 1;
            userBoxSelected.classList.add("red-text");
          } else {
            return;
          }
        }
        let solvedTile_Class = ".solved";
        solvedTile_Number = get_class_Number(solvedTile_Class);
        //end game condition below
        if (solvedTile_Number == emptyStartTile_Number) {
          setTimeout(endGame, 1000);
        }
      });
    });
  };

  function get_class_Number(className) {
    let varClassTag = document.querySelectorAll(className);
    varClassTag_Number = varClassTag.length;

    return varClassTag_Number;
  }

  function endGame() {
    const jsConfetti = new JSConfetti();

    jsConfetti.addConfetti({
      emojis: ["🚗", "✨", "💫", "🌸", "🐈"],
      confettiRadius: 8,
      confettiNumber: 400,
    });

    jsConfetti.addConfetti();

    // setting fin = true stops timer
    //need to add a val checker to make sure use inputs something, if statements?
    // fin stops the timer
    fin = true;
    $("#exampleModalCenter").modal("toggle");
    $("#saveNameBtn").on("click", function () {
      //these lets can be condensed later
      let fName = $("#recipient-Fname").val();
      let lName = $("#recipient-Lname").val();
      let person = fName + ` ${lName}`;
      console.log(fName, lName, person);
      localSaveGame(fName, lName);
      //all the code below for the ramainder of this function can be turned into one function and called
      $("#recipient-Fname").val("");
      $("#recipient-Lname").val("");
      $("#exampleModalCenter").modal("toggle");
    });
    $(".close").on("click", function () {
      $("#recipient-Fname").val("");
      $("#recipient-Lname").val("");
      $("#exampleModalCenter").modal("toggle");
    });
    $("#closeModal").on("click", function () {
      $("#recipient-Fname").val("");
      $("#recipient-Lname").val("");
      $("#exampleModalCenter").modal("toggle");
    });
  }

  function localSaveGame(firstName, lastName) {
    // add firstName, lastName if not entered
    if (!lastName) {
      if (!firstName) {
        firstName = "Gary";
        lastName = "Alves";
      } else {
        lastName = "aka Sudoku-Master";
      }
    } else {
      console.log(`${firstName} ${lastName}!`);
    }
    //retrieve gameResult from local storage, if available
    if (localStorage.getItem("gameResult") === null) {
      gameResultList = [];
    } else {
      gameResultList = JSON.parse(localStorage.getItem("gameResult"));
      console.log(gameResultList);
    }

    //create string of fn, ln, error# and time
    let gameResultData = [];
    gameResultData.push(firstName, lastName, error, timerCount);
    console.log(gameResultData);
    //push string to string of strings
    gameResultList.push(gameResultData);
    //save to local storage
    let gameResultString = JSON.stringify(gameResultList);
    localStorage.setItem("gameResult", gameResultString);
  }

  //timer function with clear interval for endgame
  function increaseTimer(num) {
    timerCount += num;
    document.getElementById("timer").textContent = `Time: ${timerCount}`;
    if (fin) {
      clearInterval(timer);
    }
  }

  let btnPrimary = document.getElementById("newPuz");
  btnPrimary.addEventListener("click", newPuz);

  function newPuz() {
    //this location.reload() is a workaround for now. better functionality would be to reload the content and reset the timer without loading the entire page again
    location.reload();
    console.log($("#board"));
    console.log("click");
  }

  function timerGo() {
    timer = setInterval(function () {
      increaseTimer(1);
    }, 1000);
  }

  //function for selectingNumber under
  function selectNumber() {
    boardValue = this;
    boardValue.classList.add("number-selected");
  }
}
