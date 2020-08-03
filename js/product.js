// Création d'une classe Produit qui nous permettra de récupérer les données des produits 
// que le client a ajouté à son panier.

class Produit {
    constructor(id, name, quantity, color, price, imageUrl) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.color = color;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}

// DONC, le but est de personnaliser la page en fonction de l'id stocké dans local storage
// On veut le nom, l'image, le prix, et les différentes couleurs aussi :)
let teddieName = document.getElementById('name');
let teddieImg = document.getElementById('picture');
let teddiePrice = document.getElementById('price');

let colorForm = document.getElementById('color-choice');

let newInput = document.createElement('input');
newInput.name = 'color';
newInput.type = 'radio';
newInput.required = true;

let newLabel = document.createElement('label');
newLabel.className += 'ml-2 pb-1';  // On aère un peu le formulaire

let newBr = document.createElement('br');

let confirmation = document.getElementById('confirmation');

// Premièrement, récupérer les données du Teddy grâce à l'id
// Pour ce faire on va appeller l'API avec l'ID du produit voulu

fetch(`http://localhost:3000/api/teddies/${localStorage.id}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        // Récupération dans l'API pour afficher le nom, l'image et le prix du Teddy sélectionné
        teddieName.innerHTML = data.name;
        teddieImg.src = data.imageUrl;
        data.price = data.price / 100;
        teddiePrice.textContent = `Prix : ${data.price},00 €`;

        // Boucle pour afficher les couleurs dispo
        for (let j = 0; j < data.colors.length; j++) {

            colorForm.appendChild(newInput.cloneNode(true)).id = `color-${j}`;
            document.getElementById(`color-${j}`).value = data.colors[j];

            colorForm.appendChild(newLabel.cloneNode(true)).id = `color${j}`
            document.getElementById(`color${j}`).innerHTML = data.colors[j];
            document.getElementById(`color${j}`).htmlFor = `color-${j}`;

            colorForm.appendChild(newBr.cloneNode(true));

        }

        // Mise en page plus aérée
        colorForm.appendChild(newBr);

        // Ajoutons un addEventListener au clic du bouton d'envoi du formulaire
        document.querySelector('#product-form').addEventListener('submit', function (e) {

            // Désactiver l'action par défaut 
            e.preventDefault();

            // Je récupère les données du produit dont il est question, et je les range dans une classe Produit
            // {id, name, quantity, color, price, image}
            let product = new Produit(`${localStorage.id}`, `${data.name}`, `${document.getElementById('quantity').value}`, `${document.querySelector('input[name=color]:checked').value}`, `${data.price}`, `${data.imageUrl}`);

            // Vérifier si le localStorage n'est pas vide
            if (localStorage.getItem('products') !== null) {

                let productArray = JSON.parse(localStorage.getItem('products'));    // On récupère ce qu'il y a dans le local storage, et on met ça sous forme de tableau
                console.log(productArray.length);

                // Vérification à faire si on a déjà le produit dans le local storage
                for (let i=0; i<productArray.length; i++) {

                    if (productArray[i].id === localStorage.id) {   // Vérification si l'idientifiant du produit qu'on souhaite ajouter n'est pas dans le tableau de produits
                        
                        // parseInt() transforme un string en nombre !! On peut donc additionner nos deux valeurs!
                        productArray[i].quantity = parseInt(product.quantity) + parseInt(productArray[i].quantity); // On ne change que la quantité

                        // Afficher une alerte pour dire que le produit a été ajouté dans le panier
                        confirmation.innerHTML =`${data.name} a bien été ajouté au panier (x${product.quantity})
                                                <br/>
                                                Total de ${data.name} : ${productArray[i].quantity}`;
                        confirmation.hidden = false;

                        // Enregistrons les données
                        let productArrayString = JSON.stringify(productArray);  // On convertit le tableau de produits en string 
                        localStorage.setItem('products', productArrayString);   // On le sauvegarde dans le localStorage
                        console.log('Qté produit mise à jour');

                        // Stoppons la boucle for
                        i = productArray.length; 
                    }                   

                    // Si on arrive au bout de la longueur du tableau, le produit est donc nouveau --> on l'ajoute
                    if (i === (productArray.length)-1 && productArray[i].id !== localStorage.id) {  
                        
                        // On ajoute une nouvelle entrée dans le tableau 
                        productArray.push(product);                    
                        
                        // Enregistrons les données
                        let productArrayString = JSON.stringify(productArray);      // On convertit ce tableau de produits en string 
                        localStorage.setItem('products', productArrayString);       // On le sauvegarde dans le localStorage
                        console.log('Produit non existant, panier non vide');

                        // Afficher une alerte pour dire que le produit a été ajouté dans le panier
                        confirmation.innerHTML = `${data.name} a bien été ajouté au panier (x${product.quantity})
                        <br/>
                        Total de ${data.name} : ${product.quantity}`;
                        confirmation.hidden = false;

                        // Mettons la quantité totale à jour

                        // Stoppons la boucle for
                        i = productArray.length; 
                    }
                }
            }                    
                
            else {   // Si le localStorage est vide :

                console.log('localStorage vide, ajout du produit');
                let productArray = [product];                               // On l'ajoute directement dans le tableau de produits
                let productArrayString = JSON.stringify(productArray);      // On convertit ce tableau de produits en string 
                localStorage.setItem('products', productArrayString);       // On le sauvegarde dans le localStorage (qui n'accepte que des strings)
                console.log(localStorage);

                // Afficher une alerte pour dire que le produit a été ajouté dans le panier
                confirmation.innerHTML =`${data.name} a bien été ajouté au panier (x${product.quantity})
                                        <br/>
                                        Total : ${product.quantity}`;
                confirmation.hidden = false;
            }

            
        });


    })
    .catch(function (err) {
        console.log('Fetch problem: ' + err.message);
    });
