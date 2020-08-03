// Ici, on veut juste récupérer la quantité totale du panier, et l'ajouter 
// en notification sur toutes les pages

if (localStorage.getItem('products') !== null) {

    // Récupération des quantités
    let productCartArray = JSON.parse(localStorage.products);
    let totalQuantity = 0;

    // Calcul des quantités
    for (let i=0; i<productCartArray.length; i++) {

        totalQuantity += parseInt(productCartArray[i].quantity);
    }

    // On veut l'afficher à côté de 'Panier' du header
    let newSpan = document.createElement('span');
        newSpan.className = 'badge badge-pill badge-success';
        newSpan.textContent = `${totalQuantity}`;
    document.querySelector(`h5[name='cart']`).appendChild(newSpan);

    // Vérifions cette condition pour éviter toute erreur bloquante
    if (document.querySelector('#product-form') !== null) {

        // On va avoir besoin de mettre à jour la quantité lors de l'AJOUT d'un produit au panier
        // Ajoutons un addEventListener au clic du bouton d'ajout de produit
        document.querySelector('#product-form').addEventListener('submit', function (e) {

            // Désactiver l'action par défaut 
            e.preventDefault();

            // Récupération de la quantité demandée
            const addQuantity = document.getElementById('quantity').value;
            totalQuantity += parseInt(addQuantity);
            
            // Affichons la
            document.querySelector(`span[class='badge badge-pill badge-success']`).textContent = `${totalQuantity}`;
            console.log(`Valeur affichée :p`);
        })
    }

    // On va avoir besoin de mettre à jour la quantité lors de la SUPPRESSION d'un produit au panier
    // Ajoutons un addEventListener au clic des boutons de suppression de produit
    for (let i=0; i<productCartArray.length; i++){

        // Vérifions cette condition pour éviter toute erreur bloquante
        if (document.querySelector(`button[name='${productCartArray[i].name}`) !== null) {

            document.querySelector(`button[name='${productCartArray[i].name}`).addEventListener('click', function (e){

            // Désactiver l'action par défaut 
            e.preventDefault();

            // Récupération de la quantité supprimée
            let lowerQuantity = parseInt(productCartArray[i].quantity)
            totalQuantity -= lowerQuantity;
            console.log(lowerQuantity);
            console.log(totalQuantity);

            // Affichons la
            document.querySelector(`span[class='badge badge-pill badge-success']`).textContent = `${totalQuantity}`;
            })
        }
    }
}

