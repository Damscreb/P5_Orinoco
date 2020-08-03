// Création de l'HTML en fonction des données de localStorage si il n'est pas vide
if (localStorage.getItem('products') !== null) {
    
    let productCartArray = JSON.parse(localStorage.products);
    console.log(productCartArray);

    // Définissons l'endroit où on affichera les produits du panier
    const productCartHTML = document.getElementById('product-cart');

    let thePrice =0;


    // Bouclons dans le local storage pour récupérer tous les produits
    for (let i=0; i<productCartArray.length; i++) {

        // Définissons ce qui sera rajouté
        let cartProduct = document.createElement('div');
        cartProduct.id = `${productCartArray[i].name}`;
        cartProduct.className = 'row d-flex justify-content-between border border-info p-3 mb-3 text-right';
        cartProduct.innerHTML = `<div class='col-4 text-center'>
                                    <img src='${productCartArray[i].imageUrl}' class='furniture-height-cart mb-2'/>
                                    <h2>${productCartArray[i].name}</h2>                  
                                </div>
                                <div class='col-4 my-auto ml-auto'>
                                    <p class='informations'>Couleur : ${productCartArray[i].color}</p>
                                    <p class='informations'>Prix unitaire : ${productCartArray[i].price},00€</p>
                                    <p class='informations'>Quantité : ${productCartArray[i].quantity}</p>      
                                    <p class='informations'><strong>Prix total : ${productCartArray[i].price * productCartArray[i].quantity},00€</strong></p>
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

            // Si on a plus de produits dans le panier, on reset le localStorage, on enlève le bouton 'Passer la commande', on affiche 'Panier vide', on enlève le formulaire si il est là
            // Sinon le problème est qu'on a un localStorage.products vide, et qu'on a pas géré ce soucis pour rajouter des produits dans le panier ^^
            if (productCartArray.length === 0) {

                localStorage.removeItem('products');
                console.log("LocalStorage vidé");

                document.getElementById('cart-validation').hidden = true;

                // On crée le texte qu'on veut ajouter
                const cartEmpty = document.createElement('div');
                cartEmpty.className ='row';
                cartEmpty.innerHTML =`<div class='col'><div class='jumbotron bg-light mb-0 text-center'><h2><u>Votre panier est vide</u></h2></div></div>`;

                // On l'introduit
                const productCartHTML = document.getElementById('product-cart');
                productCartHTML.appendChild(cartEmpty);

                // On enlève le formulaire si jamais
                document.getElementById('form-client').hidden =true;
            }

        })
    }

    // Affichons le prix total du panier
    const totalPrice = document.querySelector('h3');
    totalPrice.innerHTML = `Prix du panier : ${thePrice},00€`;

    // Nous sommes dans le cas où le panier n'est pas vide : afficher le bouton 'Passer la commande'
    document.getElementById('cart-validation').hidden = false;


    // Affichons le formulaire lors clic du bouton Passer la commande
    document.getElementById('cart-validation').addEventListener('click', function(e) {

        // Désactiver l'action par défaut 
        e.preventDefault();

        // Affichons le formulaire de commande
        document.getElementById('form-client').hidden =false;

        // Cachons le bouton 'Passer la commande' pour le remplacer par un 'Valider la commande'
        document.getElementById('cart-validation').hidden = true;
    })
    
}

// Si le panier est vide
else {
    // On crée le texte qu'on veut ajouter
    const cartEmpty = document.createElement('div');
        cartEmpty.className ='row';
        cartEmpty.innerHTML =`<div class='col'><div class='jumbotron bg-light mb-0 text-center'><h2><u>Votre panier est vide</u></h2></div></div>`;

    // On l'introduit
    const productCartHTML = document.getElementById('product-cart');
        productCartHTML.appendChild(cartEmpty);

    // Affichons le prix nul du panier
    const totalPrice = document.querySelector('h3');
    totalPrice.innerHTML = `Prix du panier : 00,00€`;
}
