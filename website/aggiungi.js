function addProduct(){
    fetch(url + "/addProduct", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(prodotto)
    }).then(res => {
        // Estrai il testo dalla risposta
        return res.text();
    }).then(text => {
        const jsonResponse = JSON.parse(text);
        if(jsonResponse.success){
            // Converti la stringa JSON all'interno di "product" in un oggetto JSON
            alert(jsonResponse.success);
        }
        else alert(jsonResponse.error);
    }).catch(error => {
        alert('Errore durante la richiesta:', error);
    });
}