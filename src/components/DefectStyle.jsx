import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	logo: {
		maxWidth: 80,
	},
	title: {
		flexGrow: 1,
	},
}));

function DefectStyle(props) {
	const classes = useStyles();
    // const 
	// console.log(props);
	var winWidth = window.innerWidth;
const FrontDefects = () => {
    var size = 0.03 * window.innerHeight;
	let index = -5;
    // console.log(size);
	return props.data.FrontDefects.map((data) => {
	index += 5;
		return (

				// <CloseIcon style={{ color: '#e94560', fontSize: {size} }} />
				<CloseIcon style={{position: "absolute",color: '#e94560', fontSize: size, left:  data.X * (window.innerWidth * (0.15 / 3)) - 0.02 * window.innerHeight + "px",
				top: data.Y * (window.innerWidth * (0.6 / 12)) - 0.02 * window.innerHeight + "px" }} />
		);
	});
};

const BackDefects = () => {
    var size = 0.03 * window.innerHeight;
	return props.data.BackDefects.map((data) => {
		return (
<CloseIcon style={{position: "absolute",color: '#e94560', fontSize: size, left:  data.X * (window.innerWidth * (0.15 / 3)) - 0.02 * window.innerHeight + "px",
				top: data.Y * (window.innerWidth * (0.6 / 12)) - 0.02 * window.innerHeight + "px" }} />
		);
	});
};
var frontUrl=props.frontUrl

	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<div
					style={{
						width: winWidth * 0.15,
						height: winWidth * (0.6 / 3),
						marginHorizontal: winWidth * 0.02,
						backgroundImage: 'url(' + frontUrl + ')',
						backgroundRepeat: 'no-repeat',
						// backgroundColor: '#281d4d',
						backgroundSize: 'contain',
						backgroundPosition: 'center',
						position: 'relative'
					}}
					// src={props.frontUrl}
					// alt="img"
				>
					{/* <img
						
					></img> */}
					{/* <CloseIcon style={{postition: "absolute", color: 'red', fontSize: 16, left: "0px",
					top: "0px", }} />
					<CloseIcon style={{position: "absolute",color: 'blue', fontSize: 16, left: "0px",
					top: "0px" }} /> */}
					{/* <CloseIcon style={{ color: '#e94560', fontSize: '{0.04 * window.innerHeight}' }} /> */}
					{FrontDefects()}
				</div>
				<div
					style={{
						width: winWidth * 0.15,
						height: winWidth * (0.6 / 3),
						marginHorizontal: winWidth * 0.02,
						backgroundImage: 'url(' + props.backUrl + ')',
						backgroundRepeat: 'no-repeat',
						// backgroundColor: '#281d4d',
						backgroundSize: 'contain',
						backgroundPosition: 'center',
						position: 'relative'
					}}
				>
				{BackDefects()}

				</div>
			</div>
		</>
	);
}

export default DefectStyle;