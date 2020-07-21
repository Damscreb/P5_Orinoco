// DONC, le but est de personnaliser la page en fonction de l'id stocké dans local storage
// On veut le nom, l'image, le prix, et les différentes couleurs aussi :)

let teddieName = document.getElementById('name');
let teddieImg = document.getElementById('picture');
let teddiePrice = document.getElementById('price');
let choiceColors = document.querySelectorAll('#color-choice label');

console.log(choiceColors);

// Premièrement, récupérer les données du Teddy grâce à l'id

console.log(localStorage);

fetch('http://localhost:3000/api/teddies')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        // Boucle dans l'API pour afficher le nom, l'image et le prix du Teddy sélectionné
        for (let i=0; i<data.length; i++) {
            if (data[i]._id === localStorage.id) {
                teddieName.innerHTML = data[i].name;
                teddieImg.src = data[i].imageUrl;
                data[i].price = data[i].price/100;
                teddiePrice.textContent = `Prix : ${data[i].price},00 €`;  
                for (let j=0; j<data[i].colors.length; j++) {     // Boucle pour afficher les couleurs dispo
                    choiceColors[j].textContent = data[i].colors[j];;
                    if (data[i].colors.length === 3) {
                        document.getElementById('color4').className = 'hidden';
                    }
                    if (data[i].colors.length === 2) {
                        document.getElementById('color3').className = 'hidden';
                        document.getElementById('color4').className = 'hidden';
                    }
                    if (data[i].colors.length === 1) {
                        document.getElementById('color2').className = 'hidden';
                        document.getElementById('color3').className = 'hidden';
                        document.getElementById('color4').className = 'hidden';
                    }
                }
            }
        }
    })
    .catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    });