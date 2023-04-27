import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
  TextInput,
  ImageBackground,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  height,
  width,
} from "deprecated-react-native-prop-types/DeprecatedImagePropType";
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
  const [openNote, setOpenNote] = useState(false);
  const [notepad, setNotePad] = useState(false);
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

  const json = [
    {
      day: "Monday",
      title: "Test",
      text: "lorem lore m lre r dsalkd sakdmklsa ndklsa ndksmd sad asda dsamkdsa",
    },
    {
      day: "Monday",
      title: "Test",
      text: "lorem lore m lre r dsalkd sakdmklsa ndklsa ndksmd sad asda dsamkdsa",
    },
    {
      day: "Monday",
      title: "Test",
      text: "lorem lore m lre r dsalkd sakdmklsa ndklsa ndksmd sad asda dsamkdsa",
    },
    {
      day: "Monday",
      title: "Test",
      text: "lorem lore m lre r dsalkd sakdmklsa ndklsa ndksmd sad asda dsamkdsa",
    },
    {
      day: "Monday",
      title: "Test",
      text: "lorem lore m lre r dsalkd sakdmklsa ndklsa ndksmd sad asda dsamkdsa",
    },
    {
      day: "Monday",
      title: "Test",
      text: "lorem lore m lre r dsalkd sakdmklsa ndklsa ndksmd sad asda dsamkdsa",
    },
    {
      day: "Monday",
      title: "Test",
      text: "lorem lore m lre r dsalkd sakdmklsa ndklsa ndksmd sad asda dsamkdsa",
    },
    {
      day: "Monday",
      title: "Test",
      text: "lorem lore m lre r dsalkd sakdmklsa ndklsa ndksmd sad asda dsamkdsa",
    },
  ];

  return (
    <ImageBackground resizeMode="cover" style={styles.container}>
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
        {/* <View style={styles.circleContainer}>
          <View style={styles.semiCircle1}></View>
          <View style={styles.semiCircle2}></View>
          <View style={styles.semiCircle3}></View>
          <View style={styles.outermostCircle}></View>
        </View> */}
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
        <Pressable onPress={() => setNotePad(true)} style={styles.button}>
          <Text style={styles.buttonText}>Notes</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Break</Text>
        </Pressable>
      </View>
      {notepad ? (
        <>
          <View style={styles.notesContainer}>
            {openNote ? (
              <View style={styles.note}>
                <TextInput
                  label="text"
                  leftIcon={{ type: "font-awesome", name: "lock" }}
                  onChangeText={(text) => setNoteTitle(text)}
                  value={noteTitle}
                  style={styles.noteTitle}
                  secureTextEntry={false}
                  placeholder="Title"
                />
                <Pressable
                  onPress={() => setOpenNote(false)}
                  style={{ position: "absolute", right: 10, top: 13 }}
                >
                  <Ionicons
                    name={"close"}
                    size={30}
                    color="rgba(0, 0, 0, 0.85)"
                  />
                </Pressable>
                <TextInput
                  label="text"
                  leftIcon={{ type: "font-awesome", name: "lock" }}
                  onChangeText={(text) => setNoteTitle(text)}
                  value={noteTitle}
                  multiline={true}
                  numberOfLines={4}
                  secureTextEntry={false}
                  placeholder="Text"
                  style={styles.textArea}
                />
              </View>
            ) : (
              <View style={styles.todayNotes}>
                <View style={styles.notesButtonContainer}>
                  {json.map(() => (
                    <View style={styles.addButton}></View>
                  ))}
                  <Pressable
                    onPress={() => setOpenNote(true)}
                    style={styles.addButton}
                  >
                    <Ionicons
                      name="ios-add"
                      size={35}
                      color="rgba(0, 0, 0, 0.3)"
                    />
                  </Pressable>
                </View>
                <View style={styles.closeDelete}>
                  <Pressable
                    style={[
                      styles.closeDeleteButtons,
                      {
                        borderRightColor: "rgba(0,0,0,0.4)",
                        marginVertical: 3,
                        borderRightWidth: 1,
                      },
                    ]}
                  >
                    <Text style={styles.closeDeleteButton}>Delete</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setNotePad(false)}
                    style={styles.closeDeleteButtons}
                  >
                    <Text style={styles.closeDeleteButton}>Close</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
          <View style={styles.shadow}></View>
        </>
      ) : null}
    </ImageBackground>
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
      backgroundColor: "rgba(255,255,255,1)",
      borderRadius: timerWidth / 2,
      justifyContent: "center",
      alignItems: "center",
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
      height: 150,

      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 35,
      fontWeight: 500,
      color: "black",
    },
    notesContainer: {
      position: "absolute",
      top: 170,
      alignSelf: "center",
      borderRadius: 10,
      width: 350,
      backgroundColor: "rgb(250,250,250)",
      height: 350,
      flex: 10,
      zIndex: 1,
    },
    note: {
      width: "100%",
      height: "100%",
      flex: 10,
    },
    noteTitle: {
      borderColor: "rgba(0, 0, 0, 0.18)",
      padding: 10,
      paddingTop: 15,
      paddingBottom: 10,
      fontSize: 25,
      fontWeight: "500",
      zIndex: 0,
      flex: 1,
    },
    textArea: {
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.05)",
      flex: 9,
      padding: 10,
    },
    shadow: {
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.4)",
      position: "absolute",
      zIndex: 0,
    },
    todayNotes: {
      flex: 10,
    },
    notesButtonContainer: {
      flex: 9,
      flexDirection: "row",
      flexWrap: "wrap",
      columnGap: 20,
      alignSelf: "center",
      paddingTop: 6,
      margin: "auto",
      paddingLeft: 25,
    },
    addButton: {
      width: 60,
      height: 60,
      backgroundColor: "rgb(235,235,235)",
      marginTop: 20,
      borderRadius: 5,
      marginRight: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    closeDelete: {
      flex: 1,
      backgroundColor: "rgb(235,235,235)",
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      flexDirection: "row",
    },
    closeDeleteButtons: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    closeDeleteButton: {
      color: "rgba(0,0,0,0.6)",
    },
    circleContainer: {
      width: 200,
      height: 200,
      backgroundColor: "white",
      borderRadius: "100%",
      position: "absolute",
      zIndex: 1,
      top: 200,
      justifyContent: "center",
      overflow: "hidden",
    },
    semiCircle1: {
      width: "50%",
      height: "100%",
      position: "absolute",
      top: 0,
      zIndex: 2,
      backgroundColor: "red",
    },
    semiCircle2: {
      width: "50%",
      height: "100%",
      position: "absolute",
      top: 0,
      zIndex: 3,
      backgroundColor: "blue",
    },
    semiCircle3: {
      width: "50%",
      height: "100%",
      position: "absolute",
      top: 0,
      zIndex: 4,
      backgroundColor: "white",
      display: "none",
    },
    outermostCircle: {
      width: 195,
      height: 195,
      backgroundColor: "black",
      borderRadius: "100%",
      zIndex: 5,
    },
  });
