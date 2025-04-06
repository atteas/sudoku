import { generateSudoku } from './sudokugenerator.js';
import { setSaveData, getSaveData } from './saveDataManager.js';

/* functions */
function isNumber(value) {
    return /^-?\d+(\.\d+)?$/.test(value);
}



/* create the sudoku array */
var jsonData = getSaveData();
var gameDifficulty = jsonData.chosenGameDifficulty;

if (!gameDifficulty){
    //default to easy if no value set
    gameDifficulty = "easy";
    jsonData = getSaveData();
    jsonData.chosenGameDifficulty = gameDifficulty;
    setSaveData(jsonData);
}

/* generate sudoku */
let sudokuArray = null;

//if sudoku is saved (game was paused), get it from jsonData
if (jsonData.gameSaved == true){
    sudokuArray = jsonData.sudoku;
} else {
    sudokuArray =  generateSudoku(gameDifficulty);
    //save the sudoku to jsonData
    jsonData = getSaveData();
    jsonData.sudoku = sudokuArray;
    jsonData.gameSaved = true;
    setSaveData(jsonData);
}

console.log(sudokuArray);

//edit the difficulty-text
document.getElementById("topBarDifficulty").textContent = gameDifficulty.toUpperCase();



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
        sudokuInput.setAttribute("row",i+1);
        sudokuInput.setAttribute("column",j+1);

        if (sudokuArray[i][j] != 0){
            sudokuInput.textContent = sudokuArray[i][j];
        }

        sudokuCell.appendChild(sudokuInput);
        sudokuRow.appendChild(sudokuCell);
    }

    sudokuField.appendChild(sudokuRow);
}


//check if sudoku filled
checkIfFilled();


/*** MARK AND SET CHOSEN CELL FOR INPUT ***/
let chosenCell = null;

document.addEventListener("click", function(event){
    if (event.target == document.body){
        //clear chosen cell if background is clicked
        setChosenCell(0,0);
    } else if (event.target.getAttribute("row") != null){
        //set chosen cell to the row & column of clicked cell
    setChosenCell(event.target.getAttribute("row"),event.target.getAttribute("column"));
    }
})

function setChosenCell(row, column){
    /* row & column need to be appropriate */
    if (1 <= row && row <= 9 && 1 <= column && column <= 9){
        /* clear style from last cell */
        if (chosenCell != null){
            chosenCell.className = "sudokuInput";
        }
        
        /* add style to current cell */
        chosenCell = document.querySelector(`div[row='${row}'][column='${column}']`);
        chosenCell.className = "sudokuInput sudokuInputChosen";

        console.log(chosenCell);
    } else if (row == 0 && column == 0){
        if (chosenCell != null){
            chosenCell.className = "sudokuInput";
            chosenCell = null;
        }
    }
}


/*** LISTEN FOR KEYS AND EDIT SUDOKU ARRAY ***/

/* listen for typing */
document.addEventListener("keydown", function(event){
    console.log(event.key);
    const key = event.key;
    if (isNumber(key)){ //set cell on number 1-9
        if (1 <= key && key <= 9){
            console.log("Aproppriate value for sudoku");
            //passaa value functioo, joka määrää sen uudestaa siihe hommaa
            const value = parseInt(key);
            setCellValue(value);
        }

    } else if (key == "Backspace"){ //empty cell on backspace
        setCellValue("empty");

    } else if (key == "ArrowUp" || key == "ArrowRight" || key == "ArrowDown" || key == "ArrowLeft"){ //shift chosen cell on arrow
        if (chosenCell != null){
            switch (key){
                case "ArrowUp":
                    setChosenCell(parseInt(chosenCell.getAttribute("row"))-1,parseInt(chosenCell.getAttribute("column")));
                    break;
                case "ArrowRight":
                    setChosenCell(parseInt(chosenCell.getAttribute("row")),parseInt(chosenCell.getAttribute("column"))+1);
                    break;
                case "ArrowDown":
                    setChosenCell(parseInt(chosenCell.getAttribute("row"))+1,parseInt(chosenCell.getAttribute("column")));
                    break;
                case "ArrowLeft":
                    setChosenCell(parseInt(chosenCell.getAttribute("row")),parseInt(chosenCell.getAttribute("column"))-1);
                    break;
            }
        }
    }
});

/* listen for numberChoice-presses */
document.getElementById("numberChoices").addEventListener("click", function(event){
    if (event.target.getAttribute("value") != null){
        console.log("Event target value: "+event.target.getAttribute("value"));
        //passaa value functioo, joka määrää sen uudestaa siihe hommaa
        const value = parseInt(event.target.getAttribute("value"));
        setCellValue(value);
    }
});



/*** EDIT VALUES ***/
function setCellValue(value){
    if (chosenCell != null){
        if (value == "empty"){
            chosenCell.textContent = "";
        } else {
            chosenCell.textContent = value;
        }
        
        //edit the sudokuArray
        sudokuArray[(parseInt(chosenCell.getAttribute("row"))-1)][(parseInt(chosenCell.getAttribute("column"))-1)] = value;

        var jsonData = getSaveData();
        jsonData.sudoku = sudokuArray;
        setSaveData(jsonData);



        //check if sudoku filled
        checkIfFilled();
    }
}; 

/* show completion screen */
function checkIfFilled(){
    //go through the sudokuArray
    var stop = false;
    for (var i = 0; i < sudokuArray.length && !stop; i++){
        for (var j = 0; j < sudokuArray[i].length; j++){
            if (sudokuArray[i][j] == 0){
                stop = true;
                console.log(i+","+j);
                break;
            }
        }
    }

    //if previous nested loop was not stopped, there is no zeroes left
    if (stop == false){
        const sudokuDoneBackground = document.getElementById("sudokuDoneBackground");
        sudokuDoneBackground.className = "doneBackgroundShown";
    }
}


/*** CHANGE WON GAMES ***/
//change when click to main menu
document.getElementById("sudokuDoneButton").addEventListener("click", function(){
    //save the played game to jsonData
    jsonData = getSaveData();
                
    switch(jsonData.chosenGameDifficulty){
        case "easy":
            jsonData.easyGames++;
            break;
        case "medium":
            jsonData.mediumGames++;
            break;
        case "hard":
            jsonData.hardGames++;
            break;    
    }

    //delete the sudokuarray
    jsonData.gameSaved = false;
    jsonData.sudoku = [];

    setSaveData(jsonData);

    //redirect to main menu
    location.href = "main_menu.html";
});



/*** CHECK THAT NUMBER IS RIGHT ***/
