async function load(id) {
    let response = await fetch(`http://localhost:3000/api/teddies/${id}`);
    let data = await response.json();
    let tableau = document.getElementsByClassName(`image_${id}`)
        for (let image of tableau) {
            image.src = data.imageUrl
        }
}

//Fonction qui permet de faire le recapitulatif des produit stockés dans le localStorage
function createCart() {

    //Zone du panier
    let panier = document.getElementById('content_table')
        
    //boucle qui reccup les keys du Panier
    for (let keys of Object.keys(localStorage)) {

        //On reprend tous les couleurs commandées d'un produit 
        for (let product of JSON.parse(localStorage[keys])) {

            //variables
            let produit = document.createElement("article")
            let div = document.createElement('div')
            //Variable qui permet de multiplier le prix avec la quantitée choisie
            let totalPrice = product.price * product.quantity

            //Ajout au DOM
            panier.appendChild(produit)
            addImageTeddy(produit, product.id)

            produit.appendChild(div)
            addNameTeddy(div, product.name)
            addColorTeddy(div, product.color)
            addQuantityTeddy(div, product.quantity)
            addPriceTeddy(div, product.id, totalPrice)

            //Ajout du bouton pour supprimer l'article du localStorage
            btnRemoveItems(produit, keys, product)
        }
        load(keys)
    }
    addTotalPriceOrder()
}

function addTotalPriceOrder() {
    let divContent = document.getElementById('total_price')
    let newDiv = document.createElement('p')
    let contenu = document.createTextNode(`Votre Panier est Vide`)
    let total = 0

    for (let keys of Object.keys(localStorage)) {
        for (product of JSON.parse(localStorage[keys])) {
            let totalPriceProduct = product.quantity * product.price
            total += totalPriceProduct
        }
    }
    if (total === 0) {
        divContent.appendChild(newDiv)
        newDiv.appendChild(contenu)
    } else {
        let newContenu = document.createTextNode(`Total de votre commande ${total} €`)
        divContent.appendChild(newDiv)
        newDiv.appendChild(newContenu)
    }
}

function addImageTeddy(produit, id) {
    let image = document.createElement('img')
    image.className = `image_${id}`
    produit.appendChild(image)    
}

function addPriceTeddy(produit, id, txt) {
    let price = document.createElement('p')
    price.className = `price_${id}`
    let contenu = document.createTextNode(`Prix Total : ${txt} €`)
    produit.appendChild(price)
    price.appendChild(contenu)
}

//fonction permettant de créer un bouton pour supprimer un article
function btnRemoveItems(parent, id, product) {
    let btnRemove = document.createElement('button');
    let contents = document.createTextNode('Supprimer');
    btnRemove.type='submit'
    btnRemove.addEventListener('click', function(){ 
    emptyCart(id, product)
    })
    parent.appendChild(btnRemove);
    btnRemove.appendChild(contents);
}

//fonction permettant de créer balise pour le nom du Teddy
function addNameTeddy(parent, txt) {
    let newPara = document.createElement('h4');
    let contenu = document.createTextNode(txt);
    parent.appendChild(newPara);
    newPara.appendChild(contenu);
}

//fonction permettant de créer balise pour la couleur 
function addColorTeddy(parent, color) {
    let newPara = document.createElement('p');
    let contenu = document.createTextNode(`Couleur : ${color}`);
    parent.appendChild(newPara);
    newPara.appendChild(contenu);
}

//fonction permettant de créer balise pour la quantitée
function addQuantityTeddy(parent, quantity) {
    let newPara = document.createElement('p');
    newPara.className = 'quantity'
    let contenu = document.createTextNode(`Quantité : ${quantity}`);
    parent.appendChild(newPara);
    newPara.appendChild(contenu);
}

//fonction permettant de supprimer l'article
function emptyCart(id, product) {

    let cart = JSON.parse(localStorage.getItem(id))
    for (let [index, item] of cart.entries()) {
        if (product.name === item.name && product.color === item.color) {
            cart.splice(index, 1)
            localStorage.setItem(id, JSON.stringify(cart))
        }
    }
    cleanCart(cart, id)
    window.location.reload()

}

//fonction permettant de verifier si la keys du localStorage posséde des valeurs
function cleanCart(cart, id) {
    if (cart.length === 0) {
        localStorage.removeItem(id)  
    }
    return 
}

//Variable qui cible le bouton envoyer commande
let validPanier = document.getElementById('btn_order');

//Fonction permettant de verifier et envoyer le formulaire vers l'API
function sendOrderApi(event){

//Variable pour récupérer les données de prenom, nom, adresse, ville, email
let prenom = document.getElementById('firstName');
let nom = document.getElementById('lastName');
let adresse = document.getElementById('address');
let ville = document.getElementById('city');
let email = document.getElementById('email');
  
//variable pour effectuer les tests de caractère sur les champs du formulaire avec REGEX
let testNomVilleValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
let adresseValid = /^[A-Z-a-z-0-9\s]{5,80}$/;
let emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//vérification si le champ nom contient des caractères interdits
    if (testNomVilleValid.test(nom.value) == false){
        event.preventDefault();
        alert("votre nom n'est pas conforme")
//vérification si le champ prénom contient des caractères interdits
    } else if (testNomVilleValid.test(prenom.value) == false){
        event.preventDefault();
        alert("votre prénom n'est pas conforme")
//vérification si le champ adresse contient des caractères interdits
    } else if (adresseValid.test(adresse.value) == false){
        event.preventDefault();
        alert("votre adresse n'est pas conforme")
//vérification si le champ ville contient des caractères interdits
    } else if (testNomVilleValid.test(ville.value) == false){
        event.preventDefault();
        alert("votre ville n'est pas conforme")
    } else if (emailValid.test(email.value) == false){
        event.preventDefault();
        alert("votre adresse mail n'est pas conforme")
    } else {
        event.preventDefault();

//reccup les données rempli dans le formulaire
        let contact = {
            firstName: nom.value,
            lastName: prenom.value,
            address: adresse.value,
            city: ville.value,
            email: email.value,
        }

//Reccup les id des produit présent dans le localstorage
        let products = Object.keys(localStorage);

//regroupe les données a envoyer (contact et id product)
        let dataSend = {
            contact,
            products,
        }

//Fonction permettant l'envoie des données a l'API
    const sendApi = async function (data) {
        try {
            let reponse = await fetch ('http://localhost:3000/api/teddies/order', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-type': 'application/json'
                }
            });
//Si la reponse de l'API est OK alors on reccup les données, ouvre la page html confirmation avec order id dans url
            if (reponse.ok){
                let donnees = await reponse.json();
                window.location = 'confirmation.html?OrderId=' + donnees.orderId;
//Si pas OK alors on affiche l'erreur en reponse
            } else {
                event.preventDefault();
                alert ("L'erreur rencontrée est : " + reponse.status);
            }
        } 
        catch (error){
              alert ("erreur : " + error);
        }
    };
//Appel de la focntion async pour la requete POST
    sendApi(dataSend);
    }
};

//Clic avec appel de la fonction de verif et envoie a l'API
validPanier.addEventListener('click', sendOrderApi)