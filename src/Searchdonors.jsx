import React, { Component, useState} from 'react';
import algosdk from 'algosdk'
import TopNavbar from './Navbar.jsx';

import { makeStyles } from '@material-ui/core/styles';

import {Link} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as Data from './data.js';
import Page from './Page.jsx'
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import MyDropDown from './MyDropDown.jsx'
import { GoogleMap, LoadScript, useLoadScript, Marker } from '@react-google-maps/api';

const token = "ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1";
const server = "http://hackathon.algodev.network";
const port = 9100;
const algodclient = new algosdk.Algod(token, server, port);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const Searchdonors = () => {
	const [markerData, setMarkerData] = useState([]);
	const [bloodSearchParam, setBloodSearchParam] = useState("");
	const [organSearchParam, setOrganSearchParam] = useState("");

	const classes = useStyles();


	
	return(        
		<Page>
			<div style={{textAlign: "center", background:'#fff'}}>
			 <Grid container spacing={0}>
		        
		        <Grid item xs={12}>
		           
			      <MyDropDown items={Data.organ_items} formControl={classes.formControl} setItem={setOrganSearchParam}/>
			      <span> &nbsp; &nbsp; </span>
			      <MyDropDown items={Data.blood_items} formControl={classes.formControl} setItem={setBloodSearchParam}/> 
	
			      	<div style={{height:10}}/>
			        <div style={{height:70}}>
			      		<Button type="button" color="primary" onClick={() => fetchMarkerData(bloodSearchParam, organSearchParam, setMarkerData)}><h2>Search</h2></Button>
					</div>

					
				    <MyMap markerData={markerData}/>
				    
		        </Grid>
	
		       </Grid>
			</div>
	    </Page>

	);	
}

async function fetchMarkerData(arg1, arg2, callback) {
	//console.log(arg1 + arg2)

  
   
		var user =  await  firebase.database().ref(arg1).once('value').then(function (snapshot) {
					 var username = snapshot.val() 
					 return username
					 console.log(username);
					 
			 })
	 
	 
	 var result = user
	 const txs = []
	 Object.values(user).forEach((value) =>{
		 txs.push(value.transaction)
	 })
	 
	 console.log(txs[0]);
	 // let result = JSON.parse(result1)
	 // console.log(result)
	 
	 
	 
	 // result.forEach((value) =>{
	 //   console.log(value)
	 // })
	 const txsname = [];
	 
		 for(let i=0; i<txs.length;i++){
			 var name = await algodclient.transactionById(txs[i]);
			 // console.log(name)
			 let encodednote = JSON.stringify(algosdk.decodeObj(name.note), undefined, 4);
			 // console.log(encodednote);
				txsname.push(encodednote);
		 }
		 
		callback(txsname);
		 
		 
	/// Function to get marker data
	// Only blood param matters, ignore the other one
	// do callback(what the blockchainreturns)
}

/**
NOTE: Markers are retrieved with the schema:
[
	{ 
	  "name":<marker name (hospital name)>,
	  "lat":<latitude>,
	  "lng":<longitude>,
	  "num":<number of donors at a location, higher numbers will be make larger markers>
	},
	{
	etc
	}
]
*/

const MyMap = (props) => {
	//console.log("Map render" + props.markerData);
	function genMarkers(){
		var ret = []
		for(var i = 0; i < props.markerData.length; i++){
			var data_t = JSON.parse(props.markerData[i])
			if(!data_t.latitude || ! data_t.longitude){
				continue;
			}
			//console.log(data_t.latitude + " " + data_t.longitude)
			ret.push(
				<Marker
				  key={"marker" + i + props.markerData[i].latitude}
			      position={{
			        lat: parseFloat(data_t.latitude),
			        lng: parseFloat(data_t.longitude)
			      }}
			    />)
	   }
	   return ret;
	}
 	
     return (
      
        <GoogleMap
          id='example-map'
          id="circle-example"
		    mapContainerStyle={{"display":'flex', "flexDirection":'column', "height":"64vh", 'flexGrow':1, "width" : "100%"}}
		    zoom={9}
		    center={{
		      lat: 43.6532,
		      lng: -79.3832
		    }}
        >
         {genMarkers() }
        </GoogleMap>
      
     )
  
}

export default Searchdonors; 