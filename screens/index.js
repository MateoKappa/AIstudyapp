import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  Alert,
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
export default function Index({ navigation }) {
  const [email, setEmail] = useState("");
  const [heightBar, setHeightBar] = useState(20);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [signInCondition, setSignInCondition] = useState(false);
  const daysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const supabaseUrl = "https://mwcxgupdugvwdbbhxwbp.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Y3hndXBkdWd2d2RiYmh4d2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0NzU4OTYsImV4cCI6MTk5NzA1MTg5Nn0.tGzHnvCtJi0yB0qQXteiBBfFL1TOfv0i1OIAw9oRKOA";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const styles = getStyles(heightBar);
  // SignIn Method
  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    else {
      AsyncStorage.setItem("loggedIn", "true");
      setSignInCondition(true);
    }

    setLoading(false);
  }
  // SignUp Method
  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  //localStorage LoggedIN Check
  useEffect(() => {
    (async () => {
      async function getData() {
        try {
          const value = await AsyncStorage.getItem("loggedIn");
          if (value == "true") {
            setSignInCondition(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    })();
  }, []);

  return (
    <View style={styles.container}>
      {!signInCondition ? (
        //Login/SignUp

        <View style={styles.signInPage}>
          <ImageBackground
            source={require("../assets/schoolBg2.jpeg")}
            resizeMode="cover"
            style={styles.imageBackground}
          >
            <Text style={styles.imageBackgroundText}>
              Sign in to your{"\n"}account{" "}
            </Text>
            <Text style={styles.imageBackgroundSmallText}>or Sign Up! </Text>
          </ImageBackground>
          <View style={styles.singin}>
            {/* <Button
              title={signUp ? "Login" : "SignUp"}
              onPress={() => setSignUp(!signUp)}
            /> */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}> Email</Text>
              <TextInput
                label="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="email@address.com"
                autoCapitalize={"none"}
                style={styles.signInInput}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}> Password</Text>
              <TextInput
                label="Password"
                leftIcon={{ type: "font-awesome", name: "lock" }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                style={styles.signInInput}
                secureTextEntry={true}
                placeholder="Password"
                autoCapitalize={"none"}
              />
            </View>
            <Text
              style={{
                alignSelf: "flex-end",
                marginRight: 20,
                margin: 10,
                marginTop: 0,
                fontWeight: 500,
              }}
            >
              Forgot Password?
            </Text>
            {signUp ? (
              <TextInput
                label="Password"
                leftIcon={{ type: "font-awesome", name: "lock" }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                placeholder="Password"
                autoCapitalize={"none"}
              />
            ) : (
              <TouchableOpacity
                onPress={() => signInWithEmail()}
                style={styles.signInButton}
              >
                <Text
                  style={{ fontSize: 20, alignSelf: "center", color: "white" }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            )}
            <View style={styles.orLoginWith}>
              <Text
                style={{
                  position: "absolute",
                  zIndex: 1,
                  backgroundColor: "white",
                  padding: 20,
                }}
              >
                Or login with
              </Text>
            </View>
            <View style={styles.socials}>
              <View style={styles.social}>
                <Image
                  style={{
                    objectFit: "contain",
                    width: 18,
                    height: 18,
                    marginRight: 3,
                  }}
                  source={require("../assets/google.png")}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: "rgba(0, 0, 0, 0.42)",
                    fontWeight: 600,
                  }}
                >
                  Google
                </Text>
              </View>
              <View style={styles.social}>
                <Image
                  style={{
                    objectFit: "contain",
                    width: 24,
                    height: 24,
                    marginRight: 3,
                  }}
                  source={require("../assets/facebook.png")}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: "rgba(0, 0, 0, 0.42)",
                    fontWeight: 600,
                  }}
                >
                  Facebook
                </Text>
              </View>
            </View>
            <View style={styles.register}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => signInWithEmail()}>
                <Text
                  style={{ color: "rgba(57, 177, 85, 1)", fontWeight: 500 }}
                >
                  {" "}
                  Register
                </Text>
              </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
          </View>
        </View>
      ) : (
        <View style={styles.homeUI}>
          <LinearGradient
            // Button Linear Gradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={styles.profileContainer}
            locations={[0, 0.2, 1]}
            start={{ x: 0.2, y: 0.1 }}
          >
            {/* Welcome */}
            <Text
              style={{
                margin: 30,
                marginTop: 50,
                marginBottom: -3,
                fontSize: 30,
                color: "white",
              }}
            >
              Hello,
            </Text>
            <Text
              style={{
                marginLeft: 30,
                fontSize: 20,
                color: "white",
              }}
            >
              Welcome back
            </Text>
            {/* profile  */}
            <View
              style={{
                width: 45,
                height: 45,
                backgroundColor: "white",
                borderRadius: "50%",
                position: "absolute",
                right: 30,
                top: 65,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="user" size={25} color="rgba(0, 0, 0, 0.75)" />
            </View>
            {/* progress bar  */}
            <View style={styles.progressBar}>
              {daysList.map((day, key) => (
                <View key={key} style={styles.progressContainer}>
                  <Text style={styles.progressText}>{day}</Text>
                  <View style={styles.progressDay}>
                    <View style={styles.progressFill}></View>
                  </View>
                </View>
              ))}
            </View>
          </LinearGradient>
          <Text
            style={{
              fontSize: 25,
              color: "black",
              marginTop: 15,
              marginLeft: 20,
            }}
          >
            Features
          </Text>
          <View style={styles.general}>
            <View style={styles.features}>
              <TouchableOpacity
                onPress={() => navigation.navigate("studyPlanner")}
                style={styles.feature}
              >
                <Image
                  style={{
                    height: "80%",
                    position: "absolute",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  source={require("../assets/studyPlanner.png")}
                />
                <Text style={styles.textFeature}>STUDY PLANNER</Text>
              </TouchableOpacity>
              <View style={styles.feature}>
                <Image
                  style={{
                    height: "80%",
                    position: "absolute",
                    width: "80%",
                    objectFit: "contain",
                  }}
                  source={require("../assets/timer.png")}
                />
                <Text style={styles.textFeature}>STUDY TIMER</Text>
              </View>
            </View>
            <View style={styles.features}>
              <View style={styles.feature}>
                <Image
                  style={{
                    height: "95%",
                    position: "absolute",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  source={require("../assets/AIbot.png")}
                />
                <Text style={styles.textFeature}> AI QUESTIONS</Text>
              </View>
              <View style={styles.feature}>
                <Image
                  style={{
                    height: "90%",
                    position: "absolute",
                    width: "80%",
                    objectFit: "contain",
                  }}
                  source={require("../assets/forum.png")}
                />
                <Text style={styles.textFeature}>FORUM QUESTIONS</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const getStyles = (heightBar) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
    },
    signInPage: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      backgroundColor: "white",
    },
    imageBackground: {
      width: "100%",
      height: "100%",
      flex: 1.1,
      marginBottom: 30,
      justifyContent: "center",
    },
    imageBackgroundText: {
      color: "white",
      fontSize: 38,
      fontWeight: 600,
      margin: 20,
      marginTop: 0,
      marginBottom: 0,
    },
    imageBackgroundSmallText: {
      fontSize: 20,
      marginLeft: 24,
      marginTop: 5,
      color: "white",
    },
    singin: {
      flex: 2.5,
      backgroundColor: "white",
    },
    inputContainer: {
      margin: 25,
      marginLeft: 20,
      marginRight: 20,
      position: "relative",
    },
    inputText: {
      position: "absolute",
      top: -10,
      zIndex: 1,
      left: 2,
      paddingLeft: 2,
      paddingRight: 6,
      backgroundColor: "white",
      color: "rgba(0, 0, 0, 0.45)",
    },
    signInInput: {
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.28)",
      borderRadius: 4,
      padding: 10,
      paddingTop: 17,
      paddingBottom: 17,
    },
    signInButton: {
      borderRadius: 4,
      padding: 10,
      paddingTop: 17,
      paddingBottom: 17,
      margin: 20,
      backgroundColor: "rgba(147, 220, 164, 1)",
    },
    orLoginWith: {
      height: 1.5,
      margin: 25,
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
    socials: {
      flexDirection: "row",
      gap: 20,
      flex: 0.35,
      margin: 30,
      justifyContent: "center",
    },
    social: {
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.12)",
      backgroundColor: "white",
      flex: 0.5,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    register: {
      flexDirection: "row",
      justifyContent: "center",
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 40,
    },
    homeUI: {
      height: "100%",
      width: "100%",
      flexDirection: "column",
    },
    profileContainer: {
      flex: 2,
      position: "relative",
      backgroundColor: "#7554F6",
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,
      width: "100%",
      height: "100%",
    },
    progressBar: {
      position: "absolute",
      flexDirection: "row",
      bottom: 20,
      width: "100%",
      height: "30%",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      gap: 10,
    },
    progressContainer: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    progressDay: {
      borderRadius: 5,
      width: 20,
      height: 30,
      backgroundColor: "white",
      marginTop: 3,
      transform: [{ rotate: "180deg" }],
    },
    progressFill: {
      backgroundColor: "rgba(40, 233, 100, 0.81)",
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      borderBottomLeftRadius: heightBar == 100 ? 4 : 0,
      borderBottomRightRadius: heightBar == 100 ? 4 : 0,
      height: `${heightBar}%`,
      width: "100%",
    },
    progressText: {
      color: "white",
    },
    profileBg: {
      height: "100%",
      width: "100%",
      position: "absolute",
    },
    general: {
      flex: 4,
      flexDirection: "column",
      marginBottom: 30,
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    features: {
      flexDirection: "row",
      gap: 20,
      margin: 10,
      flex: 2,
    },
    feature: {
      borderRadius: 20,
      backgroundColor: "white",
      flex: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.41,
      elevation: 2,
      position: "relative",
      height: "100%",
      width: "100%",
      alignItems: "center",
    },
    textFeature: {
      position: "absolute",
      bottom: 0,
      fontWeight: 600,
      margin: 13,
    },
    navbar: {
      height: "100%",
      width: "100%",
      flex: 0.5,
      backgroundColor: "white",
    },
  });
