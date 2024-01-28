// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, set, ref, onValue,get,child } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGGM_npD2mFT08G1FHs2ZCmh0JLQ-NLYU",
    authDomain: "treasure-hunt-9a3a1.firebaseapp.com",
    projectId: "treasure-hunt-9a3a1",
    storageBucket: "treasure-hunt-9a3a1.appspot.com",
    messagingSenderId: "965170673320",
    appId: "1:965170673320:web:b12554bf2e5400045b349d",
    measurementId: "G-VGXTVGWNC6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// console.log(app);
const auth = getAuth();
const db = getDatabase();

let rounds;
const dbRef = ref(getDatabase());
get(child(dbRef, "Users/" + localStorage.getItem("username"))).then((snapshot) => {

        console.log(rounds);
        rounds = snapshot.val().round;
    
}).catch((error) => {
    console.error(error);
});

document.getElementById("login").addEventListener("click", function () {
    var email = document.getElementById("email1").value;
    var password = document.getElementById("pwd1").value;


    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            localStorage.setItem('user', JSON.stringify(user))

            let username = email.replaceAll(".", "");
            localStorage.setItem('username', username);



            console.log(user);

            alert(user.email + " Login successfully!!!");
            // login();

            window.location.href = "index.html";
            showSession()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);
        });

});


function showSession() {
    console.log(localStorage.getItem("user"));

}



// const provider = new GoogleAuthProvider(app);

// loginbtn.addEventListener('click', (e) => {

//   const auth = getAuth();
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       alert(user + 'Login Successfully')
//       window.location.href = "../HTML/getstarted.html";

//       // ...
//     }).catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });

// })