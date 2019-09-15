import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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


const WelcomeHeader = () => { 

	return(
		

		<div style={{display:'flex', flexDirection:'column', alignItems:"center", justifyContent:"center", height:500}}>
				<h1> <img src={require('./heart-png.png')} /> {Data.NAME} </h1> <br/>
				<h4> {Data.HEADER_TEXT} </h4> 
		</div>
	)
}
export default WelcomeHeader;