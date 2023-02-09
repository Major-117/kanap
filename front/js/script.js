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
            let Kanap_Sinope  = reponse[0];
            let Kanap_Cyllene = reponse[1];
            let Kanap_Calyce  = reponse[2];
            let Kanap_Autonoe = reponse[3];
            let Kanap_Eurydome = reponse[4];


            console.log(Kanap_Sinope,Kanap_Cyllene);

        }
        else{
            console.log('Une Erreur est intervenue !!');
        }
    }
}