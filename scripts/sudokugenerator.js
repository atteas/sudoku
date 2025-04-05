//functions
function shuffle(array){
    for (var i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getPossibleNumbers(sudokuArray, sudokuCellRow, sudokuCellColumn){
    const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    //remove numbers that exist in same row
    for (var i = 0; i < sudokuArray[sudokuCellRow].length; i++){
        const cellValue = sudokuArray[sudokuCellRow][i];
        const index = possibleNumbers.indexOf(cellValue);
        if (index > -1){
            possibleNumbers.splice(index, 1);
        }
    }

    //remove numbers that exist in same column
    for (var i = 0; i < sudokuArray.length; i++){
        const cellValue = sudokuArray[i][sudokuCellColumn];
        const index = possibleNumbers.indexOf(cellValue);
        if (index > -1){
            possibleNumbers.splice(index, 1);
        }
    }

    //remove numbers that exist in same box
    const startRow = Math.floor(sudokuCellRow / 3) * 3;
    const startCol = Math.floor(sudokuCellColumn / 3) * 3;

    for (var i = startRow; i < startRow + 3; i++){
        for (var j = startCol; j < startCol + 3; j++){
            const cellValue = sudokuArray[i][j];
            const index = possibleNumbers.indexOf(cellValue);
            if (index > -1){
                possibleNumbers.splice(index, 1);
            }
        }
    }

    //return possible numbers
    return possibleNumbers;
}



var sudokuArray = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/***** FILL THE SUDOKU WITH BACKTRACKING *****/
for (var i = 0; i < sudokuArray.length; i++){

    var sudokuRow = sudokuArray[i];

    for (var j = 0; j < sudokuRow.length; j++){
        
        //console.log(i +","+ j);
        const possibleNumbers = getPossibleNumbers(sudokuArray, i, j);

        if (possibleNumbers.length != 0){
            const numberChoice = shuffle(possibleNumbers)[0];
            console.log(numberChoice);
            sudokuArray[i][j] = numberChoice;
        }
        console.log(possibleNumbers);
    }
}

console.log(sudokuArray);