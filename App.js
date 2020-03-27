import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import Fire from "./Firebase";
// import LoadingScreen from "./screens/LoadingScreen";
import ChatScreen from "./screens/ChatScreen";
import ChatRoom from "./screens/ChatRoom";

// import LoginScreen from "./screens/LoginScreen";
import Login from "./screens/Login";
import RegisterScreen from "./screens/RegisterScreen";
import Discover from "./screens/Discover";
import Profile from "./screens/Profile";
import Details from "./screens/Details";
import Search from "./screens/Search";
import PostScreen from "./screens/PostScreen";
import NotificationScreen from "./screens/NotificationScreen";
import HomeScreen from "./screens/HomeScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "./screens/AuthContext";
import * as firebase from "firebase";
import { useState, useEffect } from "react";
//redux imports
import { Provider } from "react-redux";
import { setUser } from "./store/user";
import store from "./store/index";

import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const DiscoverStack = createStackNavigator();
const ChatStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const PostStack = createStackNavigator();
const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);
const DiscoverStackScreen = () => (
  <DiscoverStack.Navigator>
    <DiscoverStack.Screen name="Discover" component={Discover} />
    <DiscoverStack.Screen
      name="Details"
      component={Details}
      options={({ route }) => ({
        title: route.params.name
      })}
    />
    <DiscoverStack.Screen name="Search" component={Search} />
  </DiscoverStack.Navigator>
);

const NotificationStackScreen = () => (
  <NotificationStack.Navigator>
    <NotificationStack.Screen
      name="Notifications"
      component={NotificationScreen}
    />
  </NotificationStack.Navigator>
);

const ChatStackScreen = () => (
  <ChatStack.Navigator initialRouteName="ChatStack">
    <ChatStack.Screen name="ChatStack" component={ChatScreen} />
    <ChatStack.Screen name="ChatRoom" component={ChatRoom} />
  </ChatStack.Navigator>
);
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="HomeScreen">
    <Drawer.Screen name="Home" component={HomeScreen} />
  </Drawer.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-home" color={color} size={24} />
        )
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={24} />
        )
      }}
    />
    <Tabs.Screen
      name="Discover"
      component={DiscoverStackScreen}
      options={{
        tabBarLabel: "Discover",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="ferry" color={color} size={24} />
        )
      }}
    />
    <Tabs.Screen
      name="PostModal"
      component={PostScreen}
      options={{
        tabBarLabel: "Post",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="plus-circle-outline"
            color={color}
            size={24}
          />
        )
      }}
    />
    <Tabs.Screen
      name="Notifications"
      component={NotificationStackScreen}
      options={{
        tabBarLabel: "Notifications",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="bell-ring" color={color} size={24} />
        )
      }}
    />

    <Tabs.Screen
      name="Chat"
      component={ChatStackScreen}
      options={{
        tabBarLabel: "Chat",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="chat" color={color} size={24} />
        )
      }}
    />
  </Tabs.Navigator>
);
const AuthScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
  </AuthStack.Navigator>
);
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <>
        <RootStack.Screen name="App" component={TabsScreen} />
        <RootStack.Screen name="Drawer" component={DrawerScreen} />
      </>
    ) : (
      <RootStack.Screen name="Auth" component={AuthScreen} />
    )}
  </RootStack.Navigator>
);

const rootComponent = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUserToken("asdf");
        store.dispatch(setUser({ uid: user.uid }));

        // console.log("user logged in: ", user);
      } else {
        console.log("user logged out: ");
      }
    });
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, []);

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }
  const authContext = React.useMemo(() => {
    return {
      signIn: (email, password) => {
        // setisLoading(false);
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .catch(error => console.log("Error Here", error));
        if (firebase.auth().currentUser) {
          setUserToken("asdf");
          console.log("MOTHER EFFING USER TOKEN", userToken);

          store.dispatch(setUser({ uid: firebase.auth().currentUser.uid }));
        }
      },
      signUp: (email, password, name) => {
        // setisLoading(false);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
            console.log("22", userCredentials);
            return userCredentials.user.updateProfile({
              displayName: name
            });
          })
          .catch(error => console.log("Error Here", error));
        setUserToken("asdf");
      },
      signOut: () => {
        firebase.auth().signOut();
        setUserToken(null);
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <RootStackScreen userToken={userToken} />
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
};

export default rootComponent;
