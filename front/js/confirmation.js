//region paramètre
let url = new URL(document.location);
let orderId = url.searchParams.get("orderId");
//endregion paramètre
//region Affichage de la commande
let span = document.querySelector("#orderId");
span.innerText= orderId;
//endregion Affichage de la commande