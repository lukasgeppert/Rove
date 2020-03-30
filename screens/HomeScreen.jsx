// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   LayoutAnimation,
//   FlatList
// } from "react-native";
// import * as firebase from "firebase";
// import { AuthContext } from "./AuthContext";
// import { Ionicons } from "@expo/vector-icons";
// import moment from "moment";

// const HomeScreen = () => {
//   renderPost = post => {
//     return (
//       <View style={styles.feedItem}>
//         <Image source={post.avatar} style={styles.avatar}></Image>
//         <View style={{ flex: 1 }}>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: "center"
//             }}
//           >
//             <View>
//               <Text style={styles.name}>{post.name}</Text>
//               <Text style={styles.timestamp}>
//                 {moment(post.timestamp).fromNow()}
//               </Text>
//             </View>
//             <Ionicons name="ios-more" size={24} color="#737888" />
//           </View>
//           <Text style={styles.post}>{post.text}</Text>
//           <Image
//             source={post.image}
//             style={styles.postImage}
//             resizeMode="cover"
//           />
//           <View style={{ flexDirection: "row" }}>
//             <Ionicons
//               name="ios-heart-empty"
//               size={24}
//               color="#737888"
//               style={{ marginRight: 16 }}
//             />
//             {/* <Ionicons
//               name="ios-chatboxes"
//               size={24}
//               color="#737888"
//               style={{ marginRight: 16 }}
//             /> */}
//           </View>
//         </View>
//       </View>
//     );
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         {/* <Text style={styles.headerTitle}>Feed</Text> */}
//       </View>
//       <FlatList
//         style={styles.feed}
//         data={posts}
//         renderItem={({ item }) => renderPost(item)}
//         keyExtractor={item => item.id}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#EFECF4"
//   },
//   header: {
//     backgroundColor: "#FFF",
//     alignItems: "center",
//     justifyContent: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "#EBECF4",
//     shadowColor: "#454D64",
//     shadowOffset: { height: 5 },
//     shadowRadius: 15,
//     shadowOpacity: 0.2,
//     zIndex: 0
//   },
//   feed: {
//     marginHorizontal: 16
//   },
//   feedItem: {
//     backgroundColor: "#FFF",
//     borderRadius: 5,
//     padding: 10,
//     flexDirection: "row",
//     marginVertical: 8
//   },
//   avatar: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     marginRight: 16
//   },
//   name: {
//     fontSize: 15,
//     fontWeight: "500",
//     color: "#454D65"
//   },
//   timestamp: {
//     fontSize: 11,
//     color: "#C4C6CE",
//     marginTop: 4
//   },
//   post: {
//     marginTop: 16,
//     fontSize: 14,
//     color: "#838899"
//   },
//   postImage: {
//     width: undefined,
//     height: 150,
//     borderRadius: 5,
//     marginVertical: 16
//   }
// });

// export default HomeScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  FlatList
} from "react-native";
import * as firebase from "firebase";
import Firebase from "../Firebase";

import { AuthContext } from "./AuthContext";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const HomeScreen = props => {
  // console.log("props is: ", props);
  const [posts, setPosts] = useState([]);
  let keyCounter = 0;

  useEffect(() => {
    async function fetchPosts() {
      const posts = await Firebase.posts;
      return posts;
    }
    fetchPosts().then(posts => setPosts(posts));
  }, []);

  renderPost = post => {
    console.log("Post", post);
    return (
      <View key={keyCounter++} style={styles.feedItem}>
        <Image source={post.avatar} style={styles.avatar}></Image>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>
            <Ionicons name="ios-more" size={24} color="#737888" />
          </View>
          <Text style={styles.post}>{post.text}</Text>
          <Image
            source={{ uri: post.image }}
            style={styles.postImage}
            resizeMode="cover"
          />
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="ios-heart-empty"
              size={24}
              color="#737888"
              style={{ marginRight: 16 }}
            />
            {/* <Ionicons
              name="ios-chatboxes"
              size={24}
              color="#737888"
              style={{ marginRight: 16 }}
            /> */}
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.headerTitle}>Feed</Text> */}
      </View>
      <FlatList
        style={styles.feed}
        data={posts}
        renderItem={({ item }) => renderPost(item)}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4"
  },
  header: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D64",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 0
  },
  feed: {
    marginHorizontal: 16
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16
  }
});

export default HomeScreen;

// posts = [
//   {
//     id: "1",
//     name: "Shane",
//     text:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     timestamp: 1569109273726,
//     avatar: require("../assets/images/Shane_Pro_Pic.jpeg"),
//     image: require("../assets/images/tempImage1.jpg")
//   },
//   {
//     id: "2",
//     name: "Jason",
//     text:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     timestamp: 1569109273726,
//     avatar: require("../assets/images/Shane_Pro_Pic.jpeg"),
//     image: require("../assets/images/tempImage2.jpg")
//   },
//   {
//     id: "3",
//     name: "Milos",
//     text:
//       "Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant.",
//     timestamp: 1569109273726,
//     avatar: require("../assets/images/Shane_Pro_Pic.jpeg"),
//     image: require("../assets/images/tempImage3.jpg")
//   },
//   {
//     id: "4",
//     name: "Wario",
//     text:
//       "At varius vel pharetra vel turpis nunc eget lorem. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Adipiscing tristique risus nec feugiat in fermentum.",
//     timestamp: 1569109273726,
//     avatar: require("../assets/images/Shane_Pro_Pic.jpeg"),
//     image: require("../assets/images/tempImage4.jpg")
//   }
// ];
