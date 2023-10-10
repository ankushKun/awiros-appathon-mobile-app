import { View, Text, Image } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import EncryptedStorage from 'react-native-encrypted-storage';

GoogleSignin.configure()



export default function Login({ navigation }) {
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
            EncryptedStorage.setItem("user", JSON.stringify({
                name: userInfo.user.givenName,
                email: userInfo.user.email,
                photo: userInfo.user.photo,
                id: userInfo.user.id
            })).then(() => console.log("OK")).finally(() => navigation.navigate("Profile"))

        } catch (error) {
            console.log(error.message)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    return <View style={{ alignItems: "center", justifyContent: "center", height: "100%", backgroundColor: "#f6e7d1" }}>
        <Image source={require("../assets/icon.png")} style={{ width: 150, height: 150 }} />
        <Text style={{ fontSize: 28 }}>Hi!</Text>
        <Text style={{ fontSize: 28 }}>Welcome to Librihaven</Text>
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Light}
            onPress={signIn}
            disabled={false}
            style={{ margin: 20 }}
        />
        <Text style={{ fontSize: 18 }}>Please login with Google to continue</Text>
    </View>
}