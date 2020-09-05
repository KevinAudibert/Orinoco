//const fetch = require("node-fetch");

    fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(nounourses => listeProductNounours(nounourses));

function addParagraphe(txt, price, description) {
    let div = document.getElementById('nounours')
    let para = document.createElement("p")
    let contenu = document.createTextNode(`${txt} coûte ${price/100} € ${description}`)
    para.appendChild(contenu)
    div.appendChild(para)
}

function listeProductNounours(nounourses) {
    for (let nounours of nounourses) {
        addParagraphe(nounours.name, nounours.price, nounours.description)
    }
}