import React, { Component } from "react";
import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import HomeButton from "./HomeButton";
import AddButton from "./AddButton";
import SettingButton from "./SettingButton";

const {height,width} = Dimensions.get('window');

function HomeFooter({style,navigation}) {

  return (
    <View style={[styles.container, style]}>
      <View style={styles.bottomBackSignIn1Stack}>
        <ImageBackground
          style={styles.bottomBackSignIn1}
          imageStyle={styles.bottomBackSignIn1_imageStyle}
          source={require("../assets/images/Gradient_QlFg2ZQ.png")}
        ></ImageBackground>
        <ImageBackground
          style={styles.bottomBackSignIn2}
          imageStyle={styles.bottomBackSignIn2_imageStyle}
          source={require("../assets/images/Gradient_QlFg2ZQ.png")}
        ></ImageBackground>
        <View style={styles.rect10}>
          <View style={styles.homeButton1Row}>
            <HomeButton style={styles.homeButton1} navigation={navigation}></HomeButton>
            <AddButton style={styles.addButton1} navigation={navigation}></AddButton>
            <SettingButton style={styles.settingButton1} navigation={navigation}></SettingButton>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    position:'relative',
  },
  bottomBackSignIn1: {
    width: width*1,
    height: height*0.25,
    bottom:-height*.115,
    left:width*.02,
    transform: [
      {
        rotate: "19.00deg"
      }
    ],
    borderRadius: 54,
    overflow: "hidden"
  },
  bottomBackSignIn1_imageStyle: {
    opacity: 0.84
  },
  bottomBackSignIn2: {
    width: width*1,
    height: height*0.25,
    bottom:-height*.055,
    left:width*.1,
    position: "absolute",
    transform: [
      {
        rotate: "-17.00deg"
      }
    ],
    borderRadius: 54,
    overflow: "hidden"
  },
  bottomBackSignIn2_imageStyle: {
    opacity: 0.65
  },
  rect10: {
    flex:1,
    alignContent:'center',
    justifyContent:'center',
    flexDirection: "row",
    position:'absolute'
  },
  homeButton1: {
    flex: 1,
    position:'absolute',
    left:width*.0,
    bottom:height*.0,
    height:height*.1,
    width:width*.2,
  },
  addButton1: {
    flex: 1,
    position:'absolute',
    left:width*.35,
    bottom:height*.0,
    height:height*.1,
    width:width*.2,
  },
  settingButton1: {
    flex: 1,
    position:'absolute',
    right:-width*.9,
    bottom:height*.0,
    height:height*.1,
    width:width*.2,
  },
  homeButton1Row: {
    flex: 1,
    position:'absolute',
    left:width*.1,
    bottom:-height*.11,
    flexDirection: "row",
  },
  bottomBackSignIn1Stack: {
    width: width*1,
    height: height*.3,
    top:height*.07,
    left:-width*.05,
    bottom:0,
    position:'relative',
    //backgroundColor:'blue'
  }
});

export default HomeFooter;
