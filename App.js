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
import CreateProfile1 from "./screens/CreateProfile1";
import CreateProfile2 from "./screens/CreateProfile2";
import CreateProfile3 from "./screens/CreateProfile3";
import CreateProfile4 from "./screens/CreateProfile4";
import CreateProfile5 from "./screens/CreateProfile5";
import FriendProfile from "./screens/friendProfile";
import HomeScreen from "./screens/HomeScreen";
import ChatFriendsList from "./screens/ChatFriendsList";
import RatingDetails from "./screens/RatingDetails";
import SideBar from "./screens/SideBar";
import Post from "./container/Post";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthContext } from "./screens/AuthContext";
import * as firebase from "firebase";
import { useState, useEffect, useContext } from "react";
//redux imports
import { Provider } from "react-redux";
import { setUser } from "./store/user";
import store from "./store/index";

import { decode, encode } from "base-64";
import { TouchableOpacity } from "react-native-gesture-handler";
import RatingForm from "./screens/RatingForm";

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

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      screenOptions={{ headerShown: false }}
      name="Home"
      component={HomeScreen}
      options={{
        title: "Home",
        headerRight: () => (
          <Feather
            name="edit"
            size={30}
            backGroundColor="#009387"
            onPress={() => navigation.navigate("PostScreen")}
            style={{ marginRight: 10  }}
          ></Feather>
        ),
        headerLeft: () => (
          <MaterialCommunityIcons
            name="account-search"
            size={31}
            backGroundColor="#009387"
            onPress={() => navigation.navigate("Search")}
            style={{ marginLeft: 13, marginTop: 10 }}
          ></MaterialCommunityIcons>
        )
      }}
    />
    <HomeStack.Screen name="Search" component={Search} />

    <HomeStack.Screen name="PostScreen" component={PostScreen} />
    <HomeStack.Screen name="Post" component={Post} />
  </HomeStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  const signOutUser = () => {
    signOut();
  };
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerRight: () => (
            <Feather
              name="settings"
              size={30}
              backGroundColor="#009387"
              onPress={() => navigation.navigate("Welcome")}
              style={{ marginRight: 7 }}
            ></Feather>
          ),
          headerLeft: () => (
            <Feather
              name="log-out"
              size={30}
              backGroundColor="#009387"
              onPress={signOutUser}
              style={{ marginLeft: 6 }}
            ></Feather>
          )
        }}
      />
      <ProfileStack.Screen name="Welcome" component={CreateProfile1} />
      <ProfileStack.Screen name="Choose Location" component={CreateProfile2} />
      <ProfileStack.Screen
        name="Choose Profession"
        component={CreateProfile3}
      />
      <ProfileStack.Screen
        name="Interests and Bio"
        component={CreateProfile4}
      />
      <ProfileStack.Screen name="Upload Photo" component={CreateProfile5} />
      <ProfileStack.Screen name="Friend Profile" component={FriendProfile} />
    </ProfileStack.Navigator>
  );
};
const DiscoverStackScreen = () => (
  <DiscoverStack.Navigator mode="modal">
    <DiscoverStack.Screen name="Discover" component={Discover} />
    <DiscoverStack.Screen
      name="Details"
      component={Details}
      options={{ headerShown: false }}
    />
    <DiscoverStack.Screen name="Search" component={Search} />
    <DiscoverStack.Screen name="RatingForm" component={RatingForm} />
    <DiscoverStack.Screen
      name="RatingDetails"
      mode="card"
      component={RatingDetails}
      options={{ headerShown: false }}
    />
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

const ChatStackScreen = ({ navigation }) => (
  <ChatStack.Navigator initialRouteName="ChatStack">
    <ChatStack.Screen
      name="Messages"
      component={ChatScreen}
      screenOptions={{ headerShown: false }}
      options={{
        title: "Inbox",
        headerRight: () => (
          <MaterialCommunityIcons
            name="message-outline"
            size={30}
            backGroundColor="#009387"
            onPress={() => navigation.navigate("Friend List")}
            style={{ marginRight: 13 }}
          ></MaterialCommunityIcons>
        )
      }}
    />
    <ChatStack.Screen name="ChatRoom" component={ChatRoom} />
    <ChatStack.Screen name="Friend List" component={ChatFriendsList} />
  </ChatStack.Navigator>
);

const CustomDrawerContent = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => props.navigation.navigate("Home")}
        >
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => props.navigation.navigate("Chat")}
        >
          <Text>Chat</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const DrawerScreen = () => (
  <Drawer.Navigator
    initialRouteName="TabsScreen"
    drawerContent={props => CustomDrawerContent(props)}
  >
    <Drawer.Screen
      name="Homedrawer"
      component={TabsScreen}
      options={{
        drawerIcon: ({ color }) => (
          <Feather name="home" color={color} size={20} />
        )
      }}
    />

    <Drawer.Screen
      name="Discoverdrawer"
      component={TabsScreen}
      options={{
        drawerIcon: ({ color }) => (
          <MaterialCommunityIcons name="ferry" color={color} size={20} />
        )
      }}
    />
    <Drawer.Screen
      name="Chatdrawer"
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
          <Ionicons name="ios-home" color={color} size={26} />
        )
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        )
      }}
    />
    <Tabs.Screen
      name="Discover"
      component={DiscoverStackScreen}
      options={{
        tabBarLabel: "Discover",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="ferry" color={color} size={26} />
        )
      }}
    />
    {/* <Tabs.Screen
      name="PostModal"
      component={PostScreen}
      options={{
        tabBarLabel: "Post",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="plus-circle-outline"
            color={color}
            size={26}
          />
        )
      }}
    /> */}
    {/* <Tabs.Screen
      name="Notifications"
      component={NotificationStackScreen}
      options={{
        tabBarLabel: "Notifications",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="bell-ring" color={color} size={26} />
        )
      }}
    /> */}

    <Tabs.Screen
      name="Chat"
      component={ChatStackScreen}
      options={{
        tabBarLabel: "Chat",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="chat" color={color} size={26} />
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
            Fire.addUserEmail(userCredentials.user.uid, email, name);
            store.dispatch(
              setUser({
                uid: userCredentials.user.uid,
                name: name
              })
            );

            return userCredentials.user.updateProfile({
              displayName: name
            });
          })
          .then(() => setUserToken("asdf"))

          .catch(error => console.log("Error Here", error));
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
