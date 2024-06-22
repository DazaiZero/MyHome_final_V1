import React, { Component, useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid
} from "react-native";
import { RegistrationHeader } from '../Component/RegistrationHeader';
import { FlatList } from "react-native-gesture-handler";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { AuthContext } from '../bscontext';
import WifiManager, { reScanAndLoadWifiList } from 'react-native-wifi-reborn';
import Icon from "react-native-vector-icons/Feather";
import { Auth } from "aws-amplify";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import { ClipPath } from "react-native-svg";
const { height, width } = Dimensions.get('screen');
import NetInfo from "@react-native-community/netinfo";
export const RegisterBoard = ({route,navigation}) => {
    const [isWconn, setIsWConn] = useState(false);
    const [wifilst, setWifilst] = useState({});
    const [refeshing, setRefreshing] = useState(false);
    const [refreshDone, setRefresh] = useState(false);
    const [deviceSSID, setDeviceSSID] = useState("");
    const [deviceBSSID, setDeviceBSSID] = useState("");
    const [AuthWifi,setWifiAuth] = useState();
    const bsAuth = useContext(AuthContext);
    
    const { Parent } = route.params;
    
    const scanWifi = async () => {
      console.log("a1");
        try {
          setRefreshing(true);
          setRefresh(false);  
          await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
          .then(data => {
            WifiManager.loadWifiList()
            .then(wifiP =>   {
              let lst = wifiP;
              console.log("asda");
              console.log(lst);
              console.log(lst.find((item)=> item.SSID === "B 1201"));//"SHome"
              const wl = lst.find((item)=> item.SSID === "B 1201");
              if(wl)
                setWifilst([wl]);
              else
                scanWifi();
            })
            .finally(() => {
              setRefreshing(false);
            });
          });
        } catch (error) {
          console.log(error);
        }
      };

    
      React.useEffect(()=>{
        console.log("sa");
        console.log(wifilst);
        if(wifilst != null || wifilst != [])
          setRefresh(true);
      },[wifilst])

      

      const checkPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location permission is required for WiFi connections',
              message:
                'This app needs location permission as this is required  ' +
                'to scan for wifi networks.',
              buttonNegative: 'DENY',
              buttonPositive: 'ALLOW',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              if (WifiManager.isEnabled()) {
                scanWifi();
              } else {
                WifiManager.setEnabled(true);
                scanWifi();
              }
              setIsWConn(true);
              console.log("true-rr");
          } else {
              setIsWConn(false);
              console.log("false-rr");
          }
        } catch (error) {
          console.log("caths");
        }
      } 
    
      React.useEffect(() => {
        checkPermission();
        
        setIsWConn(bsAuth.connStatus);

        return () =>{
          setWifilst(null);
        } 
      }, []);
    
      const getDeviceDetails = (item) => {
        setDeviceBSSID(item.item.BSSID);
        setDeviceSSID(item.item.SSID);
        const bssid = item.item.BSSID;
        console.log(item.item.SSID);
        console.log(deviceBSSID);
        console.log(deviceSSID);
        navigation.navigate("registerRoom", {
          ssid: item.item.SSID,
          bssid: bssid.toUpperCase()
        });

    };

    const WL = [{"Name":"Aniket","Year":2022},{"Name":"Ajinkya","Year":2022}];

  return (
    <View style={styles.container}>
      <View style={{...StyleSheet.absoluteFill}}>
            <ImageBackground
          style={{flex:1 , height: null, width: null}}
          source={require('../assets/images/bg.png')}
        ></ImageBackground>
        </View>
      <View style={styles.registrationHeaderStack}>
        <RegistrationHeader
          style={styles.registrationHeader}
        ></RegistrationHeader>
        <ImageBackground
          style={styles.mainContainer1}
          imageStyle={styles.mainContainer1_imageStyle}
          source={require("../assets/images/Gradient_ctf3PZK.png")}
        ></ImageBackground>
        <View style={styles.rect4}>
          <View style={styles.beSmart1ColumnRow}>
            <View style={styles.beSmart1Column}>
              <Text style={styles.beSmart1}>BeSmart</Text>
              <Text style={styles.registerSmartBoard}>
                Register{"\n"}Smart Board
              </Text>
            </View>
            <Text style={styles.registerSmartBoard1}>1</Text>
          </View>
          <Card style={styles.scrollArea}>
            {isWconn ? (
              <View>
                {refreshDone ? (
                  <View>
                  <FlatList
                      keyExtractor={item => item.SSID}
                      data={wifilst}
                      gradientImage="Gradient_jrCruBt.png"
                      contentContainerStyle={styles.scrollArea_contentContainerStyle}
                      renderItem={item => (
                          <View style={[styles.smartBoardContainer]}>
                            <Card
                              style={[styles.container,styles.SmartBoardContainerIn]}
                              onPress={() => {
                                console.log(item);
                                getDeviceDetails(item);
                                //</View>alert("asda")
                              }
                              }>
                              <Text style={styles.loremIpsum}>Smart Board : {item.item.SSID}{"\n"}Virsion 1.0</Text>

                            </Card>
                          </View>
                        )
                      }
                  /> 
                  </View>
                ):(
                  <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#00ff00" />
                    <Text style={{top:height*.04}}>Searching Board</Text>
                  </View>
                )}
              </View>
            ):(
              <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                  <ActivityIndicator size="large" color="#00ff00" />
                  <Text>No Wifi Available</Text>
              </View>
            )}
          </Card>
          
        </View>
      </View>
      <View style={styles.registrationBottomStack}>
            <View style={styles.registrationBottom}>
              <View style={styles.bottomBackSignIn1Stack}>
                <ImageBackground
                  style={styles.bottomBackSignIn1}
                  imageStyle={styles.bottomBackSignIn1_imageStyle}
                  source={require("../assets/images/Gradient_QlFg2ZQ.png")}
                ></ImageBackground>
                <View style={[styles.container, styles.backButton1]}>
                    <TouchableOpacity 
                        style={styles.backButtonOpacity}
                        onPress={()=>{
                          console.log(Parent);
                          if(Parent === 'SignIn'){
                            Auth.signOut().then(()=>{
                              console.log("SignOut");
                              AsyncStorage.clear();
                              navigation.goBack();
                            });
                          }
                          if(Parent === 'Home'){
                            navigation.goBack();
                          }
                            
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
                      console.log(deviceSSID + '/n' + deviceBSSID );
                        navigation.push("registerRoom", {
                            ssid: deviceSSID,
                            bssid: deviceBSSID
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
  activity:{
    flex:1, 
    position:'absolute',
    top:height*.12,
    left:width*.26,
    flexDirection:'column',
  },
  registrationHeader: {
    position: "absolute",
    top: height*.0,
    left: width*.01,
  },
  mainContainer1: {
    top: height*.48,
    left: width*.1,
    width: width*1,
    height: height*.45,
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
  rect4: {
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
    width:200
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
    //backgroundColor:'red'
  },
  scrollArea: {
    width: width*.8,
    height: height*.338,
    top:height*.11,
    left:-width*.01,
    borderRadius: 43,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "rgba(155,101,54,1)",
    shadowOffset: {
      width: 5,
      height: 5
    },
    elevation: 5,
    shadowOpacity: 0.8,
    shadowRadius: 0,
    opacity:1
  },
  scrollArea_contentContainerStyle: {
    top:height*.0,
    left:width*.0,
    width:width*.8,
    height:height*.5,
    borderRadius: 43,
  },
  smartBoardContainer: {
    height: height*.15,
    width: width*.8,
    top:height*.01,
    left:width*.065,
    marginTop:height*.01
  },
  registrationBottom: {
    top:height*.1,
    left:-width*.0,
    position: "absolute"
  },
  bottomBackSignIn1: {
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
  bottomBackSignIn1_imageStyle: {
    opacity:.7
  },
  backButton1: {
    position: "absolute",
    top: height*.01,
    left: width*.055,
  },
  bottomBackSignIn1Stack: {
    width: width*1,
    height: height*.1,
    top:height*.08,
    left:width*.0
  },
  submitButton1: {
    position: "absolute",
    top: height*.12,
    left: width*.7,
  },
  registrationBottomStack: {
    top:height*.54,
    left:width*.00,
  },
  registrationHeaderStack: {
    top:-height*.2,
    left:-width*.1,
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
    position: 'absolute',
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
  },
  SmartBoardContainerIn: {
    width: width*.69,
    height: height*.1,
    top:height*.0,
    left:width*.0,
    backgroundColor: "rgba(185,216,225,1)",
    borderRadius: 24,
    shadowColor: "rgba(155,155,155,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    top:height*.05,
    left:width*.03
  }
});
