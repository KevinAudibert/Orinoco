//const fetch = require("node-fetch");

//const { json } = require("body-parser");

function displayId() {
    var url_string = window.location.href
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    fetch(`https://oc-p5-api.herokuapp.com/api/teddies/${id}`)
    .then (response => response.json())
    .then (singleNounours => {
        if(!singleNounours) {
            displayNone('Aucun Produit Correspondant')
            return
        }
        displayName(singleNounours)
    })
}

function displayName(singleNounours) {
    addSection(singleNounours.imageUrl, singleNounours.name, singleNounours.price, singleNounours.description)
    for (let colors of singleNounours.colors) {
        const eltOption = document.createElement('option')
        eltOption.textContent=colors
        eltOption.value=colors
        document.getElementById('colors').appendChild(eltOption)
    }
    addBtnQuantity()
    addCart()
}

//Ajout balise img avec lien url de l'image
function addPicture(parent, url) {
    let eltImg = document.createElement('img');
    eltImg.src = url;
    parent.appendChild(eltImg);
}

//Ajout de la balise H4 avec le nom du nounours
function addName(parent, txt) {
    let newPara = document.createElement('h3');
    newPara.id = "title_product"
    let contenu = document.createTextNode(txt);
    parent.appendChild(newPara);
    newPara.appendChild(contenu);
}

//Ajout balise <p> avec du texte affichant le prix
function addPrice(parent, price) {
    let newParaPrice = document.createElement('p');
    let contenu = document.createTextNode(`Au prix de ${price/100} €`);
    parent.appendChild(newParaPrice);
    newParaPrice.appendChild(contenu);
}
//Ajout balise <p> avec texte descrptif du nounours
function addDescription(parent, description) {
    let newDescription = document.createElement('p');
    let contenu = document.createTextNode(description);
    parent.appendChild(newDescription);
    newDescription.appendChild(contenu);
}
//Ajout balise <form> dans html
function addForm(parent) {
    let form = document.createElement('form');
    let para = document.createElement('p');
    let contenu = document.createTextNode('Couleurs disponibles : ');
    let select = document.createElement('select');
    select.name = 'colors'
    select.id = 'colors'
    parent.appendChild(form);
    form.appendChild(para);
    form.appendChild(select);
    para.appendChild(contenu);
}
//Création balise html saisi quantité nounours
function addBtnQuantity() {
    let div = document.getElementById('details')
    let label = document.createElement('label');
    label.for="quantity"
    let contenu = document.createTextNode('Quantité : ')
    let input = document.createElement('input')
    input.type= 'Number'
    input.id="quantity"
    input.name="nounours"
    input.min="0"
    input.max="100"
    div.appendChild(label);
    label.appendChild(contenu);
    label.appendChild(input)
}

function addToCart() {
    var url_string = window.location.href
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    let color = document.getElementById('colors').value 
    let quantity = document.getElementById('quantity').value

    if (window.localStorage.getItem(id)) {

            if (JSON.parse(window.localStorage.getItem(id))[0].color === color) {

                let newQuantity = Number(JSON.parse(window.localStorage.getItem(id))[0].quantity)+Number(quantity)
                const product = [{
                    color,
                    quantity : newQuantity
                }]
                window.localStorage.setItem(id, JSON.stringify(product))
                console.log('produit rajouté au panier')
            }
            else {
                
                let pdt = JSON.parse(window.localStorage.getItem(id))
                const newProduit = [{
                    color,
                    quantity,
                }]
                pdt.push(newProduit)
                window.localStorage.setItem(id, JSON.stringify(pdt))
                console.log('nouvelle couleur ajouté au panier')
            }
        return
    }
    else {
        console.log('produit au panier')
    }

const product = [{
    color,
    quantity,
}]
    window.localStorage.setItem(id, JSON.stringify(product))
    return
}


function displayCart() {
    console.log(window.localStorage);
}

//Bouton, ajout au panier
function addCart() {
    let div = document.getElementById('details')
    let contenu = document.createTextNode('Ajouter au panier')
    let btnAddCart = document.createElement('button');
    btnAddCart.type='submit'
    btnAddCart.addEventListener('click', addToCart)
    div.appendChild(btnAddCart);
    btnAddCart.appendChild(contenu);
//bouton, afficher le panier
    let btn = document.createElement('button');
    let content = document.createTextNode('Afficher Panier');
    btn.type='submit'
    btn.addEventListener('click', displayCart)
    div.appendChild(btn);
    btn.appendChild(content);
//bouton, supprimer totalement le panier
    let btnRemove = document.createElement('button');
    let contents = document.createTextNode('Supprimer Panier');
    btnRemove.type='submit'
    btnRemove.addEventListener('click', emptyCart)
    div.appendChild(btnRemove);
    btnRemove.appendChild(contents);
}
//fonction qui supprime le panier
function emptyCart() {
   window.localStorage.clear(); 
}

//Fonction qui créé une <section> et regroupe les autres fonction créées auparavant
function addSection(url, txt, price, description) {
    let div = document.getElementById('content');
    let newSection = document.createElement('section');
    newSection.className = "product_detail";
    newSection.id = "details"
    div.appendChild(newSection);
    addPicture(newSection, url);
    addName(newSection, txt);
    addPrice(newSection, price);
    addDescription(newSection, description);
    addForm(newSection)
}