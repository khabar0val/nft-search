import cv2
import difflib
import os

img_dir = "img\\"

#Функция вычисления хэша
def CalcImageHash(FileName):
    image = cv2.imread(FileName) #Прочитаем картинку
    resized = cv2.resize(image, (8, 8), interpolation = cv2.INTER_AREA) #Уменьшим картинку
    gray_image = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY) #Переведем в черно-белый формат
    avg = gray_image.mean() #Среднее значение пикселя
    ret, threshold_image = cv2.threshold(gray_image, avg, 255, 0) #Бинаризация по порогу
    
    #Рассчитаем хэш
    _hash = ""
    for x in range(8):
        for y in range(8):
            val = threshold_image[x,y]
            if val == 255:
                _hash = _hash + "1"
            else:
                _hash = _hash + "0"
            
    return _hash

def CompareHash(hash1, hash2):
    l = len(hash1)
    i = 0
    count = 0
    while i < l:
        if hash1[i] != hash2[i]:
            count = count + 1
        i = i + 1
    return count

hash1 = CalcImageHash(r"NFT_fee09e3ebb77cd9b90c173bcb4d8180410dbb58cd1bf2005d57e1a600eb5baa9.png")

for i in os.listdir(img_dir):
    hash2 = CalcImageHash(r"{}".format(i))
    print(CompareHash(hash1, hash2))
