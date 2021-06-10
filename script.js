const dogApp = {};

dogApp.dogNameList = ["Spot", "Newton", "Ralph", "Frank", "Jerry", "Richie", "Nico", "Tarzan", "Nash", "Jono", "Puppy", "Santa's Little Helper", "Fido", "Wishbone", "Buster", "Vince", "Hunter", "Archer", "Max", "Marley", "Henry", "Leo", "Jinx", "Logan", "Ninja", "Molly", "Oscar", "Coco", "Lucy", "Ruby", "Buddy", "Daisy", "Rosie", "Dog", "Bella", "Bailey", "Lola", "Ollie", "Toby", "Jack", "Teddy", "Archie", "Patches", "Atlas", "Rain", "Ritz", "Ash", "Clifford", "Arthur", "T-Bone", "Cleo", "Cinder"];

dogApp.displayName = () => {
    const randomNumber = Math.floor(Math.random() * dogApp.dogNameList.length);
    const name = dogApp.dogNameList[randomNumber];
    const nameSelector = document.querySelector(".dogName");
    nameSelector.textContent = name;
}

dogApp.pageSetUp = () => {

    const proxiedUrl = 'https://api.thedogapi.com/v1/breeds';
    const url = new URL('https://proxy.hackeryou.com');
    url.search = new URLSearchParams({
        reqUrl: proxiedUrl,
        'params[api_key]': "7608a588-4fba-4439-9615-aa56d69964ab",
    });

    fetch(url).then(function(apiData) {
        return apiData.json()
    }).then((data) => {
        dogApp.displayInformation(data);

        let index = 0;

        data.forEach((dog) => {
            const select = document.querySelector("select");

            const element = document.createElement("option");
            element.textContent = dog.name;
            element.setAttribute("value", index);

            select.appendChild(element);
            index += 1;
        })

    })
}

dogApp.displayInformation = (data) => {

    const form = document.querySelector("form");
    form.addEventListener("change", function(e) {
        dogApp.displayDogs(data, e.target.value);
    })

    const button = document.querySelector(".fetchButton");

    button.addEventListener("click", (e) => {
        e.preventDefault();
        const randomNumber = Math.floor(Math.random() * data.length); 

        dogApp.displayDogs(data, randomNumber)

    });
};

dogApp.displayDogs = (data, num) => {

    const breed = document.querySelector("h2");
    breed.textContent = data[num].name;

    dogApp.displayWiki(data[num].name);

    const bredFor = document.querySelector(".bredFor");
    if (data[num].bred_for) {
        bredFor.textContent = data[num].bred_for;
        document.querySelector(".c1").style.display = "block";
        bredFor.style.display = "block";
    } else {
        document.querySelector(".c1").style.display = "none";
        bredFor.style.display = "none";
    }

    const breedGroup = document.querySelector(".breedGroup");
    if (data[num].breed_group) {
        breedGroup.textContent = data[num].breed_group;
        document.querySelector(".c2").style.display = "block";
        breedGroup.style.display = "block";
    } else {
        document.querySelector(".c2").style.display = "none";
        breedGroup.style.display = "none";
    }

    const height = document.querySelector(".height");
    height.textContent = `${data[num].height.metric} inches`;

    const lifespan = document.querySelector(".lifespan");
    lifespan.textContent = data[num].life_span;

    const temperament = document.querySelector(".temperament");
    if (data[num].temperament) {
        temperament.textContent = data[num].temperament;
        document.querySelector(".c5").style.display = "block";
        temperament.style.display = "block";
    } else {
        document.querySelector(".c5").style.display = "none";
        temperament.style.display = "none";
    }

    const weight = document.querySelector(".weight");
    weight.textContent = `${data[num].weight.metric} lbs`;

    const dogPicture = document.querySelector(".dogImage");
    dogPicture.src = data[num].image.url;
    dogPicture.alt = `A photograph of a ${data[num].name}`;

    dogApp.displayName();
}

dogApp.displayWiki = function(breed) {
    const proxiedUrl = `https://en.wikipedia.org/w/api.php`;
    const url = new URL('https://proxy.hackeryou.com');
    url.search = new URLSearchParams({
        reqUrl: proxiedUrl,
        'params[format]': "json",
        'params[action]': "query",
        'params[titles]': breed,
        'params[prop]': "extracts",
        'params[redirects]': 1,
        'params[exintro]': "",
        'params[explaintext]': "",
        'params[indexpageids]': ""
    });

    fetch(url).then(function(apiData) {
        return apiData.json()
    }).then((data) => {

        const id = data.query.pageids[0];
        if (id === "-1") {
            document.querySelector(".wikiBlurb").textContent = "We are currently unable to find the appropriate information for this doggo. But they cute though!"
        } else if (data.query.pages[id].extract.length > 170) {
                document.querySelector(".wikiBlurb").textContent = data.query.pages[id].extract;
        } else {
            document.querySelector(".wikiBlurb").textContent = "We are currently unable to find the appropriate information for this doggo. But they cute though!"
        }
    })
}

dogApp.init = function() {
    dogApp.pageSetUp()
}

dogApp.init();