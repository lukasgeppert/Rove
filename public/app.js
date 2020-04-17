document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app();
});

const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      document.write(`Hello ${user.displayName}`);
    });
};

// try {
// } catch (err) {
//   console.error("Login errror", err);
// }
