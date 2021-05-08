import numpy as np
import pywt
from matplotlib import pyplot as plt
from pywt._doc_utils import wavedec2_keys, draw_2d_wp_basis
import cv2
import eel
from urllib.request import urlretrieve
from skimage.measure import compare_ssim 
from skimage.measure import compare_psnr

eel.init('web')

@eel.expose
def DWT(image):
    filename, m = urlretrieve(image)
    x = cv2.imread(filename)[:, :, 0]
    filename_save = 'image-level'
    maxLevel = 3
    for level in range (1, maxLevel + 1):
        c = pywt.wavedec2(x, 'db2', mode='periodization', level=level)
        c[0] /= np.abs(c[0]).max()
        for detail_level in range(level):
            c[detail_level + 1] = [d/np.abs(d).max() for d in c[detail_level + 1]]
        
        fig, axes = plt.subplots()
        arr, slices = pywt.coeffs_to_array(c)
        axes.imshow(arr, cmap=plt.cm.gray)
        axes.set_axis_off()
        fig.savefig(f'web/images-result/{filename_save}{level}.png', pad_inches=0, bbox_inches='tight')

def Coefficient(c1, c2, method):
    if (method == 'max'):
        result = check_max(c1, c2)
    elif (method == 'mean'):
        result = (c1 + c2) / 2
    else:
        result = []
    return result

def check_max(c1, c2):
    result = []
    for i in range(len(c1)):
        list_coef = []
        for j in range(len(c1[i])):
            if np.abs(c1[i][j]) > np.abs(c2[i][j]):
                list_coef.append(c1[i][j])
            else:
                list_coef.append(c2[i][j])
        result.append(list_coef)
    return result

@eel.expose
def aggregation(image1, image2, level):
    filename1, m1 = urlretrieve(image1)
    filename2, m2 = urlretrieve(image2)
    image1 = cv2.imread(filename1)[:, :, 0]
    image2 = cv2.imread(filename2)[:, :, 0]

    wavelet = 'db2'
    coefficient1 = pywt.wavedec2(image1, wavelet, level = level)
    coefficient2 = pywt.wavedec2(image2, wavelet, level = level)
    method_corner = 'mean' 
    method_others = 'max'
    filename_save = 'image-aggregation'

    arr_coefficient = []
    for i in range(len(coefficient1)):
        if(i == 0):
            arr_coefficient.append(Coefficient(coefficient1[0], coefficient2[0], method_corner))
        else:
            c1 = Coefficient(coefficient1[i][0], coefficient2[i][0], method_others)
            c2 = Coefficient(coefficient1[i][1], coefficient2[i][1], method_others)
            c3 = Coefficient(coefficient1[i][2], coefficient2[i][2], method_others)
            arr_coefficient.append((c1,c2,c3))

    resultImage = pywt.waverec2(arr_coefficient, wavelet)
    resultImage = np.multiply(np.divide(resultImage - np.min(resultImage),(np.max(resultImage) - np.min(resultImage))),255)
    resultImage = resultImage.astype(np.uint8)
    cv2.imwrite(f'web/images-result/{filename_save}.png', resultImage)

@eel.expose
def ssim(image1, image2):
    image_original, image_fusion = metrics(image1, image2)
    return compare_ssim(image_original,image_fusion)

@eel.expose
def psnr(image1, image2):
    image_original, image_fusion = metrics(image1, image2)
    return compare_psnr(image_original,image_fusion)

def metrics(image1, image2):
    filename1, m1 = urlretrieve(image1)
    filename2, m2 = urlretrieve(image2)
    image_original = cv2.imread(filename1)
    image_fusion = cv2.imread(filename2)
    image_original = cv2.cvtColor(image_original, cv2.COLOR_BGR2GRAY)
    image_fusion = cv2.cvtColor(image_fusion, cv2.COLOR_BGR2GRAY)
    return image_original, image_fusion

eel.start('index.html', size=(714, 737))