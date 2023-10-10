# This script will count the number of people and update our database accordingly
# Adding code to update the database for now
# TODO: Shamb: OpenCV code to count the number of people

# pip3 install pyrebase4

import pyrebase
import json
import random
import time


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


while True:
    # For now push random numbers
    # In future replace this with OpenCV code
    rand_live = random.randint(0, 100)
    rand_peak = random.randint(0, 100)

    update_count(f"{LIBRARY}/live", rand_live)
    update_count(f"{LIBRARY}/peak", rand_peak)

    print(LIBRARY, rand_live, rand_peak)
    time.sleep(5)
