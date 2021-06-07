const dogApp = {};

dogApp.dogNameList = ["Spot", "Newton", "Ralph", "Frank", "Jerry", "Richie", "Nico", "Tarzan", "Nash", "Jono", "Puppy", "Santa's Little Helper", "Fido", "Wishbone", "Buster", "Vince", "Hunter", "Archer", "Max", "Marley", "Henry"];

dogApp.generateName = () => {
    const randomNumber = Math.floor(Math.random()*dogApp.dogNameList.length);
    const name = dogApp.dogNameList[randomNumber];
    const nameSelector = document.querySelector(".dogName");
    nameSelector.textContent = name;
}

dogApp.displayInformation = () => {

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

            const randomNumber = Math.floor(Math.random()*data.length);   

            const name = document.querySelector("h2");
            name.textContent = data[randomNumber].name;

            const bredFor = document.querySelector(".bredFor");
            if (data[randomNumber].bred_for) {
                bredFor.textContent = data[randomNumber].bred_for;
                document.querySelector(".c1").style.display = "block";
                bredFor.style.display = "block";
            } else {
                document.querySelector(".c1").style.display = "none";
                bredFor.style.display = "none";
            }

            const breedGroup = document.querySelector(".breedGroup");
            if (data[randomNumber].breed_group) {
                breedGroup.textContent = data[randomNumber].breed_group;
                document.querySelector(".c2").style.display = "block";
                breedGroup.style.display = "block";
            } else {
                document.querySelector(".c2").style.display = "none";
                breedGroup.style.display = "none";
            }

            const height = document.querySelector(".height");
            height.textContent = `${data[randomNumber].height.metric} inches`;
            console.log(data[randomNumber].height.metric);

            const lifespan = document.querySelector(".lifespan");
            lifespan.textContent = data[randomNumber].life_span;
            console.log(data[randomNumber].life_span);

            const temperament = document.querySelector(".temperament");
            if (data[randomNumber].temperament) {
                temperament.textContent = data[randomNumber].temperament;
                document.querySelector(".c5").style.display = "block";
                temperament.style.display = "block";
            } else {
                document.querySelector(".c5").style.display = "none";
                temperament.style.display = "none";
            }

            const weight = document.querySelector(".weight");
            weight.textContent = `${data[randomNumber].weight.metric} lbs`;
            console.log(data[randomNumber].weight.metric);

            dogApp.generateName();

            const dogPicture = document.querySelector(".dogImage");
            dogPicture.src = data[randomNumber].image.url;
            dogPicture.alt = `A photograph of a ${data[randomNumber].name}`;
            });

    });

}

dogApp.init = function() {
    dogApp.displayInformation();
}

dogApp.init();

