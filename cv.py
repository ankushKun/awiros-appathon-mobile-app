# This script will count the number of people and update our database accordingly
# Adding code to update the database for now
# TODO: Shamb: OpenCV code to count the number of people

# pip3 install pyrebase4

import pyrebase
import json
import random
import time
import numpy as np
import cv2

LIBRARY = "B1"

ENV_FILE = "process.env.json"

env = json.load(open(ENV_FILE, "r"))

fb_config = {
    "apiKey": env["API_KEY"],
    "authDomain": env["AUTH_DOMAIN"],
    "databaseURL": env["DB_URL"],
    "projectId": env["PROJ_ID"],
    "storageBucket": env["STORAGE_BUCKET"],
    "messagingSenderId": env["MESSAGING_SENDER_ID"],
    "appId": env["APP_ID"],
    "measurementId": env["MEASURMENT_ID"]
}

firebase = pyrebase.initialize_app(fb_config)
db = firebase.database()


# Import this function wherever needed
def update_count(path: str, number: int):
    db.child(path).set(number)


# while True:
#     # For now push random numbers
#     # In future replace this with OpenCV code
#     rand_live = random.randint(0, 100)
#     rand_peak = random.randint(0, 100)

#     update_count(f"{LIBRARY}/live", rand_live)
#     update_count(f"{LIBRARY}/peak", rand_peak)

#     print(LIBRARY, rand_live, rand_peak)
#     time.sleep(5)

hog = cv2.HOGDescriptor()
hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

cv2.startWindowThread()

# open webcam video stream
cap = cv2.VideoCapture(0)
max = 0
while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()

    # resizing for faster detection
    frame = cv2.resize(frame, (640, 480))
    # using a greyscale picture, also for faster detection
    gray = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)

    # detect people in the image
    # returns the bounding boxes for the detected objects
    boxes, weights = hog.detectMultiScale(frame, winStride=(8,8) )

    boxes = np.array([[x, y, x + w, y + h] for (x, y, w, h) in boxes])
    if len(boxes) > max:
        max = len(boxes)
        update_count("B1/peak", max)

    update_count("B1/live", len(boxes))

    for (xA, yA, xB, yB) in boxes:
        # display the detected boxes in the colour picture
        cv2.rectangle(frame, (xA, yA), (xB, yB),
                          (0, 255, 0), 2)


    # Display the resulting frame
    cv2.imshow('frame',frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
# finally, close the window
cv2.destroyAllWindows()
cv2.waitKey(1)
