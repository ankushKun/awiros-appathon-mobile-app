import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, StatusBar as RNStatusBar, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect, useState } from 'react';
import app from '../firebaseConfig';
import {getDatabase,get,ref as dbRef, onValue, off} from 'firebase/database'
import icon from "../assets/icon.png"


const db = getDatabase(app)

function Row({ children }) {
  return <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>{children}</View>
}
function Col({children}) {
  return <View style={{flexDirection:"col", justifyContent:"center", alignItems:"center"}}>{children}</View>
}
function Item({ children }) {
  return <View style={{ backgroundColor: "#9ed5d9", padding:10,borderRadius:7, borderWidth:0.9, margin:12,flexGrow:1 }}>{children}</View>
}

export default function Index() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'B1 Library', value: 'B1'},
    {label: 'C1 Library', value: 'C1'},
    {label: 'D1 Library', value: 'D1'},
  ]);
  const [old_value, setOldValue] = useState("")
  const [value, setValue] = useState(items[0].value)
  const [live, setLive] = useState(0)
  const [peak, setPeak] = useState(0)
  const [unsub, setUnsub] = useState(() => () => {})

  
  useEffect(() => {
    unsub()
    setOldValue(value)
    const ref = dbRef(db, value)
    let uu = onValue(ref, (snapshot) => {
      const data = snapshot.val()
      setLive(data.live)
      setPeak(data.peak)
    })
    setUnsub(() => () => {
      // off(ref, value, uu)
      uu()
      console.log("unsubscribed")
    })
  }, [value])


  
  return (
    <View style={styles.root}>
      <StatusBar style="auto" />
      <View style={{ height: RNStatusBar.currentHeight + 7 || 40, width: "100%", backgroundColor: "#b9def3" }}></View>
      <View style={{backgroundColor:"#b9def3", width:"100%", padding:8, flexDirection:"row", alignItems:"center", borderBottomWidth:1}}>
        <Image source={icon} style={{width:69, height:69}} />
        <Text style={{ fontSize: 30, fontFamily: "Roboto", fontWeight: "bold", marginLeft:10 }}>LIBFUN</Text>
      </View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={{width:"80%",marginLeft:"10%",marginTop:10,height: 50, backgroundColor: "#b9def3" }}
        dropDownContainerStyle={{width:"77.5%",marginLeft:"10%", marginTop:10, backgroundColor: "#b9def3" }}
        labelStyle={{ fontSize: 18, textAlign: "center"}}
      />

      {
        value && <View style={{maxWidth:"100%"}}>
          <Col>
            <Row>
              <Item>
                <Col>
                  <Text style={{ textAlign: "center", width: "100%", fontSize: 40, fontWeight: "bold" }}>{live}</Text>
                  <Text style={{textAlign:"center", fontSize:28}}>PEOPLE</Text>
                </Col>
              </Item>
              <Item>
                <Col>
                  <Text style={{ textAlign: "center", width: "100%", fontSize: 40, fontWeight: "bold" }}>{ peak}</Text>
                  <Text style={{fontSize:28}}>PEAK COUNT</Text>
                </Col>
              </Item>
            </Row>
          </Col>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f6e7d1',
    alignItems: 'center',
  },
});
