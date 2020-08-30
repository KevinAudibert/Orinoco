//const fetch = require("node-fetch");

async function retrieveData(url) {
    let response = await fetch(url);

    if (response.ok) {
        let json = await response.json();
        console.log(json);
    } else {
        alert("HTTP-Error: " + response.status);
    }

}

function addParagraphe(txt) {
    let div = document.getElementById('test')
    let para = document.createElement("p")
    let contenu = document.createTextNode(txt)
    div.appendChild(para)
    para.appendChild(contenu)
}

retrieveData("http://localhost:3000/api/teddies")