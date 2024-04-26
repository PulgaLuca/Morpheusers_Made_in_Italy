var video = document.createElement("video");
var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d", { willReadFrequently: true });
var loadingMessage = document.getElementById("loadingMessage");
var outputContainer = document.getElementById("output");
var outputMessage = document.getElementById("outputMessage");
var outputData = document.getElementById("outputData");
var found = false;
var going = false;

function drawLine(begin, end, color) {
  canvas.beginPath();
  canvas.moveTo(begin.x, begin.y);
  canvas.lineTo(end.x, end.y);
  canvas.lineWidth = 4;
  canvas.strokeStyle = color;
  canvas.stroke();
}

function startStreamVideo(){
  going = true;
  // Use facingMode: environment to attemt to get the front camera on phones
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
    video.srcObject = stream;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.play();
    requestAnimationFrame(tick);
  });
}

function stopStreamedVideo() {
  if(!going) return;
  const stream = video.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach(function(track) {
      track.stop();
  });
}

function tick() {
  //mi fermo al primo qr letto
  if(found) return;
  loadingMessage.innerText = "⌛ Loading video..."
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    loadingMessage.hidden = true;
    canvasElement.hidden = false;
    outputContainer.hidden = false;

    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });
    if (code && code.data !== '') {
      //disegna rettangolo intorno al qr code
      drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
      drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
      drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
      drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");

      outputMessage.hidden = true;
      outputData.parentElement.hidden = false;
      outputData.innerText = code.data;
      found = 1;
      getJSON(code.data);
    } else {
      outputMessage.hidden = false;
      outputData.parentElement.hidden = true;
    }
  }
  requestAnimationFrame(tick);
}

function getJSON(data){
    var qr = new Object();
    qr['qr-code'] = data;
    console.log(qr);
    fetch("http://127.0.0.1:8000/getData", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(qr)
    }).then(res => {
        // Estrai il testo dalla risposta
        return res.text();
    }).then(text => {
        const jsonResponse = JSON.parse(text);

        if(jsonResponse.product){
            // Converti la stringa JSON all'interno di "product" in un oggetto JSON
            const productObj = JSON.parse(jsonResponse.product);
            console.log("Risposta JSON:", productObj);
            showJSON(productObj, document.getElementById('json-output'));
        }
        else showJSON(jsonResponse, document.getElementById('json-output'));
    }).catch(error => {
        console.error('Errore durante la richiesta:', error);
    });
}

function showJSON(json, jsonOutput){
    // Converti l'oggetto JSON in una stringa formattata JSON
    const jsonString = JSON.stringify(json, null, 2);

    // Mostra la stringa JSON nell'elemento del DOM
    jsonOutput.textContent = jsonString;
}