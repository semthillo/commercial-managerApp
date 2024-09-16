const readlineSync = require("readline-sync");
const customerModule = require("./customerManager");
const productModule = require("./productManger");
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

              switch (choix) {
                case "1":
                  const customer = await customerModule.getCustomer();
                  console.table(customer);
                  main();
                  break;
                  case "2":
                    const name = readlineSync.question("Nom du client: ");
                    const address = readlineSync.question("Address du  client: ");
                    const email = readlineSync.question("Email du client: ");
                    const phone = readlineSync.question("Téléphone du client: ");
                    const customerId = await customerModule.addCustomer(
                      name,
                      address,
                      email,
                      phone
                    );
                    console.log(`Client ajouté avec l'id ${customerId}`);
                    main();
                    break;

                    case "3":
            const clients = await orderModule.getClient();
            let cmdExists = false;
            let id;

            while (!cmdExists) {
              id = readlineSync.question(`Entrez l'id du client : `);
              id = parseInt(id);
              for (let i = 0; i < clients.length; i++) {
                if (id === clients[i]) {
                  cmdExists = true;
                  console.log("Client trouvé, id:", id);
                  break;
                }
              }

              if (!cmdExists) {
                console.log("Ce client n'existe pas, veuillez réessayer.");
              }
            }

            const newName = readlineSync.question("Entrez le  nouveau nom: ");
            const newAdress = readlineSync.question(
              "Nouvelle Adress du client: "
            );
            const newEmail = readlineSync.question("Nouveau email: ");
            const newPhone = readlineSync.question(
              "Nouveau numero de téléphone: "
            );

            await customerModule.updateCustomer(
              id,
              newName,
              newAdress,
              newEmail,
              newPhone
            );
            console.log("Client modifié");
            main();
            break;
          case "4":
            const deleteId = readlineSync.question(
              "ID du client à supprimer: "
            );
            await customerModule.destroyCustomer(deleteId);

            main();
            break;
          case "5":
            main();
            break;
          case "6":
            console.log("Au revoir !");
            break;

          default:
            console.log("Veuillez choisir une option entre 1 et 6");
            main();
            break;
        }

              break;

            case "2":
                console.log("1. Liste des produits");
                console.log("2. Ajouter un produit");
                console.log("3. Modifier un produit");
                console.log("4. Supprimer un produit");
                console.log("5. Retourner Au Menu principal");
                console.log("6. Quitter");
                const choix2 = readlineSync.question("Choisissez une option :");
            
            
                break;

                case "3":
                  console.log("1. Liste des commandes");
                  console.log("D. Liste les details d'une commandes");
                  console.log("2. Ajouter un commande");
                  console.log("3. Modifier un commande");
                  console.log("4. Supprimer un commande");
                  console.log("5. Retourner Au Menu principal");
                  console.log("6. Quitter");
                  choixx = readlineSync.question("Choisissez une option :");
                  break;

                case "4":
                    console.log("1. Liste des payements");
                    console.log("2. Ajouter un payement");
                    console.log("3. Modifier un payement");
                    console.log("4. Supprimer un payement");
                    console.log("5. Retourner Au Menu principal");
                    console.log("6. Quitter");
                    const choixP = readlineSync.question("Choisissez une option :");

                    break;
                    case "5":
                      console.log("Au revoir !");
                      break;
              
                    default:
                      console.log("Veuillez choisir une option entre 1 et 6");
                      main();
                      break; 
          
            }

        

    } catch (error) {
        console.error("une Erreur est survenue veuillez relancer l'application", error);
      }

}
    
    




main();