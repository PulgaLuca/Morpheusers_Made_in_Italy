function setupGetQR(){
    document.getElementById('json-to-send').textContent = JSON.stringify(prodotto, null, 4);
}

function ClearQR(){
    var canvas = document.getElementById('qr-received'); // Sostituisci 'canvas' con l'id del tuo canvas
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 0;
    canvas.height = 0;
}

function sendJSON(){
    fetch(url + "/getQR", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(prodotto)
    })
    .then(response => {
        if(!response.ok){
            return Promise.reject(new Error('Errore durante la richiesta'));
        }

        //se non mi viene data un immagine c'è stato un errore
        var contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("image/jpeg")) {
            return response.text().then(text => {
                const jsonResponse = JSON.parse(text);
                console.log(jsonResponse.error);
                return Promise.reject(new Error(jsonResponse.error));
            });
        }
        return response.blob();
    }) // Ottieni i dati dell'immagine come Blob
    .then(blob => {
        var url = URL.createObjectURL(blob); // Crea un URL temporaneo
        var img = new Image();

        img.onload = function() {
            // Disegna l'immagine sul canvas quando è stata caricata
            var canvas = document.getElementById('qr-received');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
        };
    
        img.src = url; // Imposta l'URL temporaneo come sorgente dell'immagine
    })
    .catch(error => {
        alert('Errore durante la richiesta: ' + error.message);
    });
}

// Funzione per il download dell'immagine
function downloadImage() {
    // Converti il contenuto del canvas in un URL dati
    var dataURL = document.getElementById('qr-received').toDataURL('image/png');

    // Crea un link temporaneo
    var link = document.createElement('a');
    link.href = dataURL; // Imposta l'URL dati come href
    link.download = 'qr.png'; // Imposta il nome del file
    link.click(); // Simula un click sul link per avviare il download
}