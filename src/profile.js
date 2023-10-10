import { useEffect, useState } from "react";
import { View, Image, Text, TextInput, Pressable, StatusBar as RNStatusBar, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import EncryptedStorage from "react-native-encrypted-storage";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useIsFocused } from '@react-navigation/native';
import icon from "../assets/icon.png"

GoogleSignin.configure()

export default function Profile({ navigation }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [photo, setPhoto] = useState("")
    const [college, setCollege] = useState("")
    const [user, setUser] = useState({})

    const isFocused = useIsFocused()

    useEffect(() => {
        if (!isFocused) return
        EncryptedStorage.getItem("user").then((e) => {
            e = JSON.parse(e)
            setUser(e)
            setName(e.name)
            setEmail(e.email)
            setCollege(e.college)
            setPhoto(e.photo)
        })
    }, [isFocused])

    return <View style={{ backgroundColor: "#f6e7d1", height: "100%" }}>
        <StatusBar style="auto" />
        <View style={{ height: RNStatusBar.currentHeight + 7 || 40, width: "100%", backgroundColor: "#b9def3" }}></View>
        <View style={{ backgroundColor: "#b9def3", width: "100%", padding: 8, flexDirection: "row", justifyContent: "", alignItems: "center", borderBottomWidth: 1 }}>
            <Image source={icon} style={{ width: 69, height: 69 }} />
            <Text style={{ fontSize: 30, fontFamily: "Roboto", fontWeight: "bold", marginLeft: 10 }}>Profile</Text>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center", height: "75%" }}>
            <Image source={{ uri: user.photo || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" }}
                style={{ width: 169, height: 169, borderRadius: 100, borderWidth: 5, borderColor: "black" }} />
            <TextInput placeholder="Full Name" defaultValue={user.name} onChangeText={t => setName(t)} style={styles.input} />
            <TextInput placeholder="Email" defaultValue={user.email} onChangeText={t => setEmail(t)} style={styles.input} />
            <TextInput placeholder="College Name" defaultValue={user.college} onChangeText={t => setCollege(t)} style={styles.input} />
        </View>
        <View style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}>
            <Pressable style={{ backgroundColor: "purple", borderRadius: 10, padding: 10, paddingHorizontal: 20 }}
                onPress={() => {
                    EncryptedStorage.setItem("user", JSON.stringify({
                        name,
                        email,
                        photo,
                        college
                    }))
                    navigation.navigate("Home")
                }}
            ><Text style={{ color: "white", fontWeight: "bold" }}>Save</Text></Pressable>
            <Pressable style={{ backgroundColor: "lightgray", borderRadius: 10, padding: 10, paddingHorizontal: 20 }} onPress={() => navigation.navigate("Home")}><Text>Cancel</Text></Pressable>
            <Pressable style={{ backgroundColor: "red", borderRadius: 10, padding: 10, paddingHorizontal: 20 }} onPress={() => {
                EncryptedStorage.removeItem("user")
                GoogleSignin.signOut().then(() => navigation.navigate("Login"))
            }}><Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text></Pressable>
        </View>
    </View>
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#f6e7d1",
        height: "100%",
    },
    input: {
        backgroundColor: "white",
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        width: "70%",
        margin: 3
    }
})