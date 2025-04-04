import { setSaveData, getSaveData } from './saveDataManager.js';

//tee kuvaa ja nimee varte joku valintahomma, jos kuvaa ei valittu vielä, joku basic harmaa ja sit vaihtoehtomenuhomma joo just nii
/* hide & show pictureChooser */
const pictureChooser = document.getElementById("profilePictureChooser");
//show picture chooser when clicking the image
document.getElementById("profilePicture").addEventListener("click", function(){
    pictureChooser.style.display = "flex";
    pictureChooser.style.zIndex = "15";
});
//hide picture when close button is clicked
document.getElementById("closePictureChooser").addEventListener("click", function(){
    pictureChooser.style.display = "none";
    pictureChooser.style.zIndex = "-5";
});



/* choose a profile picture */
document.getElementById("profilePictureChoices").addEventListener("click", function(event){
    if (event.target.className){
        if (event.target.className.includes("profilePictureChoice")){
            var jsonData = getSaveData();
            jsonData.profilePic = event.target.getAttribute("value");
            setSaveData(jsonData);
            
            console.log(event.target.getAttribute("value"));
        }
    }
});