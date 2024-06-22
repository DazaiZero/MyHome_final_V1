import React, { Component, useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Switch,
  Text,
  Dimensions,
} from "react-native";
import Slider from '@react-native-community/slider';
import { AuthContext } from '../bscontext';
const { height, width } = Dimensions.get('screen');

function Controller({ style, ws, item, socket }) {

  const bsAuth = useContext(AuthContext);
  const [FS, setFS] = useState("OFF");
  const [FState, setFState] = useState(1);
  const [FState_prev, setFStatePrev] = useState(true);
  const [S1, setS1] = useState("OFF");
  const [S1State, setS1State] = useState(1);
  const [S1Name, setS1Name] = useState(item.item.s1);
  const [S1State_prev, setS1StatePrev] = useState(true);
  const [S2, setS2] = useState("OFF");
  const [S2State, setS2State] = useState(1);
  const [S2Name, setS2Name] = useState(item.item.s2);
  const [S2State_prev, setS2StatePrev] = useState(true);
  const [S3, setS3] = useState("OFF");
  const [S3State, setS3State] = useState(1);
  const [S3Name, setS3Name] = useState(item.item.s3);
  const [S3State_prev, setS3StatePrev] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [FSpeed, setFSpeed] = useState(0);
  const [WakeControl, setControl] = useState(0);
  const control = { Op: 3, auth: bsAuth.UserToken, bssid: item.item.bssid, type: 0, Fan: FState, Light: S1State, Switch1: S2State, Switch2: S3State, FanSpeed: FSpeed };

  ws.onmessage = (e) => {
    console.log("from Controller");
    console.log(e.data);
    var data = JSON.parse(e.data);
    let Op = data.Op;
    var bstate = e.data.bstate;
    if (bstate) {
      if(data.bstate)
        bstate = data.bstate;
      if (bstate == 1) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    }

    if (Op == 3) {
      console.log("got in 3");
      if (data.FanSpeed >= 0) {
        setFSpeed(data.FanSpeed);
        setFS("ON");
        setFState(0);
        control.Fan = 0;
        control.FanSpeed = data.FanSpeed;
        setFStatePrev(false);
        setControl(0);
      } else {
        setFSpeed(data.FanSpeed);
        setFS("OFF");
        setFState(1);
        control.Fan = 1;
        control.FanSpeed = data.FanSpeed;
        setFStatePrev(true);
        setControl(1);
      }
      if (data.Fan == 0) {
        setFSpeed(1);
        setFS("ON");
        setFState(0);
        control.Fan = 0;
        control.FanSpeed = data.FanSpeed;
        setFStatePrev(false);
        setControl(0);
      } else {
        setFSpeed(0);
        setFS("OFF");
        setFState(1);
        control.Fan = 1;
        control.FanSpeed = data.FanSpeed;
        setFStatePrev(true);
        setControl(1);
      }
      if (data.Light == 0) {
        setS1("ON");
        setS1State(0);
        control.Light = 0;
        setS1StatePrev(false);
        setControl(0);
      } else {
        setS1("OFF");
        setS1State(1);
        control.Light = 1;
        setS1StatePrev(true);
        setControl(1);
      }
      if (data.Switch1 == 0) {
        setS2("ON");
        setS2State(0);
        control.Switch1 = 0;
        setS2StatePrev(false);
        setControl(0);
      } else {
        setS2("OFF");
        setS2State(1);
        control.Switch1 = 1;
        setS2StatePrev(true);
        setControl(1);
      }
      if (data.Switch2 == 0) {
        setS3("ON");
        setS3State(0);
        control.Switch2 = 0;
        setS3StatePrev(false);
        setControl(0);
      } else {
        setS3("OFF");
        setS3State(1);
        control.Switch2 = 1;
        setS3StatePrev(true);
        setControl(1);
      }
    }

  };

  useEffect(() => {
    if (FState == 1){
      control.Fan = 1;
      control.FanSpeed = 0;
    }
    else{
      control.Fan = 0;
      control.FanSpeed = 1;
    }
  }, [FState]);
  useEffect(() => {
    if (S2State)
      control.Switch1 = 1;
    else
      control.Switch1 = 0;
  }, [S2State]);
  useEffect(() => {
    if (S3State)
      control.Switch2 = 1;
    else
      control.Switch2 = 0;
  }, [S3State]);
  useEffect(() => {
    if (S1State)
      control.Light = 1;
    else
      control.Light = 0;
  }, [S1State]);

  useEffect(() => {
    if(FSpeed == 0){
      console.log("sd 0");
      console.log(FSpeed);
      control.FanSpeed = FSpeed;
      control.Fan = 1;
      setFState(1);
      setFStatePrev(true);
      sendControl();
    }
    if (FSpeed > 0){
      console.log("sd");
      console.log(FSpeed);
      control.FanSpeed = FSpeed;
      control.Fan = 0;
      setFState(0);
      setFStatePrev(false);
      sendControl();
    }
  }, [FSpeed]);


  const sendControl = () => {
    console.log(socket);
    if (socket) {
      console.log(JSON.stringify(control));
      ws.send(JSON.stringify(control));
    }
  }

  useEffect(() => {

  }, [WakeControl]);


  return (
    <View style={[styles.container, style]}>
      <View style={styles.card}>
        <View style={styles.fanTouchStackStack}>
          <View style={styles.fanTouchStack}>
            <TouchableOpacity style={styles.fanTouch} onPress={() => {
              if (FState_prev) {
                setFS("ON");
                setFState(0);
                control.Fan = 0;
                if(FSpeed == 0){
                  setFSpeed(1);
                }else{
                  setFSpeed(FSpeed);
                }
                setFStatePrev(false);
                setControl(0);
              } else {
                setFS("OFF");
                setFState(1);
                control.Fan = 1;
                control.FanSpeed = 0;
                setFStatePrev(true);
                setControl(1);
                setFSpeed(0);
              }
            }}>
              <Switch
                disabled={true}
                value={FState ? false : true}
                thumbColor={FState ? "#3F51B5" : "#FFF"}
                trackColor={{ true: "rgba(63,81,181,0.6)", false: "#9E9E9E" }}
                style={styles.fanSwitch}>
              </Switch>
              <Text style={styles.fan}>Fan</Text>
            </TouchableOpacity>
            <Slider
              step={1}
              value={FSpeed}
              onValueChange={(value) => {
                setFSpeed(value);
                
              }}
              minimumTrackTintColor="rgba(255,255,255,1)"
              maximumTrackTintColor="rgba(80,227,194,1)"
              thumbTintColor='rgb(252, 228, 149)'
              maximumValue={4}
              style={styles.slider}
            ></Slider>
            <Text style={styles.fanSpeedText}>{FSpeed}</Text>
          </View>
          <TouchableOpacity style={styles.button1} onPress={() => {
            if (S1State_prev) {
              setS1("ON");
              setS1State(0);
              control.Light = 0;
              setS1StatePrev(false);
              setControl(0);
            } else {
              setS1("OFF");
              setS1State(1);
              control.Light = 1;
              setS1StatePrev(true);
              setControl(1);
            }
            sendControl();
          }}>
            <Switch
              disabled={true}
              value={S1State ? false : true}
              thumbColor={S1State ? "#3F51B5" : "#FFF"}
              trackColor={{ true: "rgba(63,81,181,0.6)", false: "#9E9E9E" }}
              style={styles.switch1Switch}></Switch>
            <Text style={styles.switch1}>{S1Name}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button2Row}>
          <TouchableOpacity style={styles.button2} onPress={() => {
            if (S2State_prev) {
              setS2("ON");
              setS2State(0);
              control.Switch1 = 0;
              setS2StatePrev(false);
              setControl(0);
            } else {
              setS2("OFF");
              setS2State(1);
              control.Switch1 = 1;
              setS2StatePrev(true);
              setControl(1);
            }
            sendControl();
          }}>
            <Switch
              disabled={true}
              value={S2State ? false : true}
              thumbColor={S2State ? "#3F51B5" : "#FFF"}
              trackColor={{ true: "rgba(63,81,181,0.6)", false: "#9E9E9E" }}
              style={styles.switch2Switch}></Switch>
            <Text style={styles.switch2}>{S2Name}</Text>
          </TouchableOpacity>
          <View style={styles.button3Stack}>
            <TouchableOpacity style={styles.button3} onPress={() => {
              if (S3State_prev) {
                setS3("ON");
                setS3State(0);
                control.Switch2 = 0;
                setS3StatePrev(false);
                setControl(0);
              } else {
                setS3("OFF");
                setS3State(1);
                control.Switch2 = 1;
                setS3StatePrev(true);
                setControl(1);
              }
              sendControl();
            }}>
              <Switch
                disabled={true}
                value={S3State ? false : true}
                thumbColor={S3State ? "#3F51B5" : "#FFF"}
                trackColor={{ true: "rgba(63,81,181,0.6)", false: "#9E9E9E" }}
                style={styles.switch3Switich}></Switch>
              <Text style={styles.switch3}>{S3Name}</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
  },
  fanSpeedText: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    width: width * .34,
    height: height * .04,
    textAlign: "center",
    top: height * .12,
    left: width * .242,
  },
  card: {
    width: width * .855,
    height: height * .31,
    backgroundColor: "rgba(144,19,254,0.18)",
    borderRadius: 41,
    transform: [
      {
        rotate: "00deg"
      }
    ],
    alignContent: 'center',
    position: 'absolute',
  },
  fanTouch: {
    width: width * .34,
    height: height * .138,
    left: width * .001,
    top: -height * .0,
    borderRadius: 39,
    backgroundColor: "rgba(240,137,137,0.66)",
  },
  fanSwitch: {
    transform: [
      {
        rotate: "-90.00deg"
      }
    ],
    opacity: 0.75,
    top: height * .08,
    left: width * .08
  },
  fan: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    width: width * .34,
    height: height * .04,
    textAlign: "center",
    top: height * .04,
    left: width * .0,
  },
  slider: {
    position: "absolute",
    top: height * .12,
    left: width * .161,
    height: height * .05,
    width: width * .5,
    transform: [
      {
        rotate: "-90.00deg"
      }
    ]
  },
  fanTouchStack: {
    width: width * .82,
    height: height * .14,
    position: "absolute"
  },
  button1: {
    width: width * .34,
    height: height * .138,
    borderRadius: 39,
    top: -height * .0,
    left: width * .485,
    backgroundColor: "rgba(189,16,224,0.64)",
  },
  switch1Switch: {
    transform: [
      {
        rotate: "-90.00deg"
      }
    ],
    opacity: 0.75,
    top: height * .08,
    left: width * .08
  },
  switch1: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    width: width * .34,
    height: height * .04,
    textAlign: "center",
    top: height * .04,
    left: width * .0
  },
  fanTouchStackStack: {
    width: width * .825,
    height: height * .16,
    top: height * .01,
    left: width * .0155,
    //backgroundColor:'red',
  },
  button2: {
    width: width * .34,
    height: height * .138,
    left: width * .001,
    top: -height * .01,
    backgroundColor: "rgba(152,234,202,1)",
    borderRadius: 39
  },
  switch2Switch: {
    transform: [
      {
        rotate: "-90.00deg"
      }
    ],
    opacity: 0.75,
    top: height * .08,
    left: width * .08
  },
  switch2: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    width: width * .34,
    height: height * .04,
    textAlign: "center",
    top: height * .04,
    left: width * .0,
  },
  button3: {
    width: width * .34,
    height: height * .138,
    top: -height * .01,
    left: width * .0,
    backgroundColor: "rgba(190,127,73,1)",
    borderRadius: 39
  },
  switch3Switich: {
    transform: [
      {
        rotate: "-90.00deg"
      }
    ],
    opacity: 0.75,
    top: height * .08,
    left: width * .08
  },
  switch3: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    width: width * .34,
    height: height * .04,
    textAlign: "center",
    top: height * .04,
    left: width * .0,
  },
  button3Stack: {
    width: width * .34,
    height: height * .138,
    left: width * .14,
    top: height * .0,
    //backgroundColor:'red'
  },
  button2Row: {
    width: width * .82,
    height: height * .138,
    top: height * .01,
    left: width * .02,
    //backgroundColor:'red',
    flexDirection: "row",
  }
});

export default Controller;
