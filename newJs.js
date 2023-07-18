


//define raw API data for storage
var raw;
//this raw doesn't do anything, i don't know why

async function gainsheet() {
  const response = await fetch("https://sudoku-api.vercel.app/api/dosuku");
  const rawAPI = await response.json();
  setGame(rawAPI)
  console.log(rawAPI)
}

window.load = gainsheet()
//run as window open


//asign cordnite for number selected also tile that is selected
//error feature for scoring
var numberSelected = null
var tileSelected = null;
var error = 0;
var pineapple = 1;
//trying to fucking get the board, it doesn't let me extract the property of raw what the heck


//start game once window load 
// window.onload = gainsheet()


function setGame(data) {
  let userChoice;
  let boardSolution = data.newboard.grids[0].solution;
  let boardValue = data.newboard.grids[0].value;
  console.log(boardValue)
  //digit 1-9 input bar
  for (let i = 1; i <= 9; i++) {
    //<div id=i class number> i <div>
    //for each i repeat <div> above
    let numberBox = document.createElement('div')
    numberBox.id = i
    numberBox.innerText = i
    //interactive with selectNumber()
    
    numberBox.addEventListener('click', function () {
      userChoice = numberBox.id
      console.log(pineapple)
      if (pineapple != userChoice){
        let cat = document.getElementById(pineapple)
        cat.classList.remove('number-selected')
      }  //chris
      pineapple = numberBox.id //chris
      // numberBox.classList.remove('number-selected') //chris
      // try {numberBox.classList.remove('number-selected')} //chris
      // catch{console.log('remove grey')} //chris
      console.log(userChoice)
      console.log(numberBox.id)
      console.log(pineapple)
      numberBox.classList.add('number-selected')  //chris
    });
    numberBox.classList.add('number')
    
    document.getElementById('digits').appendChild(numberBox)
  }

  //board 9x9, easy!
  for (let r = 0; r < 9; r++) {
    //each row and each col
    for (let c = 0; c < 9; c++) {
      let box = document.createElement('div');

      box.id = r + '-' + c;
      if (boardValue[r][c] != '0') {
        box.innerText = boardValue[r][c]
        box.classList.add('box-start')
        //skipping 0 in the begining value
      } else {
        box.classList.add('box-empty')
        box.innerText = ''
      }
      if (r == 2 || r == 5) {
        box.classList.add('horizontal-line')
      }
      if (c == 2 || c == 5) {
        box.classList.add("vertical-line");
        //add line
      }

        box.id = r + '-' + c;
        if(boardValue[r][c] != '0'){
          box.innerText = boardValue[r][c]
          box.classList.add('box-start')
          //skipping 0 in the begining value
        } else {
          box.innerText = ''
        }
        if (r == 2 || r == 5){
          box.classList.add('horizontal-line')}
        if (c == 2 || c == 5) {
          box.classList.add("vertical-line");
          //add line
        }
      // box.addEventListener("click", function(){
      //   let userBoxSelected = document.getElementById(`${box.id}`)
      //   // console.log(`cord box ${box.id}`)
      //   //lets user select number and fill box, need if statement to deny filled boxes 
      //  if (this.innerText != ''){
      //   return
      //  } else {
      //     userBoxSelected.textContent = userChoice;
      //     userBoxSelected.classList.remove('red-text')
      //     if(userChoice != boardSolution[r][c]){
      //       error = error +1
      //       console.log('bummer dude')
      //       console.log(error)
      //       userBoxSelected.classList.add('red-text')
      //     }
      //     // else{
      //     //   userBoxSelected.classList.remove('red-text')
      //     //   // try {userBoxSelected.classList.remove('red-text')}
      //     //   // catch{console.log('no red text')}
      //     // }
        
      // }
      //   // userBoxSelected.textContent = userChoice // this can be deleted for final product
      // });
          
          // console.log(`cord box ${box.id}`));
          
      box.classList.add("box");
      document.getElementById("board").append(box);

    }
  }
  const boxStart = document.querySelectorAll('.box-empty');
  console.log(boxStart)

  boxStart.forEach(function (emptyBox) {
    emptyBox.addEventListener("click", function () {
      let userBoxSelected = document.getElementById(`${emptyBox.id}`)
      console.log('click')
      const r = emptyBox.id.split('-')[0]
      const c = emptyBox.id.split('-')[1]
      userBoxSelected.textContent = userChoice;

      if (userChoice == boardSolution[r][c]) {
        console.log("it's a match")
        try {userBoxSelected.classList.remove('red-text')}
        catch{console.log('no red text')}
      }
      else {
        error = error + 1
        console.log('bummer dude')
        console.log(error)
        userBoxSelected.classList.add('red-text')
        //currently we cannot overwrite wrong answers::: to fix make event listener target only empty boxes::: need if statement to return if userchoice is empty
      }

    });
  })
}


//need current selector for user selection

//function for selectingNumber under 
function selectNumber() {
  boardValue = this;
  boardValue.classList.add('number-selected')
  console.log(boardValue)
}

