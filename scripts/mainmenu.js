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
const gameOptions = document.querySelectorAll("div.gameOption");
for (var i = 0; i < gameOptions.length; i++){
    gameOptions[i].addEventListener("click", function(){
        console.log(this.getAttribute("value"));
        var jsonData = getSaveData();
        jsonData.chosenGameDifficulty = this.getAttribute("value");
        setSaveData(jsonData);
    });
}