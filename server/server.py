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
    with open("prodotti.pkl", 'wb') as outp:  # Overwrites any existing file.
        pickle.dump(allProd, outp, pickle.HIGHEST_PROTOCOL)
    

app = Flask(__name__)
CORS(app)

@app.route('/getQR', methods=['POST'])
def getQR():
    req = request.json
    #create product from json
    product = Prodotto(req['azienda'], req['categoria'], req['name'], req['model'])

    id = base64.b64encode(hashlib.sha256((str(product.toJSON())).encode()).digest()).decode()

    #read all saved products from file
    allProducts = readProducts()
    for i,prod in enumerate(allProducts):
        #print(prod.getID())
        if prod.getID() == id:
            filename = 'qr.png'
            #makes code with query for product and ID
            hash = genQR(prod, filename)

            print(hash)

            #modify values in product to generate different qr-codes
            allProducts[i].incNumber()
            allProducts[i].addHash(hash)
            saveProducts(allProducts)
            return send_file(filename, mimetype='image/jpeg')
        return jsonify({'error': 'data not found'})

@app.route('/addProduct', methods = ['POST'])
def addProductReq():
    req = json.loads(request.get_json())
    #create product from json
    product = Prodotto(req['azienda'], req['categoria'], req['name'], req['model'])

    id = base64.b64encode(hashlib.sha256((str(product.toJSON())).encode()).digest()).decode()

    #read all saved products from file
    allProducts = readProducts()
    for prod in allProducts:
        if prod.getID() == id:
            return jsonify({'error': 'product has alredy been added'})
    
    product.saveId()
    allProducts.append(product)

    saveProducts(allProducts)

    return jsonify({'success': 'product has been added (hopefully)'})

#TODO
@app.route('/getData', methods = ['POST'])
def getDataFromQR():
    req = request.json

    #uploaded_file = request.files['qr-code']

    #uploaded_file.save('tmp.png')

    #code = readQR('tmp.png')
    code = req['qr-code']
    try:
        code = decQRData(code)
    except:
        return jsonify({'error' : 'code not valid'})
    print("code =", code)

    #read all saved products from file
    allProducts = readProducts()
    
    for prod in allProducts:
        for hash in prod.getHistory():
            print("hash =",hash)
            #if I found the exact product
            if hash == code:
                print("found")
                return jsonify({'product' : prod.toJSONClean()})

    return jsonify({'error': 'product not found'})

app.run(port=8000)