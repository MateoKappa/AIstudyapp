import Login from "./screens/Login.js";
import { Text, View } from "react-native";
import HomeScreen from "./screens/index.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import studyPlanner from "./screens/studyPlanner.js";
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          option={{ title: "welcome" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          option={{ title: "welcome" }}
        />
        <Stack.Screen
          name="studyPlanner"
          component={studyPlanner}
          option={{ title: "welcome" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
