// import React, { Component } from 'react';
// // import Button from '@material-ui/core/Button';
// import './App.css';
// // import './Home.jsx'
// import { Fragment } from 'react'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import * as firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import * as firebaseui from 'firebaseui'
// import GoogleButton from 'react-google-button'
// import { Redirect } from 'react-router';
// import FormControl from '@material-ui/core/FormControl';

// const firebaseConfig = {
//   apiKey: "AIzaSyBY4vBvI6dj9F0V9ErEPoL0lY5ZiY6w1Tg",
//   authDomain: "hackthenorth-b4861.firebaseapp.com",
//   databaseURL: "https://hackthenorth-b4861.firebaseio.com",
//   projectId: "hackthenorth-b4861",
//   storageBucket: "",
//   messagingSenderId: "480667601836",
//   appId: "1:480667601836:web:28bd75df5e36f0d2264809"
// };
// firebase.initializeApp(firebaseConfig);


// class App extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       login: false,
//     };
//     this.handleClick = this.handleClick.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

// handleClick(e){
//   var provider = new firebase.auth.GoogleAuthProvider();
//   firebase.auth().signInWithPopup(provider).then(function(result) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
   
//     // ...
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     window.alert("Error Please try again !");
   
//   })
//   this.setState({ login: true });
// }


// render(){
//   var content;
//   if (this.state.login) {
//     content = <Fragment>
//       <FormControl>
//     <InputLabel htmlFor="my-input">Email address</InputLabel>
//     <Input id="my-input" aria-describedby="my-helper-text" />
//     <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
//   </FormControl>
//     </Fragment>
//   }
//   else{

//    content = <Fragment>
//          <GoogleButton
//         onClick={(e) => {this.handleClick(e)}}
//       />
//     </Fragment>
//   }

//   return(
//     <div>
//       <h1>Welcome to the login page for DonorAnd</h1>
//         {content}
   

//       </div>
//   )
// }
// }

// export default App;



