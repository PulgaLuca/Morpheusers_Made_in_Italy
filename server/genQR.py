import qrcode
import base64
import hashlib
import zlib

from Prodotto import Prodotto
from Azienda import Azienda
from qreader import QReader
import cv2

from Crypto import Random
from Crypto.Cipher import AES

from Cipher import AESCipher, createCipher, loadCipher

def enc(text, cipher):
    data = cipher.encrypt(text)
    return data

def dec(text, cipher):
    data = cipher.decrypt(text)
    return data

def encodeAndEncrypt(id, cipher):
    encoded = base64.b64encode(id).decode()

    #crypto l'hash in base64
    encrypted = enc(encoded, cipher)
    
    #comprimo il messaggio cifrato
    comp = zlib.compress(encrypted)

    #encode base64
    encoded = base64.b64encode(comp)
    return encoded

def decryptAndDecode(encoded, cipher = None):
    #carico il cifrario dal file
    if(cipher is None): cipher = loadCipher()
    #decode base64
    decoded = base64.b64decode(encoded)
    #decomprimo
    decomp = zlib.decompress(decoded)
    #decripto
    decripted = dec(decomp, cipher)
    return decripted

def genQR(product, filename, cipher = None):
    id = hashlib.sha256((str(product.toJSON())).encode()).digest()

    if(cipher is None): cipher = loadCipher()

    encoded = encodeAndEncrypt(id, cipher)

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
    )
    qr.add_data(encoded)
    qr.make(fit=True)

    #Encoding data using make() function
    img = qr.make_image(fill_color="black", back_color="white")

    # Saving as an image file
    img.save(filename)

    return base64.b64encode(id).decode()

def decQRData(data):
    cipher = loadCipher()
    encoded_text = data.encode()
    decoded_text = decryptAndDecode(encoded_text, cipher)
    return decoded_text

def readQR(filename, cipher = None, compare=None):
    #carico il cifrario dal file
    if(cipher is None): cipher = loadCipher()

    qreader = QReader()
    # Get the image that contains the QR code
    image = cv2.cvtColor(cv2.imread(filename), cv2.COLOR_BGR2RGB)

    read = qreader.detect_and_decode(image=image)
    if read is None:
        print("reading error")
        exit(0)
    encoded_text = read[0].encode()
    decoded_text = decryptAndDecode(encoded_text, cipher)
    return decoded_text