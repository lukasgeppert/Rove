import firebase from "firebase";
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
class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }
  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  };
  checkAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      // if (!user) {
      //   firebase.auth().signInAnonymously();
      // }
    });
  };

  //POSTING GROUP
  //Add Post
  addPost = async ({ text, localUri }) => {
    const remoteUri = await this.uploadPhotoAsync(localUri);
    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          name: this.name,
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri
        })
        .then(ref => {
          res(ref);
        })
        .catch(err => {
          rej(err);
        });
    });
  };

  get post() {
    return this.firestore
      .collection("posts")
      .where("uid", "==", "Yihma0x3i3Mm4po7jkR7cLt34B22")
      .get()
      .then(function(querySnapshot) {
        let tempResults;
        querySnapshot.forEach(doc => {
          tempResults = doc.data();
        });
        return tempResults;
      })
      .catch(function(error) {
        console.log("Error getting posts: ", error);
      });
  }

  get posts() {
    return (
      this.firestore
        .collection("posts")
        .orderBy("timestamp", "desc")
        // .where("uid", "==", "Yihma0x3i3Mm4po7jkR7cLt34B22")
        .get()
        .then(function(querySnapshot) {
          let tempResults = [];

          querySnapshot.forEach(doc => {
            tempResults.push(doc.data());
          });
          return tempResults;
        })
        .catch(function(error) {
          console.log("Error getting posts: ", error);
        })
    );
  }

  //Upload Photo
  uploadPhotoAsync = async uri => {
    const path = `photos/${this.uid}/${Date.now()}.jpg`;
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();
      let upload = firebase
        .storage()
        .ref(path)
        .put(file);
      upload.on(
        "state_changed",
        snapshot => {},
        err => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };
  /////end of Posts group

  //firestore users
  addUser = async () => {
    return new Promise((res, rej) => {
      this.firestore
        .collection("users")
        .doc("UOjKnWlgrTXa4PbAQ4aYHRau42o2")
        .set({
          uid: "UOjKnWlgrTXa4PbAQ4aYHRau42o2",
          name: "Shane the God",
          image: "asdf",
          location: "Chicago",
          interests: "Long walks along the beach",
          aboutMe: "He has no Messiah",
          posts: "None",
          groups: ["EDM Lovers", "TENTACLE MONSTERS"],
          events: ["The Tentacle Rave"]
        })
        .then(ref => {
          res(ref);
        })
        .catch(err => {
          rej(err);
        });
    });
  };

  // addFollow = async followerListId => {
  //   return new Promise((res, rej) => {
  //     this.firestore
  //       .collection("following")
  //       .doc(followerListId)
  //       .collection("userFollowing")
  //       .add({
  //         uids: ["UOjKnWlgrTXa4PbAQ4aYHRau42o2", "dGPK4Hwa0GQex9oK69jJXvOD4Nb2"]
  //       });
  //   });
  // };

  // 1. followers
  //     -followed
  //       -follower: true

  // 2. following
  //     -follower
  //       -followed: true

  // getFollowers = uid => {
  //   return this.firestore
  //     .collection("users")
  //     .doc(uid)
  //     .collection("followers")
  //     .get()
  //     .then(function(querySnapshot) {
  //       let tempResults;
  //       querySnapshot.forEach(doc => {
  //         tempResults = doc.data();
  //       });

  //       return tempResults;
  //     })
  //     .catch(function(error) {
  //       console.log("Error getting followers: ", error);
  //     });
  // };

  // getFollowing = uid => {
  //   return this.firestore
  //     .collection("users")
  //     .doc(uid)
  //     .collection("following")
  //     .get()
  //     .then(function(querySnapshot) {
  //       let tempResults;
  //       querySnapshot.forEach(doc => {
  //         tempResults = doc.data();
  //       });
  //       return tempResults;
  //     })
  //     .catch(function(error) {
  //       console.log("Error getting following: ", error);
  //     });
  // };

  // follow = (uid, name) => {
  //   return this.firestore
  //     .collection("users")
  //     .doc("UOjKnWlgrTXa4PbAQ4aYHRau42o2")
  //     .collection("followers")
  //     .add({
  //       user: {
  //         name: name,
  //         _id: uid,
  //         avatar: "../assets/images/Shane_Pro_Pic.jpeg"
  //       }
  //     });
  // };

  getPendingFriends = uid => {
    return this.firestore
      .collection("users")
      .doc(uid)
      .collection("pendingFriends")
      .get()
      .then(function(querySnapshot) {
        let tempResults;
        querySnapshot.forEach(doc => {
          tempResults = doc.data();
        });

        return tempResults;
      })
      .catch(function(error) {
        console.log("Error getting pending friends: ", error);
      });
  };

  getFriends = uid => {
    return this.firestore
      .collection("users")
      .doc(uid)
      .collection("friends")
      .get()
      .then(function(querySnapshot) {
        let tempResults = [];
        querySnapshot.forEach(doc => {
          tempResults.push(doc.data());
        });

        return tempResults;
      })
      .catch(function(error) {
        console.log("Error getting friends: ", error);
      });
  };

  sendFriendRequest = (uid, name) => {
    console.log("Sending Friend Request from Firebase");

    this.firestore
      .collection("users")
      .doc(this.uid)
      .collection("pendingFriends")
      .doc(uid)
      .set({
        friend: {
          name: name,
          _id: uid,
          type: "outgoing"
        }
      });

    this.firestore
      .collection("users")
      .doc(uid)
      .collection("pendingFriends")
      .doc(this.uid)
      .set({
        friend: {
          name: this.name,
          _id: this.uid,
          type: "incoming"
        }
      });
  };

  acceptFriendRequest = (uid, name) => {
    this.firestore
      .collection("users")
      .doc(this.uid)
      .collection("friends")
      .doc(uid)
      .set({
        friend: {
          name: name,
          _id: uid
          // type: "outgoing"
        }
      });

    this.firestore
      .collection("users")
      .doc(uid)
      .collection("friends")
      .doc(this.uid)
      .set({
        friend: {
          name: this.name,
          _id: this.uid
          // type: "incoming"
        }
      });

    this.firestore
      .collection("users")
      .doc(this.uid)
      .collection("pendingFriends")
      .doc(uid)
      .delete();

    this.firestore
      .collection("users")
      .doc(uid)
      .collection("pendingFriends")
      .doc(this.uid)
      .delete();
  };

  deleteFriend = uid => {
    this.firestore
      .collection("users")
      .doc(this.uid)
      .collection("friends")
      .doc(uid)
      .delete();

    this.firestore
      .collection("users")
      .doc(uid)
      .collection("friends")
      .doc(this.uid)
      .delete();
  };

  getUser(uid) {
    return this.firestore
      .collection("users")
      .doc(uid)
      .get()
      .then(function(querySnapshot) {
        let tempResults;
        querySnapshot.forEach(doc => {
          tempResults = doc.data();
        });
        return tempResults;
      })
      .catch(function(error) {
        console.log("Error getting users: ", error);
      });
  }
  //end firestore users

  //ChatRoom
  addChatRoom = async (type, name, friendId) => {
    console.log("in tha chat room");
    return new Promise((res, rej) => {
      this.firestore
        .collection("chatRoom")
        .add({
          name: name,
          avatar: "../assets/images/Shane_Pro_Pic.jpeg",
          uids: [this.uid, friendId],
          type: type
        })
        .then(ref => {
          res(ref);
        })
        .catch(err => {
          rej(err);
        });
    });
  };

  //Chat Post
  addChatPost = async (name, text, uid, chatRoomId) => {
    return new Promise((res, rej) => {
      this.firestore
        .collection("chatRoom")
        .doc(chatRoomId)
        .collection("messages")
        .add({
          user: {
            name,
            _id: uid,
            avatar: ""
          },
          text: text,
          createdAt: this.timestamp
        })
        .then(ref => {
          res(ref);
        })
        .catch(err => {
          rej(err);
        });
    });
  };

  getChatRoomId = uid => {
    return this.firestore
      .collection("chatRoom")
      .where("uids", "array-contains", uid)
      .get()
      .then(function(querySnapshot) {
        let tempResults = {};

        querySnapshot.forEach(doc => {
          tempResults[doc.id] = doc.data();
        });

        return tempResults;
      })
      .catch(function(error) {
        console.log("Error getting chatRoom: ", error);
      });
  };

  getSingleChatRoom = friendId => {
    return this.firestore
      .collection("chatRoom")
      .where("uids", "==", [this.uid, friendId])
      .get()
      .then(function(querySnapshot) {
        let tempResults = {};
        querySnapshot.forEach(doc => {
          if (doc) {
            tempResults[doc.id] = doc.data();
            console.log("doc data was positive");
          } else {
            console.log("adding chatroom pls");
            this.addChatRoom("personal", this.name, friendId);
          }
        });

        return tempResults;
      })

      .catch(function(error) {
        console.log("Error getting chatRoom: ", error);
      });
  };

  getMessages = chatRoomId => {
    return firebase
      .firestore()
      .collection("chatRoom")
      .doc(chatRoomId)
      .collection("messages")
      .get()
      .then(function(querySnapshot) {
        let tempResults = {};
        querySnapshot.forEach(doc => {
          tempResults[doc.id] = doc.data();
        });
        return tempResults;
      })
      .catch(function(error) {
        console.log("Error getting getMessage: ", error);
      });
  };

  updatesOn = chatRoomId => {
    return firebase
      .firestore()
      .collection("chatRoom")
      .doc(chatRoomId)
      .collection("messages")
      .onSnapshot(querySnapshot => {
        let tempResults = {};
        querySnapshot.forEach(doc => {
          tempResults[doc.id] = doc.data();
        });
        return tempResults;
      });
  };

  addCity = async (name, te) => {
    // const remoteUri = await this.uploadPhotoAsync(localUri);
    return new Promise((res, rej) => {
      this.firestore
        .collection("cities")
        .add({
          name: this.name,
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri
        })
        .then(ref => {
          res(ref);
        })
        .catch(err => {
          rej(err);
        });
    });
  };

  get = callback => {
    this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
  };
  //DB invoked
  get firestore() {
    return firebase.firestore();
  }
  get name() {
    return (firebase.auth().currentUser || {}).displayName;
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  // get avatar() {
  //   return (firebase.auth().currentUser || {}).
  // }
  get timestamp() {
    return Date.now();
  }
}
// Fire.shared = new Fire();
export default new Fire();
