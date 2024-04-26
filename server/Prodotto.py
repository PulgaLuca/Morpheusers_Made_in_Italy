import json
import hashlib
import base64

class Prodotto(object):
    def __init__(self, azienda, categoria, name, model):
        self.azienda = azienda
        self.categoria = categoria
        self.name = name
        self.model = model
        self.id = -1
        self.number = 0
        self.history = []

    def toJSON(self):
        res = json.loads(json.dumps(
            self,
            default=lambda o: o.__dict__, 
            sort_keys=True,
            indent=4))
        del res['history']
        return json.dumps(res)
    
    #doesn't return the id for safety reasons
    def toJSONClean(self):
        res = json.loads(json.dumps(
            self,
            default=lambda o: o.__dict__, 
            sort_keys=True,
            indent=4))
        del res['history']
        del res['id']
        del res['number']
        return json.dumps(res)
    
    def addHash(self, hash):
        self.history.append(hash)
    
    def getHistory(self):
        return self.history

    def saveId(self):
        if self.id != -1:
            raise ValueError("ID was already assigned")
        self.id = base64.b64encode(hashlib.sha256((str(self.toJSON())).encode()).digest()).decode()
    
    def getID(self):
        return self.id
    
    def getNumber(self):
        return self.number
    
    def incNumber(self):
        self.number += 1