export default {
    "name": "Librihaven",
    "slug": "LibFun",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
        "image": "./assets/splash.png",
        "resizeMode": "cover",
        "backgroundColor": "#ddd"
    },
    "assetBundlePatterns": [
        "**/*"
    ],
    "ios": {
        "supportsTablet": true
    },
    "android": {
        "adaptiveIcon": {
            "foregroundImage": "./assets/icon.png",
            "backgroundColor": "#ffffff"
        },
        "package": "com.shamblet.librihaven",
        "versionCode": 1,
        "googleServicesFile": process.env.GOOGLE_SERVICES_JSON
    },
    "web": {
        "favicon": "./assets/icon.png"
    },
    "extra": {
        "eas": {
            "projectId": "6853bfca-14e8-4b8a-b54f-5f29a154e79c"
        }
    },
    "owner": "ankushkun",
    "runtimeVersion": {
        "policy": "appVersion"
    },
    "updates": {
        "url": "https://u.expo.dev/6853bfca-14e8-4b8a-b54f-5f29a154e79c"
    },
    "plugins": ["@react-native-google-signin/google-signin"]
}