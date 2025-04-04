import { setSaveData, getSaveData } from './saveDataManager.js';

//function to change image
function setProfilePicture(pictureId){
    const profilePicture = document.getElementById("profilePicture");

    switch (pictureId){
        case "image-1":
            profilePicture.setAttribute("src", "images/profilePictures/RadeshDeshmuk.jpg");
            break;
        case "image-2":
            profilePicture.setAttribute("src", "images/profilePictures/indian_guy.jpg");
            break;
        case "image-3":
            profilePicture.setAttribute("src", "images/profilePictures/cat.jpg");
            break;
        case "image-4":
            profilePicture.setAttribute("src", "images/profilePictures/dog.jpg");
            break;
    }
}

/* add the porfile picture if in the save data */
var jsonData = getSaveData();
if (jsonData.profilePicId != null){
    const profilePicture = document.getElementById("profilePicture");

    setProfilePicture(jsonData.profilePicId);
}


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
            const pictureId = event.target.getAttribute("value");
            //change the value in jsonData
            var jsonData = getSaveData();
            jsonData.profilePicId = pictureId;
            setSaveData(jsonData);

            //set the profile picture
            setProfilePicture(pictureId);
            
            //close the menu
            document.getElementById("closePictureChooser").click();            
        }
    }
});