// fatching elements

const game_Info = document.querySelector(".gameInfo");
const boxes = document.querySelectorAll(".box");
const button = document.querySelector(".btn");

// global variables
let currentPlayer = "X";
let gridGame = [ "", "", "", "", "", "", "", "", "" ];


const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function initGame(){

    // always when game start X player will start the game
    currentPlayer = "X";

    // displaying the current player on ui
    game_Info.innerText = `Current Player - ${currentPlayer}`;

    // erasing all the boxes for the new game
    boxes.forEach( (box , index ) => {
        box.innerText = "";

        // removing green background by adding default class in boxes
        box.classList = `box box${index + 1}`

        // at new game we have to allow cursor to select because we have set it to unselect after finding winner
        box.style.pointerEvents = "all";
        
    } );

    // erasing the track of game
    gridGame = [ "", "", "", "", "", "", "", "", "" ];

}
initGame();


// swapping player
function swapPlayer(){
    if( currentPlayer === "X" ){
        // initializing O player
        currentPlayer = "O";
        
        //changing player turn
        game_Info.innerText = `Current Player - ${currentPlayer}`;


    }
    else{
        currentPlayer = "X";
        game_Info.innerText = `Current Player - ${currentPlayer}`;
    }
}

function wincheck(){

    winningPosition.forEach( (position) => {
        if( (gridGame[position[0]] !== "" &&  gridGame[position[1]] !== "" && gridGame[position[2]] !== "") && ( gridGame[position[0]] === gridGame[position[1]] && gridGame[position[1]] === gridGame[position[2]] ) ){
            // displaying the winner on ui
            game_Info.innerText = `Winner Player - ${gridGame[position[0]]}`;

            // makeing restart button visible
            button.classList.add("active");

            // making cursore unable to select so after winning no one can click after
            boxes.forEach( (box) => {
                box.style.pointerEvents = "none";
            } );

            // making background green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

        let boxCount = 0;
        // if match tied
        boxes.forEach( ( box ) => {
            if( box.innerText != "" ){
                boxCount++;
            }
        } );

        if( boxCount == 9 ){
            game_Info.innerText = "Match Tied !!";
        }



    } );

}

// handling clicked function
function handleclick(index){
    console.log("entered");
    if( gridGame[index] == "" ){
        // displaying on ui
        boxes[index].innerText = currentPlayer;
        
        // inserting into inside track
        gridGame[index] = currentPlayer;

        // swap player
        swapPlayer();

        // checking player has won or not
        wincheck();
    }
}

// clicking on boxes
boxes.forEach( ( box, index ) => {
    box.addEventListener( 'click' , () => {
        handleclick(index)
    } );
} );


// when we click on button
button.addEventListener( 'click' , () => {
    initGame();
} );