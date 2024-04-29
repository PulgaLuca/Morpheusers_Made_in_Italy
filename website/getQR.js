function setupGetQR(){
    document.getElementById('json-to-send').textContent = JSON.stringify(prodotto, null, 4);
}

function sendJSON(){
    fetch(url + "/getQR", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(prodotto)
    })
    .then(response => {
        if(!response.ok){
            throw new Error();
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
        alert('Errore durante la richiesta:', error);
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