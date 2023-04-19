import { useState } from "react";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Slider from "react-native-slider";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Switch, Button } from "react-native-paper";

const Greeting = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [settingContainer, setSettingContainer] = useState(false);
  const [keepTime, setKeepTime] = useState(0);
  let minute = keepTime % 60;
  let hour = keepTime / 60;
  const [time, SetTime] = useState({
    hours: 0,
    hour: 0,
    divider: ":",
    mins: 0,
    min: 0,
  });

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const styles = getStyles();
  const dayColor = [
    ["MONDAY", "#00539CFF"],
    ["TUESDAY", "#EEA47FFF"],
    ["THURSDAY", "#8AAAE5"],
    ["WEDENSDAY", "#317773"],
    ["FRIDAY", "#CBD18F"],
    ["SATURDAY", "#EA738DFF"],
    ["SUNDAY", "brown"],
  ];
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  //Time Uptader
  const handleConfirm = (date) => {
    console.log(
      "A date has been picked: ",
      SetTime({
        hours: date.toString().slice(16, 17),
        hour: date.toString().slice(17, 18),
        divider: ":",
        mins: date.toString().slice(19, 20),
        min: date.toString().slice(20, 21),
      })
    );
    hideDatePicker();
    console.log(time);
  };

  //Slider

  //   class SliderExample extends React.Component {
  //     state = {
  //       value: 0,
  //     };

  //     render() {
  //       let minute = this.state.value % 60;
  //       let hour = this.state.value / 60;
  //       return (
  //         <View style={{ marginLeft: 45, marginRight: 45 }}>
  //           <Slider
  //             step={15}
  //             minimumValue={0}
  //             maximumValue={1440}
  //             value={this.state.value}
  //             onValueChange={(value) => this.setState({ value })}
  //           />
  //           <Text
  //             style={{
  //               alignSelf: "center",
  //               fontWeight: 600,
  //               fontSize: 18,
  //               margin: 10,
  //               marginBottom: 0,
  //             }}
  //           >
  //             Time: {hour >= 1 ? <Text>{parseInt(hour)} hrs</Text> : null}{" "}
  //             {minute} min
  //           </Text>
  //         </View>
  //       );
  //     }
  //   }

  //Day Component
  const DailyPlanner = ({ day, index }) => {
    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor: `${dayColor[index][1]}`,
          },
          styles.dailyPlannerContainer,
        ]}
        onPress={() => setSettingContainer(true)}
      >
        <Text style={styles.dayText}>{day[0]}</Text>
        <Text style={styles.daySmallText}>Not Scheduled</Text>
        <FontAwesome
          name="gear"
          style={styles.dailyIcon}
          size={25}
          color="white"
        />
      </TouchableOpacity>
    );
  };

  //DailyPlannerSettings Component

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Study Planner</Text>
      <View style={styles.dailycontainer}>
        {dayColor.map((day, key) => (
          <DailyPlanner day={day} index={key} />
        ))}
      </View>
      {/* Day Settings */}
      {settingContainer ? (
        <View style={styles.settings}>
          <Pressable
            onPress={() => setSettingContainer(false)}
            style={{
              backgroundColor: "white",
              marginTop: -25,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 120,
              marginRight: 120,
              height: 60,
              borderRadius: "50%",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 500 }}>MONDAY</Text>
          </Pressable>
          <View style={{ marginLeft: 45, marginRight: 45 }}>
            <Slider
              step={15}
              minimumValue={0}
              maximumValue={720}
              value={keepTime}
              onValueChange={(value) => {
                setKeepTime(value);
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                fontWeight: 600,
                fontSize: 18,
                margin: 10,
                marginBottom: 0,
              }}
            >
              Time: {hour >= 1 ? <Text>{parseInt(hour)} hrs</Text> : null}{" "}
              {minute} min
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.autoBreaks}>
              <Switch
                value={isSwitchOn}
                style={{ margin: 10 }}
                onValueChange={onToggleSwitch}
              />
              <Text style={{ fontWeight: 500, fontSize: 16 }}>
                Automatically Insert Breaks
              </Text>
            </TouchableOpacity>
            <Pressable onPress={showDatePicker}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  alignSelf: "center",
                  color: "rgba(97, 176, 255, 1)",
                }}
              >
                {" "}
                Pick a Time
              </Text>
            </Pressable>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Pressable onPress={showDatePicker} style={styles.timer}>
              <View style={styles.time}>
                <Text style={styles.digits}>{time.hours}</Text>
              </View>
              <View style={styles.time}>
                <Text style={styles.digits}>{time.hour}</Text>
              </View>
              <Text
                style={[
                  styles.digits,
                  {
                    color: "black",
                    marginTop: 20,
                    margin: 1,
                  },
                ]}
              >
                {time.divider}
              </Text>
              <View style={styles.time}>
                <Text style={styles.digits}>{time.mins}</Text>
              </View>
              <View style={styles.time}>
                <Text style={styles.digits}>{time.min}</Text>
              </View>
            </Pressable>
          </View>

          <Button
            style={{
              margin: 5,
              marginRight: 150,
              marginLeft: 150,
              borderRadius: 5,
              backgroundColor: "rgba(0,0,0,0.03)",
            }}
            labelStyle={{ color: "black" }}
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            SAVE
          </Button>
        </View>
      ) : null}
      {settingContainer ? <View style={styles.shadow}></View> : null}
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
      width: "100%",
      marginBottom: 10,
      flex: 1,
      position: "relative",
    },
    dailycontainer: {
      width: "100%",
      height: "100%",
      marginTop: 60,
      flex: 1,
      marginBottom: 60,
    },
    dailyPlannerContainer: {
      borderRadius: 10,
      margin: 5,
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      position: "relative",
    },
    text: {
      fontSize: 40,
    },
    dayText: {
      fontSize: 37,
      margin: 20,
      color: "white",
    },
    daySmallText: {
      color: "white",
      position: "absolute",
      right: 50,
    },
    dailyIcon: {
      position: "absolute",
      right: 15,
    },
    settings: {
      height: 500,
      width: "100%",
      position: "absolute",
      backgroundColor: "white",
      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
      bottom: 0,
      zIndex: 2,
    },
    shadow: {
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.8)",
      zIndex: 1,
    },
    autoBreaks: {
      alignItems: "center",
      backgroundColor: "rgba(148, 228, 255, 0.72)",
      justifyContent: "center",
      marginLeft: 45,
      marginRight: 45,
      margin: 30,
      borderRadius: 10,
      shadowColor: "#000",
      flexDirection: "row",
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 1.4,
      height: 55,
    },
    timer: {
      height: 140,
      flexDirection: "row",
      margin: 10,
      marginTop: 30,
    },
    time: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.06)",
      borderRadius: "20",
      margin: 6,

      justifyContent: "center",
      alignItems: "center",
    },
    digits: {
      color: "black",
      fontSize: 70,
    },
  });

export default Greeting;
