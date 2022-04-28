
import cv2
import numpy as np
from PIL import Image
import requests
from io import BytesIO
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
 
 
def aHash(img):
    # Среднее хеш-алгоритм
         # Увеличить до 8 * 8
    img = cv2.resize(img, (8, 8))
         # Преобразовать в оттенки серого
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
         # s это пиксель и начальное значение 0, hash_str это начальное значение хеш-значения ''
    s = 0
    hash_str = ''
         # Перебирать накопленную сумму пикселей
    for i in range(8):
        for j in range(8):
            s = s+gray[i, j]
         # Найти средний серый
    avg = s/64
         # Уровень серого больше среднего значения 1, а значение 0 равно 0.
    for i in range(8):
        for j in range(8):
            if gray[i, j] > avg:
                hash_str = hash_str+'1'
            else:
                hash_str = hash_str+'0'
    return hash_str
 
 
def dHash(img):
         # Разностный хэш-алгоритм
         # Увеличение 8 * 8
    img = cv2.resize(img, (9, 8))
         # Преобразование изображения в градациях серого
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    hash_str = ''
         # Первый пиксель каждой строки больше, чем следующий пиксель равен 1, а противоположный равен 0, генерируя хэш
    for i in range(8):
        for j in range(8):
            if gray[i, j] > gray[i, j+1]:
                hash_str = hash_str+'1'
            else:
                hash_str = hash_str+'0'
    return hash_str
 
 
def pHash(img):
         # Воспринятый алгоритм хеширования
         # Масштаб 32 * 32
    img = cv2.resize(img, (32, 32))   # , interpolation=cv2.INTER_CUBIC
 
         # Преобразовать в оттенки серого
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
         # Преобразовать изображение в градациях серого в тип с плавающей точкой, а затем выполнить преобразование dct
    dct = cv2.dct(np.float32(gray))
         # opencv маска операция
    dct_roi = dct[0:8, 0:8]
 
    hash = []
    avreage = np.mean(dct_roi)
    for i in range(dct_roi.shape[0]):
        for j in range(dct_roi.shape[1]):
            if dct_roi[i, j] > avreage:
                hash.append(1)
            else:
                hash.append(0)
    return hash
 
 
def calculate(image1, image2):
        #  Алгоритм гистограммы в градациях серого
         # Рассчитать сходство одноканальной гистограммы
    hist1 = cv2.calcHist([image1], [0], None, [256], [0.0, 255.0])
    hist2 = cv2.calcHist([image2], [0], None, [256], [0.0, 255.0])
         # Рассчитать совпадение гистограммы
    degree = 0
    for i in range(len(hist1)):
        if hist1[i] != hist2[i]:
            degree = degree + \
                (1 - abs(hist1[i] - hist2[i]) / max(hist1[i], hist2[i]))
        else:
            degree = degree + 1
    degree = degree / len(hist1)
    return degree
 
 
def classify_hist_with_split(image1, image2, size=(256, 256)):
         # Сходство гистограммы RGB каждого канала
         # После изменения размера изображения разделите его на три канала RGB, а затем рассчитайте значение сходства для каждого канала.
    image1 = cv2.resize(image1, size)
    image2 = cv2.resize(image2, size)
    sub_image1 = cv2.split(image1)
    sub_image2 = cv2.split(image2)
    sub_data = 0
    for im1, im2 in zip(sub_image1, sub_image2):
        sub_data += calculate(im1, im2)
    sub_data = sub_data / 3
    return sub_data
 
 
def cmpHash(hash1, hash2):
         # Сравнение хеш-значений
         # Комбинация 1 и 0 в алгоритме - это хэш отпечатка пальца изображения. Порядок не фиксированный, но сравнение должно быть в том же порядке.
         # Сравните отпечатки пальцев двух изображений, вычислите расстояние Хемминга, то есть сколько двух 64-битных хеш-значений отличаются, чем меньше количество разных цифр, тем больше похожая картинка
         # Расстояние Хэмминга: шаги, необходимые для того, чтобы набор двоичных данных стал другим набором данных, который может измерять разницу между двумя изображениями. Чем меньше расстояние Хемминга, тем выше сходство. Расстояние Хэмминга равно 0, то есть две картинки абсолютно одинаковы
    n = 0
         # Если длина хеша отличается, возвращается -1, чтобы указать на ошибку
    if len(hash1) != len(hash2):
        return -1
         # Обход решения
    for i in range(len(hash1)):
                 # Если они не равны, n считается +1, и n, наконец, сходство
        if hash1[i] != hash2[i]:
            n = n + 1
    return n
 
 
