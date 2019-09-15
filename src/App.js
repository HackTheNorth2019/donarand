import React, { Component } from 'react';
<<<<<<< HEAD
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

const algosdk = require('algosdk');
const baseServer = "http://hackathon.algodev.network";
const aport = 9100;
const postToken = 'ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1';

const postAlgodclient = new algosdk.Algod(postToken, baseServer); // Binary content type
const token = {
  'X-Algo-API-token' : 'ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1',
}
const algodclient = new algosdk.Algod(token, baseServer, aport); 

var mnemonic = "code thrive mouse code badge example pride stereo sell viable adjust planet text close erupt embrace nature upon february weekend humble surprise shrug absorb faint"; 
var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic); 
console.log(recoveredAccount.addr);

const kmdToken = '894043665cfa0762b49a5178418121a0bd30dd05428b0e3bd5411ef4f2b49b4';
const kmdNet = '127.0.0.1';
const kmdPort = 7833;


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
    this.handleSubmit  = this.handleSubmit.bind(this);
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

async handleSubmit(e){
  let data = {
    email : 'sneh@gmail.com',
    data : 'datiudhoid owidwoihe'
  }

  try{
    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);

    let txn = {
        "from": recoveredAccount.addr,
        "to": "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA",
        "fee": 10,
        "amount": 2,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "note": algosdk.encodeObj(data),
    };

    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    let tx = (await postAlgodclient.sendRawTransaction(signedTxn.blob));
    console.log("Transaction : " + tx.txId);
}catch(e){
    console.log(e);

    
}

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
  
    <Button variant="primary" type="submit" onClick={(e) => this.handleSubmit()}>
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


=======
//import './App.css';
import Home from './Home.jsx'
import Searchhistory from './Searchhistory.jsx'
import Searchdonors from './Searchdonors.jsx';
import Login from './Login.jsx';
import Donate from './Donate.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { 
  CSSTransition, 
  TransitionGroup 
} from 'react-transition-group';
import TopNavbar from './Navbar.jsx'

import './styles.css';
var regex = /\b(?!home)\b\S+/i;

const supportsHistory = 'pushState' in window.history;

class App extends Component {
   
  render() {
    return (
      <div>
      
        <Router forceRefresh={!supportsHistory}>
     
            
            <div>
              <Route exact path="/" component={Login}/>
              <Route path={regex} component={TopNavbar} />
              <main>
                <Route
                  render={({ location }) => {
                    const { pathname } = location;
                    return (
                      <div>

                      <TransitionGroup>
                        <CSSTransition 
                          key={pathname}
                          classNames="page"
                          timeout={{
                            enter: 1000,
                            exit: 1000,
                          }}
                        >

                          <Route
                            location={location}
                            render={() => (
                          
                              
                              <Switch>
                                <Route path="/home" component={Home} />
                                <Route path="/searchhistory" component={Searchhistory} />
                                <Route path="/searchdonors" component={Searchdonors} />
                                <Route path="/donate" component={Donate} />
                              </Switch>
                              
                            )}
                          />
                        </CSSTransition>
                      </TransitionGroup>
                      </div>
                    );
                  }}
                />
              </main>
            </div>
        </Router>



      </div>
    );
  }
}
export default App;
>>>>>>> cb7b224eea7b1f17352b32c14ef5fc22b6772ee9
