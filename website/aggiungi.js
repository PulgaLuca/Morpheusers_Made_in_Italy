function addProduct(){
    fetch("http://127.0.0.1:8000/addProduct", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(prodotto)
    }).then(res => {
        // Estrai il testo dalla risposta
        return res.text();
    }).then(text => {
        const jsonResponse = JSON.parse(text);
        if(jsonResponse.product){
            // Converti la stringa JSON all'interno di "product" in un oggetto JSON
            const productObj = JSON.parse(jsonResponse.product);
            console.log("Risposta JSON:", productObj);
            showJSON(productObj, document.getElementById('json-response'));
        }
        else showJSON(jsonResponse, document.getElementById('json-response'));
    }).catch(error => {
        console.error('Errore durante la richiesta:', error);
    });
}