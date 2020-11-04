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
            btnRemoveItems(produit, keys)
        }
        load(keys)
    }
    //addTotalPriceOrder() 
}

function addTotalPriceOrder() {
    let divContent = document.getElementById('total_price')
    let newDiv = document.createElement('p')
    let contenu = document.createTextNode('hello')
    divContent.appendChild(newDiv)
    newDiv.appendChild(contenu)
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
function btnRemoveItems(parent) {
    let btnRemove = document.createElement('button');
    let contents = document.createTextNode('Supprimer');
    btnRemove.type='submit'
    //btnRemove.addEventListener('click', removeItem)
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
function emptyCart(produit) {
    window.localStorage.removeItem(produit); 
 }

//Fonction permettant de mettre en forme de formulaire rempli par l'utilisateur pour l'envoi vers API 
function createFormSend() {

    //variables qui reccupere les valeur du formulaire 
    let firstNameForm = document.getElementById('firstName').value
    let lastNameForm = document.getElementById('lastName').value
    let emailForm = document.getElementById('email').value
    let addressForm = document.getElementById('address').value
    let cityForm = document.getElementById('city').value
    // mise en forme du formulaire pour le send vers API
    let contact = {
        firstName : firstNameForm,
        lastName : lastNameForm,
        email : emailForm,
        address : addressForm,
        city : cityForm,
    }
    let products = Object.keys(localStorage)
    let send = { contact, products }
    console.log(send)
    //sendFormApi(send)
}

//function sendFormApi(send){
//fetch('http://localhost:3000/api/teddies/order', {
//  method: "POST",
//  body: JSON.stringify(send),
//  headers: {"Content-type": "application/json; charset=UTF-8"}
//})
//.then (response => response.json)
//.then (json => console.log(json))
//}