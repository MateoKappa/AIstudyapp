import { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
const DailyPlannerScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [pickedDate, setPickedDate] = useState("");
  const [settingContainer, setSettingContainer] = useState(false);
  const [keepTime, setKeepTime] = useState(0);
  let minute = keepTime % 60;
  let hour = keepTime / 60;
  const [time, SetTime] = useState(["00:00"]);

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
      SetTime([date.toString().slice(16, 21)])
    );
    hideDatePicker();
  };

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
        onPress={() => {
          setSettingContainer(true), setPickedDate(day[0]);
        }}
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

  //save day settings
  const dailyTimeSaver = (day) => {
    setSettingContainer(false);
    AsyncStorage.setItem(
      day.toString(),
      JSON.stringify({ time: time.toString(), min: keepTime.toString() })
    );
  };

  // local storage getDailyStorageData
  useEffect(() => {
    (async () => {
      async function getDailyStorageData() {
        try {
          const value = await AsyncStorage.getItem(pickedDate);
          let objectValue = JSON.parse(value);
          console.log(objectValue);
        } catch (error) {
          console.log(error);
        }
      }
      getDailyStorageData();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 50, alignSelf: "center", fontSize: 35 }}>
        Study Planner
      </Text>
      <View style={styles.dailycontainer}>
        {dayColor.map((day, key) => (
          <DailyPlanner day={day} index={key} key={key} />
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
            <Text style={{ fontSize: 20, fontWeight: 500 }}>{pickedDate}</Text>
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
                <Text style={styles.digits}>{time[0][0]}</Text>
              </View>
              <View style={styles.time}>
                <Text style={styles.digits}>{time[0][1]}</Text>
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
                {time[0][2]}
              </Text>
              {console.log(time)}
              <View style={styles.time}>
                <Text style={styles.digits}>{time[0][3]}</Text>
              </View>
              <View style={styles.time}>
                <Text style={styles.digits}>{time[0][4]}</Text>
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
            onPress={() => {
              setSettingContainer(false), dailyTimeSaver(pickedDate);
            }}
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
      marginTop: 0,
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
      alignSelf: "center",
    },
    dayText: {
      fontSize: 34,
      margin: 15,
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

export default DailyPlannerScreen;
