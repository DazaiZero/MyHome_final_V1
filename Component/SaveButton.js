import React, { Component, useContext, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import { getUsers } from "../src/graphql/queries";
import { updateSettings } from "../src/graphql/mutations";
import { AuthContext } from '../bscontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Amplify, { Auth, API, gaphqlOperation } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);
const { height, width } = Dimensions.get('window');
var ws = null;

function SaveButton({ style, operation, setCurrentIndex }) {
  const bsAuth = useContext(AuthContext);
  const [operations, setOperation] = useState(operation);


  const updateUser = async () => {
    try {
      let deviceCount = parseFloat(bSAuth.firstTime + 1);
      console.log(deviceCount);
      const updateToken = await API.graphql(graphqlOperation(updateUsers, {
        input: {
          "id": userToken,

        }
      })).then(() => {
        AsyncStorage.setItem("deviceCount", deviceCount);
        getUserSettings();
      }).catch(err => console.log(err));
      updateToken;
    } catch (error) {
      console.log(error);
    }
  }

  const getUserSettings = async () => {
    try {
      const userSettings = await API.graphql(graphqlOperation(getUsers, {
        id: bsAuth.UserToken
      })).then(settings => {
        let userSetting = settings.data.getUsers.userSettings;
        console.log(userSetting);
        AsyncStorage.setItem("userSettings", JSON.stringify(userSetting.items));
        bsAuth.setUserSettings(userSetting.items);
      }).catch(err => console.log(err)).finally(() => {
        setCurrentIndex(1);
      });
      userSettings;
      console.log(userSettings);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDeviceCount = async () => {
    //console.log(operation);
    try {
      const updateSetting = await API.graphql(graphqlOperation(updateSettings, {
        input: {
          "id": operation.userToken,
          "s1": operation.s1.toString(),
          "s2": operation.s2.toString(),
          "s3": operation.s3.toString(),
        }
      })).then(() => {
        getUserSettings();
      }).catch(err => console.log('err', err));
      updateSetting;

    } catch (error) {
      console.log('errr', error);
    }
  }

  const updateWifi = async () => {
    try {
      ws = new WebSocket("ws://192.168.4.1:81");
      ws.onopen = () => {
        console.log("wifiUpdate Open");
        setTimeout(() => {
          ws.send(JSON.stringify({ Op: 5, auth: bsAuth.UserToken, bssid: "0", type: 0 }));
        }, 500);
      };

      ws.onmessage = (e) => {
        console.log("wifiUpdate OnMessage");
        console.log(e.data);


      };

      ws.onerror = (e) => {
        // an error occurred
        console.log("wifiUpdate Onerror");
        console.log(e.message);
      };

      ws.onclose = (e) => {
        // connection closed
        console.log("wifiUpdate closed");
        console.log(e.code, e.reason);
      };
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    updateWifi();
    return () => {
      ws.close();
    }
  }, [])


  const CheckOperation = () => {
    console.log("got");
    console.log(operations.from);
    if (operations.from != null) {
      if (operations.from == 'roomUpdate') {
        console.log("roomUpdate");
        console.log(operations.WPASS);
        console.log(operations.WSSID);
        if (operations.WPASS != null && operations.WSSID != null)
          updateDeviceCount();
        else
          setCurrentIndex(1);

      }
      if (operations.from == 'wifiUpdate') {
        console.log("wifiUpdate");
        console.log("send");
        ws.send(JSON.stringify({ Op: 4, step: 2, auth: bsAuth.UserToken, wssid: operation.WSSID, wpass: operation.WPASS }));
        setTimeout(() => {
          console.log("sendClose");
          ws.close();
        }, 2000);
        setCurrentIndex(1);
      }
      if (operations.from == 'passChange') {
        //setReady(false);
        if (operations.O != null && operations.N != null) {
          Auth.currentAuthenticatedUser()
            .then(user => {
              return Auth.changePassword(user, operations.O, operations.N);
            })
            .then(data => {
              console.log(data);
              Auth.signOut().then(() => {
                bsAuth.setUserToken(null);
                bsAuth.setUserName('');
                bsAuth.setUser(null);
                AsyncStorage.clear();
              });
            }
            )
            .catch(err =>
              console.log(err),
              //setReady(true)
            );
        }
        else
          setCurrentIndex(1);

      }
    }
  }

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={() => {
      CheckOperation(operations.from);
    }}>
      <Text style={styles.save}>Save</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(155,228,76,1)",
    borderRadius: 100
  },
  save: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    marginTop: height * .025,
    marginLeft: width * .03,
    fontSize: 20,
    width: width * .15,
    height: height * .05
  }
});

export default SaveButton;
