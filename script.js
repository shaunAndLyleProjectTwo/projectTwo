
// Create variables hold keys/properties
// Obtain data from Doggy API (Done)
// Able to access specific data
// Create a function to randomize dogs and link to button
// Use button to pull doggy data from array and insert into page
// - calls the local method for a random breed to show up
// - add a change event listener to call local (getUserQuery) to track

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


dogApp.displayInformation =() => {

    const button = document.querySelector(".fetchButton");

    button.addEventListener("click", (e) => {
        e.preventDefault();

        const proxiedUrl = 'https://api.thedogapi.com/v1/breeds';
        const url = new URL('http://proxy.hackeryou.com');
        url.search = new URLSearchParams({
        reqUrl: proxiedUrl,
        'params[api_key]': "7608a588-4fba-4439-9615-aa56d69964ab",
        });

        fetch(url).then(function(apiData) {
        return apiData.json()
        }).then((data) => { 

        console.log(data);

        const randomNumber = Math.floor(Math.random()*data.length);   

        const name = document.querySelector("h2");
        name.textContent = data[randomNumber].name;

        const bredFor = document.querySelector(".bredFor");
        bredFor.textContent = data[randomNumber].bred_for;

        const breedGroup = document.querySelector(".breedGroup");
        breedGroup.textContent = data[randomNumber].breed_group;

        const height = document.querySelector(".height");
        height.textContent = `${data[randomNumber].height.metric} inches`;

        const lifespan = document.querySelector(".lifespan");
        lifespan.textContent = data[randomNumber].life_span;

        const temperament = document.querySelector(".temperament");
        temperament.textContent = data[randomNumber].temperament;

        const weight = document.querySelector(".weight");
        weight.textContent = `${data[randomNumber].weight.metric} lbs`;

        dogApp.generateName();

        const dogPicture = document.querySelector(".dogImage");
        dogPicture.src = data[randomNumber].image.url;
        dogPicture.alt = `A photograph of a ${data[randomNumber].name}`;








        // const name = document.querySelector("h2");
        // name.innerText = data[0].name;
        });


    });

}





dogApp.displayInformation();

dogApp.init = function() {
    
}

dogApp.init();

