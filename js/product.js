// DONC, le but est de personnaliser la page en fonction de l'id stocké dans local storage
// On veut le nom, l'image, le prix, et les différentes couleurs aussi :)

let teddieName = document.getElementById('name');
let teddieImg = document.getElementById('picture');
let teddiePrice = document.getElementById('price');

let colorForm = document.getElementById('color-choice');
let newInput = document.createElement('input');
    newInput.name = 'color';
    newInput.type = 'radio';
let newLabel = document.createElement('label');
let newBr = document.createElement('br');

// Premièrement, récupérer les données du Teddy grâce à l'id
// Pour ce faire on va appeller l'API avec l'ID du produit voulu

console.log(localStorage);

fetch(`http://localhost:3000/api/teddies/${localStorage.id}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        // Récupération dans l'API pour afficher le nom, l'image et le prix du Teddy sélectionné
        teddieName.innerHTML = data.name;
        teddieImg.src = data.imageUrl;
        data.price = data.price/100;
        teddiePrice.textContent = `Prix : ${data.price},00 €`;  
        for (let j=0; j<data.colors.length; j++) {     
            // Boucle pour afficher les couleurs dispo

            colorForm.appendChild(newInput.cloneNode(true)).id= `color-${j}`;
            colorForm.appendChild(newLabel.cloneNode(true)).id= `color${j}`
            document.getElementById(`color${j}`).innerHTML = data.colors[j];
            document.getElementById(`color${j}`).htmlFor = `color-${j}`;
            colorForm.appendChild(newBr.cloneNode(true));         
        }
        
    })
    .catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    });