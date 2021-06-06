const proxiedUrl = 'https://api.thedogapi.com/v1/breeds';
const url = new URL('http://proxy.hackeryou.com');
url.search = new URLSearchParams({
    reqUrl: proxiedUrl,
    'params[api_key]': "7608a588-4fba-4439-9615-aa56d69964ab",
});

fetch(url).then(function(apiData) {
    return apiData.json()
}).then((data) => {
    // const name = document.querySelector("h2");
    // name.innerText = data[0].name;
});



// Create variables hold keys/properties
// Obtain data from Doggy API (Done)
// Able to access specific data
// Create a function to randomize dogs and link to button
// Use button to pull doggy data from array and insert into page
// - calls the local method for a random breed to show up
// - add a change even listener to call local (getUserQuery) to track

// Handle error with template dog

// Create namespace w/ init method
const dogApp = {};

dogApp.dogNameList = ["Spot", "Newton", "Ralph", "Frank", "Jerry", "Richie", "Nico", "Tarzan", "Nash", "Jono", "Puppy", "Santa's Little Helper", "Fido", "Wishbone", "Buster", "Vince", "Hunter", "Archer", "Max", "Marley", "Henry"] 

dogApp.generateName =() =>{
    const randomNumber = Math.floor(Math.random()*dogApp.dogNameList.length);
    const name = dogApp.dogNameList[randomNumber];
    const nameSelector = document.querySelector(".dogName");
    nameSelector.textContent = name;
}





dogApp.generateName();

dogApp.init = function() {
    
}

dogApp.init();