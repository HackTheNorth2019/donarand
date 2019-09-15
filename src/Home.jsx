import React from 'react';
//import Link from 'react-router-dom'
import  Container  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import WelcomeHeader from './WelcomeHeader';
import particles from 'react-particles-js'

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



const Home = () => {
	const classes = useStyles();

	function call() {
		fetch("http://hackathon.algodev.network:9100/v1/status", {
	        method: 'GET', // *GET, POST, PUT, DELETE, etc.
	        headers: {
	            'X-Algo-API-Token': 'ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1',
	        }
	       
	    })
		  .then(function(response) {
		    return response.json();
		  })
		  .then(function(myJson) {
		    console.log(JSON.stringify(myJson));
		  });
	}

    function genOptions() {
        var ret = [];
        this.call();
        for(var i = 0; i < Data.navbar_items.length; i++){
          ret.push(
          	<Link to={Data.navbar_items[i][1]}> 
	          	<Grid item xs={4}>
			          <Paper className={classes.paper}>{Data.navbar_items[i][0]}</Paper>
		        </Grid>]
	        </Link>)
        }
        return ret;
    }

	return( 
		<Particles
			      params={{
				particles: {
				  line_linked: {
				    color: "#FFFFFF"
				  },
				  number: {
				    value: 1050
				  },
				  size: {
				    value: 50
				  }
				},
				interactivity: {
				  events: {
				    onhover: {
				      enable: true,
				      mode: "repulse"
				    }
				  }
				}
			      }}
			      style={{
				width: "100%",
				background: `#000000`
			      }}
		 />
		<div id="homewrapper">
			<Button onClick={call()}/>
			<WelcomeHeader/>
			<div className={classes.root}>
		      <Grid container spacing={6} 
					  direction="row"
					  justify="center"
					  alignItems="center">
		      	<Grid item xs={3}>
		        	<Link to={Data.navbar_items[0][1]}> 
				          <Paper className={classes.paper}>{Data.navbar_items[0][0]}</Paper>
			        </Link>
			    </Grid>
		        <Grid item xs={3}>
		        	<Link to={Data.navbar_items[1][1]}> 
				          <Paper className={classes.paper}>{Data.navbar_items[1][0]}</Paper>
			        </Link>
			    </Grid>
			    <Grid item xs={3}>
		        	<Link to={Data.navbar_items[2][1]}> 
				          <Paper className={classes.paper}>{Data.navbar_items[2][0]}</Paper>
			        </Link>
			    </Grid>
		        
		      </Grid>
	    	</div>
    	</div>
	);	
}

export default Home;
