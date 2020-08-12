// Ici, on veut juste récupérer la quantité totale du panier, et l'ajouter 
// en notification sur toutes les pages

if (localStorage.getItem('products') !== null) {

    // Récupération des quantités
    let productCartArray = JSON.parse(localStorage.products);
    let totalQuantity = 0;

    // On veut l'afficher à côté de 'Panier' du header
    let newSpan = document.createElement('span');
        newSpan.className = 'badge badge-pill badge-success';
        newSpan.textContent = `${totalQuantity}`;
    document.querySelector(`h5[name='cart']`).appendChild(newSpan);

    // Calcul des quantités
    for (let i=0; i<productCartArray.length; i++) {

        totalQuantity += parseInt(productCartArray[i].quantity);

        if (i === (productCartArray.length - 1)) {
            // Affichons la
            document.querySelector(`span[class='badge badge-pill badge-success']`).textContent = `${totalQuantity}`;
        }
    }

    // Vérifions cette condition pour éviter toute erreur bloquante (on est sur la page produit)
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
        })
    }

    // On va avoir besoin de mettre à jour la quantité lors de la SUPPRESSION d'un produit au panier
    // Ajoutons un addEventListener au clic des boutons de suppression de produit
    let listButton = document.querySelectorAll(`button.btn-cart`);
    if (listButton !== null) {
        for (let i=0; i<listButton.length; i++){
            document.querySelector(`button[name='${listButton[i].name}']`).addEventListener('click', function (e){
                
                // Désactiver l'action par défaut 
                e.preventDefault();

                // Récupération de la quantité supprimée
                let lowerQuantity = parseInt(productCartArray[i].quantity)
                totalQuantity -= lowerQuantity;

                // Affichons la
                document.querySelector(`span[class='badge badge-pill badge-success']`).textContent = `${totalQuantity}`;
            })
        }
    }

} else { // Dans le cas ou on ajoute le 1er produit

    let i =0;

    // Vérifions cette condition pour éviter toute erreur bloquante (on est sur la page produit)
    if (document.querySelector('#product-form') !== null) {

        // Définition du calcul
        let totalQuantity = 0;

        // On va avoir besoin de mettre à jour la quantité lors de l'AJOUT d'un produit au panier
        // Ajoutons un addEventListener au clic du bouton d'ajout de produit
        document.querySelector('#product-form').addEventListener('submit', function (e) {

            // Désactiver l'action par défaut 
            e.preventDefault();

            // Récupération de la quantité demandée
            const addQuantity = document.getElementById('quantity').value;
            totalQuantity += parseInt(addQuantity);

            if (i !== 1) {
                // On veut l'afficher à côté de 'Panier' du header, une seule fois
                let newSpan = document.createElement('span');
                    newSpan.className = 'badge badge-pill badge-success';
                    newSpan.textContent = `${totalQuantity}`;
                document.querySelector(`h5[name='cart']`).appendChild(newSpan);
                document.querySelector(`span[class='badge badge-pill badge-success']`).textContent = `${totalQuantity}`;

                i++;
            }

            // Si le badge est déjà créé, on ne modifie que sa valeur
            document.querySelector(`span[class='badge badge-pill badge-success']`).textContent = `${totalQuantity}`;
        })
    }
}