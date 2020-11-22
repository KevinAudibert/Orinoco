//fetch("http://localhost:3000/api/teddies")
fetch("https://oc-p5-api.herokuapp.com/api/teddies")
.then(response => response.json())
.then(nounourses => listeProductNounours(nounourses));

//Ajout balise img avec lien url de l'image
function addPicture(parent, url) {
    let eltImg = document.createElement('img');
    eltImg.src = url;
    parent.appendChild(eltImg);
}

//Ajout de la balise H3 avec le nom du nounours
function addName(parent, txt) {
    let newPara = document.createElement('h3');
    let contenu = document.createTextNode(txt);
    parent.appendChild(newPara);
    newPara.appendChild(contenu);
}

//Ajout balise <p> avec du texte affichant le prix
function addPrice(parent, price) {
    let newParaPrice = document.createElement('p');
    let contenu = document.createTextNode(`Au prix de ${price/100} €`)
    parent.appendChild(newParaPrice)
    newParaPrice.appendChild(contenu);
}

//Ajout d'un bouton avec lien vers autres pages
function addBtn(parent, id) {
    let div = document.createElement('form')
    let bouton = document.createElement('input')
    bouton.type="button"
    bouton.value="Voir Produit"
    bouton.onclick= function() {
        document.location.href=`../html/product.html?id=${id}`
    }
    parent.appendChild(div);
    div.appendChild(bouton);
}

//Fonction qui créé une <div> et regroupe les autres fonction créées auparavant
function addDiv(url, txt, price, id) {
    let div = document.getElementById('content');
    let newDiv = document.createElement('div');
    newDiv.className = "product";
    div.appendChild(newDiv);
    addPicture(newDiv, url);
    addName(newDiv, txt);
    addPrice(newDiv, price);
    addBtn(newDiv, id);
}

//Fonction avec une boucle sur le tableau puis fait appel une fonction
function listeProductNounours(nounourses) {
    for (let nounours of nounourses) {
        addDiv(nounours.imageUrl, nounours.name, nounours.price, nounours._id);
    }
}

function cartCount() {

    //Zone du panier
    let total = 0
    //boucle qui reccup les keys du Panier
    for (let keys of Object.keys(localStorage)) {
        for (let product of JSON.parse(localStorage[keys])) {
            total += product.quantity
        }
    }
    addQuantityTotal(total)
}

function addQuantityTotal(total) {
    let cartQuantityTotal = document.getElementById('cart_count')
    let contenu = document.createTextNode(total)
    cartQuantityTotal.appendChild(contenu)
}