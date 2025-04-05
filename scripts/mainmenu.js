import { setSaveData, getSaveData } from './saveDataManager.js';

/* new game */
let gameOptionsBackground = document.getElementById("gameOptionsBackground")

document.getElementById("newGameButton").addEventListener("click", function(){
    gameOptionsBackground.style.opacity = "1";
    gameOptionsBackground.style.zIndex = "5";
});

document.getElementById("closeGameOptions").addEventListener("click", function(){
    gameOptionsBackground.style.opacity = "0";
    gameOptionsBackground.style.zIndex = "-5";
});

/* game options */
document.getElementById("gameOptions").addEventListener("click", function(event){
    if (event.target.className){
        if (event.target.className == "gameOption"){
            //change difficulty in jsonData
            var jsonData = getSaveData();
            jsonData.chosenGameDifficulty = event.target.getAttribute("value");
            setSaveData(jsonData);

            //redirect to the sudoku
            location.href = "sudoku.html";
        }
    }
});