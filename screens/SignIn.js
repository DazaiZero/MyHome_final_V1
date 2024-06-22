import React, { Component, useState, useContext, useEffect } from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    TextInput,
    Text,
    Pressable,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { HeaderBackStyle } from "../Component/HeaderBackStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);
import { AuthContext } from '../bscontext';
import { getAppUsers, getUserData } from "../src/graphql/queries";
import { Header } from '@react-navigation/stack';

const { height, width } = Dimensions.get('screen');

export const SignIn = ({ props, navigation }) => {
    const [username, setUserN] = useState();
    const [password, setPassword] = useState("123456789");
    const [FrstTimeFlag, setFrstTimeFlag] = useState();
    const [userSettings, setUserSettings] = useState();
    const [UserID, setUserID] = useState();
    const bsAuth = useContext(AuthContext);

    const getUser = async () => {
        try {
            const userdata = await API.graphql(graphqlOperation(getUserData, {
                username: username
            })).then((userdata) => {
                console.log("UserData");
                console.log(JSON.stringify(userdata));
                let tmp = userdata.data.getUserData.items;
                console.log("UserData2");
                console.log(tmp);
                setFrstTimeFlag(tmp[0].deviceCount);
                setUserID(tmp[0].id);
                bsAuth.setUser(tmp[0]);
                console.log("UserSetting-userdata");
                let userSetting = tmp[0].settings.items;
                console.log(userSetting);
                AsyncStorage.setItem("User", JSON.stringify(tmp[0]));
                AsyncStorage.setItem("userSettings", JSON.stringify(userSetting));
                bsAuth.setUserSettings(userSetting);
                setUserSettings(userSetting);
                AsyncStorage.setItem("username",username);
            });
            userdata;
            //console.log();
            console.log(JSON.stringify(userdata));
        } catch (error) {
            console.log();
            console.log(error);
        }
    };

    React.useEffect(() => {
        console.log("KSad");
        console.log(userSettings);
        if (userSettings != null) {
            if (FrstTimeFlag == 0) {
                navigation.navigate("ScanDeviceReg",{Parent: 'SignIn'});
            } else {
                bsAuth.setUserToken(UserID);
                bsAuth.setUserName(username);
            }
        } else {
            if (FrstTimeFlag == 0) {
                navigation.navigate("ScanDeviceReg",{Parent: 'SignIn'});
            }
        }
    }, [userSettings]);

    React.useEffect(() => {
        console.log("UserID 1 : ", UserID);
        if (UserID != null) {
            AsyncStorage.setItem("UserToken", UserID).then(() => {
            });
        }
    }, [UserID]);

    React.useEffect(() => {
        console.log("FirstTime : ", FrstTimeFlag);
        //console.log("UserID : ", UserID);
        bsAuth.setFirstTime(FrstTimeFlag);
    }, [FrstTimeFlag]);

    return (
        <View style={styles.container}>
            <View style={{...StyleSheet.absoluteFill}}>
            <ImageBackground
            style={{flex:1 , height: null, width: null}}
            source={require('../assets/images/bg.png')}
            ></ImageBackground>
            </View>
            <View style={styles.headerBackStyleStack}>
                <HeaderBackStyle style={styles.headerBackStyle}></HeaderBackStyle>
                <ImageBackground
                    style={styles.mainContainer}
                    imageStyle={styles.mainContainer_imageStyle}
                    source={require("../assets/images/Gradient_ctf3PZK.png")}
                ></ImageBackground>
                <View gradientImage={require("../assets/images/Gradient_ctf3PZK.png")} style={styles.rect}>
                    <Text style={styles.beSmart1}>BeSmart</Text>
                    <View style={styles.usernameInputColumnRow}>
                        <View style={styles.usernameInputColumn}>
                        <View style={styles.usernameInput}>
                            <KeyboardAvoidingView 
                                    behavior = "padding" 
                                    style={styles.usernameinp}
                                >
                                    <TextInput
                                        placeholder="Username"
                                        onChangeText={text => {
                                                setUserN(text)
                                        }}
                                        placeholderTextColor="rgba(230, 230, 230,1)"
                                        selectionColor="rgba(230, 230, 230,1)"
                                        style={styles.userName}
                                    ></TextInput>
                                </KeyboardAvoidingView>
                            </View>
                            <KeyboardAvoidingView style={styles.passInput}>
                                <KeyboardAvoidingView
                                 behavior = "padding"
                                 style={styles.passinp}
                                 >
                                    <TextInput
                                        onChangeText={text => setPassword(text)}
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        placeholderTextColor="rgba(230, 230, 230,1)"
                                        selectionColor="rgba(230, 230, 230,1)"
                                        style={styles.password}
                                    ></TextInput>
                                </KeyboardAvoidingView>
                            </KeyboardAvoidingView>
                        </View>
                        <View style={[styles.container, styles.submitButton]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    console.log("sign In");
                                    console.log(username);
                                    console.log(password);
                                    Auth.signIn(username, password)
                                        .then(() => {
                                            console.log("sign In Successfull");
                                            getUser();
                                        })
                                        .catch((err) => 
                                        console.log(JSON.stringify(err)));
                                }}
                            >
                                <Icon name="arrow-right" style={styles.submitIcon}></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Pressable
                        onPress={() => {
                            alert("Todo");
                        }}
                    >
                        <Text style={styles.forgotPassword}>Forgot Password ?</Text>
                    </Pressable>
                    <View style={styles.group}>
                        <View style={styles.bottomBackSignInStack}>
                            <ImageBackground
                                style={styles.bottomBackSignIn}
                                imageStyle={styles.bottomBackSignIn_imageStyle}
                                source={require("../assets/images/Gradient_QlFg2ZQ.png")}
                            ></ImageBackground>
                        </View>
                    </View>
                    <TouchableOpacity
                                style={styles.buttonSignIn}
                                onPress={() => {
                                    navigation.navigate("SignUp");
                                }}
                            >
                        <Text style={styles.signUp}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>Sign In</Text>
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
        top: -height*.01,
        left: width*.055,
    },
    mainContainer: {
        top: height*.58,
        left: width*.05,
        height: height*.29,
        width: width*1.1,
        position: "absolute",
        transform: [
            {
                rotate: "15.00deg"
            }
        ],
        borderRadius: 54,
        overflow: "hidden"
    },
    mainContainer_imageStyle: {
        opacity: 0.64
    },
    rect: {
        width: width*1,
        height: height*1,
        position: "absolute",
        left: width*.1,
        top: height*.16,
    },
    beSmart1: {
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        fontSize: 50,
        top: height*.04,
        left: width*.05
    },
    usernameInput: {
        top:height*.00,
        width:width*.5
    },
    usernameinp: {
        backgroundColor: "rgba(132,27,229,0.38)",
        borderRadius: 44
    },
    userName: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: height*.07,
        width: width*.5,
        left:width*.05,
    },
    passInput: {
        top:height*.01,
        width:width*.5
    },
    passinp: {
        backgroundColor: "rgba(132,27,229,0.38)",
        borderRadius: 44
    },
    password: {
        fontFamily: "roboto-regular",
        color: "#121212",
        height: height*.07,
        width: width*.5,
        left:width*.05,
    },
    usernameInputColumn: {
        
    },
    submitButton: {
        top:height*.035,
        left: width*.1
    },
    usernameInputColumnRow: {
        height: height*.16,
        width:width*.9,
        top:height*.4,
        left:width*.05,
        flexDirection: "row",
    },
    forgotPassword: {
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        fontSize: 16,
        top:height*.42,
        left:width*.4
    },
    group: {
        width: width*1,
        height: height*.45,
        top: height*.4,
        left:width*.0,
        marginLeft: -37,
        opacity:.7,
    },
    bottomBackSignIn: {
        top: height*.02,
        left: width*.01,
        width: width*1,
        height: height*.3,
        position: "absolute",
        transform: [
            {
                rotate: "15.00deg"
            }
        ],
        borderRadius: 54,
        overflow: "hidden",
    },
    bottomBackSignIn_imageStyle: {},
    buttonSignIn: {
        top: height*.73,
        left: width*.05,
        width: width*.2,
        height: height*.09,
        position: "absolute",
        backgroundColor: "rgba(144,86,193,0.64)",
        borderRadius: 100,
    },
    signUp: {
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        height: height*.03,
        width: width*.15,
        fontSize: 15,
        top:height*.03,
        left:width*.035,
    },
    bottomBackSignInStack: {
        width: width*1,
        height: height*.05,
        top:height*.04,
        left:width*.03,       
    },
    text: {
        top: height*.5,
        left: width*.72,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        fontSize: 33,
        width: width*.3,
        height: height*.06, 
    },
    headerBackStyleStack: {
        width: width*.1,
        height: height*.1,
        top:-height*.19,
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
    }
});