import React, { Component, useState, useEffect, useContext } from "react";
import { StyleSheet, View, ImageBackground, Text, Dimensions, TouchableOpacity } from "react-native";
import ProfileHeader from "../Component/ProfileHeader";
import SettingsMain from "../Component/SettingsMain";
import { SmartRoomSelector } from "../Component/SmartRoomSelector";
import HomeFooter from "../Component/HomeFooter";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import { AuthContext } from '../bscontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef } from "react";
//import { Socket } from '../../worker/socket';
import { ProfileSettings } from '../Component/ProfileSettings'

Amplify.configure(awsconfig);
const { height, width } = Dimensions.get('window');
var ws = null;

export const Settings = ({ route, navigation }) => {
  const bsAuth = useContext(AuthContext);
  const [roomName, setRoomName] = useState('Smart Rooms');
  const [command, roomsPressed] = useState(true);
  const [CommandMenu, setCommand] = useState(1);
  const [isReady, setReady] = useState();
  //const wsocket = useContext(Socket);
  const control = { Op: 3, auth: bsAuth.UserToken, bssid: 'qw', type: 0, Fan: 0, Light: 0, Switch1: 0, Switch2: 0, FanSpeed: 0 };

  useEffect(() => {
    if (command) {
      setReady(true);
    }
  }, [command])

  useEffect(() => {

  }, []);

  /* const SwitchMenu = () => {
    switch (CommandMenu) {
      case 1:
        return (
          
        )
      case 2:
        return(
          
        )
    }
  } */

  return (

    <View style={[styles.container]}>
      <View style={[{ ...StyleSheet.absoluteFill, flex: 1 }]}>
        <ImageBackground
          style={{ flex: 1 }}
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
          <ProfileHeader style={styles.profileHeader}></ProfileHeader>

          <View style={styles.contains}>
            <Text style={styles.beSmart1}>BeSmart</Text>
            <Text style={styles.settings}>Settings</Text>
            <SettingsMain style={styles.settingsMain} roomsPressed={roomsPressed} command={setCommand} ></SettingsMain>
            <View style={styles.smartRoomSelectorStack}>
              {CommandMenu == 1 && 
              
              <SmartRoomSelector
                style={styles.smartRoomSelector}
                setRoomName={setRoomName}
                setCommand={command}
                roomsPressed={roomsPressed}
              ></SmartRoomSelector>
              
              }
              {CommandMenu == 2 &&
              
              <ProfileSettings />

              }
              
              <Text style={styles.smartRooms2}>{roomName}</Text>
            </View>

          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonSignIn}
          onPress={() => {
            Auth.signOut().then(() => {
              bsAuth.setUserToken(null);
              bsAuth.setUserName('');
              bsAuth.setUser(null);
              AsyncStorage.clear();
            })
          }}
        >
          <Text style={styles.signOut}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <HomeFooter style={styles.homeFooter} navigation={navigation}></HomeFooter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 1,
    height: height * 1,
  },
  bckImgBck: {
    flex: 1,
    top: height * 0.5,
    flexDirection: 'column'
  },
  bckImg: {
    flex: 1,
    marginTop: height * .01,
    marginLeft: width * .0,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  signOut: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    height: height * .04,
    width: width * .15,
    fontSize: 13,
    marginTop: height * .01,
    marginLeft: width * .03
  },
  bottomBackSignIn_imageStyle: {},
  buttonSignIn: {
    flex: 1,
    width: height * .085,
    height: width * .16,
    position: "absolute",
    backgroundColor: "rgba(144,86,193,0.64)",
    borderRadius: 100,
    marginTop: height * .14,
    marginLeft: width * .9,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  mainContainer1: {
    top: height * .31,
    marginLeft: width * .05,
    maxWidth: width + 25,
    alignContent: 'center',
    justifyContent: 'center',
    width: width * 1.05,
    height: height * .24,
    position: "absolute",
    transform: [
      {
        rotate: "-11.00deg"
      }
    ],
    borderRadius: 54,
    overflow: "hidden",
  },
  mainContainer1_imageStyle: {
    opacity: 0.5
  },
  profileHeader: {
    position: "absolute",
    top: height * .01,
    marginLeft: width * .15,
    height: height * .0,
    width: width * .0
  },
  contains: {
    position: "absolute",
    top: height * .13,
    left: width * .045,
    marginLeft: width * .055,
  },
  beSmart1: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 50,
    width: width * .95,
    height: height * .09,
    marginTop: height * .03,
    marginLeft: width * .02
  },
  settings: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    width: width * .25,
    height: height * .05,
    marginTop: height * .02,
    marginLeft: width * .7
  },
  settingsMain: {
    height: height * .1,
    width: width * .1,
    marginTop: height * .02,
    marginLeft: width * .125,
    justifyContent: 'center'
  },
  smartRoomSelector: {
    position: "absolute",
    top: height * .001,
    height: height * .1,
    width: width * .1
  },
  smartRooms2: {
    top: height * .05,
    left: width * .17,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    width: width * .5,
    height: height * .09,
  },
  smartRoomSelectorStack: {
    flex: 1,
    marginLeft: -width * .06,
    marginTop: height * .02,
    justifyContent: 'center'
  },
  mainContainer1Stack: {
    flex: 1,
    position: 'absolute',
    //backgroundColor:'red'
  },
  homeFooter: {
    position: "absolute",
    top: height * .78,
    left: -width * .01,
    height: height * .1,
    width: width * 1,
    alignContent: 'center',
  },
  mainContainer1StackStack: {
    maxHeight: height - 20,
    maxWidth: width - 20,
    position: 'absolute',
    marginTop: -height * .13,
    marginLeft: -width * .083,
  }
});