import { setSaveData, getSaveData } from './saveDataManager.js';

localStorage.setItem("changesSaved", "true");

//function to change image
function setProfilePicture(pictureId){
    const profilePicture = document.getElementById("profilePicture");
    profilePicture.setAttribute("image", pictureId);

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



/******* Edit the name and profile picture if found in the save data. *********/
var jsonData = getSaveData();
if (jsonData.profilePicId != null){
    setProfilePicture(jsonData.profilePicId);
}
if (jsonData.name != null){
    document.getElementById("profileName").textContent = jsonData.name;
}



/******* PROFILE PICTURE *********/
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

            //set the profile picture
            setProfilePicture(pictureId);

            localStorage.setItem("changesSaved", "false");
            
            //close the menu
            document.getElementById("closePictureChooser").click();            
        }
    }
});



/******* NAME *********/
document.getElementById("profileName").addEventListener("blur", function(){
    localStorage.setItem("changesSaved", "false");
})



/******* SAVE CHOICES *********/
document.getElementById("saveProfileSettings").addEventListener("click", function(){
    const profileName = document.getElementById("profileName").textContent;
    const pictureId  = document.getElementById("profilePicture").getAttribute("image");


    //change the values in jsonData
    var jsonData = getSaveData();
    jsonData.name = profileName;
    jsonData.profilePicId = pictureId;
    setSaveData(jsonData);

    //change the value of changesSaved
    localStorage.setItem("changesSaved", "true");
});



/******* BACK BUTTON *********/
document.getElementById("profileBackButton").addEventListener("click", function(){
    if (localStorage.getItem("changesSaved") == "true"){
        //back to the previous page
        if (document.referrer != location.href){
            location.href = document.referrer;
        } else {
            location.href = 'main_menu.html';
        }
    } else {
        //alert once that changes not saved, then set changesSaved to true so that the user can exit
        alert("Save changes!");
        localStorage.setItem("changesSaved", "true");
    }
    
});