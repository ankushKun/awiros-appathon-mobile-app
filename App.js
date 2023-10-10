import { Text, View } from 'react-native';
import { useEffect } from 'react';
import * as Updates from 'expo-updates';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Index from "./src";

GoogleSignin.configure({
  androidClientId:"577127812024-vqlnmubhuj9r5j0t7v7qsqvtak6l0t5h.apps.googleusercontent.com"
});


export default function App() {
   function CheckUpdates() {
    Updates.addListener(event => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        alert("Update available, Restart app")
        Updates.reloadAsync()
      }
    })
  }

  useEffect(() => CheckUpdates(), [])

  const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo)
    setState({ userInfo });
  } catch (error) {
    console.log(error)
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
};

  return (
    <View style={{alignItems:"center", justifyContent:"center", height:"100%"}}>
      <Text style={{fontSize:28}}>Hi!</Text>
      <Text style={{fontSize:28}}>Welcome to Librihaven</Text>
      <GoogleSigninButton
  size={GoogleSigninButton.Size.Standard}
  color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
  disabled={false}
/>
      <Text style={{fontSize:18}}>Please login with Google to continue</Text>
    </View>
      // <Index />
  );
}
