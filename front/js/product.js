//region Recuperation_de_l_id
const url = new URL(document.location);
const id = url.searchParams.get('id');
//endregion Recuperation_de_l_id
//region Requete vers l'api et gestion des cas d'erreurs api
const apiFetch = fetch("http://localhost:3000/api/products/" + id);
apiFetch.then(succesApi).catch(erreurApi);

function succesApi(response) {
    const kanapJson = response.json();
    kanapJson.then(succeskanapJson).catch(erreurApi);
};
function erreurApi(e) {
    console.log("Erreur API", e);
}
//endregion Requete vers l'api et gestion des cas d'erreurs api
//region Afficher kanape dans le html
function succeskanapJson(kanap) {

    const img = document.createElement("img");
    img.src = kanap.imageUrl;
    document.querySelector(".item__img").append(img);
    document.querySelector("#title").textContent = kanap.name;
    document.querySelector("#price").textContent = kanap.price;
    document.querySelector("#description").textContent = kanap.description;

    const select = document.querySelector("#colors");
    for (let i = 0; i < kanap.colors.length; i++) {
        const option = document.createElement("option");
        option.value = kanap.colors[i];
        option.textContent = kanap.colors[i];
        select.appendChild(option);
    }
}
//endregion Afficher kanape dans le html
//region Gestion du button ajouts panier
let button = document.querySelector("#addToCart")
button.addEventListener("click",function(){
    recupererDonnesEtAjoutePanier()
})
function recupererDonnesEtAjoutePanier(){
    let selectQuantity  = document.querySelector("#colors");
    let inputQuantity = document.querySelector("#quantity");

    const colors   = selectQuantity.value
    const quantity = inputQuantity.value

    if(quantity <= 0){
        alert("Quantité invinlide");
        return
    }

    if(colors === ""){
        alert("Veuillez Selectionné une couleurs");
        return;
    }

    console.log("Couleurs", colors);
    console.log("Quantité", quantity);
    const kanap = {id:id,quantity:quantity,colors:colors};
    const panier = ChargerPanier();
    panier.push(kanap)
    SauvgarderPanier(panier)

}
//endregion Gestion du button ajouts panier
//region Gestion du panier
function ChargerPanier(){
    const kanapJSON = localStorage.getItem("panier");
    if(kanapJSON){
        const panier = JSON.parse(kanapJSON);
        return panier

    }else{
        return [];
    }
}
function SauvgarderPanier(panier){
    localStorage.setItem("panier", JSON.stringify(panier));
}
//endregion Gestion du panier




