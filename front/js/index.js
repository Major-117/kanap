//region gestion Requete Api avec fetch
const apiFetch = fetch("http://localhost:3000/api/products");
apiFetch.then(succesApi).catch(erreurApi);
const section = document.querySelector("section#items.items");

function succesApi(response) {
    const kanapJson = response.json();
    kanapJson.then(succesKanapJson).catch(erreurApi);
}

function erreurApi(){
    alert("Une erreur est intervenu !");
}

function succesKanapJson(listeKanap) {
    for(let canape of listeKanap){
        const kanapHtml = requeteKanap(canape);
        section.append(kanapHtml);
    }
}


function requeteKanap(canape){
    const a = document.createElement("a");
    a.href = `./product.html?id=${canape._id}`
    a.innerHTML = `
    <article>
        <img src="${canape.imageUrl}" alt="${canape.altTxt}">
        <h3 class="productName">${canape.name}</h3>
        <p class="productDescription">${canape.description}</p>
    </article>
    `;
    return a; 
}
//endregion gestion Requete Api avec fetch






