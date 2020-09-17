fetch("http://localhost:3000/api/teddies")
.then(response => response.json())
.then(nounourses => listeProductNounours(nounourses));

function addPicture(parent, url) {
    let eltImg = document.createElement('img');
    eltImg.src = url;
    parent.appendChild(eltImg);
}

function addName(parent, txt) {
    let newPara = document.createElement('h4');
    let contenu = document.createTextNode(txt);
    parent.appendChild(newPara);
    newPara.appendChild(contenu);
}

function addPrice(parent, price) {
    let newParaPrice = document.createElement('p');
    let contenu = document.createTextNode(`À partir de ${price/100} €`)
    parent.appendChild(newParaPrice)
    newParaPrice.appendChild(contenu);
}

function addDiv(url, txt, price) {
    let div = document.getElementById('content');
    let newDiv = document.createElement('div');
    newDiv.className = "product";
    div.appendChild(newDiv);
    addPicture(newDiv, url);
    addName(newDiv, txt);
    addPrice(newDiv, price);
}

function listeProductNounours(nounourses) {
    for (let nounours of nounourses) {  
        addDiv(nounours.imageUrl, nounours.name, nounours.price);
    }
}