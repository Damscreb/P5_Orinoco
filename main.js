// Définitions des données que nous afficherons grâce à l'API

let teddiesH4 = document.querySelectorAll("#cards h4");
let teddiesDescs = document.querySelectorAll("#cards p");
let teddiesImgs = document.querySelectorAll("#cards img");

// fetch :  accès à l'API
fetch('http://localhost:3000/api/teddies')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        // Boucle dans l'API pour afficher le nom, la description et l'image de chaque Teddy dans l'index
        for (i=0; i<data.length; i++) {
            teddiesH4[i].textContent = data[i].name;
            teddiesDescs[i].textContent = data[i].description;
            teddiesImgs[i].src = data[i].imageUrl;
        }
    })
    .catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    });
