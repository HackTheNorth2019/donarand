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

	const classes = useStyles();
	var blood_items=['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'];
	var organ_items=['Blood', 'Heart', 'Lung', 'Kidney'];

	function genItems(items){
		var ret = [];
		for(var i = 0; i < items.length; i++){
			ret.push(
				<MenuItem value={items[i]} key={items[i]+"ASDF"} onClick={() => setBloodSearchParam(items[i])}>{items[i]}</MenuItem>
			)
		}
		return ret;
	}
	return(        
		<div>
			<TopNavbar/>
			<div style={{textAlign: "center"}}>
			 <Grid container spacing={3}>
		        <Grid item xs={12}>
		          <Paper className={classes.paper}><h1>Search Donor Hospitals</h1></Paper>
		        </Grid>
		        <Grid item xs={12}>
		           <FormControl className={classes.formControl} style={{width:200}}>
			        <InputLabel htmlFor="age-helper">Search For:</InputLabel>
				        <Select
				          inputProps={{
				            name: 'blood',
				            id: 'age-helper',
				          }}
				        >
			          <MenuItem value="">
			            <em>None</em>
			          </MenuItem>
			          {genItems(organ_items)}
			        </Select>
			      </FormControl>
			      <span> &nbsp; &nbsp; </span>
			      <FormControl className={classes.formControl} style={{width:200}}>
			        <InputLabel htmlFor="age-helper">Blood Type:</InputLabel>
				        <Select
				          inputProps={{
				            name: 'blood',
				            id: 'age-helper',
				          }}
				        >
			          <MenuItem value="">
			            <em>None</em>
			          </MenuItem>
			          {genItems(blood_items)}
			        </Select>
			      </FormControl>
			      
			        <div style={{height:100}}>
			      		<Button type="button" color="primary" onClick={() => fetchMarkerData(bloodSearchParam, setMarkerData)}><h2>Search</h2></Button>
					</div>

					
				    <MyMap props={markerData}/>
				    
		        </Grid>
	
		       </Grid>
			</div>
	    </div>

	);	
}

const fetchMarkerData = (args, callback) => {
	console.log(args);
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