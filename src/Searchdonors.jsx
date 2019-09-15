import React, { Component, useState} from 'react';
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

import MyDropDown from './MyDropDown.jsx'
import { GoogleMap, LoadScript, useLoadScript, Marker } from '@react-google-maps/api';

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
	var blood_items=['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'];
	var organ_items=['Blood', 'Heart', 'Lung', 'Kidney', 'Bone Marrow'];

	
	return(        
		<Page>
			<div style={{textAlign: "center"}}>
			 <Grid container spacing={3}>
		        
		        <Grid item xs={12}>
		           
			      <MyDropDown items={organ_items} formControl={classes.formControl} setItem={setOrganSearchParam}/>
			      <span> &nbsp; &nbsp; </span>
			      <MyDropDown items={blood_items} formControl={classes.formControl} setItem={setBloodSearchParam}/> 
	
			      
			        <div style={{height:100}}>
			      		<Button type="button" color="primary" onClick={() => fetchMarkerData(bloodSearchParam, organSearchParam, setMarkerData)}><h2>Search</h2></Button>
					</div>

					
				    <MyMap props={markerData}/>
				    
		        </Grid>
	
		       </Grid>
			</div>
	    </Page>

	);	
}

const fetchMarkerData = (arg1, arg2, callback) => {
	console.log(arg1 + arg2)
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
	
	function genMarkers(){
		var ret = []
		for(var i = 0; i < props.markerData.length; i++){
			ret.push(
			<Marker
		      onLoad={marker => {
		        console.log('marker: ', marker)
		      }}
		      position={{
		        lat: props.markerData[i].lat,
		        lng: props.markerData[i].lng,
		      }}
		    />)
	   }
	   return ret;
	}
 
     return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyAAGuNHq0Pwt5S0dkhlCULDFTYbWNSszRQ"
      >
        <GoogleMap
          id='example-map'
          id="circle-example"
		    mapContainerStyle={{"display":'flex', "flexDirection":'column', "height":"60vh", 'flexGrow':1, "width" : "100%"}}
		    zoom={9}
		    center={{
		      lat: 43.6532,
		      lng: -79.3832
		    }}
        >
         genMarkers() 
        </GoogleMap>
      </LoadScript>
     )
  
}

export default Searchdonors; 