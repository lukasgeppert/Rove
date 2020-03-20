import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyCcmjfOQrPxE4PDJgUFTu7xcDeIZLf5MGw",
    authDomain: "rove-01.firebaseapp.com",
    databaseURL: "https://rove-01.firebaseio.com",
    projectId: "rove-01",
    storageBucket: "rove-01.appspot.com",
    messagingSenderId: "894706767214",
    appId: "1:894706767214:web:c670f1fdcd0794423b9d7f",
    measurementId: "G-S6Q98CWK8F"
  }

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if (!firebase.apps.length) {firebase.initializeApp(firebaseConfig)}
    }

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user){
                firebase.auth().signInAnonymously();
            }
        })
    }

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user,
            }

            this.db.push(message)
        })
    }

    parse = message => {
        const {user, text, timestamp} = message.val()
        const {key: _id} = message
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        }
    }

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)))
    }

    off() {
        this.db.off();
    }

    get db() {
        return firebase.database().ref("messages");
    }

    get uid() {
        return (firebase.auth().currentUser() || {}).uid
    }
}

export default new Fire();
