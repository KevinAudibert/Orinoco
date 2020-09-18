const fetch = require("node-fetch");

fetch("http://localhost:3000/api/teddies")
.then(response => response.json())
.then(nounourses => productNounours(nounourses));


function productNounours(nounourses) {
    for (let nounours of nounourses) {  
        console.log(nounours.name)
    }
}