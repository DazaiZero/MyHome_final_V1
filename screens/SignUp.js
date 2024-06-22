import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import { HeaderBackStyle } from "../Component/HeaderBackStyle";
import Icon from "react-native-vector-icons/Feather";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);
const { height, width } = Dimensions.get('screen');

export const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [phone_number, setMob] = useState('+918055832283');
  const [email, setEmail] = useState('aniketvaidya101@gmail.com');
  const [pass, setPass] = useState('123456789');

  return (
    <View style={styles.container}>
      <View style={{ ...StyleSheet.absoluteFill }}>
        <ImageBackground
          style={{ flex: 1, height: null, width: null }}
          source={require('../assets/images/bg.png')}
        ></ImageBackground>
      </View>
      <View style={styles.headerBackStyleStack}>
        <HeaderBackStyle style={styles.headerBackStyle}></HeaderBackStyle>
        <ImageBackground
          style={styles.signUpContainer}
          imageStyle={styles.signUpContainer_imageStyle}
          source={require("../assets/images/Gradient_ctf3PZK.png")}
        ></ImageBackground>
        <View style={styles.rect}>
          <Text style={styles.beSmart1}>BeSmart</Text>
          <Text style={styles.signuptext}>Sign Up</Text>
          <View style={styles.userNameInput1ColumnRow}>
            <View style={styles.userNameInput1Column}>
              <View style={styles.userNameInput1}>
                <KeyboardAvoidingView style={styles.userNameInputContainer1}>
                  <TextInput
                    onChangeText={text => setUsername(text)}
                    placeholder="Username"
                    placeholderTextColor="rgba(230, 230, 230,1)"
                    selectionColor="rgba(230, 230, 230,1)"
                    style={styles.userNamePlaceholder1}
                  ></TextInput>
                </KeyboardAvoidingView>
              </View>
              <View style={styles.mobilenumberinput}>
                <KeyboardAvoidingView style={styles.mobileNumberContainer}>
                  <TextInput
                    placeholder="Mobile Number"
                    value="+918055832283"
                    onChangeText={text => setMob(text)}
                    placeholderTextColor="rgba(230, 230, 230,1)"
                    selectionColor="rgba(230, 230, 230,1)"
                    style={styles.mobileNumber}
                  ></TextInput>
                </KeyboardAvoidingView>
              </View>
              <View style={styles.emailInput}>
                <KeyboardAvoidingView style={styles.emainContainer}>
                  <TextInput
                    placeholder="Email"
                    value="aniketvaidya101@gmail.com"
                    onChangeText={text => setEmail(text)}
                    placeholderTextColor="rgba(230, 230, 230,1)"
                    selectionColor="rgba(230, 230, 230,1)"
                    style={styles.email_input}
                  ></TextInput>
                </KeyboardAvoidingView>
              </View>
              <View style={styles.passwordInput1}>
                <KeyboardAvoidingView style={styles.passInputContainer1}>
                  <TextInput
                    placeholder="Password"
                    value="123456789"
                    secureTextEntry={true}
                    onChangeText={text => setPass(text)}
                    placeholderTextColor="rgba(230, 230, 230,1)"
                    style={styles.passPlaceHolder1}
                  ></TextInput>
                </KeyboardAvoidingView>
              </View>
            </View>

            <View style={[styles.container, styles.submitButton1]}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  Auth.signUp({
                    username: username,
                    password: pass,
                    attributes: {
                      email: email,
                      phone_number: phone_number
                    }
                  }).then(user => {
                    console.log(user);
                    console.log(user.userSub);
                    console.log(Auth.user);
                    console.log("successfull sign up....");
                    navigation.push('AccountVerification', {
                      username: username,
                      email: email,
                      phone_number: phone_number,
                      userToken: user.userSub
                    });
                  }
                  )
                    .catch(err => console.log("error sign up : ", err))
                }
                }
              >
                <Icon name="arrow-right" style={styles.submitIcon}></Icon>
              </TouchableOpacity>
            </View>
          </View>
          <ImageBackground
            style={styles.bottomBackSignIn1}
            imageStyle={styles.bottomBackSignIn1_imageStyle}
            source={require("../assets/images/Gradient_QlFg2ZQ.png")}
          >
            <View style={[styles.container, styles.backButton]}>
              <TouchableOpacity
                style={styles.backButtonOpacity}
                onPress={() =>
                  navigation.goBack()
                }
              >
                <Icon name="arrow-left" style={styles.backButtonIcon}></Icon>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerBackStyle: {
    position: "absolute",
    top: -height * .03,
    left: width * .05,
  },
  signUpContainer: {
    top: height * .56,
    left: width * .05,
    width: width * 1,
    height: height * .43,
    position: "absolute",
    transform: [
      {
        rotate: "15.00deg"
      }
    ],
    borderRadius: 54,
    overflow: "hidden"
  },
  signUpContainer_imageStyle: {
    opacity: 0.64
  },
  rect: {
    top: height * .2,
    left: width * .1,
    width: width * 1,
    height: height * 1,
    position: "absolute",
  },
  beSmart1: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 50,
    top: height * .15,
    left: width * .05,
  },
  signuptext: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    top: height * .2,
    left: width * .55,
  },
  userNameInput1: {
    width: width * .6,
    height: height * .075,
    left: width * .05,
    top: height * .01
  },
  userNameInputContainer1: {
    width: width * .6,
    height: height * .075,
    left: width * .0,
    top: -height * .02,
    backgroundColor: "rgba(132,27,229,0.38)",
    borderRadius: 44
  },
  userNamePlaceholder1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: width * .5,
    height: height * .06,
    left: width * .055,
    top: height * .008,
  },
  mobilenumberinput: {
    width: width * .6,
    height: height * .075,
    left: width * .05,
    top: height * .01
  },
  mobileNumberContainer: {
    width: width * .6,
    height: height * .075,
    left: width * .0,
    top: -height * .015,
    backgroundColor: "rgba(132,27,229,0.38)",
    borderRadius: 44
  },
  mobileNumber: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: width * .5,
    height: height * .06,
    left: width * .055,
    top: height * .008,
  },
  userNameInput1Column: {
    padding:3
  },
  submitButton1: {
    width: width*.19,
    height: height*.085,
    top:height*.02,
    left:width*.1,
  },
  userNameInput1ColumnRow: {
    height: height * .32,
    width: width * .9,
    flexDirection: "row",
    top: height * .26,
    left: width * .05,
  },
  emailInput: {
    width: width * .6,
    height: height * .075,
    left: width * .05,
    top: height * .01
  },
  emainContainer: {
    width: width * .6,
    height: height * .075,
    left: width * .0,
    top: -height * .01,
    backgroundColor: "rgba(132,27,229,0.38)",
    borderRadius: 44
  },
  email_input: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: width * .5,
    height: height * .06,
    left: width * .055,
    top: height * .008,
  },
  passwordInput1: {
    width: width * .6,
    height: height * .075,
    left: width * .05,
    top: height * .01
  },
  passInputContainer1: {
    width: width * .6,
    height: height * .075,
    left: width * .0,
    top: -height * .005,
    backgroundColor: "rgba(132,27,229,0.38)",
    borderRadius: 44
  },
  passPlaceHolder1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: width * .5,
    height: height * .06,
    left: width * .055,
    top: height * .008,
  },
  bottomBackSignIn1: {
    width: width * 1,
    height: height * .3,
    transform: [
      {
        rotate: "15.00deg"
      }
    ],
    borderRadius: 54,
    top: height * .38,
    left: -width * .025,
    overflow: "hidden"
  },
  bottomBackSignIn1_imageStyle: {
    opacity: .7,
  },
  backButton: {
    transform: [
      {
        rotate: "-15.00deg"
      }
    ],
    top: -height * .04,
    left: width * .07
  },
  headerBackStyleStack: {
    top: -height * .3,
    left: -width * .1
  },
  button: {
    width: width*.19,
    height: height*.085,
    top:height*.02,
    left:width*.00,
    backgroundColor: "rgba(113,192,230,1)",
    borderRadius: 100
  },
  submitIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    top:height*.02,
    left:width*.04
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
