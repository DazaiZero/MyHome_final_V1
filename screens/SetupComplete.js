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

export const SetupComplete = ({route,navigation}) => {
    const [refeshing, setRefreshing] = useState(false);
    const [refreshDone, setRefresh] = useState(false);
    const bsAuth = useContext(AuthContext);
    const [setupDone, setSetupComplete] = useState();
    
    const [ssid,bssid,wssid,wpass,deviceName,s1,s2,s3,userToken] = route.params;
    console.log(ssid + '/n' + bssid + '/n' + wssid + '/n' + wpass + '/n' + deviceName + '/n' + s1 + '/n' + s2 + '/n' + s3 + '/n' + userToken);


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
              <Text style={styles.registerSmartBoard}>
                Please Wait...{"\n"}Making Your Home Smart
              </Text>
            </View>
          </View>
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator style={{top:height*-.05,right:width*.05}} size="large" color="#00ff00" />
                <Text style={{flex:.3 ,right:width*.05}}>personalizing Things For you</Text>
            </View>
          
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
              </View>
            </View>
            {setupDone ? (
               <View style={[styles.container, styles.submitButton1]}>
               <TouchableOpacity 
                   style={styles.button}
                   onPress={()=>{
                       navigation.push("Home");
                   }
                   }
               >
                   <Icon name="arrow-right" style={styles.submitIcon}></Icon>
               </TouchableOpacity>
           </View>
            ):(
              <View/>
            )}
           
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
    top:height*.03,
    left:width*-.035,
    width: width*.9
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
