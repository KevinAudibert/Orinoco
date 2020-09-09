//const fetch = require("node-fetch");

    fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(nounourses => listeProductNounours(nounourses));

function addParagraphe(txt, price, description) {
    let div = document.getElementsByClassName("produit")
    let para = document.createElement("p")
    let contenu = document.createTextNode(`${txt} coûte ${price/100} € ${description}`)
    para.appendChild(contenu)
    div.appendChild(para)
}

function addTitle(txt) {
    let div = document.getElementById("entete");
    let title = document.createElement("h1");
    title.style.textAlign = "center";
    let contenu = document.createTextNode(txt);
    div.appendChild(title);
    title.appendChild(contenu);
    
}


function addDiv(txt, price, url) {
    let div = document.getElementById("content");
    let newDiv = document.createElement("div");
    newDiv.className = "produit";
    let newImg = document.createElement("img");
    newImg.src = url
    newImg.style.width = "50%"
    newImg.style.height = "50%"
    newImg.style.border = "1px solid black"
    let createElt = document.createElement('p')
    let contenu = document.createTextNode(`${txt} coûte ${price/100} €`)
    div.appendChild(newDiv);
    newDiv.appendChild(createElt);
    createElt.appendChild(contenu);
    newDiv.appendChild(newImg)
}

function listeProductNounours(nounourses) {
    for (let nounours of nounourses) {
        addDiv(nounours.name, nounours.price, nounours.imageUrl)
    }
}