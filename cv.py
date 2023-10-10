# Import Libraries
import pyrebase
import json
import cv2
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




faceCascade = cv2.CascadeClassifier('./haarcascade_frontalface_default.xml')
cap = cv2.VideoCapture(0)
cap.set(3,640) # set Width
cap.set(4,480) # set Height

max_p = 0
while True:
    ret, img = cap.read()
    # img = cv2.flip(img, -1)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = faceCascade.detectMultiScale(
        gray,     
        scaleFactor=1.2,
        minNeighbors=5,     
        minSize=(20, 20)
    )
    
    face_count = len(faces)
    update_count("B1/live",face_count)
    
    if face_count > max_p:
        max_p = face_count
        update_count("B1/peak",face_count)
            
    for (x,y,w,h) in faces:
        cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = img[y:y+h, x:x+w]  
    cv2.imshow('video',img)
    k = cv2.waitKey(30) & 0xff
    if k == 27: # press 'ESC' to quit
        break
cap.release()
cv2.destroyAllWindows()