def getImageByUrl(url):
         # Получить объект изображения на основе URL изображения
    html = requests.get(url, verify=False)
    image = Image.open(url)
    return image
 
 
def PILImageToCV():
         # PIL Изображение конвертируется в формат OpenCV
    path = "/Users/waldenz/Documents/Work/doc/TestImages/t3.png"
    img = Image.open(path)
    plt.subplot(121)
    plt.imshow(img)
    print(isinstance(img, np.ndarray))
    img = cv2.cvtColor(np.asarray(img), cv2.COLOR_RGB2BGR)
    print(isinstance(img, np.ndarray))
    plt.subplot(122)
    plt.imshow(img)
    plt.show()
 
 
def CVImageToPIL():
         # OpenCV изображение в изображение PIL
    path = "/Users/waldenz/Documents/Work/doc/TestImages/t3.png"
    img = cv2.imread(path)
    # cv2.imshow("OpenCV",img)
    plt.subplot(121)
    plt.imshow(img)
 
    img2 = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    plt.subplot(122)
    plt.imshow(img2)
    plt.show()
 
def bytes_to_cvimage(filebytes):
         # Конвертировать поток байтов изображения в изображение cv
    image = Image.open(filebytes)
    img = cv2.cvtColor(np.asarray(image), cv2.COLOR_RGB2BGR)
    return img
 
def runAllImageSimilaryFun(para1, para2):
         # Чем меньше значение трех алгоритмов среднего, разности и алгоритма перцептивного хеширования, тем больше сходство, значение одной и той же картинки равно 0
         # Между алгоритмом трех гистограммы и одноканальной гистограммой 0-1, чем больше значение, тем больше оно похоже. Та же картинка 1
 
    # t1,t2   14;19;10;  0.70;0.75
    # t1,t3   39 33 18   0.58 0.49
         # s1, s2 7 23 11 0,83 0,86 Очень похожие картинки
    # c1,c2  11 29 17    0.30 0.31
 
    if para1.startswith("http"):
                   # Скачать картинку по ссылке и конвертировать в формат opencv
        img1 = getImageByUrl(para1)
        img1 = cv2.cvtColor(np.asarray(img1), cv2.COLOR_RGB2BGR)
 
        img2 = getImageByUrl(para2)
        img2 = cv2.cvtColor(np.asarray(img2), cv2.COLOR_RGB2BGR)
    else:
                 # Читайте физический путь напрямую через метод imread
        img1 = cv2.imread(para1)
        img2 = cv2.imread(para2)
 
    # hash1 = aHash(img1)
    # hash2 = aHash(img2)
    # n1 = cmpHash(hash1, hash2)
    # print('среднее сходство алгоритма хеширования aHash:', n1)
 
    # hash1 = dHash(img1)
    # hash2 = dHash(img2)
    # n2 = cmpHash(hash1, hash2)
    # print('Различие хеш-алгоритма сходства dHash:', n2)
 
    # hash1 = pHash(img1)
    # hash2 = pHash(img2)
    # n3 = cmpHash(hash1, hash2)
    # print('Воспринятый алгоритм хэширования сходства pHash:', n3)
 
    n4 = classify_hist_with_split(img1, img2)
    # print('Схожесть алгоритма трех гистограмм:', n4)
    return n4
    # n5 = calculate(img1, img2)
    # print ("Одноканальная гистограмма", n5)
    # print("%d %d %d %.2f %.2f " % (n1, n2, n3, round(n4[0], 2), n5[0]))
    # print("%.2f %.2f %.2f %.2f %.2f " % (1-float(n1/64), 1 -
    # float(n2/64), 1-float(n3/64), round(n4[0], 2), n5[0]))
 
    # plt.subplot(121)
    # plt.imshow(Image.fromarray(cv2.cvtColor(img1, cv2.COLOR_BGR2RGB)))
    # plt.subplot(122)
    # plt.imshow(Image.fromarray(cv2.cvtColor(img2, cv2.COLOR_BGR2RGB)))
    # plt.show()
 
# if __name__ == "__main__":
#     # p1="https://ww3.sinaimg.cn/bmiddle/007INInDly1g336j2zziwj30su0g848w.jpg"
#     p2="https://ww2.sinaimg.cn/bmiddle/007INInDly1g336j10d32j30vd0hnam6.jpg"
#     runAllImageSimilaryFun(p1,p2)