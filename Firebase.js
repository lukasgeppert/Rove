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
  // Chat
  send = messages => {
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user
      };
      this.db.push(message);
    });
  };
  parse = message => {
    console.log("message is: ", message);
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);
    return {
      _id,
      createdAt,
      text,
      user
    };
  };
  get = callback => {
    this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
  };
  off() {
    this.db.off();
  }
  //end Chat
  //POSTING GROUP
  //Add Post
  addPost = async ({ text, localUri }) => {
    const remoteUri = await this.uploadPhotoAsync(localUri);
    console.log("Anything going on in addPost?");
    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          user,
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri,
          responses: [responseId]
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
  get firestore() {
    return firebase.firestore();
  }
  /////end of Posts group
  //firestore users
  addUser = async () => {
    // const remoteUri = await this.uploadPhotoAsync(localUri);
    // console.log("Anything going on in addPost?");
    return new Promise((res, rej) => {
      this.firestore
        .collection("users")
        .add({
          uid: "UOjKnWlgrTXa4PbAQ4aYHRau42o2",
          name: "Shane the God",
          image: "asdf",
          location: "Chicago",
          follows: "Everyone",
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
  get user() {
    return this.firestore
      .collection("users")
      .where("uid", "==", "UOjKnWlgrTXa4PbAQ4aYHRau42o2")
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
  get db() {
    return firebase.database().ref("messages");
  }
  get name() {
    return (firebase.auth().currentUser || {}).displayName;
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }
}
// Fire.shared = new Fire();
export default new Fire();
