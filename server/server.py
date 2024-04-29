from genQR import genQR, readQR, decQRData
from Prodotto import Prodotto
import base64

#NOT SAFE BUT IT'S JUST TEMP
import pickle
import json
import hashlib
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS

def readProducts():
    with open("prodotti.pkl", "rb") as f:
        allProducts = []
        try:
            allProducts = pickle.load(f)
        except:
            print("NoProducts")
    return allProducts

def saveProducts(allProd):
    with open("prodotti.pkl", 'wb') as outp:  #Overwrites any existing file.
        pickle.dump(allProd, outp, pickle.HIGHEST_PROTOCOL)
    

app = Flask(__name__)
CORS(app)

@app.route('/getQR', methods=['POST'])
def getQR():
    req = request.json
    #create product from json
    product = Prodotto(req['name'], req['categoria'], req['model'], req['filiale'])

    id = base64.b64encode(hashlib.sha256((str(product.toJSON())).encode()).digest()).decode()

    #read all saved products from file
    allProducts = readProducts()
    for i,prod in enumerate(allProducts):
        if prod.getID() == id:
            filename = 'qr.png'

            #makes code with query for product and ID
            hash = genQR(prod, filename)

            #modify values in product to generate different qr-codes
            allProducts[i].incNumber()
            allProducts[i].addHash(hash)
            saveProducts(allProducts)
            return send_file(filename, mimetype='image/jpeg')
    return jsonify({'error': 'prodotto non presente'})

@app.route('/addProduct', methods = ['POST'])
def addProductReq():
    req = request.json
    #create product from json
    product = Prodotto(req['name'], req['categoria'], req['model'], req['filiale'])

    id = base64.b64encode(hashlib.sha256((str(product.toJSON())).encode()).digest()).decode()

    #read all saved products from file
    allProducts = readProducts()
    for prod in allProducts:
        #check if the product aready exists
        if prod.getID() == id:
            return jsonify({'error': 'prodotto già presente'})
    

    product.saveId()

    #add the product
    allProducts.append(product)

    saveProducts(allProducts)

    return jsonify({'success': 'prodotto aggiunto correttamente'})

#TODO
@app.route('/getData', methods = ['POST'])
def getDataFromQR():
    req = request.json

    code = req['qr-code']
    try:
        #decode the encrypted data
        code = decQRData(code)
    except:
        return jsonify({'error' : "errore nella decodifica, probabilmente non è un QR dell'app"})

    #read all saved products from file
    allProducts = readProducts()
    
    for prod in allProducts:
        for hash in prod.getHistory():
            #if I found the exact product
            if hash == code:
                return jsonify({'product' : prod.toJSONClean()})

    return jsonify({'error': 'product not found'})

app.run(port=8000)