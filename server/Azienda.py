import json
class Azienda(object):
    def __init__(self, PIVA, nome, sede):
        self.PIVA = PIVA
        self.nome = nome
        self.sede = sede
    def toJSON(self):
        return json.dumps(
            self,
            default=lambda o: o.__dict__, 
            sort_keys=True,
            indent=4)