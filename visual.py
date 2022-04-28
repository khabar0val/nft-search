#./test/visual.py
import cv2

img_rgb = cv2.imread('img/COL.jpeg')
resized = cv2.resize(img_rgb, (28, 28), interpolation = cv2.INTER_AREA)
print(str(img_rgb))
# template = cv2.imread('data/1.jpg')