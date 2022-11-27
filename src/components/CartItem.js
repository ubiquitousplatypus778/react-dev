import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import "../App.css";
import cart from "../App.js";
import App from "../App.js";
import { useState } from "react";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CartItem(props) {
  return (
		<Card sx={{ width: 180, height: 100}}>
            <CardHeader titleTypographyProps={{variant:'h7' }}
                title = {props.name}
            />
            <Typography paragraph  color="text.secondary">
                    $ {props.price} million
                </Typography>
            <CardContent>
                <Typography paragraph  color="text.secondary">
                    $ {props.price} million
                </Typography>
                
                
            </CardContent>
            
          
        </Card>
	);
}