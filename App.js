import * as React from "react";
// import { Platform, StatusBar, StyleSheet, View } from "react-native";
// import { SplashScreen } from "expo";
// import * as Font from "expo-font";
// import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import BottomTabNavigator from "./navigation/BottomTabNavigator";
// import useLinking from "./navigation/useLinking";
// import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";

import * as firebase from "firebase";
import LoadingScreen from "./screens/LoadingScreen";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

var firebaseConfig = {
  apiKey: "AIzaSyCcmjfOQrPxE4PDJgUFTu7xcDeIZLf5MGw",
  authDomain: "rove-01.firebaseapp.com",
  databaseURL: "https://rove-01.firebaseio.com",
  projectId: "rove-01",
  storageBucket: "rove-01.appspot.com",
  messagingSenderId: "894706767214",
  appId: "1:894706767214:web:c670f1fdcd0794423b9d7f",
  measurementId: "G-S6Q98CWK8F"
};

// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

// const AppStack = createStackNavigator({
//   Home: HomeScreen
// });

// const AuthStack = createStackNavigator({
//   Login: LoginScreen,
//   Register: RegisterScreen
// });
const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ gestureEnabled: false }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ title: "Loading" }}
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
