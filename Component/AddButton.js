import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
const {height,width} = Dimensions.get('window');
function AddButton({style,navigation}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={()=>{
      navigation.navigate("ScanDeviceReg",{Parent: 'Home'});
    }}>
      <Icon name="plus" style={styles.icon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(196,168,220,1)",
    borderRadius: 100,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 0
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 51,
    marginTop: height*.012,
    marginLeft: width*.035
  }
});

export default AddButton;
