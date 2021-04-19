import cv2
import numpy as np
from opencv_draw_annotation import draw_bounding_box
import easygui as eg
import csv

# image_path
img_path = "./code_python/DrawZone/mag.jpg"

# read image
img_raw = cv2.imread(img_path)

# open the csv file in the write mode
f = open('./code_python/DrawZone/out.csv', 'w')

# create the csv writer
writer = csv.writer(f)

# write header
writer.writerow(['label', 'xmin', 'ymin', 'xmax', 'ymax'])

# select ROIs function
eg.msgbox("Please select zones with LEFT-CLICK.\nThen press ENTER to define a zone.\nWhen you are done defining zone press ESCAPE.", "Instructions", "OK")
ROIs = cv2.selectROIs("Select Rois", img_raw)

# print rectangle points of selected roi
print(ROIs)

# counter to save image with different name
crop_number = 0

cv2.destroyWindow("Select Rois")
# loop over every bounding box save in array "ROIs"
for rect in ROIs:
    x1 = rect[0]
    y1 = rect[1]
    x2 = rect[2]
    y2 = rect[3]

    # crop roi from original image
    img_crop = img_raw[y1:y1+y2, x1:x1+x2]
    box = [x1, y1, x1+x2, y1+y2]
    print(box)
    # show cropped image
    cv2.imshow("crop"+str(crop_number), img_crop)
    txt = eg.enterbox("Nommez la zone")
    cv2.destroyWindow("crop"+str(crop_number))
    writer.writerow([txt, str(box[0]), str(box[1]), str(box[2]), str(box[3])])
    draw_bounding_box(img_raw, box, labels=[txt], color='blue')

    # save cropped image
    #cv2.imwrite("crop"+str(crop_number)+".jpeg", img_crop)

    crop_number += 1
cv2.imshow("Defined zones", img_raw)
cv2.imwrite("img.jpg", img_raw)
f.close()
# hold window
cv2.waitKey(0)
