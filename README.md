# Awiros: App-a-thon

## Team Shamblet
- [Ankush Singh](https://github.com/ankushKun)
- [Savita Srivastava](https://github.com/Shambsri21)

## Problem Statement

Develop an Computer Vision enabled application to provide analytics of Library usage by students and also create a platform to promote healthy competition and collaborative studying

[view presentation](./Shamblet.pdf)

## Tech Stack

- **Ai/ML**: Python, OpenCV
- **Mobile App**: React Native + Expo
- **Backend**: Python, Firebase Database

## How to setup project

### Clone the repo

Fork the repo and then clone it using

```bash
git clone git@github.com:<YOUR_USERNAME>/awiros-appathon-mobile-app.git
cd awiros-appathon-mobile-app
```

### Install dependencies

```bash
npm install
pip3 install pyrebase4 opencv-python numpy
```

### Setup API keys

* Create a new Firebase project
* Create a new file `process.env.json` and add the following code:

```json
{
    "API_KEY":"",
    "AUTH_DOMAIN":"",
    "DB_URL":"",
    "PROJ_ID":"",
    "STORAGE_BUCKET":"",
    "MESSAGING_SENDER_ID":"",
    "APP_ID":"",
    "MEASURMENT_ID":""
}
```

* Replace the values with your Firebase project's API keys
* You will need to install and login to the expo cli to run the app. Follow the instructions [here](https://docs.expo.io/get-started/installation/)
* You will also need a google-services.json file from Firebase. Download it and place it in `/RNApp`, then upload the file to eas secrets using the following command, as it will be ignored by the build.

``` bash
eas secret:create --scope project --name GOOGLE_SERVICES_JSON --type file --value ./google-services.json
```


### Running the app

#### Creating a development build

```bash
# For cloud build through EAS
eas build --profile development
# For local build
eas build --profile development --local
```

The dev build should be installed either on a real device or a simulator for development and live testing purposes.
Every time new Native code is added to the project through expo or npm a new development build will have to be created and installed.

#### Creating a production build

```bash
# For cloud build through EAS
eas build --profile production
# For local build
eas build --profile production --local
```

### Run the ML script

```bash
python3 cv.py
```

Now the counter on the app should increase if a person is detected in the frame.