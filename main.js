// Définitions des données que nous afficherons grâce à l'API sur la page d'index

let teddiesH4 = document.querySelectorAll("#cards h4");
let teddiesDescs = document.querySelectorAll("#cards p");
let teddiesImgs = document.querySelectorAll("#cards img");

let teddiesId = [];

// fetch :  accès à l'API
fetch('http://localhost:3000/api/teddies')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        // Boucle dans l'API pour afficher le nom, la description et l'image de chaque Teddy dans l'index et récupérer leur ID dans un tableau
        for (let i=0; i<data.length; i++) {
            teddiesH4[i].textContent = data[i].name;
            teddiesDescs[i].textContent = data[i].description;
            teddiesImgs[i].src = data[i].imageUrl;
            teddiesId.push(data[i]._id);
        }
    })
    .catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    });


// Récupération de mes boutons dans une NodeList
let detailBtnNl = document.querySelectorAll(".btn-info");


// Sauvegarde dans localStorage de l'ID concerné au clic du btn détail
// La boucle permet de voyager dans ma NodeList pour ajouter un addEventListener à chaque composant
for (let i=0; i<detailBtnNl.length; i++) {
    detailBtnNl[i].addEventListener('click', function(){
        localStorage.id = teddiesId[i];
    })
}

console.log(localStorage);