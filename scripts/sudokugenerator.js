//functions
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

    console.log(possibleNumbers);
    //return possible numbers
    return possibleNumbers;
}




/* create the sudoku array */
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


/*
for (var i = 0; i < sudokuArray.length; i++){
    var sudokuRow = sudokuArray[i];

    for (var j = 0; j < sudokuRow.length; j++){
        sudokuArray[i][j] = j+1;

        sudokuCellRow = i;
        sudokuCellColumn = j;

        console.log()
    }
}
*/
getPossibleNumbers(sudokuArray, 0, 1);

console.log(sudokuArray);