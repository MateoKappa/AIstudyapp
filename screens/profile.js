import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
  TextInput,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Timer({ navigation }) {
  const timerWidth = (Dimensions.get("window").width * 65) / 100;
  const notesWidth = (Dimensions.get("window").width * 90) / 100;
  const styles = getStyles(timerWidth, notesWidth);
  const [counter, setCounter] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [mins, setMins] = useState(0);
  const [hours, setHours] = useState(0);
  const [date, setDate] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const getDate = new Date();
  const day = getDate.getDay();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  //Timer CountDown
  const countDown = () => {
    const timer = setTimeout(() => setCounter(counter - 1), 1000);
    {
      !timerOn ? clearTimeout(timer) : null;
    }
    if (counter == 0 && (hours > 0 || mins > 0)) {
      clearTimeout(timer);
      setCounter(59);
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
    AsyncStorage.setItem(
      dayNames[day]?.toUpperCase().toString(),
      JSON.stringify({
        min: (hours * 60 + mins).toString(),
        seconds: counter.toString(),
      })
    );
  };

  useEffect(() => {
    {
      timerOn ? countDown() : null;
    }
  }, [counter, timerOn]);

  // local storage getDailyStorageData

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const getDailyStorageData = async () => {
          try {
            const dayTime = await AsyncStorage.getItem(
              dayNames[day]?.toUpperCase()
            );
            let objectValue = JSON.parse(dayTime);
            setDate(dayNames[day]?.toUpperCase());
            setHours(Number(parseInt(objectValue.min / 60)));
            setMins(Number(objectValue.min) % 60);
            setCounter(Number(objectValue.seconds));
          } catch (error) {
            console.log(error);
          }
        };
        getDailyStorageData();
      })();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.dayBorder}>
        <Text style={styles.day}>{date}</Text>
      </View>

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
        <View style={styles.startStopContainer}>
          <Pressable
            onPress={() => setTimerOn(!timerOn)}
            style={[styles.startStop, !timerOn ? { paddingLeft: 5 } : null]}
          >
            <FontAwesome5
              name={!timerOn ? "play" : "pause"}
              size={28}
              color="rgba(0, 0, 0, 0.85)"
            />
          </Pressable>
        </View>
      </Pressable>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Notes</Text>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Break</Text>
        </View>
      </View>
      {/* <View style={styles.notes}>
        <TextInput
          label="text"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setNoteTitle(text.toUpperCase())}
          value={noteTitled}
          style={styles.noteTitle}
          secureTextEntry={false}
        />
      </View> */}
    </View>
  );
}

const getStyles = (timerWidth, notesWidth) =>
  StyleSheet.create({
    container: {
      backgroundColor: "rgba(255,255,255,1)",
      flex: 1,
    },
    dayBorder: {
      width: "100%",
      backgroundColor: "white",
      color: "white",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      flex: 1,
    },
    day: {
      paddingTop: 30,
      fontSize: 40,
      color: "black",
    },
    timerContainer: {
      flex: 4,
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
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.5,
      shadowRadius: 1.5,
    },
    countDown: {
      fontSize: 47,
      fontWeight: 600,
      color: "rgba(0,0,0,0.85)",
    },
    startStopContainer: {
      height: 70,
      marginTop: 40,
      justifyContent: "center",
    },
    startStop: {
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.5,
      shadowRadius: 1.5,
      backgroundColor: "white",
      height: 70,
      width: 70,
      borderRadius: 70 / 2,
      justifyContent: "center",
      alignItems: "center",
    },
    buttons: {
      flex: 1.8,
      gap: 20,
      marginHorizontal: 30,
      marginBottom: 10,
      flexDirection: "row",
    },
    button: {
      flex: 1,
      backgroundColor: "white",
      borderRadius: 20,
      shadowColor: "#000",
      height: 150,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.25,
      justifyContent: "center",
      alignItems: "center",
      shadowRadius: 3,
    },
    buttonText: {
      fontSize: 35,
      fontWeight: 500,
      color: "black",
    },
    notes: {
      position: "absolute",
      top: (Dimensions.get("window").width * 50) / 100,
      left: (Dimensions.get("window").width * 5) / 100,
      borderRadius: 10,
      borderColor: "black",
      borderWidth: 1,
      width: notesWidth,
      backgroundColor: "white",
      height: notesWidth,
    },
    noteTitle: {
      borderBottomWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.28)",
      padding: 10,
      marginHorizontal: 20,
      paddingTop: 17,
      paddingBottom: 17,
      fontSize: 30,
      textAlign: "center",
      fontWeight: "500",
    },
  });
