import profile from "./screens/profile.js";
import HomeScreen from "./screens/index.js";
import { NavigationContainer } from "@react-navigation/native";
import { Text, BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import studyPlanner from "./screens/studyPlanner.js";
import AIbot from "./screens/AIbot.js";
export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            theme={{
              colors: { secondaryContainer: "rgba(69, 170, 255, 0.8)" },
            }}
            style={{ height: 85, backgroundColor: "rgba(255,255,255,1)" }}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...navigation.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({
                  focused,
                  color,
                  size: 24,
                });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;

              return label;
            }}
          />
        )}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="home" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="AIbot"
          component={AIbot}
          options={{
            tabBarLabel: "AIbot",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="cog" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="profile"
          component={profile}
          options={{
            tabBarLabel: "profile",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="cog" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="studyPlanner"
          component={studyPlanner}
          options={{
            tabBarLabel: "studyPlanner",
            tabBarIcon: ({ color, size }) => {
              return <Icon name="cog" size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
      {/* <Tab.Screen
          name="Home"
          component={HomeScreen}
          option={{ title: "welcome" }}
        />
        <Tab.Screen
          name="Login"
          component={Login}
          option={{ title: "welcome" }}
        />
        <Tab.Screen
          name="studyPlanner"
          component={studyPlanner}
          option={{ title: "welcome" }}
        /> */}
      {/* </Tab.Navigator> */}
    </NavigationContainer>
  );
}
