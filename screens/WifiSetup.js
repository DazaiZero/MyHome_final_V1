import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { RegistrationHeader } from "../Component/RegistrationHeader";
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('screen');
export const WifiSetup = ({route,navigation}) => {
    const [WSSID, setSSID] = useState('');
    const [WPASS, setWPass] = useState('');
    const [userToken, setUsertoken] = useState(null);
    const { Parent, ssid, bssid, deviceName, s1, s2, s3 } = route.params;
    
    console.log(ssid + '/n' + bssid + '/n' + deviceName + '/n' + s1 + '/n' + s2 + '/n' + s3 + '/n' + userToken);

    React.useEffect(() => {
        AsyncStorage.getItem("UserToken", (err, token) => (setUsertoken(token)));
    }, []);

  return (
    <View style={styles.container}>
      <View style={{...StyleSheet.absoluteFill}}>
            <ImageBackground
          style={{flex:1 , height: null, width: null}}
          source={require('../assets/images/bg.png')}
        ></ImageBackground>
        </View>
      <View style={styles.registrationHeader1Stack}>
        <RegistrationHeader
          style={styles.registrationHeader1}
        ></RegistrationHeader>
        <ImageBackground
          style={styles.mainContainer1}
          imageStyle={styles.mainContainer1_imageStyle}
          source={require("../assets/images/Gradient_ctf3PZK.png")}
        ></ImageBackground>
        <View style={styles.rect}>
          <View style={styles.beSmart1ColumnRow}>
            <View style={styles.beSmart1Column}>
              <Text style={styles.beSmart1}>BeSmart</Text>
              <Text style={styles.registerSmartBoard}>
                Smart Board{"\n"}WIFI Setup
              </Text>
            </View>
            <Text style={styles.registerSmartBoard1}>3</Text>
          </View>
          <View style={styles.wIFINameInput}>
            <View style={styles.wIFIInputContainer}>
              <TextInput
                placeholder="WIFI Name"
                onChangeText={text => setSSID(text)}
                placeholderTextColor="rgba(230, 230, 230,1)"
                selectionColor="rgba(230, 230, 230,1)"
                style={styles.wifiInput}
              ></TextInput>
            </View>
          </View>
          <View style={styles.wifiPassInput}>
            <View style={styles.wifiPassContainer}>
              <TextInput
                placeholder="Password"
                onChangeText={text => setWPass(text)}
                secureTextEntry={true}
                placeholderTextColor="rgba(230, 230, 230,1)"
                selectionColor="rgba(230, 230, 230,1)"
                style={styles.wifiPass}
              ></TextInput>
            </View>
          </View>
          
        </View>
      </View>
      <View style={styles.wifiSetupBottomStack}>
            <View style={styles.wifiSetupBottom}>
              <View style={styles.wifiSetupBottom1Stack}>
                <ImageBackground
                  style={styles.wifiSetupBottom1}
                  imageStyle={styles.wifiSetupBottom1_imageStyle}
                  source={require("../assets/images/Gradient_QlFg2ZQ.png")}
                ></ImageBackground>
                <View style={[styles.container, styles.backButton1]}>
                    <TouchableOpacity 
                        style={styles.backButtonOpacity}
                        onPress={()=>{
                            navigation.goBack();
                        }}
                    >
                        <Icon name="arrow-left" style={styles.backButtonIcon}></Icon>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.container, styles.submitButton1]}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={()=>{
                        //alert("Todo");
                        navigation.navigate('setupComplete', {
                            ssid: ssid,
                            bssid: bssid,
                            wssid: WSSID,
                            wpass: WPASS,
                            deviceName: deviceName,
                            s1: s1,
                            s2: s2,
                            s3: s3,
                            userToken: userToken
                          }); 
                        }
                    }
                >
                    <Icon name="arrow-right" style={styles.submitIcon}></Icon>
                </TouchableOpacity>
            </View>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  registrationHeader1: {
    position: "absolute",
    top: height*.0,
    left: width*.01,
  },
  mainContainer1: {
    top: height*.48,
    left: width*.1,
    width: width*1,
    height: height*.41,
    position: "absolute",
    transform: [
      {
        rotate: "12.00deg"
      }
    ],
    borderRadius: 54,
    overflow: "hidden"
  },
  mainContainer1_imageStyle: {
    opacity: 0.64
  },
  rect: {
    top: height*.18,
    left: width*.16,
    width: width*1,
    height: height*1,
    position: "absolute",
  },
  beSmart1: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 45,
    top:height*.01,
    left:width*.0
  },
  registerSmartBoard: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 28,
    top:height*.02,
    left:width*.01
  },
  beSmart1Column: {
  },
  registerSmartBoard1: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 66,
    top:height*.08,
    left:width*.05
  },
  beSmart1ColumnRow: {
    height: height*.2,
    width:width*1,
    top:height*.04,
    left:width*.02,
    flexDirection: "row",
  },
  wIFINameInput: {
    width: width * .6,
    height: height * .075,
    left: width * .05,
    top: height * .05,
    marginTop:height*.1
  },
  wIFIInputContainer: {
    width: width * .6,
    height: height * .075,
    left: width * .0,
    top: -height * .02,
    backgroundColor: "rgba(132,27,229,0.38)",
    borderRadius: 44
  },
  wifiInput: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: width * .5,
    height: height * .06,
    left: width * .055,
    top: height * .008,
  },
  wifiPassInput: {
    width: width * .6,
    height: height * .075,
    left: width * .05,
    top: height * .01,
    marginTop:height*.05
  },
  wifiPassContainer: {
    width: width * .6,
    height: height * .075,
    left: width * .0,
    top: -height * .02,
    backgroundColor: "rgba(132,27,229,0.38)",
    borderRadius: 44
  },
  wifiPass: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: width * .5,
    height: height * .06,
    left: width * .055,
    top: height * .008,
  },
  wifiSetupBottom: {
    top:height*.1,
    left:-width*.0,
    position: "absolute"
  },
  wifiSetupBottom1: {
    top: height*.04,
    left: -width*.01,
    width: width*1,
    height: height*.25,
    transform: [
      {
        rotate: "14.00deg"
      }
    ],
    borderRadius: 54,
    overflow: "hidden"
  },
  wifiSetupBottom1_imageStyle: {},
  backButton1: {
    position: "absolute",
    top: height*.01,
    left: width*.055,
  },
  wifiSetupBottom1Stack: {
    width: width*1,
    height: height*.3,
    top:height*.08,
    left:width*.0
  },
  submitButton1: {
    position: "absolute",
    top: height*.12,
    left: width*.7,
  },
  wifiSetupBottomStack: {
    top: -height * .4,
    left: width * .00,
  },
  registrationHeader1Stack: {
    top: -height * .2,
    left: -width * .1,
    height:height*.9,
    width:width*1,
  },
  button: {
    width: width*.19,
    height: height*.09,
    top:height*.001,
    left:width*.00,
    backgroundColor: "rgba(113,192,230,1)",
    borderRadius: 100
  },
  submitIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    top:height*.023,
    left:width*.05,
  },
  backButtonOpacity: {
    width: width*.2,
    height: height*.09,
    top:height*.0,
    left:width*0,
    backgroundColor: "rgba(138,149,236,1)",
    borderRadius: 100
  },
  backButtonIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    top:height*.02,
    left:width*.045
  }
});
