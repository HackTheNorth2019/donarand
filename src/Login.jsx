import React, { Component } from 'react';
import algosdk from 'algosdk';
import { Redirect } from 'react-router';
import './App.css';
import { Fragment } from 'react'
import * as firebase from "firebase/app";
import * as Data from './data.js';
import "firebase/auth";
import "firebase/database";
import GoogleButton from 'react-google-button'

import {Form,Col,Button} from 'react-bootstrap';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import WelcomeHeader from './WelcomeHeader.jsx'

const token = "ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1";
const server = "http://hackathon.algodev.network";
const port = 9100;
const algodclient = new algosdk.Algod(token, server, port);


//   const baseServer = "http://hackathon.algodev.network";
// const aport = 9100;
// const postToken = 'ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1';

// const postAlgodclient = new algosdk.Algod(postToken, baseServer); // Binary content type
// const token =  'ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1'
// const algodclient = new algosdk.Algod(token, baseServer, aport); 

var mnemonic = "code thrive mouse code badge example pride stereo sell viable adjust planet text close erupt embrace nature upon february weekend humble surprise shrug absorb faint"; 
var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic); 
console.log(recoveredAccount.addr);

var login = {};

// const kmdToken = '894043665cfa0762b49a5178418121a0bd30dd05428b0e3bd5411ef4f2b49b4';
// const kmdNet = '127.0.0.1';
// const kmdPort = 7833;

// const token = "ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1";
// const server = "http://hackathon.algodev.network";
// const port = 9100;
// const client = new algosdk.Algod(token, server, port);

const firebaseConfig = {
  apiKey: "AIzaSyBY4vBvI6dj9F0V9ErEPoL0lY5ZiY6w1Tg",
  authDomain: "hackthenorth-b4861.firebaseapp.com",
  databaseURL: "https://hackthenorth-b4861.firebaseio.com",
  projectId: "hackthenorth-b4861",
  storageBucket: "",
  messagingSenderId: "480667601836",
  appId: "1:480667601836:web:28bd75df5e36f0d2264809"
};
firebase.initializeApp(firebaseConfig);


class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: false,
      status: "please wait",
      bloodgroup: '',
      address: '',
      email: '',
      latitude: 0.00,
      longitude: 0.00
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount(){
    let status = await algodclient.status();
    this.setState({ status: JSON.stringify(status, null, "  ") });

  }

 handleClick(e){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
  }).then( () => {
    this.setState({ login: true });
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    window.alert("Error Please try again !");
    return;
  })  
}

render(){
  if(this.state.login == true){
    return(<Redirect push to="/home"/>)
  }
  return(
    <div style={{display:'flex', flexDirection:'column', alignItems:"center", justifyContent:"center"}}>
      <WelcomeHeader/>
        <Fragment>
         <GoogleButton
          onClick={(e) => {this.handleClick(e)}}
          />
        </Fragment>
    </div>
  )
}
}

export default Login;


//local host 1
//local host 2


// two sign in - one as donor
// one as reci
