async function retrieveProductInfo(id) {
    await fetch(`https://oc-p5-api.herokuapp.com/api/teddies/${id}`)
   .then ( response => response.json())
   .then (singleNounours => {
       return singleNounours
    })
}

function createCart() {
    //Zone du panier
    let panier = document.getElementById('content_table')
    
    //boucle qui reccup les keys du Panier
    for (let keys of Object.keys(localStorage)) {

        //On reprend tous les couleurs commandées d'un produit 
        for (let productColor of JSON.parse(localStorage[keys])) {
            let produit = document.createElement("article")
            let contenu = document.createTextNode(`la Peluche ${keys} a été commandé en ${productColor.color}`)
            panier.appendChild(produit)
            produit.appendChild(contenu)
            //console.log(`le produit ${keys} a été commandé en ${productColor.color}`)
        }
    }
}

