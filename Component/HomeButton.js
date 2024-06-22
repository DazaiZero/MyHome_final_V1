import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

const {height,width} = Dimensions.get('window');

function HomeButton({style,navigation}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={()=>{
      navigation.navigate('Home');
    }}>
      <Icon name="grid" style={styles.homeIcon}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    backgroundColor: "rgba(113,140,230,1)"
  },
  homeIcon: {
    color: "rgba(255,255,255,1)",
    fontSize: 54,
    marginTop: height*.01,
    marginLeft: width*.033
  }
});

export default HomeButton;
