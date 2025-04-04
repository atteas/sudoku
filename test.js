/* functions */
function isNumber(value) {
    return /^-?\d+(\.\d+)?$/.test(value);
}



/* create the sudoku array */
let sudokuArray = [[],[],[],[],[],[],[],[],[]];

for (var i = 0; i < 9; i++){
    for (var j = 0; j < 9; j++){
        sudokuArray[i][j] = j+1;
    }
}

console.log(sudokuArray);



/* preset sudoku */
const sudokuField = document.getElementById("sudoku");

for (var i = 0; i < 9; i++){
    const sudokuRow = document.createElement("div");
    sudokuRow.className = "sudokuRow";

    
    for (var j = 0; j < 9; j++){
        const sudokuCell = document.createElement("div");
        sudokuCell.className = "sudokuCell";

        const sudokuInput = document.createElement("div");
        sudokuInput.className = "sudokuInput";

        sudokuInput.textContent = sudokuArray[i][j];

        sudokuCell.appendChild(sudokuInput);
        sudokuRow.appendChild(sudokuCell);
    }

    sudokuField.appendChild(sudokuRow);
}





/*** MARK AND SET CHOSEN CELL FOR INPUT ***/

/* get chosen cell */
let clickedCell = null;
sudokuField.addEventListener("click", function(event){
    /* clear style from last cell */
    if (clickedCell != null){
        clickedCell.className = "sudokuInput";
    }

    /* add style to current cell */
    clickedCell = event.target;
    clickedCell.className = "sudokuInput sudokuInputClicked";

    console.log("A sudoku input cell was clicked.");
    console.log(clickedCell);
});





/*** LISTEN FOR KEYS AND EDIT SUDOKU ARRAY ***/

/* listen for typing */
document.addEventListener("keypress", function(event){
    console.log("A key was pressed.");
    console.log(event.key)
    if (isNumber(event.key)){
        if (1 <= event.key && event.key <= 9){
            console.log("Aproppriate value for sudoku");
        }
    }
});