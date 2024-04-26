var azienda = {      
    "PIVA": "PIVA",
    "nome": "nome",
    "sede": "sede"
};
var prodotto = {
    "azienda": {
      "PIVA": "PIVA",
      "nome": "nome",
      "sede": "sede"
    },
    "categoria": "categoria",
    "model": "modello",
    "name": "esempio"
};

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

    console.log(azienda); // stampa l'oggetto con i valori degli input
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
    console.log(prodotto); // stampa l'oggetto con i valori degli input
    addProduct();
}