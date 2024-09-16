const readlineSync = require("readline-sync");
const customerModule = require("./customerManager");
const productModule = require("./productManager");
const orderModule = require("./orderManager");
const paymentModule = require("./payementManager");



async function main() {
    try {
        console.log("Bienvenue dans ManagerApp !");
    
        console.log("1. Gerer les Clients");
        console.log("2. Gerer les Produits");
        console.log("3. Gerer les Commande ");
        console.log("4. Gerer Les Payement");
        console.log("5. Quitter");
    
        const choice = readlineSync.question("Choisissez une option : ");

        switch (choice) {
      case "1":
        console.log("1. Liste des clients");
        console.log("2. Ajouter un client");
        console.log("3. Modifier un client");
        console.log("4. Supprimer un client");
        console.log("5. Retourner Au Menu principal");
        console.log("6. Quitter");
        const choix = readlineSync.question("Choisissez une option :");
        break;
        }

    } catch (error) {
        console.error("une Erreur est survenue veuillez relancer l'application", error);
      }

}
    
    




main();