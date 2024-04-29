var azienda = {};
var prodotto = {};

function RegisterAzienda() {
    var textInputs = document.querySelectorAll('input[type="textAzienda"]'); // Seleziona tutti gli input di tipo testo

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
    console.log(azienda); // stampa l'oggetto con i valori degli input
}

function setupRegistraProdotto(){
    document.getElementById('json-response').textContent = JSON.stringify(azienda, null, 4);
}

function RegisterProdotto() {
    var textInputs = document.querySelectorAll('input[type="textProdotto"]'); // Seleziona tutti gli input di tipo testo

    // Itera su ciascun input di testo
    textInputs.forEach(function(input) {
        // Ottieni l'ID dell'input e il suo valore
        var id = input.id;
        var value = input.value;
        
        // Assegna il valore alla variabile con il nome dell'ID
        prodotto[id] = value;
    });
    prodotto['azienda'] = azienda;

    document.getElementById("name").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("model").value = "";

    console.log(prodotto); // stampa l'oggetto con i valori degli input
    addProduct();
}