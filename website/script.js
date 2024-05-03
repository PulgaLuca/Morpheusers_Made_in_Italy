var url = 'https://Eric169.pythonanywhere.com'
//var url = 'http://localhost:8000/'

document.addEventListener('DOMContentLoaded', function() {
    const linkQrScanner = document.getElementById('linkQrScanner');
    const linkScreenRegistraAzienda = document.getElementById('linkScreenRegistraAzienda');
    const linkScreenAddProduct = document.getElementById('linkScreenAddProduct');
    const linkScreenGetQR = document.getElementById('linkScreenGetQR');
  
    const screenQRScanner = document.getElementById('ScreenQRScanner');
    const ScreenRegistraAzienda = document.getElementById('ScreenRegistraAzienda');
    const ScreenAddProduct = document.getElementById('ScreenAddProduct');
    const ScreenGetQR = document.getElementById('ScreenGetQR');

    linkQrScanner.addEventListener('click', function(event) {
      event.preventDefault(); // Evita il comportamento predefinito del link
      startStreamVideo();
      clearProductDetails();
      ClearQR();
      setActiveScreen(screenQRScanner);
    });

    linkScreenGetQR.addEventListener('click', function(event) {
        event.preventDefault(); // Evita il comportamento predefinito del link
        stopStreamedVideo();
        setupGetQR();
        clearProductDetails();
        setActiveScreen(ScreenGetQR);
    });
  
    linkScreenRegistraAzienda.addEventListener('click', function(event) {
      stopStreamedVideo();
      event.preventDefault(); // Evita il comportamento predefinito del link
      clearProductDetails();
      ClearQR();
      setActiveScreen(ScreenRegistraAzienda);
    });
  
    linkScreenAddProduct.addEventListener('click', function(event) {
      stopStreamedVideo();
      event.preventDefault(); // Evita il comportamento predefinito del link
      displayProductDetails();
      ClearQR();
      setActiveScreen(ScreenAddProduct);
    });
  
    function setActiveScreen(screen) {
      const screens = document.querySelectorAll('.screen');
      screens.forEach(function(s) {
        s.classList.remove('active');
      });
      screen.classList.add('active');
    }
  });
  