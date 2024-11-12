import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('1.jpg')
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

h, w, c = img.shape

if w > 1000:

    new_w = 1000
    ar = w/h
    new_h = int(new_w/ar)

    img = cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_AREA)



def thresholding(image):
    img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(img_gray, 80, 255, cv2.THRESH_BINARY_INV)
    cv2.imshow(" thresholding image", thresh)
    cv2.waitKey(0)  # Wait for keypress to continue
    cv2.destroyAllWindows()  # Close windows
    return thresh


thresh_img = thresholding(img)


# dilation
kernel = np.ones((3, 85), np.uint8)
dilated = cv2.dilate(thresh_img, kernel, iterations=1)


(contours, heirarchy) = cv2.findContours(
    dilated.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)



img2 = img.copy()

for ctr in contours:

    x, y, w, h = cv2.boundingRect(ctr)
    cv2.rectangle(img2, (x, y), (x+w, y+h), (40, 100, 250), 2)

# cv2.imshow("boundingrectangle", img2)
# cv2.waitKey(0)  # Wait for keypress to continue
# cv2.destroyAllWindows()  # Close windows

# dilation
kernel = np.ones((3, 15), np.uint8)
dilated2 = cv2.dilate(thresh_img, kernel, iterations=1)
# cv2.imshow("dilated2", dilated2)
# cv2.waitKey(0)  # Wait for keypress to continue
# cv2.destroyAllWindows()  # Close windows

img3 = img.copy()
words_list = []
line_idx = len(contours)-1
for line in contours:
    print(line_idx)
    # roi of each line
    x, y, w, h = cv2.boundingRect(line)
    roi_line = dilated2[y:y+w, x:x+w]
    crop_img = img[y:y + h, x:x+w]
    bb = "line"+str(line_idx)
    cv2.imwrite(r'C:\Users\goli\tejasri\Handwritten-Recognition-System---Major-project\majorProjectResources\code\lines\{}.jpg'.format(bb), crop_img)

    # draw contours on each word
    (cnt, heirarchy) = cv2.findContours(
        roi_line.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    word_idx = 0
    for word in cnt:

        if cv2.contourArea(word) > 1100:

            x2, y2, w2, h2 = cv2.boundingRect(word)
            words_list.append([x+x2, y+y2, x+x2+w2, y+y2+h2])
            cv2.rectangle(img3, (x+x2, y+y2),
                          (x+x2+w2, y+y2+h2), (255, 0, 0), 1)
            # cv2.imshow("final image", img3)
            # cv2.waitKey(10)  # Wait for keypress to continue
            # cv2.destroyAllWindows()  # Close windows
            crop_img = img[y+y2:y+y2 + h2, x+x2:x+x2+w2]
            bb = "line"+str(line_idx)+"word" + str(word_idx)
            cv2.imwrite(
                r'C:\Users\goli\tejasri\Handwritten-Recognition-System---Major-project\majorProjectResources\code\lines\words\{}.jpg'.format(bb), crop_img)
            
            word_idx += 1
    line_idx -= 1


cv2.imshow("final image", img3)
cv2.waitKey(0)  # Wait for keypress to continue
cv2.destroyAllWindows()  # Close windows

