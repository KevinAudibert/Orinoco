//const fetch = require("node-fetch");

    fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(nounourses => listeProductNounours(nounourses));

//function addParagraphe(txt, price, description) {
//    let div = document.getElementsByClassName("produit")
//    let para = document.createElement("p")
//    let contenu = document.createTextNode(`${txt} coûte ${price/100} € ${description}`)
//    para.appendChild(contenu)
//    div.appendChild(para)
//}

function addDiv(txt, price, url, colors, description) {
    let div = document.getElementById("content");
    let newDiv = document.createElement("div");
    newDiv.className = "produit";
    let newImg = document.createElement("img");
    newImg.src = url
    let newList = document.createElement('ul');
    newList.className = "colors";
    let listColors = document.createElement('li');
    let createElt = document.createElement('p');
    let contenu = document.createTextNode(`${txt} coûte ${price/100} €`)
    let contenuColors = document.createTextNode(colors);
    div.appendChild(newDiv);
    newDiv.appendChild(createElt);
    createElt.appendChild(contenu);
    newDiv.appendChild(newImg)
    newDiv.appendChild(newList)
    newList.appendChild(listColors);
    listColors.appendChild(contenuColors);
    addCoucou(listColors)
    addDescription(newDiv, description)
}

function addDescription(parent, description) {
    let desc = document.createElement('p')
    let contenu = document.createTextNode(description)
    desc.appendChild(contenu)
    console.log(parent)
    parent.appendChild(desc)
}

function addCoucou(parent) {
    let contenu = document.createTextNode('coucou')
    let para = document.createElement('p')
    para.appendChild(contenu)
    parent.appendChild(para)
}

function listeProductNounours(nounourses) {
    for (let nounours of nounourses) {  
        addDiv(nounours.name, nounours.price, nounours.imageUrl, nounours.colors, nounours.description);
    }
}