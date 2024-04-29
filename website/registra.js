var prodotto = {'filiale' : []};

function RegisterAzienda() {
    var textInputs = document.querySelectorAll('input[type="textAzienda"]'); // Seleziona tutti gli input di tipo testo
    var azienda = {};
    // Itera su ciascun input di testo
    textInputs.forEach(function(input) {
        // Ottieni l'ID dell'input e il suo valore
        var id = input.id;
        var value = input.value;
        
        // Assegna il valore alla variabile con il nome dell'ID
        azienda[id] = value;
    });
    document.getElementById("nome").value = "";
    document.getElementById("PIVA").value = "";
    document.getElementById("sede").value = "";
    prodotto.filiale.push(azienda);
}

function clearProductDetails() {
    var productDetails = document.getElementById("productDetails");
    var filialiDetails = document.getElementById("filialiDetails");
    productDetails.innerHTML = "";
    filialiDetails.innerHTML = "";
}

function displayProductDetails() {
    clearProductDetails(); // Pulisce i dettagli prima di visualizzarli
    var productDetails = document.getElementById("productDetails");
    var filialiDetails = document.getElementById("filialiDetails");
    if('name' in prodotto){
        productDetails.innerHTML = "<h5>Prodotto:</h5>";
        var tableHTML = "<table>"; // Inizio tabella
        tableHTML += "<tr><th>Nome</th><th>Categoria</th><th>Modello</th></tr>"; // Intestazione tabella
        tableHTML += "<tr>"; // Inizio riga per il prodotto
        tableHTML += `<td>${prodotto.name}</td>`; // Nome del prodotto
        tableHTML += `<td>${prodotto.categoria}</td>`; // Categoria del prodotto
        tableHTML += `<td>${prodotto.model}</td>`; // Modello del prodotto
        tableHTML += "</tr>"; // Fine riga per il prodotto
        tableHTML += "</table>"; // Fine tabella per il prodotto

        productDetails.innerHTML += tableHTML; // Visualizza la tabella del prodotto
        

        productDetails.innerHTML += "<br>"; // Aggiunge uno spazio tra il prodotto e le filiali
    }

    // Visualizza le informazioni delle filiali se esistono
    if ('filiale' in prodotto && Array.isArray(prodotto.filiale) && prodotto.filiale.length > 0) {
        filialiDetails.innerHTML += "<h5>Filiale:</h5>";
        var tableHTMLFiliali = "<table>"; // Inizio tabella
        tableHTMLFiliali += "<tr><th>Azienda</th><th>PIVA</th><th>Sede</th><th>Lavorazione</th></tr>"; // Intestazione tabella
        prodotto.filiale.forEach(function(azienda, index) {
            var nomeFittizio = "Azienda " + (index + 1); // Nome fittizio dell'azienda

            tableHTMLFiliali += "<tr>"; // Inizio riga per l'azienda
            tableHTMLFiliali += `<td>${azienda.nome}</td>`; // Nome dell'azienda
            tableHTMLFiliali += `<td>${azienda.PIVA}</td>`; // PIVA dell'azienda
            tableHTMLFiliali += `<td>${azienda.sede}</td>`; // Sede dell'azienda
            if ('lavorazione' in azienda) {
                tableHTMLFiliali += `<td>${azienda.lavorazione}</td>`; // Lavorazione dell'azienda
            } else {
                tableHTMLFiliali += `<td>Venditore</td>`; // Lavorazione non specificata
            }
            tableHTMLFiliali += "</tr>"; // Fine riga per l'azienda
        });
        tableHTMLFiliali += "</table>"; // Fine tabella per le filiali
        filialiDetails.innerHTML += tableHTMLFiliali;
    }
}


function SetProdotto(){
    var textInputs = document.querySelectorAll('input[type="textProdotto"]'); // Seleziona tutti gli input di tipo testo

    // Itera su ciascun input di testo
    textInputs.forEach(function(input) {
        // Ottieni l'ID dell'input e il suo valore
        var id = input.id;
        var value = input.value;
        
        // Assegna il valore alla variabile con il nome dell'ID
        prodotto[id] = value;
    });
    displayProductDetails();
}

function RegisterProdotto() {
    document.getElementById("name").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("model").value = "";

    addProduct();
}

function addFiliale()
{
    var textInputs = document.querySelectorAll('input[type="textFiliale"]'); // Seleziona tutti gli input di tipo testo
    var azienda = {};
    // Itera su ciascun input di testo
    textInputs.forEach(function(input) {
        // Ottieni l'ID dell'input e il suo valore
        var id = input.id;
        var value = input.value;
        
        // Assegna il valore alla variabile con il nome dell'ID
        azienda[id] = value;
        input.value = "";
    });

    //aggiunge azienda alle filiali
    prodotto.filiale.push(azienda);
    displayProductDetails();
}