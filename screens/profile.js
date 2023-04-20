import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
export default function Timer({}) {
  const timerWidth = (Dimensions.get("window").width * 65) / 100;
  const styles = getStyles(timerWidth);
  const [counter, setCounter] = useState(60);
  const [timerOn, setTimerOn] = useState(true);
  const [mins, setMins] = useState(5);
  const [hours, setHours] = useState(1);
  console.log(timerWidth, Dimensions.get("window").width);
  const countDown = (time) => {
    var count = time;
  };
  //Timer CountDown

  useEffect(() => {
    const timer = setTimeout(() => setCounter(counter - 1), 1000);
    {
      !timerOn ? clearTimeout(timer) : null;
    }
    if (counter == 0 && (hours > 0 || mins > 0)) {
      clearTimeout(timer);
      setCounter(59);
      console.log("in");
      if (hours > 0 && mins == 0) {
        setHours(hours - 1);
        setMins(59);
      } else {
        setMins(mins - 1);
      }
    }
    if (counter == 0 && hours == 0 && mins == 0) {
      clearTimeout(timer);
    }
  }, [counter, timerOn]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setTimerOn(!timerOn)}
        style={styles.timerContainer}
      >
        <View style={styles.timer}>
          <Text style={styles.countDown}>
            {hours < 10 ? "0" : null}
            {hours}:{mins < 10 ? "0" : null}
            {mins}:{counter < 10 ? "0" : null}
            {counter}
          </Text>
        </View>
      </Pressable>

      <View style={styles.setNotes}></View>
    </View>
  );
}

const getStyles = (timerWidth) =>
  StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
    },
    timerContainer: {
      flex: 3,
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center",
    },
    timer: {
      height: timerWidth,
      width: timerWidth,
      backgroundColor: "white",
      borderRadius: timerWidth / 2,
      justifyContent: "center",
      alignItems: "center",
    },
    countDown: {
      fontSize: 50,
      fontWeight: 600,
      color: "black",
    },
    setNotes: {
      flex: 3,
    },
  });
