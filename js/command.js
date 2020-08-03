// Création d'une classe client
class Customer {
    constructor(prenom, nom, adresse, ville, email){
        this.prenom = prenom;
        this.nom = nom;
        this.adresse = adresse;
        this.ville = ville;
        this.email = email;
    }
}

// Vérification des données client


// Si ok
    // Récupérons les données client lors du clic du bouton 'Valider Commande' si on est sur la page cart.html
    if (document.getElementById('send-cart') !== null) {

        // Ajoutons un addEventListener au bouton 'Valider Commande'
        const buttonCustomer = document.getElementById('send-cart');
        buttonCustomer.addEventListener('click', function(e) {

            // Ici, on ne supprime pas l'action par défaut pour pouvoir à la fois enregistrer les données ET changer de page

            if (localStorage.getItem('customer') === null) {

                console.log('Cas client inexistant');
                // On enregistre les données dans notre classe customer
                let newCustomer = new Customer (`${document.getElementById('firstname').value}`, `${document.getElementById('lastname').value}`, `${document.getElementById('adress').value}`, `${document.getElementById('city').value}`, `${document.getElementById('email').value}`);

                // Et on enregistre ça dans le localStorage
                let customerString = JSON.stringify(newCustomer);
                localStorage.setItem('customer', customerString);
            }
            
            else {

                console.log('Cas client existant');

                // Dans le cas où le client existe déjà, on modifie les données de l'ancien client
                localStorage.removeItem('customer')
                newCustomer = new Customer (`${document.getElementById('firstname').value}`, `${document.getElementById('lastname').value}`, `${document.getElementById('adress').value}`, `${document.getElementById('city').value}`, `${document.getElementById('email').value}`);
                
                // Et on enregistre les nouvelles données dans le localStorage
                let customerString = JSON.stringify(newCustomer);
                localStorage.setItem('customer', customerString);
            }
        });
    }

// Sinon message erreur :

// Si tout est bon, on crée l'HTML. On vérifie donc qu'on est bien sur la page de commande
if (document.getElementById('confirmation-customer') !== null) {

    // Récupérons les données du local storage
        // Les produits
        let productCartCommandArray = JSON.parse(localStorage.products);
        console.log(productCartCommandArray);

        // Les données client
        let customerData = JSON.parse(localStorage.customer);
        console.log(customerData);

    // On calcule en // le prix total
    let totalPrice =0;

    // Affichons les
        for (let i=0; i<productCartCommandArray.length; i++) {

            if (i===0) {

                // On affiche ce qu'on doit afficher qu'une seule fois
                document.getElementById('confirmation-customer').innerHTML = `
                    <div class='row'>
                        <div class='col'>
                            <h2 class='h4'>Mr/Mme ${customerData.nom}</h2>
                            <p>Merci pour votre confiance, nous vous tiendrons à jour de la commande sous les plus brefs délais !</p><br />
                        </div>
                    </div>

                    <div class='row'>
                        <div class='col col-4 bg-secondary mx-auto border border-dark py-2'>
                            <h5 class='text-center'>Votre commande sera envoyée à :</h5>
                            <p class='text-center m-0'>
                                <strong>
                                    ${customerData.prenom} ${customerData.nom}<br />
                                    ${customerData.adresse}<br />
                                    ${customerData.ville}
                                </strong>
                            </p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <h2 class="h5 my-3 d-flex justify-content-between" id='cart-presentation'></h2>
                        </div>
                    </div>`
            }

            // On calcule le totalPrice
            totalPrice += productCartCommandArray[i].price * productCartCommandArray[i].quantity;

            // Et on ajoute les produits un par un
            document.getElementById('confirmation-customer').innerHTML += `
                <div class="row d-flex justify-content-between border border-info p-3 mb-3 text-right mx-0">
                    <div class='col-4 text-center p-0'>
                        <img src='${productCartCommandArray[i].imageUrl}' class='furniture-height-cart mb-2'/>                 
                    </div>
                    <div class='col-2 p-0 text-left d-flex align-items-center'>
                        <h2>${productCartCommandArray[i].name}</h2> 
                    </div>
                    <div class='col-4 my-auto ml-auto'>
                        <p class='informations'>Couleur : ${productCartCommandArray[i].color}</p>
                        <p class='informations'>Prix unitaire : ${productCartCommandArray[i].price},00€</p>
                        <p class='informations'>Quantité : ${productCartCommandArray[i].quantity}</p>      
                        <p class='informations'><strong>Prix total : ${productCartCommandArray[i].price * productCartCommandArray[i].quantity},00€</strong></p>     
                    </div>
                </div>`;

            // A la fin on affiche le prix total
            if (i === (productCartCommandArray.length - 1)) {

                document.getElementById('cart-presentation').innerHTML = `<u>Détail de la commande</u><u>Prix total : ${totalPrice},00€</u>`;
            }
        }
}