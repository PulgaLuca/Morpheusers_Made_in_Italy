import json
import hashlib
import base64

class Prodotto(object):
    def __init__(self, name, categoria, model, filiale):
        self.name = name
        self.categoria = categoria
        self.model = model
        self.filiale = filiale
        self.id = -1
        self.number = 0
        self.history = []

    def toJSON(self):
        res = json.loads(json.dumps(
            self,
            default=lambda o: o.__dict__, 
            sort_keys=False,
            indent=4))
        del res['history']
        del res['filiale']
        return json.dumps(res)
    
    #doesn't return the id for safety reasons
    def toJSONClean(self):
        res = json.loads(json.dumps(
            self,
            default=lambda o: o.__dict__, 
            sort_keys=False,
            indent=4))
        del res['id']
        #remove also not necessary data
        del res['history']
        del res['number']
        return json.dumps(res)
    
    def addHash(self, hash):
        toAdd = {"hash":hash, "isActive":False}
        self.history.append(toAdd)
    
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
    
    def setActive(self, idx):
        self.history[idx]['isActive'] = True

    def remove(self, elem):
        self.history.remove(elem)