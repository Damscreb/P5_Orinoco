// Création de l'HTML en fonction des données de localStorage si il n'est pas vide
if (localStorage.getItem('products') !== null) {
    let productCartArray = JSON.parse(localStorage.products);
    console.log(productCartArray);

    // Définissons l'endroit où on affichera les produits du panier
    let productCartHTML = document.getElementById('product-cart');

    let thePrice =0;


    // Bouclons dans le local storage pour récupérer tous les produits
    for (let i=0; i<productCartArray.length; i++) {

        // Définissons ce qui sera rajouté
        let cartProduct = document.createElement('div');
        cartProduct.id = `${productCartArray[i].name}`;
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
                                    <button class='btn btn-danger' name ='${productCartArray[i].name}'>Supprimer</button>        
                                </div>`;

        // Additionons le prix total
        thePrice += productCartArray[i].price * productCartArray[i].quantity;
            
        // Affichons tous nos produits
        productCartHTML.appendChild(cartProduct).cloneNode(true);

        // Ajoutons l'effet du bouton 'Supprimer' pour chaque article du panier
        document.querySelector(`button[name='${productCartArray[i].name}']`).addEventListener('click', function (e) {
            
            // Suppression de l'HTML concerné
            document.getElementById(`${productCartArray[i].name}`).remove();

            // Mise à jour du prix total du panier
            thePrice -= productCartArray[i].price * productCartArray[i].quantity;
            totalPrice.innerHTML = `Prix du panier : ${thePrice},00€`;

            // Suppression du produit concerné dans le tableau de produits du panier
            productCartArray.splice(i,1);  // Ca ca marche, c'est validé

            // Suppression du produit concerné dans le localStorage
            let productArrayString = JSON.stringify(productCartArray);  // On convertit le tableau de produits en string 
            localStorage.setItem('products', productArrayString);       // On le sauvegarde dans le localStorage

            // Si on a plus de produits dans le panier, on reset le localStorage
            // Sinon le problème est qu'on a un localStorage.products vide, et qu'on a pas géré ce soucis pour rajouter des produits dans le panier ^^
            if (productCartArray.length === 0) {
                localStorage.removeItem('products');
                console.log("LocalStorage vidé");
            }

        })
    }

    // Affichons le prix total du panier
    let totalPrice = document.querySelector('h3');
    totalPrice.innerHTML = `Prix du panier : ${thePrice},00€`;
}

// Si le panier est vide
else {
    // On crée le texte qu'on veut ajouter
    let cartEmpty = document.createElement('div');
        cartEmpty.className ='row';
        cartEmpty.innerHTML =`<div class='col'><div class='jumbotron bg-light mb-0 text-center'><h2><u>Votre panier est vide</u></h2></div></div>`;

    // On l'introduit
    let productCartHTML = document.getElementById('product-cart');
        productCartHTML.appendChild(cartEmpty);

    // Affichons le prix nul du panier
    let totalPrice = document.querySelector('h3');
    totalPrice.innerHTML = `Prix du panier : 00,00€`;
}
