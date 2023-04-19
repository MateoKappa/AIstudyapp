import { useState } from "react";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "react-native-slider";
import { FontAwesome } from "@expo/vector-icons";
const Greeting = () => {
  const styles = getStyles();
  const [otieinai2, otieinai] = useState();
  const dayColor = [
    ["MONDAY", "#00539CFF"],
    ["TUESDAY", "#EEA47FFF"],
    ["THURSDAY", "#8AAAE5"],
    ["WEDENSDAY", "#317773"],
    ["FRIDAY", "#CBD18F"],
    ["SATURDAY", "#EA738DFF"],
    ["SUNDAY", "brown"],
  ];
  console.log();
  const DailyPlanner = ({ day, index }) => {
    console.log(index);
    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor: `${dayColor[index][1]}`,
          },
          styles.dailyPlannerContainer,
        ]}
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

  const DailyPlannerSettings = () => {
    return (
      <View style={styles.settings}>
        <SliderExample />
      </View>
    );
  };
  class SliderExample extends React.Component {
    state = {
      value: 0,
    };

    render() {
      let minute = this.state.value % 60;
      let hour = this.state.value / 60;
      return (
        <View style={{ margin: 30 }}>
          <Slider
            step={15}
            minimumValue={0}
            maximumValue={1440}
            value={this.state.value}
            onValueChange={(value) => this.setState({ value })}
          />
          <Text>
            Value: {parseInt(hour)} {minute}
          </Text>
        </View>
      );
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Study Planner</Text>
      <View style={styles.dailycontainer}>
        {dayColor.map((day, key) => (
          <DailyPlanner day={day} index={key} />
        ))}
      </View>
      <DailyPlannerSettings />
      {/* <View style={styles.shadow}></View> */}
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
  });

export default Greeting;
