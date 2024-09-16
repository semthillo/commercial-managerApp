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
                    const mail = await customerModule.getEmailClient()
                    
                    let mailExist = true;
                    let email;
                
                    while (mailExist) {
                        email = readlineSync.question("Email du client: ");
                        mailExist = false;
                
                        
                        for (let i = 0; i < mail.length; i++) {
                            if (email === mail[i]) {
                                mailExist = true;
                                break;
                            }
                        }
                
                        if (mailExist) {
                            console.log(`L'email ${email} appartient déjà à un client. Veuillez réessayer.`);
                        }
                    }
                    const phones = await customerModule.getPhoneClient();
                    let phoneExist = true;
                    let phone;
                
                    while (phoneExist) {
                        phone = readlineSync.question("Téléphone du client: ");
                        phoneExist = false; // Réinitialiser la variable avant de vérifier
                
                        // Vérifier si le numéro de téléphone existe déjà
                        for (let i = 0; i < phones.length; i++) {
                            if (phone === phones[i]) {
                                phoneExist = true;
                                break;
                            }
                        }
                
                        if (phoneExist) {
                            console.log(`Le numéro de téléphone ${phone} appartient déjà à un client. Veuillez réessayer.`);
                        }
                    }
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
            
    const newMail = await customerModule.getEmailClient();
    let newMailExist = true;
    let newEmail;

    while (newMailExist) {
        newEmail = readlineSync.question("newEmail du client: ");
        newMailExist = false; // Réinitialiser la variable avant de vérifier

        // Parcourir la liste des newEmails pour voir si l'newEmail existe déjà
        for (let i = 0; i < newMail.length; i++) {
            if (newEmail === newMail[i]) {
                newMailExist = true; // Si l'newEmail existe, mettre newMailExist à true
                break;
            }
        }

        if (newMailExist) {
            console.log(`L'newEmail ${newEmail} appartient déjà à un client. Veuillez réessayer.`);
        }
    }

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
                switch (choix2) {
                    case "1":
                      const products = await productModule.getProduct();
                      console.table(products);
                      main();
                      break;
          
                    case "2":
                      const name = readlineSync.question("Nom du produit: ");
                      const description = readlineSync.question(
                        "description du  produit: "
                      );
                      let price;
                      while (true) {
                        price = readlineSync.question("prix du produit: ");
                        if (!isNaN(price) && price.trim() !== "") {
                          price = parseFloat(price);
                          break;
                        }
                        console.log("Le prix doit etre un nombre.");
                      }
          
                      let stock;
                      while (true) {
                        stock = readlineSync.question("stock du produit: ");
                        if (
                          !isNaN(stock) &&
                          Number.isInteger(parseFloat(stock)) &&
                          stock.trim() !== ""
                        ) {
                          stock = parseInt(stock);
                          break;
                        }
                        console.log(
                          "Le stock doit etre un nombre."
                        );
                      }
          
                      console.log(`Prix: ${price}, Stock: ${stock}`);
                      const category = readlineSync.question("category du produit: ");
                      const barcode = readlineSync.question("barre-code du produit: ");
                      const status = readlineSync.question("status du produit: ");
                      const productId = await productModule.addProduct(
                        name,
                        description,
                        price,
                        stock,
                        category,
                        barcode,
                        status
                      );
                      console.log(`Produit ajouté avec l'id ${productId}`);
                      main();
                      break;
          
                    case "3":
                      const prouit = await productModule.getProduit();
                      let cmdExists = false;
                      let id;
          
                      while (!cmdExists) {
                        id = readlineSync.question(`Entrez l'id du produit : `);
                        id = parseInt(id);
                        for (let i = 0; i < prouit.length; i++) {
                          if (id === prouit[i]) {
                            cmdExists = true;
                            console.log("produit trouvé, id:", id);
                            break;
                          }
                        }
          
                        if (!cmdExists) {
                          console.log("Ce produit n'existe pas, veuillez réessayer.");
                        }
                      }
                      const newName = readlineSync.question(
                        "Entrez le  nouveau nom du produit: "
                      );
                      const newDescription = readlineSync.question(
                        "Nouvelle description du produit: "
                      );
                      let newPrice;
                      while (true) {
                        newPrice = readlineSync.question("prix du produit: ");
                        if (!isNaN(newPrice) && newPrice.trim() !== "") {
                          newPrice = parseFloat(newPrice);
                          break;
                        }
                        console.log("Le prix doit etre un nombre.");
                      }
          
                      let newStock;
                      while (true) {
                        newStock = readlineSync.question("newStock du produit: ");
                        if (
                          !isNaN(newStock) &&
                          Number.isInteger(parseFloat(newStock)) &&
                          newStock.trim() !== ""
                        ) {
                          newStock = parseInt(newStock);
                          break;
                        }
                        console.log(
                          "Le stock doit etre un nombre."
                        );
                      }
                      const newcategory = readlineSync.question(
                        "Nouvelle catégorie du produit: "
                      );
                      const newBarecode = readlineSync.question(
                        "Nouveau code barre du produit: "
                      );
                      const newStatus = readlineSync.question(
                        "Nouveau statut du produit: "
                      );
          
                      await productModule.updateProduct(
                        id,
                        newName,
                        newDescription,
                        newPrice,
                        newStock,
                        newcategory,
                        newBarecode,
                        newStatus
                      );
                      console.log("produit modifié");
                      main();
                      break;
                    case "4":
                     
                      const proui = await productModule.getProduit();
                      let cExists = false;
                      let  deleteId;
          
                      while (!cExists) {
                        deleteId = readlineSync.question(`ID du produit à supprimer: `);
                        deleteId = parseInt(deleteId);
                        for (let i = 0; i < proui.length; i++) {
                          if (deleteId === proui[i]) {
                            cExists = true;
                            console.log("produit trouvé, Id:", deleteId);
                            break;
                          }
                        }
          
                        if (!cExists) {
                          console.log("Ce produit n'existe pas, veuillez réessayer.");
                        }
                      }
                      await productModule.destroyProduct(deleteId);
                      console.log("Produit supprimé");
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
                      break;
                  }
            
                break;

                case "3":
                  console.log("1. Liste des commandes");
                  console.log("D. Liste les details d'une commandes");
                  console.log("2. Ajouter un commande");
                  console.log("3. Modifier un commande");
                  console.log("4. Supprimer un commande");
                  console.log("5. Retourner Au Menu principal");
                  console.log("6. Quitter");
                  const choixx = readlineSync.question("Choisissez une option :");
                 
                  switch (choixx) {
                    case "1":
                        const order = await orderModule.getOrder();
                        console.table(order);
                        main();
                        break;

                    case "D":
                    

                        const comman = await orderModule.getOrderById();
                        let cmdExist = false;
                        let cId;

                        while (!cmdExist) {
                        cId = readlineSync.question(`Entrez l'id de la commande : `);
                        cId = parseInt(cId);
                        for (let i = 0; i < comman.length; i++) {
                            if (cId === comman[i]) {
                            cmdExist = true;
                            console.log("commande trouvé, id:", cId);
                            break;
                            }
                        }

                        if (!cmdExist) {
                            console.log("Cette commande n'existe pas, veuillez réessayer.");
                        }
                        }
                        const orderDetails = await orderModule.getDetailByOrderId(cId);
                        console.table(orderDetails);
                        main();
                        break;

                    case "2":
                        const datePurchase = readlineSync.question(
                        "Entrez la date de la commande: "
                        );

                        const deliveryAddress = readlineSync.question(
                        `l'address de livraison:  `
                        );
                        const client = await orderModule.getClient();
                        let clientExists = false;
                        let customerId;

                        while (!clientExists) {
                        customerId = readlineSync.questionInt(`l'id du client: `);

                        for (let i = 0; i < client.length; i++) {
                            if (customerId === client[i]) {
                            clientExists = true;
                            console.log("Client trouvé, id:", customerId);
                            break;
                            }
                        }

                        if (!clientExists) {
                            console.log("Ce client n'existe pas, veuillez réessayer.");
                        }
                        }

                        const track = readlineSync.question("numero de la commande: ");

                        const statusOrder = readlineSync.question(
                        "status de la commande: "
                        );
                        const commande = {
                        date_purchase: datePurchase,
                        delivery_adress: deliveryAddress,
                        customer_id: customerId,
                        track_number: track,
                        status: statusOrder,
                        };
                        console.log(commande);

                        const mesDetails = [];

                        let cmd = true;
                        while (cmd) {
                        const details = {};

                        console.log("Entrez un details de la commande: ");

                        const produit = await productModule.getProduit();
                        let produitExists = false;
                        let produitId;

                        while (!produitExists) {
                            produitId = details.produitId = readlineSync.question(
                            `Entrez l'id du produit : `
                            );

                            produitId = parseInt(details.produitId);

                            for (let i = 0; i < produit.length; i++) {
                            if (produitId === produit[i]) {
                                produitExists = true;
                                console.log("Produit trouvé, id:", produitId);
                                break;
                            }
                            }

                            if (!produitExists) {
                            console.log("Ce produit n'existe pas, veuillez réessayer.");
                            }
                        }

                        
                        
                        while (true) {
                            details.price = readlineSync.question("Entrez le prix du produit : ");
                            if (!isNaN(details.price) && details.price.trim() !== "") {
                            details.price = parseFloat(details.price); 
                            break; 
                            }
                            console.log("Veuillez entrer un nombre valide pour le prix.");
                        }
                        
                        while (true) {
                            details.quantity = readlineSync.question("Entrez la quantité du produit : ");
                            if (!isNaN(details.quantity) && Number.isInteger(parseFloat(details.quantity)) && details.quantity.trim() !== "") {
                            details.quantity = parseInt(details.quantity); 
                            break; 
                            }
                            console.log("Veuillez entrer un nombre entier valide pour la quantité.");
                        }
                        
                        console.log(`Prix: ${details.price}, Quantité: ${details.quantity}`);
                        

                        mesDetails.push(details);
                        console.log("Détails de la commande:", mesDetails);

                        const tmp = readlineSync.question(
                            "Appuyez sur : \n A pour ajouter un autre produit; \n S pour enregistrer la commande; \n Z pour quitter : "
                        );

                        switch (tmp.toUpperCase()) {
                            case "A":
                            break;
                            case "S":
                            cmd = false;
                            break;
                            case "Z":
                            console.log("Commande annulée.");
                            main();
                            break;
                            default:
                            console.log("Option non reconnue. Veuillez réessayer.");
                            break;
                        }
                        }

                        const orderId = await orderModule.addOrder(commande);

                        console.log(`La commande ajouté avec l'id ${orderId}`);

                        for (let i = 0; i < mesDetails.length; i++) {
                        const detail = mesDetails[i];
                        const pu = await orderModule.getPrix(detail.produitId);

                        detail.price = pu * detail.quantity;

                        try {
                            await orderModule.addDetail(
                            orderId,
                            detail.produitId,
                            detail.quantity,
                            detail.price
                            );
                            console.log("Détail enregistré:", detail);
                        } catch (err) {
                            console.error("Erreur lors de l'ajout du détail:");
                        }
                        }
                        main();
                        break;

                    case "3":
                        const command = await orderModule.getOrderById();
                        let cmdExists = false;
                        let updateId;

                        while (!cmdExists) {
                        updateId = readlineSync.question(`Entrez l'id de la commande : `);
                        updateId = parseInt(updateId);
                        for (let i = 0; i < command.length; i++) {
                            if (updateId === command[i]) {
                            cmdExists = true;
                            console.log("commande trouvé, id:", updateId);
                            break;
                            }
                        }

                        if (!cmdExists) {
                            console.log("Cette commande n'existe pas, veuillez réessayer.");
                        }
                        }
                        const newDate = readlineSync.question(
                        "Entrez la nouvelle date de la commande: "
                        );
                        const newAdress = readlineSync.question(
                        "Nouvelle adresse de la livraison: "
                        );
                        const newClient = await orderModule.getClient();
                        let newClientExists = false;
                        let nCustomerId;

                        while (!newClientExists) {
                        nCustomerId = readlineSync.questionInt(`l'id du newClient: `);

                        for (let i = 0; i < newClient.length; i++) {
                            if (nCustomerId === newClient[i]) {
                            newClientExists = true;
                            console.log("newClient trouvé, id:", nCustomerId);
                            break;
                            }
                        }

                        if (!newClientExists) {
                            console.log("Ce newClient n'existe pas, veuillez réessayer.");
                        }
                        }
                        const newTrack = readlineSync.question(
                        "Nouveau numéro de la commande : "
                        );
                        const newStatus = readlineSync.question(
                        "Nouveau statut de la commande: "
                        );

                        const newCommande = {
                        date_purchase: newDate, 
                        customer_id: nCustomerId,
                        delivery_adress: newAdress,
                        track_number: newTrack,
                        status: newStatus,
                        };

                        console.log("Nouvelle commande:", newCommande);

                        const mesNewDetails = [];
                        let newcCmd = true;

                        while (newcCmd) {
                        const details = {};
                        console.log("Entrez un nouveau détail de la commande: ");

                        const produit = await productModule.getProduit();
                        let produitExists = false;
                        let produitId;

                        while (!produitExists) {
                            produitId = details.produitId = readlineSync.question(
                            `Entrez l'id du produit : `
                            );

                            produitId = parseInt(details.produitId);

                            for (let i = 0; i < produit.length; i++) {
                            if (produitId === produit[i]) {
                                produitExists = true;
                                console.log("Produit trouvé, id:", produitId);
                                break;
                            }
                            }

                            if (!produitExists) {
                            console.log("Ce produit n'existe pas, veuillez réessayer.");
                            }
                        }

                        details.newPrice = readlineSync.question(
                            `Entrez le prix du produit : `
                        );
                        while (isNaN(details.newPrice) || details.newPrice <= 0) {
                            console.log("Le prix doit être un nombre valide.");
                            details.newPrice = readlineSync.question(
                            `Entrez le prix du produit : `
                            );
                        }

                        details.newQuantity = readlineSync.question(
                            `Entrez la quantité du produit : `
                        );
                        while (isNaN(details.newQuantity) || details.newQuantity <= 0) {
                            console.log("La quantité doit être un nombre valide.");
                            details.newQuantity = readlineSync.question(
                            `Entrez la quantité du produit : `
                            );
                        }

                        mesNewDetails.push(details);
                        console.log("Nouveaux détails de la commande:", mesNewDetails);

                        const newTmp = readlineSync.question(
                            "Appuyez sur : \n A pour ajouter un autre produit; \n S pour enregistrer la commande; \n Z pour quitter : "
                        );

                        switch (newTmp.toUpperCase()) {
                            case "A":
                            break; 
                            case "S":
                            newcCmd = false; 
                            break;
                            case "Z":
                            console.log("Commande annulée.");
                            return; 
                            default:
                            console.log("Option non reconnue. Veuillez réessayer.");
                            break;
                        }
                        }

                        await orderModule.updateOrder(updateId, newCommande);
                        console.log(`Commande avec un nouveau ID : ${updateId} modifiée `);

                        for (let i = 0; i < mesNewDetails.length; i++) {
                        const detail = mesNewDetails[i];

                        
                        if (
                            !detail.produitId ||
                            isNaN(detail.newPrice) ||
                            isNaN(detail.newQuantity)
                        ) {
                            console.log(
                            `Erreur : détail invalide pour le produit ID: ${detail.produitId}`
                            );
                            continue; 
                        }

                        console.log(
                            `Ajout d'un nouveau détail pour le produit ID: ${detail.produitId}`
                        );
                        await orderModule.addDetail(
                            updateId, 
                            detail.produitId, 
                            detail.newQuantity,
                            detail.newPrice
                        );
                        console.log("Détail ajouté avec succès");
                        }
                        main();

                        break;

                    case "4":
                        const commandes = await orderModule.getOrderById();
                        let cmdExistss = false;
                        let deleteId;

                        while (!cmdExistss) {
                        deleteId = readlineSync.question(`Entrez l'id de la commandes : `);
                        deleteId = parseInt(deleteId);
                        for (let i = 0; i < commandes.length; i++) {
                            if (deleteId === commandes[i]) {
                            cmdExistss = true;
                            console.log("commande trouvé, id:", deleteId);
                            break;
                            }
                        }

                        if (!cmdExistss) {
                            console.log("Cette commande n'existe pas, veuillez réessayer.");
                        }
                        }
                        await orderModule.destroyOrder(deleteId);
                        
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
                        break;
                    }
                case "4":
                    console.log("1. Liste des payements");
                    console.log("2. Ajouter un payement");
                    console.log("3. Modifier un payement");
                    console.log("4. Supprimer un payement");
                    console.log("5. Retourner Au Menu principal");
                    console.log("6. Quitter");
                    const choixP = readlineSync.question("Choisissez une option :");
                    
                    switch (choixP) {
                        case "1":
                          const payments = await paymentModule.getPayement();
                          console.log(payments);
                          main();
                          break;
              
                        case "2":
                          const command = await orderModule.getOrderById();
                          let cmdExists = false;
                          let orderId;
              
                          while (!cmdExists) {
                            orderId = readlineSync.question(`Entrez l'id de la commande : `);
                            orderId = parseInt(orderId);
                            for (let i = 0; i < command.length; i++) {
                              if (orderId === command[i]) {
                                cmdExists = true;
                                console.log("commande trouvé, id:", orderId);
                              }
                            }
                            if (!cmdExists) {
                              console.log("Cette commande n'existe pas, veuillez réessayer.");
                            }
                          }
                          const datePayement = readlineSync.question("Date du paiement: ");
                          let amount;
                          while (true) {
                            amount = readlineSync.question("le montant: ");
                            if (!isNaN(amount) && amount.trim() !== "") {
                              amount = parseFloat(amount);
                              break;
                            }
                            console.log("Le montant doit etre un nombre.");
                          }
                          const payementMethod = readlineSync.question(
                            "Méthode de paiement : "
                          );
              
                          const paymentId = await paymentModule.addPayement(
                            orderId,
                            datePayement,
                            amount,
                            payementMethod
                          );
                          console.log(`Paiement ajouté avec l'ID ${paymentId}`);
                          main();
                          break;
              
                        case "3":
                          const newCommand = await orderModule.getOrderById();
                          let newCmdExists = false;
                          let newOrderId;
              
                          while (!newCmdExists) {
                            newOrderId = readlineSync.question(
                              `Entrez l'id de la commande à payer : `
                            );
                            newOrderId = parseInt(newOrderId);
              
                            for (let i = 0; i < newCommand.length; i++) {
                              if (newOrderId === newCommand[i]) {
                                newCmdExists = true;
                                console.log("Commande trouvée, id:", newOrderId);
                              }
                            }
              
                            if (!newCmdExists) {
                              console.log("Cette commande n'existe pas, veuillez réessayer.");
                            }
                          }
              
                          const newDatePayement = readlineSync.question(
                            "Nouvelle date du paiement : "
                          );
                          let newAmount;
                          while (true) {
                            newAmount = readlineSync.question("le montant: ");
                            if (!isNaN(newAmount) && newAmount.trim() !== "") {
                              newAmount = parseFloat(newAmount);
                              break;
                            }
                            console.log("Le montant doit etre un nombre.");
                          }
                          const newPayementMethod = readlineSync.question(
                            "Nouvelle méthode de paiement : "
                          );
              
                          const newPayement = {
                            date_payement: newDatePayement,
                            amount: newAmount,
                            payement_method: newPayementMethod,
                            order_id: newOrderId,
                          };
              
                          await paymentModule.updatePayement(newPayement);
              
                          console.log("Paiement modifié avec succès.");
              
                          main();
                          break;
                          case "4":

                          const pay = await paymentModule.getpay();
                          let cmdExistss = false;
                          let deleteId;
                
                          while (!cmdExistss) {
                            deleteId = readlineSync.question(`Entrez l'id du payement : `);
                            deleteId = parseInt(deleteId);
                            for (let i = 0; i < pay.length; i++) {
                              if (deleteId === pay[i]) {
                                cmdExistss = true;
                                console.log("payement trouvé, id:", deleteId);
                                break;
                              }
                            }
                
                            if (!cmdExistss) {
                              console.log("Cette payement n'existe pas, veuillez réessayer.");
                            }
                          }
                
                            await paymentModule.destroyPayement(deleteId);
                            console.log("Paiement supprimé");
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