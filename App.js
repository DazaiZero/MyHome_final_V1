import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//import { signIn, SignUp, ConfirmSignUp, registerRoom, setUpWifi, Home, Profile, EditProfile, ScanDeviceReg } from "./scrs";
import { AuthContext } from "./bscontext"
import { SignIn } from "./screens/SignIn";
import * as Font from "expo-font";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid } from 'react-native';  
import WifiManager from 'react-native-wifi-reborn'
import { Home } from "./screens/Home";
import { Settings } from "./screens/Settings";
import { RegisterBoard } from "./screens/RegisterBoard";
import { RegisterRoom } from "./screens/RegisterRoom";
import { WifiSetup } from "./screens/WifiSetup";
import { SignUp } from "./screens/SignUp";
import { AccountVerification } from "./screens/AccountVerification";
import { SetupComplete } from './screens/SetupComplete';

const MainTab = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();



export const HomeStackScr = () => {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name = "Home" component={Home} options={{ headerShown: false }}/>
      <HomeStack.Screen name = "Settings" component={Settings} options={{ headerShown: false }}/>
      <HomeStack.Screen name = "ScanDeviceReg" component={RegisterBoard} options={{ headerShown: false }}/>
      <HomeStack.Screen name = "WifiSetup" component={WifiSetup} options={{ headerShown: false }}/>
      <HomeStack.Screen name = "registerRoom" component={RegisterRoom} options={{ headerShown: false }}/>
    </HomeStack.Navigator>    
  );
}
export const ProfileStackScr = () => {
  return(
    <ProfileStack.Navigator>
      <ProfileStack.Screen name = "Settings" component={Settings} options={{ headerShown: false }}/>
      <ProfileStack.Screen name = "ScanDeviceReg" component={RegisterBoard} options={{ headerShown: false }}/>
      <ProfileStack.Screen name = "WifiSetup" component={WifiSetup} options={{ headerShown: false }}/>
      <ProfileStack.Screen name = "registerRoom" component={RegisterRoom} options={{ headerShown: false }}/>
    </ProfileStack.Navigator>
  );
} 

export default App = () => {
  const [UserToken,setUserToken] = React.useState(null);
  const [username,setUserName] = React.useState('');
  const [user,setUser] = React.useState(null);
  const [wifiPer,setWifiPer] = React.useState(false);
  const [isWifiEnable,setWifiEnable] = React.useState(false);
  const [LWIp,setLWIp] = React.useState(null);
  const [bsMac,setbsMac] = React.useState(null);
  const [connStatus,setConnStatus] = React.useState(0);
  const [DeviceControl,setDeviceControl] = React.useState(null);
  const [firstTime,setFirstTime] = React.useState(true);
  const [userSettings,setUserSettings] = React.useState();

  const Gvar = {
    UserToken, setUserToken,
    username, setUserName,
    user, setUser,
    wifiPer, setWifiPer,
    isWifiEnable, setWifiEnable,
    LWIp, setLWIp,
    bsMac, setbsMac,
    connStatus, setConnStatus,
    DeviceControl, setDeviceControl,
    firstTime, setFirstTime,
    userSettings,setUserSettings
  };

  const checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission is required for WiFi connections',
          message:
            'This app needs location permission as this is required  ' +
            'to scan for wifi networks.',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setWifiPer(true);
          console.log("true-ss");
      } else {
          setWifiPer(false);
          console.log("false-ss");
      }
    } catch (error) {
      console.log("caths");
    }
  } 

  useEffect(() => {
    //AsyncStorage.clear();
    Font.loadAsync({
      "roboto-regular": require("./assets/fonts/roboto-regular.ttf"),
      "roboto-700": require("./assets/fonts/roboto-700.ttf"),
      "bai-jamjuree-regular": require("./assets/fonts/bai-jamjuree-regular.ttf")
    });
    checkPermission();
    AsyncStorage.getItem("UserToken",(err,token) => {
      setUserToken(token);
    }); 
    AsyncStorage.getItem("FirstTime",(err,token) => {
      setFirstTime(token);
    });    
  },[]);

  return(
  <AuthContext.Provider value={Gvar}>
    <NavigationContainer>
      { UserToken ? (
        <MainTab.Navigator>
          <MainTab.Screen name="HomeStackScr" component={HomeStackScr} options={{ headerShown: false }}/>
          <MainTab.Screen name="ProfileStackScr" component={ProfileStackScr} options={{ headerShown: false }}/> 
        </MainTab.Navigator>
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen name = "SignIn" component = {SignIn} options={{ headerShown: false }}/>
          <AuthStack.Screen name = "SignUp" component = {SignUp} options={{ headerShown: false }}/>
          <AuthStack.Screen name = "AccountVerification" component = {AccountVerification} options={{ headerShown: false }}/>
          <AuthStack.Screen name = "ScanDeviceReg" component = {RegisterBoard} options={{ headerShown: false }}/>
          <AuthStack.Screen name = "registerRoom" component = {RegisterRoom} options={{ headerShown: false }}/>
          <AuthStack.Screen name = "setUpWifi" component = {WifiSetup} options={{ headerShown: false }}/>
          <AuthStack.Screen name = "Home" component = {Home} options={{ headerShown: false }}/>
          <AuthStack.Screen name = "SetupComplete" component = {SetupComplete} options={{ headerShown: false }}/>
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  </AuthContext.Provider>
  );
}