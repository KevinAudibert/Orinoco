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
    let products = []
    let send = { contact, products }
    console.log(JSON.stringify(send))
}

function btnSendOrder() {
    let div = document.getElementById('form')
    let contenu = document.createTextNode('Envoyer')
    let btnSendForm = document.createElement('button');
    btnSendForm.type='submit'
    btnSendForm.addEventListener('click', createFormSend())
    div.appendChild(btnSendForm);
    btnSendForm.appendChild(contenu);
}