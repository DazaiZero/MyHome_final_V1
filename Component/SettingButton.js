import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const {height,width} = Dimensions.get('window');

function SettingButton({style,navigation}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={()=>{
      navigation.navigate('Settings');
    }}>
      <Icon name="settings" style={styles.settingsIcon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    backgroundColor: "rgba(113,140,230,1)"
  },
  settingsIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 44,
    marginTop: height*.018,
    marginLeft: width*.045
  }
});

export default SettingButton;
