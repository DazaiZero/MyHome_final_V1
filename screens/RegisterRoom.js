import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity, Dimensions, KeyboardAvoidingView
} from "react-native";
import { RegistrationHeader } from "../Component/RegistrationHeader";
import Icon from "react-native-vector-icons/Feather";
const { height, width } = Dimensions.get('screen');
export const RegisterRoom = ({ route, navigation }) => {
  const { ssid, bssid } = route.params;
  const [DeviceName, setDeviceName] = useState('');
  const [S1, setS1Name] = useState('');
  const [S2, setS2Name] = useState('');
  const [S3, setS3Name] = useState('');

  

  return (
    <View style={styles.container}>
      <View style={{ ...StyleSheet.absoluteFill }}>
        <ImageBackground
          style={{ flex: 1, height: null, width: null }}
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
                Enter{"\n"}Smart Rooms{"\n"}Details
              </Text>
            </View>
            <Text style={styles.registerSmartBoard1}>2</Text>
          </View>
          <KeyboardAvoidingView style={styles.roomNameInput}>
            <View style={styles.roomNameContainer}>
              <TextInput
                placeholder="Room Name"
                onChangeText={text => setDeviceName(text)}
                placeholderTextColor="rgba(230, 230, 230,1)"
                selectionColor="rgba(230, 230, 230,1)"
                style={styles.roomName}
              ></TextInput>
            </View>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView style={styles.switch1Input}>
            <View style={styles.switch1Container}>
              <TextInput
                placeholder="Switch 1"
                onChangeText={text => setS1Name(text)}
                placeholderTextColor="rgba(230, 230, 230,1)"
                selectionColor="rgba(230, 230, 230,1)"
                style={styles.switch1}
              ></TextInput>
            </View>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView style={styles.switch2Input}>
            <View style={styles.switch2Container}>
              <TextInput
                placeholder="Switch 2"
                onChangeText={text => setS2Name(text)}
                placeholderTextColor="rgba(230, 230, 230,1)"
                selectionColor="rgba(230, 230, 230,1)"
                style={styles.switch2}
              ></TextInput>
            </View>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView style={styles.switch3Input}>
            <View style={styles.mobileNumberContainer4}>
              <TextInput
                placeholder="Switch 3"
                onChangeText={text => setS3Name(text)}
                placeholderTextColor="rgba(230, 230, 230,1)"
                selectionColor="rgba(230, 230, 230,1)"
                style={styles.switch3Container}
              ></TextInput>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
      <View style={styles.registrationBottom1Stack}>
        <View style={styles.registrationBottom1}>
          <View style={styles.bottomBackSignIn1Stack}>
            <ImageBackground
              style={styles.bottomBackSignIn1}
              imageStyle={styles.bottomBackSignIn1_imageStyle}
              source={require("../assets/images/Gradient_QlFg2ZQ.png")}
            ></ImageBackground>
            <View style={[styles.container, styles.backButton1]}>
              <TouchableOpacity
                style={styles.backButtonOpacity}
                onPress={() => {
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
            onPress={() => {
              console.log(ssid + '/n' + bssid + '/n' + DeviceName + '/n' + S1 + '/n' + S2 + '/n' + S3);
              navigation.navigate('setUpWifi', {
                Parent: "SignUp",
                ssid: ssid,
                bssid: bssid,
                deviceName: DeviceName,
                s1: S1,
                s2: S2,
                s3: S3
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
    top: height * .0,
    left: width * .01,
  },
  mainContainer1: {
    top: height * .48,
    left: width * .1,
    width: width * 1,
    height: height * .45,
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
    top: height * .18,
    left: width * .16,
    width: width * 1,

  },
  beSmart1: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 45,
    top: height * .01,
    left: width * .0
  },
  registerSmartBoard: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 28,
    top: height * .0,
    left: width * .01
  },
  beSmart1Column: {

  },
  registerSmartBoard1: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 66,
    top: height * .08,
    left: width * .05
  },
  beSmart1ColumnRow: {
    height: height * .2,
    width: width * 1,
    top: height * .04,
    left: width * .02,
    flexDirection: "row",
  },
  roomNameInput: {
    width: width * .6,
    height: height * .075,
    left: width * .05,
    top: height * .05,
    marginTop: height * .1
  },
  roomNameContainer: {
    width: width * .6,
    height: height * .075,
    left: width * .0,
    top: -height * .02,
    backgroundColor: "rgba(132,27,229,0.38)",
    borderRadius: 44
  },
  roomName: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: width * .5,
    height: height * .06,
    left: width * .055,
    top: height * .008,
  },
  switch1Input: {
    width: width * .6,
    height: height * .075,
    left: width * .05,
    top: height * .01,
    marginTop: height * .05
  },
  switch1Container: {
    width: width * .6,
    height: height * .075,
    left: width * .0,
    top: -height * .02,
    backgroundColor: "rgba(132,27,229,0.38)",
    borderRadius: 44
  },
  switch1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: width * .5,
    height: height * .06,
    left: width * .055,
    top: height * .008,
  },
  switch2Input: {
    width: width * .6,
    height: height * .075,
    left: width * .05,
    top: height * .01,
    marginTop: height * .01
  },
  switch2Container: {
    width: width * .6,
    height: height * .075,
    left: width * .0,
    top: -height * .02,
    backgroundColor: "rgba(132,27,229,0.38)",
    borderRadius: 44
  },
  switch2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: width * .5,
    height: height * .06,
    left: width * .055,
    top: height * .008,
  },
  switch3Input: {
    width: width * .6,
    height: height * .075,
    left: width * .05,
    top: -height * .03,
    marginTop: height * .05
  },
  mobileNumberContainer4: {
    width: width * .6,
    height: height * .075,
    left: width * .0,
    top: -height * .02,
    backgroundColor: "rgba(132,27,229,0.38)",
    borderRadius: 44
  },
  switch3Container: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: width * .5,
    height: height * .06,
    left: width * .055,
    top: height * .008,
  },
  registrationBottom1: {
    top: height * .1,
    left: -width * .0,
    position: "absolute"
  },
  bottomBackSignIn1: {
    top: height * .04,
    left: -width * .01,
    width: width * 1,
    height: height * .25,
    transform: [
      {
        rotate: "14.00deg"
      }
    ],
    borderRadius: 54,
    overflow: "hidden"
  },
  bottomBackSignIn1_imageStyle: { opacity: .7 },
  backButton1: {
    position: "absolute",
    top: height * .01,
    left: width * .055,
  },
  bottomBackSignIn1Stack: {
    width: width * 1,
    height: height * .1,
    top: height * .08,
    left: width * .0
  },
  submitButton1: {
    position: "absolute",
    top: height * .12,
    left: width * .7,
  },
  registrationBottom1Stack: {
    top: -height * .355,
    left: width * .00,
  },
  registrationHeader1Stack: {
    top: -height * .2,
    left: -width * .1,
    height:height*.9,
    width:width*1,
  },
  button: {
    width: width * .19,
    height: height * .09,
    top: height * .001,
    left: width * .00,
    backgroundColor: "rgba(113,192,230,1)",
    borderRadius: 100
  },
  submitIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    top: height * .023,
    left: width * .05,
  },
  backButtonOpacity: {
    width: width * .2,
    height: height * .09,
    top: height * .0,
    left: width * 0,
    backgroundColor: "rgba(138,149,236,1)",
    borderRadius: 100
  },
  backButtonIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    top: height * .02,
    left: width * .045
  }
});
