import React, { Component, useState} from 'react';
import TopNavbar from './Navbar.jsx';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as Data from './data.js';

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
	const classes = useStyles();
	const [enableBlood, setEnableBlood] = useState(false);
	var blood_items=['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'];
	var organ_items=['Blood', 'Heart', 'Lung', 'Kidney'];

	function genItems(items){
		var ret = [];
		for(var i = 0; i < items.length; i++){
			ret.push(
				<MenuItem value={items[i]}>{items[i]}</MenuItem>
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
		          <Paper className={classes.paper}><h1>Search Donors</h1></Paper>
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
			      		<Button type="button" color="primary"><h2>Search</h2></Button>

				    </div>
		        </Grid>
	
		       </Grid>
			</div>
	    </div>

	);	
}

export default Searchdonors; 