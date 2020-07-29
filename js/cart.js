// Création de l'HTML en fonction des données de localStorage
let productCartArray = JSON.parse(localStorage.products);
console.log(productCartArray);

// Définissons l'endroit où on affichera les produits du panier
let productCartHTML = document.getElementById('product-cart');

let thePrice =0;


// Bouclons dans le local storage pour récupérer tous les produits
for (let i=0; i<productCartArray.length; i++) {

    // Définissons ce qui sera rajouté
    let cartProduct = document.createElement('div');
    cartProduct.className = 'row d-flex justify-content-between border border-info p-3 mb-3';
    cartProduct.innerHTML = `<div class='col-4 text-center'>
                                <img src='${productCartArray[i].imageUrl}' class='furniture-height-cart mb-2'/>
                                <h2>${productCartArray[i].name}</h2>                  
                            </div>
                            <div class='col-4 my-auto ml-auto'>
                                <p class='informations'>Couleur : ${productCartArray[i].color}</p>
                                <p class='informations'>Prix unitaire : ${productCartArray[i].price},00€</p>
                                <p class='informations'>Quantité : ${productCartArray[i].quantity}</p>      
                                <p class='informations'>Prix total : ${productCartArray[i].price * productCartArray[i].quantity},00€</p>          
                            </div>`

    // Additionons le prix total
    thePrice += productCartArray[i].price * productCartArray[i].quantity;
        
    // Affichons tous nos produits
    productCartHTML.appendChild(cartProduct).cloneNode(true);
}

// Affichons le prix total du panier
let totalPrice = document.querySelector('h3');
totalPrice.innerHTML = `Prix du panier : ${thePrice},00€`;
