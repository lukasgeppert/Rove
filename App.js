import * as React from "react";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  SafeAreaView
} from "react-native";

// import { MaterialCommunityIcons } from "react-native-vector-icons";
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
import ChatFriendsList from "./screens/ChatFriendsList";
import SideBar from "./screens/SideBar";
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
import { TouchableOpacity } from "react-native-gesture-handler";

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

// const NotificationStackScreen = () => (
//   <NotificationStack.Navigator>
//     <NotificationStack.Screen
//       name="Notifications"
//       component={NotificationScreen}
//     />
//   </NotificationStack.Navigator>
// );

const ChatStackScreen = ({navigation}) => (
  <ChatStack.Navigator initialRouteName="ChatStack">
    <ChatStack.Screen
      name="Messages"
      component={ChatScreen}
      screenOptions={{ headerShown: false }}
      options={{
        title: "New Chat",
        headerRight: () => (
          <MaterialCommunityIcons
            name="message-text"
            size={30}
            backGroundColor="#009387"
            onPress={() => navigation.navigate("ChatFriendsList")}
            style={{ marginRight: 8 }}
          ></MaterialCommunityIcons>
        )
      }}
    />
    <ChatStack.Screen name="ChatRoom" component={ChatRoom} />
    <ChatStack.Screen name="ChatFriendsList" component={ChatFriendsList} />
  </ChatStack.Navigator>
);

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() =>
            props.navigation.dispatch(
              CommonActions.navigate({
                name: "HomeStackScreen"
              })
            )
          }
        >
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => props.navigation.navigate("ChatScreen")}
        >
          <Text>Chat</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const DrawerScreen = () => (
  <Drawer.Navigator
    initialRouteName="TabsScreen"
    drawerContent={props => CustomDrawerContent(props)}
  >
    <Drawer.Screen
      name="Home"
      component={TabsScreen}
      options={{
        drawerIcon: ({ color }) => (
          <Feather name="home" color={color} size={20} />
        )
      }}
    />

    <Drawer.Screen
      name="Discover"
      component={TabsScreen}
      options={{
        drawerIcon: ({ color }) => (
          <MaterialCommunityIcons name="ferry" color={color} size={20} />
        )
      }}
    />
    <Drawer.Screen
      name="Chat"
      component={ChatStackScreen}
      options={{
        drawerIcon: ({ color }) => (
          <Feather name="message-circle" color={color} size={20} />
        )
      }}
    />
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
    {/* <Tabs.Screen
      name="Notifications"
      component={NotificationStackScreen}
      options={{
        tabBarLabel: "Notifications",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="bell-ring" color={color} size={24} />
        )
      }}
    /> */}

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
        <RootStack.Screen name="App" component={DrawerScreen} />
        {/* <RootStack.Screen name="Drawer" component={DrawerScreen} /> */}
      </>
    ) : (
      <RootStack.Screen name="Auth" component={AuthScreen} />
    )}
  </RootStack.Navigator>
);

const rootComponent = () => {
  const [userToken, setUserToken] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUserToken("asdf");
        store.dispatch(
          setUser({
            uid: user.uid,
            name: user.displayName
          })
        );
        // console.log("user logged in: ", user);
      } else {
        // console.log("user logged out: ", user);
      }
    });
  }, []);

  const authContext = React.useMemo(() => {
    return {
      signIn: (email, password) => {
        console.log("Sign in occurring here!");

        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .catch(error => console.log("Error Here", error));
        if (firebase.auth().currentUser) {
          setUserToken("asdf");
          store.dispatch(
            setUser({
              uid: firebase.auth().currentUser.uid
            })
          );
        }
      },
      signUp: (email, password, name) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
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
