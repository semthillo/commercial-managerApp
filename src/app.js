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

    } catch (error) {
        console.error("une Erreur est survenue veuillez relancer l'application", error);
      }
}
    
    




main();