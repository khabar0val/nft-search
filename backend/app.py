from flask import Flask
from model import CalcImageHash, CompareHash
import os
img_dir = "../img/"

app = Flask(__name__)

@app.route('/search/<img>', methods=['GET', 'POST']) #/{img}')
def search(img):
    print("Search request")
    # hash1 = CalcImageHash(r"../img/COL.jpeg")
    path = img_dir + img
    hash1 = CalcImageHash(path)
    result:list=[]
    for i in os.listdir(img_dir):
        hash2 = CalcImageHash(f"{i}")
        compare_result = CompareHash(hash1, hash2)
        # print(f"Compared hash: {compare_result}")
        if compare_result >= 256:
            result.append(i)
            print(i, compare_result)

    return {"count": len(result), "result": result}

if __name__ == '__main__':
    app.run(debug=True)

