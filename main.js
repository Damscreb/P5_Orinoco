// Données pour création html

let cards = document.getElementById('cards');
let firstDiv = document.createElement('div');
    firstDiv.className ='col-9 col-md-6 col-lg-4 mx-auto mt-5';
let secondDiv = document.createElement('div');
    secondDiv.className = 'card mb-4 mb-lg-0 border-secondary shadow text-center';
let img = document.createElement('img');
    img.className = 'card-img-top furniture-height';
let thirdDiv = document.createElement('div');
    thirdDiv.className = 'card-body';
let h4 = document.createElement('h4');
    h4.className = 'card-title';
let p = document.createElement('p');
    p.className = 'description';
let a = document.createElement('a');
    a.className = 'card-text';
    a.href='./pages/product.html'
let button = document.createElement('button');
    button.type ='button';
    button.className = 'btn btn-info btn-lg';
    button.textContent = 'Détails';


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

            // Partie création du HTML

                // On ajoute une premiere div a qui on donne ses classes
            cards.appendChild(firstDiv.cloneNode(true)).className += ` div1-${i}`;
                // On sélectionne la bonne nouvelle div (class) pour y ajouter une seconde div a qui on donne ses classes
            document.querySelector(`div.div1-${i}`).appendChild(secondDiv.cloneNode(true)).className += ` div2-${i}`;
                // Ajoutons notre image avec ses classes
            document.querySelector(`div.div2-${i}`).appendChild(img.cloneNode(true)).className += ` img-${i}`;
                // Ajoutons aussi une toisième div à la deuxième div
            document.querySelector(`div.div2-${i}`).appendChild(thirdDiv.cloneNode(true)).className += ` div3-${i}`;
                // Ajoutons à cette troisième div un h4 un p et un a
            document.querySelector(`div.div3-${i}`).appendChild(h4.cloneNode(true)).className += ` h4-${i}`;
            document.querySelector(`div.div3-${i}`).appendChild(p.cloneNode(true)).className += ` description-${i}`;
            document.querySelector(`div.div3-${i}`).appendChild(a.cloneNode(true)).className += ` link-${i}`;
                // Ajoutons à a un bouton et un href
            document.querySelector(`a.link-${i}`).appendChild(button.cloneNode(true));


            // Partie récupération de données et affichage document.
            document.querySelector(`h4.h4-${i}`).textContent = data[i].name;
            document.querySelector(`p.description-${i}`).textContent = data[i].description;
            document.querySelector(`img.img-${i}`).src = data[i].imageUrl;
            teddiesId.push(data[i]._id);

        }
        // Récupération de mes boutons dans une NodeList
        let detailBtnNl = document.querySelectorAll(".btn-info");
        console.log(detailBtnNl);

        // Sauvegarde dans localStorage de l'ID concerné au clic du btn détail
        // La boucle permet de voyager dans ma NodeList pour ajouter un addEventListener à chaque composant
        for (let i=0; i<detailBtnNl.length; i++) {
            detailBtnNl[i].addEventListener('click', function(){
                localStorage.id = teddiesId[i];})
            }    
    })
    .catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    });


