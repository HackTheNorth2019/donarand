import React, { Component } from 'react';
import algosdk from 'algosdk';
import './App.css';
import { Fragment } from 'react'
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import GoogleButton from 'react-google-button'
import Page from './Page.jsx'

import {Form,Col,Button} from 'react-bootstrap';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

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

// const kmdToken = '894043665cfa0762b49a5178418121a0bd30dd05428b0e3bd5411ef4f2b49b4';
// const kmdNet = '127.0.0.1';
// const kmdPort = 7833;

// const token = "ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1";
// const server = "http://hackathon.algodev.network";
// const port = 9100;
// const client = new algosdk.Algod(token, server, port);

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


class Donate extends Component {
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
    this.handleChange  = this.handleChange.bind(this)
    this.handleChangeone = this.handleChangeone.bind(this)
    this.handleChangetwo = this.handleChangetwo.bind(this)
  }

  async componentDidMount(){
    let status = await algodclient.status();
    this.setState({ status: JSON.stringify(status, null, "  ") });

}

handleChange(event) {
  event.preventDefault();
  this.setState({address: event.target.value});
}
handleChangeone(event) {
  event.preventDefault();
  this.setState({email: event.target.value});
}
handleChangetwo(event) {
  event.preventDefault();
  this.setState({bloodgroup: event.target.value});
}

async handleSubmit(e){

  var latitude = {

  }
  var longitude = {

  }
  e.preventDefault();
  console.log(this.state.email)
  console.log(this.state.bloodgroup)
  console.log(this.state.address)
  geocodeByAddress(this.state.address)
  .then(results => getLatLng(results[0]))
  .then(({ lat, lng }) =>{
    console.log(lat)
    latitude[0] = lat 
   longitude[0] = lng
  }
   
  );

  
  console.log(longitude[0])
  let data = {
    email : this.state.email,
    bloodgroup : this.state.bloodgroup,
    latitude: latitude[0],
    longitude: longitude[0]
  }

  try{
    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);

    let txn = {
        "from": recoveredAccount.addr,
        "to": recoveredAccount.addr,
        "fee": 1000,
        "amount": 0,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "note": algosdk.encodeObj(data),
    };

    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    let tx = (await algodclient.sendRawTransaction(signedTxn.blob));
    console.log("Transaction : " + tx.txId);
    let bloodgroup = this.state.bloodgroup
    firebase.database().ref(bloodgroup).push(
      {
     transaction : tx.txId
    });
}catch(e){
    console.log(e);
}

}


render(){
  
  return(
    <Page>
      <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  value={this.state.email} onChange={this.handleChangeone} />
        </Form.Group>
    
      </Form.Row>
    
      <GooglePlacesAutocomplete
        onSelect={({ description }) => (
        this.setState({ address: description })
      )}
      />
    
      <Form.Row>
      
    
        <Form.Group as={Col} controlId="formGridState" >
          <Form.Label>Blood available for donation :</Form.Label>
          <Form.Control as="select" value={this.state.bloodgroup} onChange={this.handleChangetwo} > 
            <option></option>
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
    
        
      </Form.Row>
    
      <Form.Group id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
    
      <Button variant="primary" type="submit" onClick={(e) => this.handleSubmit(e)}>
        Submit
      </Button>
    </Form>
  </Page>
  )
}
}

export default Donate;


//local host 1
//local host 2


// two sign in - one as donor
// one as reci
