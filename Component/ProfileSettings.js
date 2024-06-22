import React, { Component, useRef, useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Text,
    FlatList,
    ActivityIndicator,
    Dimensions,
} from "react-native";
import SaveButton from "./SaveButton";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Svg, { Ellipse } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('window');
var ws = null;

const RoomSetup = ({ }) => {
    const l = [{ id: 1, title: 'Wifi' }, { id: 2, title: 'menu' }, { id: 3, title: 'setup' }]
    const SSelector = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [viewableItems, setViewableItems] = useState(null);
    const [Op, setOp] = useState({ from: 'passChange', O: null, N: null });
    const [setReady, setReadyState] = useState(true);

    useEffect(() => {
        SSelector.current.scrollToIndex({ index: 1 });
    }, []);

    const onControllChange = useRef(({ viewableItems }) => {
        console.log("onChange");
        const tmp = viewableItems;
        if (tmp.length > 0) {
            console.log("If");
            setViewableItems(viewableItems);
        }

    });
    useEffect(() => {
        if (viewableItems !== null) {
            setCurrentIndex(viewableItems[0].index);
        }
    }, [viewableItems]);

    useEffect(() => {
        if (SSelector.current != null)
            SSelector.current.scrollToIndex({ index: currentIndex });
        console.log(currentIndex);
    }, [currentIndex]);

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 80 });

    return (
        <View style={styles.scrollArea}>
            <FlatList
                ref={SSelector}
                keyExtractor={item => item.id}
                data={l}
                initialScrollIndex={1}
                onScrollToIndexFailed={info => {
                    const wait = new Promise(resolve => setTimeout(resolve, 1000));
                    wait.then(() => {
                    });
                }}
                contentContainerStyle={styles.scrollArea_contentContainerStyle}
                horizontal={true}
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                viewabilityConfig={viewConfig.current}
                onViewableItemsChanged={onControllChange.current}
                renderItem={item => {
                    if (item.index == 0) {
                        return (
                            <View style={styles.options}>
                                <View style={styles.rect}>
                                    <View style={styles.setup1}>
                                        <Text style={styles.switchSetupText}>Change Password</Text>
                                        {setReady ? (
                                            <View style={styles.s2Stack}>
                                                <View style={styles.s2}>
                                                    <View style={styles.s3}>
                                                        <TextInput
                                                            placeholder={'Old Password'}
                                                            onChangeText={text => Op.O = text}
                                                            placeholderTextColor="rgba(230, 230, 230,1)"
                                                            style={styles.s4}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                                <View style={styles.s5}>
                                                    <View style={styles.s6StackRow}>
                                                        <View style={styles.s6Stack}>
                                                            <View style={styles.s6}></View>
                                                            <TextInput
                                                                placeholder={'New Password'}
                                                                onChangeText={text => Op.N = text}
                                                                placeholderTextColor="rgba(230, 230, 230,1)"
                                                                style={styles.s7}
                                                            ></TextInput>
                                                        </View>
                                                        <SaveButton style={styles.saveButton1} operation={Op} setCurrentIndex={setCurrentIndex} setReady={setReadyState}></SaveButton>
                                                    </View>
                                                </View>
                                            </View>
                                        ) : (
                                            <View style={styles.s2Stack}>
                                                <View style={[styles.container, styles.refresh]}>
                                                    <ActivityIndicator size="large" color="#00ff00" />
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        );
                    }
                    if (item.index == 1) {
                        return (
                            <View style={styles.selectorContainer}>
                                <View style={styles.rect2}>
                                    <View style={styles.switchSetupRow}>
                                        <TouchableOpacity style={styles.switchSetup} onPress={() => {
                                            SSelector.current.scrollToIndex({ index: 0 });
                                        }}>
                                            <MaterialCommunityIconsIcon
                                                name="account-key"
                                                style={styles.icon2}
                                            ></MaterialCommunityIconsIcon>
                                            <Text style={styles.setupSwitch}>Change Password</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.wifiSetupButton} onPress={() => {
                                            SSelector.current.scrollToIndex({ index: 2 });
                                        }}>
                                            <MaterialCommunityIconsIcon
                                                name="home-lock"
                                                style={styles.icon}
                                            ></MaterialCommunityIconsIcon>
                                            <Text style={styles.wifiSetup2}>Parental Password</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                    }
                    if (item.index == 2) {
                        return (
                            <View style={styles.wifioptions}>
                                <View style={styles.wifiContainer}>
                                    <View style={styles.wifiSetup}>
                                        <Text style={styles.wifiSetupText}>Parental Password</Text>
                                        <View style={styles.ssidViewColumnRow}>
                                            <View style={styles.ssidViewColumn}>
                                                <View style={styles.ssidView}>
                                                    <View style={styles.ssid}>
                                                        <TextInput
                                                            placeholder="Home WIFI Name"
                                                            onChangeText={text => {
                                                                Op.WSSID = text;
                                                            }}
                                                            placeholderTextColor="rgba(230, 230, 230,1)"
                                                            style={styles.ssidInput}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                                <View style={styles.passview}>
                                                    <View style={styles.ssidPassStack}>
                                                        <TextInput
                                                            placeholder="Password"
                                                            onChangeText={text => {
                                                                Op.WPASS = text;
                                                            }}
                                                            secureTextEntry={true}
                                                            placeholderTextColor="rgba(230, 230, 230,1)"
                                                            style={styles.ssidPassInput}
                                                        ></TextInput>
                                                    </View>
                                                </View>
                                            </View>
                                            <SaveButton style={styles.saveButton2} operation={Op} setCurrentIndex={setCurrentIndex}></SaveButton>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        );
                    }
                }}
            />
        </View>
    );
}



export const ProfileSettings = ({ style }) => {
    const RoomRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewableItems, setViewableItems] = useState(null);
    const [roomSelected, setSelectedRoom] = useState();
    const [switchOptions, setOptionSwitch] = useState();

    useEffect(() => {
    }, []);


    const onControllChange = useRef(({ viewableItems }) => {
        //console.log("onChange");
        const tmp = viewableItems;
        if (tmp.length > 0) {
            //console.log("If");
            setViewableItems(viewableItems);
        }

    });
    useEffect(() => {
        if (viewableItems !== null) {
            setCurrentIndex(viewableItems[0].index);
        }
    }, [viewableItems]);

    useEffect(() => {
        if (RoomRef.current != null)
            RoomRef.current.scrollToIndex({ index: currentIndex });
    }, [currentIndex]);

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 80 });

    return (
        <View style={[styles.container, style]}>
            <ImageBackground
                style={styles.smartRoomsSelector1}
                imageStyle={styles.smartRoomsSelector1_imageStyle}
                source={require("../assets/images/Gradient_ctf3PZK.png")}
            >
                <ImageBackground
                    style={styles.smartRoomsScrollContainer}
                    imageStyle={styles.smartRoomsScrollContainer_imageStyle}
                    source={require("../assets/images/Gradient_KVbsqoP.png")}
                >
                    <RoomSetup setSelectedRoom={setSelectedRoom} />
                </ImageBackground>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    refresh: {

    },
    switchSetupText: {
        //backgroundColor:'red',
        fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 15,
        width: width * .35,
        height: height * .04,
        marginTop: -height * .04,
        marginLeft: width * .42
    },
    wifiSetupText: {
        //backgroundColor:'red',
        fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 15,
        width: width * .3,
        height: height * .04,
        marginTop: -height * .04,
        marginLeft: width * .5
    },
    room: {
        width: width * .357,
        height: height * .154,
        position: "absolute",
        backgroundColor: "rgba(123,242,215,1)",
        borderRadius: 34,
        opacity: 0.8
    },
    ellipse: {
        width: width * .1,
        height: height * .1,
        marginTop: -height * .015,
        marginLeft: 8
    },
    bedroom: {
        top: height * .09,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        width: width * .36,
        height: height * .05,
        textAlign: "center",
    },
    roomStack: {
        height: height * .156,
        width: width * .358,
        borderRadius: 25,
        marginTop: height * .01,
        marginLeft: width * .01,
        overflow: 'hidden',
        //backgroundColor: 'blue'
    },
    smartRoomsScroll: {
        width: width * .8,
        height: height * .33,
        transform: [
            {
                rotate: "0.00deg"
            }
        ],
        overflow: 'hidden',
        borderRadius: 44,
        //backgroundColor:'red',
        marginTop: height * .01,
        marginLeft: width * .025
    },
    smartRoomsSelector1: {
        width: width * .96,
        height: height * .47,
        transform: [
            {
                rotate: "10.00deg"
            }
        ],
        borderRadius: 54,
        marginTop: height * .05,
        marginLeft: width * .065,
        overflow: "hidden"
    },
    smartRoomsSelector1_imageStyle: {
        opacity: 0.6
    },
    smartRoomsScrollContainer: {
        width: width * .845,
        height: height * .35,
        transform: [
            {
                rotate: "-10.00deg"
            }
        ],
        borderRadius: 41,
        marginTop: height * .05,
        marginLeft: width * .05,
        overflow: "hidden"
    },
    smartRoomsScrollContainer_imageStyle: {},
    scrollArea: {
        width: width * .835,
        height: height * .34,
        transform: [
            {
                rotate: "0.00deg"
            }
        ],
        borderRadius: 36,
        marginTop: height * .005,
        marginLeft: width * .005
    },
    scrollArea_contentContainerStyle: {
        width: width * 4,
        height: height * .338,
        borderRadius: 19,
        flexDirection: "row"
    },
    options: {
        width: width * .83,
        //backgroundColor: 'blue',
        height: height * .35
    },
    rect: {
        width: width * .84,
        height: height * .34,
        borderRadius: 36,
        marginTop: height * .01
    },
    setup1: {
        width: width * .6,
        height: height * .258,
        marginTop: height * .05,
        marginLeft: width * .05
    },
    s2: {
        top: height * .0,
        position: "absolute",
        left: width * .0,
    },
    s3: {
        width: width * .566,
        height: height * .069,
        backgroundColor: "rgba(132,27,229,0.38)",
        borderRadius: 44,
    },
    s4: {
        fontFamily: "roboto-700",
        height: height * .066,
        width: width * .465,
        marginLeft: width * .05,
        left: width * .006,
        position: "absolute",
        fontFamily: "roboto-700",
        color: "#121212",
        textAlign: "center",
        fontSize: 15
    },
    s5: {
        top: height * .09,
        width: width * .567,
        height: height * .08,
        position: "absolute",
        left: width * .01,
        flexDirection: "row"
    },
    s6: {
        top: height * .0,
        left: -width * .01,
        width: width * .57,
        height: height * .07,
        position: "absolute",
        backgroundColor: "rgba(132,27,229,1)",
        borderRadius: 44,
        opacity: 0.38
    },
    s7: {
        top: height * .0015,
        left: width * .045,
        position: "absolute",
        fontFamily: "roboto-700",
        color: "#121212",
        height: height * .066,
        width: width * .465,
        textAlign: "center",
        fontSize: 15
    },
    s6Stack: {
        width: width * .566,
        height: height * .08
    },
    saveButton1: {
        height: height * .09,
        width: width * .18,
        marginLeft: width * .025,
        marginTop: height * .09
    },
    s6StackRow: {
        height: height * .069,
        left: width * .001,
        flexDirection: "row",
        marginTop: height * .0,
        flex: 1
    },
    s8: {
        top: height * .2,
        width: width * .566,
        height: height * .0745,
        position: "absolute",
        left: width * .0,
    },
    s9: {
        top: -height * .02,
        width: width * .566,
        height: height * .069,
        left: width * .005,
        backgroundColor: "rgba(132,27,229,0.38)",
        borderRadius: 44,
    },
    s10: {
        fontFamily: "roboto-700",
        color: "#121212",
        height: height * .066,
        width: width * .465,
        textAlign: "center",
        fontSize: 15,
        marginLeft: width * .049
    },
    s2Stack: {
        flex: 1,
        height: height * .062,
        left: -width * .002,
        flexDirection: "row",
        marginTop: height * .0
    },
    selectorContainer: {
        marginLeft: width * .008,
        width: width * .83,
        height: height * .35,
        borderRadius: 44
    },
    rect2: {
        width: width * .83,
        height: height * .35,
        borderRadius: 44
    },
    switchSetup: {
        backgroundColor: 'blue',
        width: width * .37,
        height: height * .155,
        backgroundColor: "rgba(217,207,98,1)",
        borderRadius: 34,
        opacity: 0.8,
        marginTop: height * .00,
        marginLeft: width * .00
    },
    icon2: {
        color: "rgba(255,255,255,1)",
        fontSize: 40,
        marginTop: height * .01,
        marginLeft: width * .2
    },
    setupSwitch: {
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        textAlign: "center",
        marginTop: height * .01,
        height: height * .075,
        width: width * .38,
        marginLeft: width * .001
    },
    wifiSetupButton: {
        height: height * .155,
        width: width * .38,
        backgroundColor: "rgba(172,234,110,1)",
        borderRadius: 34,
        opacity: 0.8,
        marginLeft: width * .04
    },
    icon: {
        color: "rgba(255,255,255,1)",
        fontSize: 45,
        height: height * .05,
        width: width * .1,
        marginTop: height * .01,
        marginLeft: width * .225
    },
    wifiSetup2: {
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        width: width * .3,
        height: height * .075,
        textAlign: "center",
        marginTop: height * .01,
        alignSelf: "center"
    },
    switchSetupRow: {
        height: height * .155,
        width: width * .79,
        flexDirection: "row",
        marginTop: height * .02,
        marginLeft: width * .022
    },
    deregisterButton: {
        width: width * .3,
        height: height * .13,
        backgroundColor: "rgba(242,125,125,1)",
        borderRadius: 100,
        marginTop: height * .02,
        marginLeft: width * .26
    },
    deregister: {
        top: height * .07,
        left: width * .03,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "rgba(255,255,255,1)",
        fontSize: 19,
        width: width * .246,
        height: height * .04,
        textAlign: "center"
    },
    icon3: {
        top: height * .04,
        left: width * .17,
        position: "absolute",
        color: "rgba(255,255,255,1)",
        fontSize: 20
    },
    icon4: {
        top: height * .02,
        position: "absolute",
        color: "rgba(255,255,255,1)",
        fontSize: 40,
        left: width * .06
    },
    deregisterStack: {
        width: width * .298,
        height: height * .14,
        marginTop: height * .00
    },
    wifioptions: {
        width: width * .82,
        height: height * .35,
        marginLeft: width * .01,
        marginTop: height * .005
    },
    wifiContainer: {
        width: width * .82,
        height: height * .35,
        borderRadius: 36,
        marginLeft: -width * .001,
        marginTop: height * .02
    },
    wifiSetup: {
        width: width * .565,
        height: height * .35,
        marginTop: height * .04,
        marginLeft: width * .08
    },
    ssidView: {
        width: width * .565,
        height: height * .075,
        marginTop: -height * .02,
        marginLeft: -width * .05
    },
    ssid: {
        width: width * .565,
        height: height * .075,
        backgroundColor: "rgba(132,27,229,0.38)",
        borderRadius: 44,
        marginTop: -height * .001,
        marginLeft: width * .005
    },
    ssidInput: {
        fontFamily: "roboto-700",
        color: "#121212",
        height: height * .05,
        width: width * .5,
        textAlign: "center",
        fontSize: 15,
        marginLeft: width * .035,
        marginTop: height * .012
    },
    passview: {
        width: width * .565,
        height: height * .075,
        backgroundColor: "rgba(132,27,229,0.38)",
        borderRadius: 44,
        marginTop: height * .02,
        marginLeft: -width * .03,
    },
    ssidPassInput: {
        marginLeft: width * .035,
        marginTop: height * .012,
        position: "absolute",
        fontFamily: "roboto-700",
        color: "#121212",
        height: height * .05,
        width: width * .5,
        textAlign: "center",
        fontSize: 15
    },
    ssidPassStack: {
        width: width * .565,
        height: height * .075,
        marginLeft: width * .00,
        marginTop: height * .00
    },
    ssidViewColumn: {
        width: width * .55,
        height: height * .2,
        marginLeft: width * .0,
        marginTop: height * .0
    },
    saveButton2: {
        height: height * .09,
        width: width * .18,
        marginLeft: width * .01,
        marginTop: height * .14
    },
    ssidViewColumnRow: {
        height: height * .2,
        width: width * .5,
        flexDirection: "row",
        marginTop: height * .038,
        marginLeft: width * .00
    },
});
