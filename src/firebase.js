import React, { Component } from 'react';
import './App.css';

import { Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as firebaseui from 'firebaseui'
import GoogleButton from 'react-google-button'
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Col,Button} from 'react-bootstrap';


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


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: false,
    };
    this.handleClick = this.handleClick.bind(this);
   
  }

handleClick(e){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
   
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    window.alert("Error Please try again !");
   
  })
  this.setState({ login: true });
}


render(){
  var content;
  if (this.state.login) {
    content = <Form>
    <Form.Row>
      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
  
    </Form.Row>
  
    <Form.Group controlId="formGridAddress1">
      <Form.Label>Address</Form.Label>
      <Form.Control placeholder="1234 Main St" />
    </Form.Group>
  
    <Form.Row>
      <Form.Group as={Col} controlId="formGridCity">
        <Form.Label>City</Form.Label>
        <Form.Control />
      </Form.Group>
  
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Blood available for donation :</Form.Label>
        <Form.Control as="select"> 
          <option>A+</option>
          <option>A-</option>
          <option>B-</option>
          <option>B+</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </Form.Control>
      </Form.Group>
  
      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label>Zip</Form.Label>
        <Form.Control />
      </Form.Group>
    </Form.Row>
  
    <Form.Group id="formGridCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
  
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  }
  else{

   content = <Fragment>
         <GoogleButton
        onClick={(e) => {this.handleClick(e)}}
      />
    </Fragment>
  }

  return(
    <div>
      <h1>Welcome to the login page for DonorAnd</h1>
        {content}
   

      </div>
  )
}
}

export default App;



