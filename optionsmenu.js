import { setSaveData, getSaveData } from './saveDataManager.js';


/*----------------------------------------------------------
               T O G G L E    O P T I O N S
----------------------------------------------------------*/
const optionsDiv = document.getElementById("optionsDiv");
const optionsToggleButton = document.getElementById("optionsToggle");
const optionsToggleText = optionsToggleButton.querySelector("#optionsToggleText");
const optionsToggleArrow = optionsToggleButton.querySelector("#optionsToggleArrow")

var optionsOpen = false; 
optionsToggleButton.addEventListener("click", function(){
    if (optionsOpen){
        optionsToggleText.textContent = "open";
        optionsToggleArrow.className = "";
        optionsDiv.className = "";
    } else {
        optionsToggleText.textContent = "close";
        optionsToggleArrow.className = "open";
        optionsDiv.className = "open";
    }
    optionsOpen = !optionsOpen;
});





/*----------------------------------------------------------
                C O L O R      C H O O S E R
----------------------------------------------------------*/
/*** color chooser ***/
let lastColorElement = document.getElementsByClassName("colorOption chosen")[0];

//Loading color option if found in local storage
if (localStorage.getItem("lastColorElementId")){
    setColorOption(document.getElementById(localStorage.getItem("lastColorElementId")));
}

//Changing the color
document.getElementById("colorOptions").addEventListener("click", function(event){
    if(event.target.className.includes("colorOption")){
        setColorOption(event.target);
    }
});

function setColorOption(element){
    lastColorElement.className = "colorOption";

    element.className = "colorOption chosen";
    lastColorElement = element;
    localStorage.setItem("lastColorElementId", element.id);

    var root = document.querySelector(":root");
    switch (localStorage.getItem("lastColorElementId")){
        case "colorOption-1":
            root.style.setProperty('--light','255, 190, 80');
            root.style.setProperty('--base-color','245, 160, 45');
            root.style.setProperty('--secondary','20, 70, 0');
            root.style.setProperty('--secondary-light','160, 255, 160');
            console.log("Jai DataPUM!");
            
            break;
        case "colorOption-2":
            root.style.setProperty('--light','80, 150, 255');
            root.style.setProperty('--base-color','40, 130, 255');
            root.style.setProperty('--secondary','0, 5, 70');
            root.style.setProperty('--secondary-light','100, 180, 230');
            break;
        case "colorOption-3":
            root.style.setProperty('--light','235, 140, 235');
            root.style.setProperty('--base-color','240, 100, 240');
            root.style.setProperty('--secondary','90, 15, 90');
            root.style.setProperty('--secondary-light','210, 170, 210');
            break;
        case "colorOption-4":
            root.style.setProperty('--light','100, 255, 80');
            root.style.setProperty('--base-color','60, 255, 40');
            root.style.setProperty('--secondary','20, 90, 20');
            root.style.setProperty('--secondary-light','190, 225, 190');
            break;
    }
}






/*----------------------------------------------------------
                  S A V E      F I L E
----------------------------------------------------------*/
//save variables
document.getElementById('fileSaveButton').addEventListener('click', function () {
    //get jsonData from the saveDataManager script - var jsonData needs to be here to get & update the information added by the other scripts
    var jsonData = getSaveData();

    //change variables for the save file
    if (localStorage.getItem("lastColorElementId")){
        jsonData.chosenColorId = localStorage.getItem("lastColorElementId");
    }
    
    //make the json a string
    const data = JSON.stringify(jsonData, null, 2);

    //Change loaded file if exists, otherwise create a new file
    if (document.getElementById('fileInput').value){
        console.log("Tallennetaan valittuun tiedostoon.");
        //tähän koodi, jos sen pystyy ees tekee
    } else {
        //make a new file and download it
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([data], {
            type: "text/plain"
        }));
        a.setAttribute("download", "sudokuData.txt");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});



/*----------------------------------------------------------
                  F I L E      I N P U T
----------------------------------------------------------*/
document.getElementById('fileInput').addEventListener('change', function () {
    const file = this.files[0];
    
    if (file.name.endsWith(".txt")){
        let reader = new FileReader();

        reader.onload = function () {
            try{
                //try to JSON.parse, if doesn't work, the file is not valid
                var jsonData = JSON.parse(reader.result);
                
                //change colour to what was saved
                if (jsonData.chosenColorId != null){
                    setColorOption(document.getElementById(jsonData.chosenColorId));
                }
                
                //set the data to the saveDataManager script for use in other scripts
                setSaveData(jsonData);

                //add chosen file name, if the file was valid
                const chosenFileText = document.getElementById("chosenFileText");
                chosenFileText.style.display = "block";
                chosenFileText.textContent = "Chosen file: "+file.name;

            } catch{
                //if file not stringified json, tell user it's not valid and clear the file input
                alert("Not valid file.");
                document.getElementById('fileInput').value = null;
            }
        };

        reader.readAsText(file);
    }
});
document.getElementById('chosenFileText').addEventListener("click",function(){
    //remove the file
    document.getElementById('fileInput').value = null;

    //remove the chosen file text
    this.style.display = "none";
});