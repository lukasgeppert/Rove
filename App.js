import * as React from "react";
// import { Platform, StatusBar, StyleSheet, View } from "react-native";
// import { SplashScreen } from "expo";
// import * as Font from "expo-font";
// import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import BottomTabNavigator from "./navigation/BottomTabNavigator";
// import useLinking from "./navigation/useLinking";
import HomeScreen from "./screens/HomeScreen";

import * as firebase from "firebase";
import LoadingScreen from "./screens/LoadingScreen";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import Login from "./screens/Login";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyA2dCdOeDp-by7fvr1gNTKr0pl_ZLikC-E",
  authDomain: "rove-96d5a.firebaseapp.com",
  databaseURL: "https://rove-96d5a.firebaseio.com",
  projectId: "rove-96d5a",
  storageBucket: "rove-96d5a.appspot.com",
  messagingSenderId: "382947731268",
  appId: "1:382947731268:web:2a332efe58420c01b45911",
  measurementId: "G-W0J1F80PRD"
};

// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{ gestureEnabled: false }}
      >
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ title: "Loading" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register" }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ title: "Chat" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       Loading: LoadingScreen,
//       Home: HomeScreen
//     },
//     {
//       initialRouteName: "Loading"
//     }
//   )
// );

// export default function App(props) {
//   const [isLoadingComplete, setLoadingComplete] = React.useState(false);
//   const [initialNavigationState, setInitialNavigationState] = React.useState();
//   const containerRef = React.useRef();
//   const { getInitialState } = useLinking(containerRef);

//   // Load any resources or data that we need prior to rendering the app
//   React.useEffect(() => {
//     async function loadResourcesAndDataAsync() {
//       try {
//         SplashScreen.preventAutoHide();

//         // Load our initial navigation state
//         setInitialNavigationState(await getInitialState());

//         // Load fonts
//         await Font.loadAsync({
//           ...Ionicons.font,
//           "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
//         });
//       } catch (e) {
//         // We might want to provide this error information to an error reporting service
//         console.warn(e);
//       } finally {
//         setLoadingComplete(true);
//         SplashScreen.hide();
//       }
//     }

//     loadResourcesAndDataAsync();
//   }, []);

//   if (!isLoadingComplete && !props.skipLoadingScreen) {
//     return null;
//   } else {
//     return (
//       <View style={styles.container}>
//         {Platform.OS === "ios" && <StatusBar barStyle="default" />}
//         <NavigationContainer
//           ref={containerRef}
//           initialState={initialNavigationState}
//         >
//           <Stack.Navigator>
//             <Stack.Screen name="Root" component={BottomTabNavigator} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff"
//   }
// });
