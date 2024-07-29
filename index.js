
const searchForm =document.querySelector(".search-form");
const searchInput=document.querySelector(".input-user-id");
const errorContainer= document.querySelector(".error-container");
const userContainer=document.querySelector(".user-info");

let userId="";
searchForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    userId=searchInput.value;
    console.log(userId);
    apiCall(userId);
});

async function apiCall(user){
    try{
        const api="https://api.github.com/users/";
        let userapi = await fetch(api+user);
        if (!userapi.ok) {
            throw new Error("User not found");
        }
        let data= await userapi.json();
        console.log(data);
        const avatarUrl = data?.avatar_url;
        const userPhoto = document.querySelector(".user-photo");
        userPhoto.src= avatarUrl;

        const follower =document.querySelector(".user-followers");
        follower.innerHTML=data?.followers;

        const repo =document.querySelector(".user-repo");
        repo.innerHTML=data?.public_repos;
        
        const fowling =document.querySelector(".user-following");
        fowling.innerHTML=data?.following;

        const userName= document.querySelector(".name-link");
         
        userName.innerHTML=data?.login;
        userName.href=data?.html_url;

        const loco=document.querySelector(".location");
        loco.innerHTML=data?.location;
        if(!data?.location){
            loco.innerHTML="Private";
        }

        // const userBio=document.querySelector("user-bio");
        // userBio.textContent=data?.bio;

        const userBio= document.querySelector(".user-bio");
        userBio.innerHTML=data?.bio;

        console.log("API CALL SUCCESSFUL");
        if(errorContainer.classList.contains("active")){
            errorContainer.classList.remove("active");
        }
        userContainer.classList.add("active");

    }catch(error){
        if(userContainer.classList.contains("active")){
            userContainer.classList.remove("active");
        }
        errorContainer.classList.add("active");

    }
}

const ModeBtn =document.querySelector(".mode-image");
let light="on";
ModeBtn.addEventListener('click',()=>{
    console.log("click");
    if(light=="on"){
        document.body.classList.add("abody");
        document.querySelector(".input-user-id").classList.add("ainput-user-id");
        document.querySelector(".search-btn").classList.add("asearch-btn");
        document.querySelector(".content").classList.add("acontent");
        document.querySelector(".user-repo").classList.add("acontent");
        document.querySelector(".user-following").classList.add("acontent");
        light="off";
    }
    else{
        document.body.classList.remove("abody");
        document.querySelector(".input-user-id").classList.remove("ainput-user-id");
        document.querySelector(".search-btn").classList.remove("asearch-btn");
        document.querySelector(".content").classList.remove("acontent");
        light="on";
    }

});