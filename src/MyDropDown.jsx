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


const MyDropDown = (props) => {
	const [active, setActive] = useState("");

	function genItems(items){
		var ret = [];
		for(var i = 0; i < items.length; i++){
			ret.push(
				<MenuItem value={items[i]} key={items[i]+"ASDF"} 


				>{items[i]}
				</MenuItem>
			)
		}
		return ret;
	}

	return (
		<FormControl className={props.formControl} style={{width:200}}>
        <InputLabel htmlFor="age-helper">{props.flavorText}</InputLabel>
	        <Select
	         value={active}
	         onChange={(e) => {
	         	setActive(e.target.value);
	         	props.setItem(e.target.value);
	         }}
	          inputProps={{
	            name: 'age',
	            id: 'age-helper',
	          }}
	        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {genItems(props.items)}
        </Select>
      </FormControl>)
}

export default MyDropDown;