//async function retrieveProductInfo(id) {
//    await fetch(`http://localhost:3000/api/teddies/${id}`)
//   .then ( response => response.json())
//   .then (singleNounours => {
//       return singleNounours
//    })
//}

function createCart() {
    //Zone du panier
    let panier = document.getElementById('content_table')
    
    //boucle qui reccup les keys du Panier
    for (let keys of Object.keys(localStorage)) {

        //On reprend tous les couleurs commandées d'un produit 
        for (let product of JSON.parse(localStorage[keys])) {
            let produit = document.createElement("article")
            let contenu = document.createTextNode(`la Peluche ${product.name} de couleur ${product.color} a été commandé ${product.quantity} fois`)
            panier.appendChild(produit)
            produit.appendChild(contenu)
        }
    }
}

//Retrieve data form 
function retrieveFirstName() {
    let firstNameForm = document.getElementById('firstName').nodeValue
    console.log(JSON.stringify(firstNameForm))
}

function retrieveLastName() {
    let lastNameForm = document.getElementById('lastName').nodeValue
    console.log(JSON.stringify(lastNameForm))
}

function retrieveEmail() {
    let emailForm = document.getElementById('email').nodeValue
    console.log(JSON.stringify(emailForm))
}

function retrieveAddress() {
    let addressForm = document.getElementById('address').nodeValue
    console.log(JSON.stringify(addressForm))
}

function retrieveCity() {
    let cityForm = document.getElementById('city').nodeValue
    console.log(JSON.stringify(cityForm))
}

function blablaCity() {
    retrieveFirstName();
    retrieveLastName();
    retrieveEmail();
    retrieveAddress();
    retrieveCity();
}

function btnSendOrder() {
    let div = document.getElementById('form')
    let contenu = document.createTextNode('Envoyer')
    let btnSendForm = document.createElement('button');
    btnSendForm.type='submit'
    btnSendForm.addEventListener('click', blablaCity)
    div.appendChild(btnSendForm);
    btnSendForm.appendChild(contenu);
}