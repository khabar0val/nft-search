from flask import Flask
from model import CalcImageHash, CompareHash


app = Flask(__name__)

@app.route('/search/{img}')
def search(img):
    hash1 = CalcImageHash(img)

    for i in os.listdir(img_dir):
        hash2 = CalcImageHash(r"{}".format(i))
        print(CompareHash(hash1, hash2))

if __name__ == '__main__':
    app.run(debug=True)

