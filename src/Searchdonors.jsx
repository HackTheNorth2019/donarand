import React, { Component } from 'react';
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
	return(        
		<div>
			<TopNavbar/>
			<div style={{textAlign: "center"}}>
			 <Grid container spacing={3}>
		        <Grid item xs={12}>
		          <Paper className={classes.paper}><h1>Search Past Donations</h1></Paper>
		        </Grid>
		        <Grid item xs={12}>
		           <FormControl className={classes.formControl}>
			        <InputLabel htmlFor="age-helper">Age</InputLabel>
			        <Select
			          inputProps={{
			            name: 'age',
			            id: 'age-helper',
			          }}
			        >
			          <MenuItem value="">
			            <em>None</em>
			          </MenuItem>
			          <MenuItem value={10}>Ten</MenuItem>
			          <MenuItem value={20}>Twenty</MenuItem>
			          <MenuItem value={30}>Thirty</MenuItem>
			        </Select>
			        <FormHelperText>Some important helper text</FormHelperText>
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