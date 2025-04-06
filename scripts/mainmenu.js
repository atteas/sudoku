import { setSaveData, getSaveData } from './saveDataManager.js';

/* new game */
let gameOptionsBackground = document.getElementById("gameOptionsBackground")

let alertSavedGame = true;
document.getElementById("newGameButton").addEventListener("click", function(){
    var jsonData = getSaveData();

    if (jsonData.gameSaved == false || alertSavedGame == false){
        gameOptionsBackground.style.opacity = "1";
        gameOptionsBackground.style.zIndex = "5";
    } else {
        alert("You have a game in progress. Click again to overwrite it.");
        alertSavedGame = false;
    }
});

document.getElementById("closeGameOptions").addEventListener("click", function(){
    gameOptionsBackground.style.opacity = "0";
    gameOptionsBackground.style.zIndex = "-5";
});


/* continue game */
document.getElementById("continueGameButton").addEventListener("click", function(){
    const jsonData = getSaveData();

    if (jsonData.gameSaved){
        //redirect to the sudoku
        location.href = "sudoku.html";
    } else {
        alert("You have no saved game");
    }
});

/* game options */
document.getElementById("gameOptions").addEventListener("click", function(event){
    if (event.target.className){
        if (event.target.className == "gameOption"){
            //change difficulty in jsonData
            var jsonData = getSaveData();
            jsonData.chosenGameDifficulty = event.target.getAttribute("value");

            //wipe saved game from jsonData
            jsonData.gameSaved = false;
            jsonData.sudoku = [];

            setSaveData(jsonData);

            //redirect to the sudoku
            location.href = "sudoku.html";
        }
    }
});