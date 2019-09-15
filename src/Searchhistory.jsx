import React, { Component } from 'react';
import TopNavbar from './Navbar.jsx';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import * as Data from './data.js';
import Page from './Page.jsx'

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


const Searchhistory = () => {
	const classes = useStyles();
	return(        
		<Page>
			
			<div style={{textAlign: "center"}}>
			 <Grid container spacing={3}>
	
		        <Grid item xs={12}>
		           <form className={classes.container} noValidate autoComplete="off">
				      <div>
					      <TextField
					        id="outlined-name"
					        label="First Name"
					        className={classes.textField}
					        margin="normal"
					        variant="outlined"
					      />
					      <span style={{width:50}}> &nbsp; &nbsp; </span>
					      <TextField
					        id="outlined-name"
					        label="Last Name"
					        className={classes.textField}
					        margin="normal"
					        variant="outlined"
					      />
					   </div><div>
					      
					      <TextField
					        id="outlined-name"
					        label="Donation Date"
					        className={classes.textField}
					        margin="normal"
					        variant="outlined"
					      />
					      <span style={{width:50}}> &nbsp; &nbsp; </span>
					       <TextField
					        id="outlined-name"
					        label="Receival Date"
					        className={classes.textField}
					        margin="normal"
					        variant="outlined"
					      />
				      </div><div>
				      <TextField
					        id="outlined-name"
					        label="Donation Location"
					        className={classes.textField}
					        margin="normal"
					        variant="outlined"
					      />
					      <span style={{width:50}}> &nbsp; &nbsp; </span>
					       <TextField
					        id="outlined-name"
					        label="Receival Location"
					        className={classes.textField}
					        margin="normal"
					        variant="outlined"
					      />
				      </div><div>
				      <TextField
					        id="outlined-name"
					        label="Donation Blood Type"
					        className={classes.textField}
					        margin="normal"
					        variant="outlined"
					      />
					      <span style={{width:50}}> &nbsp; &nbsp; </span>
					       <TextField
					        id="outlined-name"
					        label="Receival Blood Type"
					        className={classes.textField}
					        margin="normal"
					        variant="outlined"
					      />
				      </div>

			      
			      </form>
			      <div style={{height:100}}>
			      		<Button type="button" color="primary"><h2>Search</h2></Button>

				    </div>
		        </Grid>
	
		       </Grid>
			</div>
	    </Page>

	);	
}

export default Searchhistory; 