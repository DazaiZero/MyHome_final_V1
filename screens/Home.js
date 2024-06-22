import React, { Component, useState, useContext, useEffect, useRef } from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    ActivityIndicator,
    FlatList,
    Dimensions,
    TouchableOpacity
} from "react-native";
//import DeviceInfo, { getMacAddress } from 'react-native-device-info';
import HomeHeader from "../Component/HomeHeader";
import Svg, { Ellipse } from "react-native-svg";
import Controller from "../Component/Controller";
import HomeFooter from "../Component/HomeFooter";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import WifiManager from 'react-native-wifi-reborn';
import { NetworkInfo } from 'react-native-network-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../bscontext';
//import { Socket } from '../../worker/socket';
import NetInfo from "@react-native-community/netinfo";

var ws = null;
var wsL = null;

const { height, width } = Dimensions.get('screen');
export const Home = ({ route, navigation }) => {
    var connectionInfo = null;
    //const wsocket = useContext();
    const [deviceMac, setDeviceMac] = useState();
    const [deviceList, setDeviceList] = useState();
    const bsAuth = useContext(AuthContext);
    const [isRefreshing, setRefreshing] = useState(true);
    const [connection, setConnection] = useState("192.168.4.1");
    //const [Socket, setSocket] = useState();
    const [SSID, setSSID] = useState();
    const [Mode, setMode] = useState();
    const [UserID, setUserID] = useState();
    const [username,setUserName] = useState();
    const [SocketReady, isSocketReady] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewableItems, setViewableItems] = useState(null);
    const [bname,setBName] = useState();
    const [startNow,setStart] = useState(false);
    const [NetworkType,setNetworkType] = useState();
    const [isInternetReachable,setInternetReachable] = useState();
    const [isCellular,setCellular] = useState();

    const t = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]


    useEffect(() => {
        console.log("from effect");
        NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
            console.log(defaultGateway);
            bsAuth.setLWIp(defaultGateway);
            setConnection(defaultGateway);
        });
        AsyncStorage.getItem("userSettings", (err, token) => {
            console.log("token");
            console.log(token);
            setDeviceList(JSON.parse(token));
        });
        AsyncStorage.getItem("SSID", (err, token) => {
            setSSID(token);
        });
        AsyncStorage.getItem("Mode", (err, token) => {
            setMode(token);
        });
        AsyncStorage.getItem("UserID", (err, token) => {
            setUserID(token);
        });
        //ws = wsocket.ws;
        NetworkInfo.getIPAddress().then(bssid => {
            console.log("s");
            console.log(bssid);
            setDeviceMac(bssid);
        });
        //console.log("SSID");
        NetworkInfo.getSSID().then(ssid => {
            setSSID(ssid);
            console.log(ssid);
        });
        connectionInfo = NetInfo.addEventListener(state => {
            _handleConnection(state);
        });
        AsyncStorage.getItem("username",(err,token)=>{
            setUserName(token);
        });
        
    }, []);

    const configureConnection = (con) => {
        if(isInternetReachable){
            console.log("Hiiide");
            setMode(1);
        }else{
            console.log("Byeeee");
            setMode(0);
        }
    };

    const ConnectToBoard = (ssid) => {
        console.log("SSID");
        console.log(ssid);
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
            .then(data => {//VirusAV#777$-sHome
                WifiManager.connectToProtectedSSID(ssid, "", false)
                    .then(
                        () => {
                            console.log("connectToProtectedSSID successfully!");
                            console.log("ssid :", ssid);
                            //setComplete(true);
                            //isLoading(false);
                        },
                        (reason) => {
                            console.log("connectToProtectedSSID failed!");
                            console.log(reason);
                            ConnectToBoard(ssid);
                        })
                    .finally(() => {
                        NetworkInfo.getIPV4Address().then(ipv4Address => {
                            console.log(ipv4Address);
                        });
                        NetworkInfo.getBSSID().then(bssid => {
                            console.log(bssid);
                        });
                        ConnectSocket("ws://192.168.4.1:81");
                        wsL = "ws://192.168.4.1:81";
                    });
                console.log("location enabled");
            }).catch(err => {
                console.log("not permitted to enable location");
            });
    };



    const ConnectSocket = async (conn) => {
        console.log(conn);
        try {
            ws = new WebSocket(conn);
            ws.onopen = () => {
                // connection opened
                //bsAuth.setSocket(ws);
                //setSocket(ws);
                setStart(true);
                
                if(isInternetReachable){
                    var data = { Op: 5, auth: bsAuth.UserToken, bssid: "0", type: 0 };
                    console.log(data);
                    ws.send(JSON.stringify(data)); // send a message
                    isSocketReady(true);
                    setTimeout(() => {
                        ws.send(JSON.stringify({ Op: 25,auth: bsAuth.UserToken, bssid: bsAuth.UserToken, type: 0 }));
                    }, 1000);
                }
                //wsocket.ws = ws;
            };

            //ws.onmessage = (e) => {
            // a message was received
            //console.log(e.data);
            //};

            ws.onerror = (e) => {
                // an error occurred
                console.log(e.message);
                //isSocketReady(false);
            };

            ws.onclose = (e) => {
                // connection closed
                console.log(e.code, e.reason);
                isSocketReady(false);
                checkStatus();
                //ConnectSocket(wsL);
            };
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        
    },[bsAuth.isNetReachable]);

    const _handleConnection = (state) => {
        console.log("asdsaas");
        console.log(bname);
        //if(bname != null){
            console.log("1Connection type :: ", state.type);
            console.log("2Is connected :: ", state.isConnected);
            console.log("3Is Internet Connected :: ", state.isInternetReachable);
            console.log("4Is Wifi Enabled :: ", state.isWifiEnabled); 
            if (state.isConnected) {
                setInternetReachable(state.isInternetReachable);
                setNetworkType(state.type);
                if (state.type === "wifi") {
                    if (state.isInternetReachable) {
                        wsL = "wss://blq6kweiml.execute-api.ap-south-1.amazonaws.com/echo";
                        ConnectSocket(wsL);
                    } else {
                        wsL = "ws://192.168.4.1:81";
                        ConnectSocket(wsL);
                    }
                }
                if (state.type === "cellular") {
                    if (state.isInternetReachable) {
                        wsL = "wss://blq6kweiml.execute-api.ap-south-1.amazonaws.com/echo";
                        ConnectSocket(wsL);
                    } else {
                        alert("Smart Board not found..");
                    }
                }
                checkStatus();
            } else {
                alert("Please turn on Wifi or Mobile Data, No Network ");
            }
            
            //configureConnection();
        //}
    };

    /* useEffect(()=>{
            if(isInternetReachable){
                console.log("Hiiide");
                setMode(1);
            }else{
                console.log("Byeeee");
                setMode(0);
            }
    },[SocketReady]); */

    useEffect(() => {
        if (startNow != null) {
            setRefreshing(false);
        }
    }, [startNow]);

    useEffect(() => {
        console.log("adsa12");
        console.log(deviceList);
        if (deviceList != null && deviceList[0] !=null) {
            setBName(deviceList[0].deviceName);
            console.log(deviceList);
        }
    }, [deviceList]);

    useEffect(()=>{
        if(bname != null){
            console.log("bname");
            console.log(bname);
            //configureConnection();
            checkStatus();
        }
    },[bname]);

    useEffect(() => {
        checkStatus();
    }, [NetworkType]);

    const checkStatus = async() => {
        if(ws != null){
            ws.close();
        }
        if (NetworkType === "wifi") {
            if(bname != null && SSID != null){
                if (SSID !== bname){
                    console.log("Mode 0-");
                    console.log(bname);
                    console.log(SSID);
                    if (isInternetReachable) {
                        wsL = "wss://blq6kweiml.execute-api.ap-south-1.amazonaws.com/echo";
                        ConnectSocket(wsL);
                    } else {
                        ConnectToBoard(bname);
                    }
                }
                else{
                    if(SSID == bname){
                        console.log("Mode 0");
                        console.log(bname);
                        wsL = "ws://192.168.4.1:81";
                        ConnectSocket(wsL);
                    }
                }
            }
        }
        if (NetworkType === "cellular") {
            if(bname != null && SSID != null){
                if(SSID == bname){
                    console.log("Mode 1");
                    console.log(bname);
                    wsL = "ws://192.168.4.1:81";
                    ConnectSocket(wsL);
                    
                }else{
                    if (isInternetReachable) {
                        console.log("Mode 1..");
                        wsL = "wss://blq6kweiml.execute-api.ap-south-1.amazonaws.com/echo";
                        ConnectSocket(wsL);
                    }else{
                        alert("Smart Board not found..");
                    }
                }
            }
        }
    }

    const onControllChange = useRef(({ viewableItems }) => {
        //console.log("onChange");
        const tmp = viewableItems;
        if (tmp.length > 0) {
            //console.log("If");
            setViewableItems(viewableItems);
        }

    });

    const RoomRef = useRef(null);

    useEffect(() => {
        //console.log("View");
        //console.log(viewableItems);
        if (viewableItems !== null) {
            setCurrentIndex(viewableItems[0].index);
        }
    }, [viewableItems]);

    useEffect(() => {
        //console.log(currentIndex);
        if (RoomRef.current != null)
            RoomRef.current.scrollToIndex({ index: currentIndex });
    }, [currentIndex]);

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 80 });

    return (
        <View style={styles.container}>
            <View style={{ ...StyleSheet.absoluteFill }}>
                <ImageBackground
                    style={{ flex: 1, height: null, width: null }}
                    source={require('../assets/images/bg.png')}
                ></ImageBackground>
            </View>
            <View style={styles.homeHeaderStack}>
                <HomeHeader style={styles.homeHeader}></HomeHeader>
                <ImageBackground
                    style={styles.mainContainer1}
                    imageStyle={styles.mainContainer1_imageStyle}
                    source={require("../assets/images/Gradient_Cus5WYT.png")}
                ></ImageBackground>
                {isRefreshing ? (
                    <View style={styles.contains}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                ) : (
                    <View style={styles.contains}>
                        <View style={styles.welcomeStack}>
                            <Text style={styles.welcome}>Welcome</Text>
                            <Text style={styles.beSmart1}>BeSmart</Text>
                        </View>
                        <View style={styles.smartRoomsStack}>
                            <Text style={styles.smartRooms}>Smart Rooms</Text>
                            <Text style={styles.username}>{username}</Text>
                        </View>
                        <View style={styles.roomSelectorArea}>
                            <View style={styles.roomSelectorScroll}>
                                <View style={styles.roomSelector}>
                                    <FlatList
                                        horizontal={true}
                                        keyExtractor={item => item.id}
                                        data={deviceList}
                                        style={styles.roomList}
                                        contentContainerStyle={styles.roomList}
                                        //onViewableItemsChanged={onControllChange}
                                        viewabilityConfig={viewConfig}
                                        renderItem={(item, index) =>
                                            <View>
                                                <TouchableOpacity style={styles.RoomSelectorButton} onPress={() => {
                                                    console.log(item.index);
                                                    setCurrentIndex(item.index);
                                                    if(NetworkInfo.getSSID !== item.item.deviceName){
                                                        styles.ellipse.backgroundColor = "blue"
                                                    }
                                                }}>
                                                    <ImageBackground
                                                        style={styles.rect6}
                                                        imageStyle={styles.rect6_imageStyle}
                                                        source={require("../assets/images/Gradient_DHsR8LE.png")}
                                                    >
                                                        <Svg viewBox="0 0 32.63 29.67" style={styles.ellipse}>
                                                            <Ellipse
                                                                stroke="rgba(230, 230, 230,1)"
                                                                strokeWidth={0}
                                                                fill="rgba(230, 230, 230,1)"
                                                                cx={16}
                                                                cy={15}
                                                                rx={16}
                                                                ry={15}
                                                            ></Ellipse>
                                                        </Svg>
                                                        <Text style={styles.roomName}>{item.item.deviceName}</Text>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.controller}>
                            <ImageBackground
                                style={styles.mainContainer2}
                                imageStyle={styles.mainContainer2_imageStyle}
                                source={require("../assets/images/Gradient_ctf3PZK.png")}
                            >
                            </ImageBackground>
                            <FlatList
                                ref={RoomRef}
                                keyExtractor={item => item.id}
                                data={deviceList}
                                style={styles.ControllerList}
                                contentContainerStyle={styles.ControllerContent}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                //onMomentumScrollEnd={(e)=>console.log(e.nativeEvent.contentOffset)}
                                pagingEnabled={true}
                                onViewableItemsChanged={onControllChange.current}
                                viewabilityConfig={viewConfig.current}
                                renderItem={item =>
                                    <View>
                                        {startNow ? (
                                            <View>
                                                <Text style={styles.roomNameText}>{item.item.deviceName}</Text>
                                                <Controller style={styles.controllerOther} ws={ws} item={item} socket={SocketReady} />
                                            </View>
                                        ):(
                                            <View>
                                                <ActivityIndicator size="large" color="#00ff00" />
                                            </View>
                                        )}
                                    </View>
                                }
                            />
                        </View>
                        <Text style={styles.smartControls}>Smart Controls</Text>
                    </View>
                )}
                <HomeFooter style={styles.homeFooter} navigation={navigation}></HomeFooter>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    roomNameText: {
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        width: width * .7,
        height: height * .045,
        bottom: -height * .001,
        left: width * .1,
        //textAlign: "center",
        //backgroundColor:'red'
    },
    roomList: {
        borderRadius: 75,
        overflow: 'hidden',
    },
    RoomSelectorButton: {
        width: width * .3,
        height: height * .1,
        top: height * .0,
        left: width * 0,
        padding: 2
    },
    controller: {
        flex: 1,
        position: 'absolute',
        width: width * 1,
        height: height * .4,
        top: height * .4,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        //backgroundColor:'red',
    },
    controllerOther: {
        height: height * .4,
        width: width * .9,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        //backgroundColor:'grey'
    },
    ControllerList: {
        borderRadius: 39,
        width: width * 1,
        height: height * .4,
        top: height * .01,
        overflow: 'hidden',
        //backgroundColor:'green'
    },
    ControllerContent: {
        borderRadius: 45,
        //backgroundColor:'blue'
    },
    mainContainer2: {
        position: 'absolute',
        width: width * 1.1,
        height: height * .42,
        top: height * .0,
        left: -width * .05,
        transform: [
            {
                rotate: "-10.00deg"
            }
        ],
        borderRadius: 54,
        overflow: "hidden",
        opacity: .5
    },
    mainContainer2_imageStyle: {},
    homeHeader: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: height * .1,
        width: width * 1,
        top: height * .001,
        left: width * .01
    },
    mainContainer1: {
        top: height * .229,
        left: -width * .015,
        width: width * 1,
        height: height * .18,
        position: "absolute",
        transform: [
            {
                rotate: "13.00deg"
            }
        ],
        borderRadius: 54,
        overflow: "hidden"
    },
    mainContainer1_imageStyle: {
        opacity: 0.55
    },
    contains: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: height * 1,
        width: width * 1,
        position: "relative",
        top: -height * .5,
    },
    welcome: {
        top: height * .04,
        left: width * .35,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        width: width * .5,
        height: height * .04,
    },
    beSmart1: {
        top: -height * .02,
        left: -width * .03,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        fontSize: 50,
        width: width * .55,
        height: height * .08,
    },
    welcomeStack: {
        flex: 1,
        position: 'absolute',
        width: width * .8,
        height: height * .1,
        top: height * .1,
        left: width * .05
    },
    smartRooms: {
        top: -height * .05,
        left: -width * .06,
        position: "absolute",
        fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        width: width * .5,
        height: height * .05
    },
    username: {
        top: -height * .08,
        left: width * .5,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        width: width * .43,
        height: height * .05,
    },
    smartRoomsStack: {
        width: width * .8,
        height: height * .1,
        left: 0,
        top: height * .08,
    },
    roomSelectorArea: {
        flex: 1,
        position: 'absolute',
        width: width * 1,
        height: height * .11,
        top: height * .256,
        left: width * .00,
    },
    roomSelectorScroll: {
        width: width * 1,
        height: height * .11,
        borderRadius: 54,
    },
    roomSelectorScroll_contentContainerStyle: {
        width: width * .05,
        height: height * .05,
    },
    roomSelector: {
        width: width * .85,
        height: height * .105,
        top: height * .00,
        left: width * .00,
        borderRadius: 100,
        overflow: 'hidden',
        //backgroundColor:'red'
    },
    rect6: {
        borderRadius: 74,
        shadowColor: "rgba(119,188,253,1)",
        shadowOffset: {
            width: width * .5,
            height: height * .5
        },
        elevation: 5,
        shadowOpacity: 0.6,
        shadowRadius: 0,
        flex: 1,
        overflow: "hidden",
    },
    rect6_imageStyle: {},
    ellipse: {
        width: width * .1,
        height: height * .2,
        top: -height * .01,
        left: width * .01,
       // backgroundColor: 'red'
    },
    roomName: {
        flex: 1,
        position: 'absolute',
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        height: height * .04,
        width: width * .29,
        fontSize: 15,
        textAlign: "center",
        top: height * .03,
        left: width * .0,
    },
    smartControls: {
        fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 19,
        width: width * .4,
        height: height * .05,
        top: height * .11,
        left: width * .29,
    },
    homeFooter: {
        position: "absolute",
        top: height * .78,
        left: -width * .01,
        height: height * .1,
        width: width * 1,
        alignContent: 'center',
    },
    homeHeaderStack: {
        height: height * 1,
        width: width * 1,
        top: -height * .06,
        left: width * .0,
        justifyContent: 'center',
        flex: 1,
        position: 'absolute',
        alignContent: 'center',
        alignItems: 'center'
    }
});
