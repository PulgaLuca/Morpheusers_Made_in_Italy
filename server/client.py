import requests
from Prodotto import Prodotto
from Azienda import Azienda

if __name__ == "__main__":
    azienda = Azienda("culoculo", "merda", "Napoli")
    prodotto = Prodotto(azienda, "canna da pesca", "diobo", "M3")

    urlAdd = 'http://127.0.0.1:5000/addProduct'
    urlGet = 'http://127.0.0.1:5000/getQR'
    urlReadQR = 'http://127.0.0.1:5000/getData'
    payload = prodotto.toJSON()

    x = requests.post(urlAdd, json=payload)
    
    print(x.text)

    x = requests.post(urlGet, json=prodotto.toJSON())

    print(x.text is not None)

    files = {'qr-code': open('qr.png', 'rb')}
    x = requests.post(urlReadQR, files=files)

    print(x.text)
