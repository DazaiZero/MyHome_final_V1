import React, { Component,useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text
} from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IoniconsIcon from "react-native-vector-icons/Ionicons";

function SettingsMain({style,roomsPressed,command}) {
  const [RoomName,setRoom] = useState(true);
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.settingsTopScroll}>
        <View
          horizontal={true}
          contentContainerStyle={styles.settingsTopScroll_contentContainerStyle}
        >
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={()=>{
              command(2);
            }} >
              <EntypoIcon name="user" style={styles.icon}></EntypoIcon>
              <Text style={styles.text}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1} onPress={()=>{
              command(1);
              roomsPressed(true);
            }} >
              <View style={styles.icon2Stack}>
                <MaterialCommunityIconsIcon
                  name="home-heart"
                  style={styles.icon2}
                ></MaterialCommunityIconsIcon>
                <Text style={styles.smartRooms}>Smart Rooms</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button2}>
              <View style={styles.icon3Stack}>
                <IoniconsIcon
                  name="md-wifi"
                  style={styles.icon3}
                ></IoniconsIcon>
                <Text style={styles.connection}>Connection</Text>
              </View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.button3}>
              <View style={styles.icon4Stack}>
                <EntypoIcon
                  name="500px-with-circle"
                  style={styles.icon4}
                ></EntypoIcon>
                <Text style={styles.other}>Other</Text>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 48
  },
  settingsTopScroll: {
    borderRadius: 48,
    flex: 1,
  },
  settingsTopScroll_contentContainerStyle: {
    width: 410,
    flexDirection: "row",
  },
  button: {
    width: 97,
    height: 96,
    backgroundColor: "rgba(181,132,191,1)",
    borderRadius: 100
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 48,
    marginTop: 11,
    marginLeft: 25
  },
  text: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 11,
    marginTop: 3,
    marginLeft: 33
  },
  button1: {
    width: 97,
    height: 96,
    backgroundColor: "rgba(222,114,128,1)",
    borderRadius: 100,
    marginLeft: 6
  },
  icon2: {
    top: 0,
    left: 2,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 64
  },
  smartRooms: {
    top: 55,
    left: 0,
    width:80,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 11
  },
  icon2Stack: {
    width: 67,
    height: 80,
    marginLeft: 15
  },
  button2: {
    width: 97,
    height: 96,
    backgroundColor: "rgba(178,226,122,1)",
    borderRadius: 100,
    marginLeft: 9
  },
  icon3: {
    top: -9,
    left: -3,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 61
  },
  connection: {
    top: 45,
    left: -4,
    width:70,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 11
  },
  icon3Stack: {
    width: 56,
    height: 73,
    marginTop: 7,
    marginLeft: 21
  },
  button3: {
    width: 97,
    height: 96,
    backgroundColor: "rgba(155,155,155,1)",
    borderRadius: 100,
    marginLeft: 7
  },
  icon4: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 51
  },
  other: {
    top: 55,
    left: 11,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 12
  },
  icon4Stack: {
    width: 51,
    height: 69,
    marginTop: 11,
    marginLeft: 23
  },
  buttonRow: {
    height: 96,
    flexDirection: "row",
    flex: 1,
    marginRight: -103
  }
});

export default SettingsMain;
