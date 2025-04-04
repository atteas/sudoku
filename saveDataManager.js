//variables for progress & etc | used in file save and load
let jsonData = {
    name: null,
    profilePic: null,
    chosenColorId: null,
    chosenGameDifficulty: null,
    gameSaved: false,
    gamePaused: false,
    easyGames: 0,
    mediumGames: 0,
    hardGames: 0
}

//load data from local storage, since it was overwritten on page change
if (localStorage.getItem("jsonData")){
    jsonData = JSON.parse(localStorage.getItem("jsonData"));
}


//export to other scripts for easy use
export function getSaveData() {
    return jsonData;
}
export function setSaveData(givenData) {
    jsonData = givenData;
    //save to local storage so that the data doesn't overwrite when changing page
    localStorage.setItem("jsonData",JSON.stringify(jsonData));
}