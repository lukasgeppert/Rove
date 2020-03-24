import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import Fire from "./Firebase";

// import LoadingScreen from "./screens/LoadingScreen";
import ChatScreen from "./screens/ChatScreen";
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

import { AuthContext } from "./screens/AuthContext";

import * as firebase from "firebase";
import { useState } from "react";
import { useEffect } from "react";

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
  <ChatStack.Navigator>
    <ChatStack.Screen name="Chat" component={ChatScreen} />
  </ChatStack.Navigator>
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
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen name="App" component={TabsScreen} />
    ) : (
      <RootStack.Screen name="Auth" component={AuthScreen} />
    )}
  </RootStack.Navigator>
);

export default () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // navigate(user && user.email ? "Home" : "Login");
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
        if (firebase.auth().currentUser) setUserToken("asdf");
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
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
