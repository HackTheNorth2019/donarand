import React, { Component } from 'react';
import algosdk from 'algosdk';
import './App.css';
import { Fragment } from 'react'
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import GoogleButton from 'react-google-button'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import particles from 'react-particles-js';

import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Page from './Page.jsx'
import MyDropDown from './MyDropDown.jsx'
import * as Data from './data.js'

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


var latitude = {}
var longitude = {}

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
      longitude: 0.00,
      organDropDown: "",
      bloodDropDown: "",
      numberofdonors: 1,

    };
    this.handleChange  = this.handleChange.bind(this)
    this.handleChangeone = this.handleChangeone.bind(this)
    this.handleChangetwo = this.handleChangetwo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setOrganSearchParam = this.setOrganSearchParam.bind(this)
    this.setBloodSearchParam = this.setBloodSearchParam.bind(this)
    this.classes=makeStyles(theme => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
      }));
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

 setOrganSearchParam = (name) => {
  this.setState({organDropDown: name})
 }

 setBloodSearchParam = (name) => {
  this.setState({bloodgroup: name});
 }



async handleSubmit(e){
  e.preventDefault();
  console.log(this.state.email)
  console.log(this.state.bloodgroup)
  console.log(this.state.address)
  const location = await geocodeByAddress(this.state.address)
  .then(results => getLatLng(results[0]))
  .then(({ lat, lng }) =>{
    console.log(lat)
    console.log(lng)
    latitude[0] = lat 
    longitude[0] = lng
   return {
     lat : lat,
     lng : lng
   }
  }
   
  );
  console.log(location)

  let data = {
    email : this.state.email,
    bloodgroup : this.state.bloodgroup,
    latitude: location.lat,
    longitude: location.lng,
    number: this.state.numberofdonors,
    organ: this.state.organDropDown
   
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
    <Page >
   
      <div style={{textAlign: "center", background:'#fff'}}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
               <form className={this.classes.container} noValidate autoComplete="off">
              <div>
                <TextField
                  id="outlined-name"
                  label="email"
                  className={this.classes.textField}
                  margin="normal"
                  variant="outlined"
                  onChange={(e) => {this.handleChangeone(e)}}
                />
                </div>
                <div>
                
                  <GooglePlacesAutocomplete
                    onSelect={({ description }) => (
                    this.setState({ address: description })
                  )}
                  />
                </div>
              <div>
                <MyDropDown items={Data.organ_items} formControl={this.classes.formControl} setItem={this.setOrganSearchParam}/>
                <span> &nbsp; &nbsp; </span>
                <MyDropDown items={Data.blood_items} formControl={this.classes.formControl} setItem={this.setBloodSearchParam}/> 
              </div>
            </form>
            <div style={{height:10}}/>
            <div style={{height:100}}>
                <Button type="button" color="primary" onClick={(e) => this.handleSubmit(e)}><h2>Submit</h2></Button>

            </div>
            </Grid>
  
           </Grid>
       </div>
          
  </Page>
  )
}
}

export default Donate;
