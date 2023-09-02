//region variable
const panierRegrouper = {};
const panier = ChargerPanier();
const canapesApi = {};
//endregion variable
//region SauvgarderPanier
function SauvgarderPanier(panierRegrouper){
    const tableauPanierRegrouper =  Object.values(panierRegrouper);
    localStorage.setItem("panier", JSON.stringify(tableauPanierRegrouper));
}

      panier.forEach(function (canapePanier){
        const idAndColors = canapePanier.id + canapePanier.colors;
        if(panierRegrouper[idAndColors]){
            const toutLesCanapeRegouper = panierRegrouper[idAndColors];
            toutLesCanapeRegouper.quantity = Number(toutLesCanapeRegouper.quantity) + Number(canapePanier.quantity);
        }else{
            panierRegrouper[idAndColors] = canapePanier;
        }
    })
    console.log("PanierRegrouper",panierRegrouper);

    const tableauPanierRegrouper =  Object.values(panierRegrouper);
    tableauPanierRegrouper.forEach(function(canapePanier, index) {
        console.log("http://localhost:3000/api/products/" + canapePanier.id);
        fetch("http://localhost:3000/api/products/" + canapePanier.id).then(function(response) {
            response.json().then(function(canape) {
                console.log("canape", canape);
                canapesApi[canapePanier.id] = canape;
                afficherPanier(canape, canapePanier);
                if (index+1 === tableauPanierRegrouper.length){
                    majPrix();
                }

            });
        });
    });

    function erreurApi(e) {
    console.log("Erreur API", e);
}
//endregion SauvgarderPanier
//region gestion panier
function ChargerPanier(){
    const kanapJSON = localStorage.getItem("panier");
    if(kanapJSON){
        const panier = JSON.parse(kanapJSON);
        return panier

    }else{
        return [];
    }
}

function afficherPanier(canape, canapePanier){

    let section = document.querySelector("#cart__items");
    let article = document.createElement("article");
    article.classList.add("cart__item");
    article.innerHTML +=  `
                <div class="cart__item__img">
                  <img src="${canape.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${canape.name}</h2>
                    <p>${canapePanier.colors}</p>
                    <p>${canape.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canapePanier.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
    `
    section.append(article)

    let buttonRemove = article.querySelector(".deleteItem");
    buttonRemove.addEventListener("click", function () {
        let idAndColors = canapePanier.id + canapePanier.colors;

        delete panierRegrouper[idAndColors]
        article.remove();
        SauvgarderPanier(panierRegrouper);

        majPrix();
    });

    let valeurQuantity = article.querySelector(".itemQuantity");
    valeurQuantity.addEventListener("change", function (){
        let idAndColors = canapePanier.id + canapePanier.colors;
        const valeur = Number(valeurQuantity.value);
        const valeurPanier = panierRegrouper[idAndColors];
        valeurPanier.quantity = valeur;
        SauvgarderPanier(panierRegrouper);
        majPrix();
        console.log("valeur changer");
    })
}
//endregion gestion panier
//region Mettre à jour le prix
function majPrix(){
        let prixTotal = 0;
        let quantityTotal = 0;
        const tableauPanierRegrouper = Object.values(panierRegrouper);
        tableauPanierRegrouper.forEach(function (canapePanier){

            const canape = canapesApi[canapePanier.id];
            const prixCanape = Number(canape.price) * Number(canapePanier.quantity);
            prixTotal = Number(prixTotal)+Number(prixCanape);
            quantityTotal = Number(quantityTotal) + Number(canapePanier.quantity);
        })
            const spanQuantity = document.querySelector("#totalQuantity");
            const spanPrix = document.querySelector("#totalPrice");
            spanQuantity.innerHTML = quantityTotal;
            spanPrix.innerHTML = prixTotal;
    }
//endregion Mettre à jour le prix
//region gestion Formulaire
const form = document.querySelector(".cart__order__form");
form.addEventListener("submit", async function (e){
    e.preventDefault();
    const formFirstName = document.querySelector("#firstName");
    const erreurFirstName = document.querySelector("#firstNameErrorMsg");
    const firstName = formFirstName.value;

    const formLastName = document.querySelector("#lastName");
    const erreurLastName = document.querySelector("#lastNameErrorMsg");
    const lastName = formLastName.value;

    const cityInput = document.querySelector("#city");
    const erreurCity = document.querySelector("#cityErrorMsg");
    const city = cityInput.value;

    const addressInput = document.querySelector("#address");
    const erreurAdress = document.querySelector("#addressErrorMsg");
    const addresse = addressInput.value;

    const mailInput = document.querySelector('#email');
    const erreurMail = document.querySelector("#emailErrorMsg");
    const mail = mailInput.value;

    // const regEx = /[0-9]\s(rue|avenue|route|allé)\s\w/;
    const regExVillePrenomNom = /^[A-Za-zÀ-ÖØ-öø-ÿ -]+$/m;
    const regExAdresse = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 -]+$/m;
    const regExMail = /.+@.+\..+/
    if(!firstName || firstName.length < 2 || !regExVillePrenomNom.test(firstName) ){
        erreurFirstName.innerHTML = "Prenom Invalide !";
        return;
    }else{
        erreurFirstName.innerHTML = "";
    }
    if(!lastName || lastName.length < 2 || !regExVillePrenomNom.test(lastName)){
        erreurLastName.innerHTML = "Nom Invalide !"
        return;
    }else{
        erreurLastName.innerHTML = "";
    }

    if (!city || city.length < 2 || !regExVillePrenomNom.test(city)){
        erreurCity.innerHTML = "Ville Invalide !";
        return;
    }else{
        erreurCity.innerHTML = "";
    }
    if (!addresse || addresse.length < 2 || !regExAdresse.test(addresse)){
        erreurAdress.innerHTML = "Address Invalide !";
        return;
    }else{
        erreurAdress.innerHTML = "";
    }
    if (!mail|| mail.length < 2 || !regExMail.test(mail)){
        erreurMail.innerHTML = "Mail Invalide !";
        return;
    }else{
        erreurMail.innerHTML = "";
    }

    const contact = {
        firstName : firstName,
        lastName  : lastName,
        city : city,
        address : addresse,
        email : mail,
    }

    // const tableauId = Object.keys(panierRegrouper);
    const url = "http://localhost:3000/api/products/order"

    const TABLEAUID = [];

    for(let clee in panierRegrouper){
        let canapePanier = panierRegrouper[clee];
        TABLEAUID.push(canapePanier.id);
    }


    const reponse= await fetch(url,{
        method: "POST",
        body: JSON.stringify({contact,products:TABLEAUID}),
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
        }
    })
    if (!reponse.ok){
        alert("Une erreur est survenu");

    }else{
        let donnes = await reponse.json();
        let orderId = donnes.orderId;
        window.location = `confirmation.html?orderId=${orderId}`;
        console.log(donnes);
    }

});
//endregion gestion Formulaire











