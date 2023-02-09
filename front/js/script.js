const url = "http://localhost:3000/api/products";

var XMLHttpRequest = require('xhr2')

let requete = new XMLHttpRequest();
requete.open('GET',url);
requete.responseType = 'json';
requete.send();

requete.onload = function(){
    if (requete.readyState === XMLHttpRequest.DONE){
        if (requete.status === 200){
            let reponse = requete.response;
            let Kanap_Sinope    = reponse[0];
            let Kanap_Cyllene   = reponse[1];
            let Kanap_Calyce    = reponse[2];
            let Kanap_Autonoe   = reponse[3];
            let Kanap_Eurydome  = reponse[4];
            let Kanap_Helice    = reponse[5];
            let Kanap_Thyone    = reponse[6];
            let Kanap_orthosie  = reponse[7];

            console.log(Kanap_Sinope,Kanap_Cyllene,Kanap_Calyce,Kanap_Autonoe,Kanap_Eurydome,Kanap_Helice,Kanap_Thyone,Kanap_orthosie);

        }
        else{
            console.log('Une Erreur est intervenue !!');
        }
    }
}