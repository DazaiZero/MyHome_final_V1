import React, { Component, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { MainBackVeri } from "../Component/MainBackVeri";
import Icon from "react-native-vector-icons/Feather";
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);
import { AuthContext } from '../bscontext';
import { createAppUsers , updateAppUsers } from "../src/graphql/mutations";
const { height, width } = Dimensions.get('screen');

export const AccountVerification = ({route,navigation}) => {
    const [confirmationCode, setConfirmCode] = useState('');
    const [usertoken, setUserToken] = useState('');
    const { username, email, phone_number, userToken } = route.params;
    const bsAuth = useContext(AuthContext);

    const registerUser = async () => {
        try {
            console.log("goot");
            //console.log(Auth.user.attributes);
            const userdata = await API.graphql({
                query: createAppUsers,
                variables: {
                    input: {
                        "name": username,
                        "username": username,
                        "email": email,
                        "phone_number": phone_number,
                        "userToken": userToken,
                        "deviceCount": 0
                    }
                },
                authMode: 'AWS_IAM'
            }).then((userdata) => {
                console.log("userCreated");
                console.log(userdata);
                updateUser(userdata.data.createAppUsers.id);
                
            }).catch((err) => console.log("err : ", err));
            userdata;
            //setUserToken(userdata.data.createUsers.id);      
        } catch (error) {
            console.log(error);
        }
    };

    const updateUser = async (userT) => {
        console.log("upd");
        console.log(userT);
        try {
            const updateToken = await API.graphql({
            query: updateAppUsers,
            variables: {
                input: {
                "id": userT,
                "userToken": userT
                }
            },
            authMode: 'AWS_IAM'
            }).then((updatetoken) => {
            console.log(updatetoken);
            navigation.navigate('SignIn');
            })
            .catch(err => console.log(err));
            updateToken;
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <View style={styles.container}>
        <View style={{...StyleSheet.absoluteFill}}>
            <ImageBackground
          style={{flex:1 , height: null, width: null}}
          source={require('../assets/images/bg.png')}
        ></ImageBackground>
        </View>
        <View style={styles.mainContainer1StackStack}>
          <View style={styles.mainContainer1Stack}>
            <ImageBackground
              style={styles.mainContainer1}
              imageStyle={styles.mainContainer1_imageStyle}
              source={require("../assets/images/Gradient_ctf3PZK.png")}
            ></ImageBackground>
            <MainBackVeri style={styles.mainBackVeri}></MainBackVeri>
            <View style={styles.rect}>
              <Text style={styles.beSmart1}>BeSmart</Text>
              <Text style={styles.verification}>Verification</Text>
              <Image
                source={require("../assets/images/pngwing.com_(17).png")}
                resizeMode="contain"
                style={styles.mailImg}
              ></Image>
              <Text style={styles.messagetouser}>You will get OTP via Email</Text>
              <View style={styles.oTPInput}>
                <View style={styles.oTPContainer}>
                  <TextInput
                    placeholder="OTP"
                    onChangeText={text => setConfirmCode(text)}
                    placeholderTextColor="rgba(230, 230, 230,1)"
                    style={styles.oTPPlaceholder}
                  ></TextInput>
                </View>
              </View>
              <View style={[styles.container, styles.submitButton]}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={()=>{
                            Auth.confirmSignUp(username, confirmationCode)
                            .then(user => {
                                registerUser();
                                console.log("ConfirmSign Up");
                            })
                            .catch((err) => alert("Incorrect OTP : err ", err));
                        }
                        }
                    >
                        <Icon name="arrow-right" style={styles.submitIcon}></Icon>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
          <ImageBackground
            style={styles.bottomBackSignIn1}
            imageStyle={styles.bottomBackSignIn1_imageStyle}
            source={require("../assets/images/Gradient_QlFg2ZQ.png")}
          ></ImageBackground>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainContainer1: {
    top: height*.6,
    left: width*.35,
    width: width*1.1,
    height: height*.4,
    position: "absolute",
    transform: [
      {
        rotate: "-24.00deg"
      }
    ],
    borderRadius: 54,
    overflow: "hidden"
  },
  mainContainer1_imageStyle: {
    opacity: 0.64
  },
  mainBackVeri: {
    position: "absolute",
    top:-height*.04,
    left:width*.05
  },
  rect: {
    top: height*.2,
    left:width*.4,
    width: width*1,
    height: height*1,
    position: "absolute",
  },
  beSmart1: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 50,
    top:height*.16,
    left: width*.02,
    height:height*.09,
    width:width*.6
  },
  verification: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    height:height*.06,
    width:width*.6,
    top:height*.2,
    left:width*.1
  },
  mailImg: {
    width: width*.2,
    height: height*.1,
    top:height*.3,
    left: width*.38
  },
  messagetouser: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    height: height*.025,
    width: width*.5,
    top:height*.31,
    textAlign: "center",
    alignSelf: "center"
  },
  oTPInput: {
    width: width * .6,
    height: height * .075,
    left: width * .18,
    top: height * .34
  },
  oTPContainer: {
    width: width * .6,
    height: height * .075,
    left: width * .0,
    top: -height * .015,
    backgroundColor: "rgba(132,27,229,0.38)",
    borderRadius: 44
  },
  oTPPlaceholder: {
    fontFamily: "roboto-700",
    color: "#121212",
    textAlign: "center",
    fontSize: 15,
    width: width * .5,
    height: height * .06,
    left: width * .055,
    top: height * .008,
  },
  submitButton: {
    top:height*.35,
    left:width*.38
  },
  mainContainer1Stack: {
    top: height*.01,
    left: width*.05,
    position: "absolute"
  },
  bottomBackSignIn1: {
    top: height*1.04,
    left: width*.6,
    width: width*1,
    height: height*.3,
    position: "absolute",
    transform: [
      {
        rotate: "-23.00deg"
      }
    ],
    borderRadius: 54,
    overflow: "hidden"
  },
  bottomBackSignIn1_imageStyle: {
    opacity:.7
  },
  mainContainer1StackStack: {
    top:-height*.35,
    left: -width*.45
  },
  button: {
    width: width*.2,
    height: height*.09,
    backgroundColor: "rgba(113,192,230,1)",
    borderRadius: 100
  },
  submitIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    top:height*.02,
    left:width*.045
  }
});
