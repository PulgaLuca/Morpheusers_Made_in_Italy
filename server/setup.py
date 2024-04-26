import pickle
from Cipher import createCipher, saveCipher, loadCipher

if __name__ == "__main__":
    cipher = createCipher()
    saveCipher(cipher)