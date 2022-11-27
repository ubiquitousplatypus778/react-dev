// TODO: create a component that displays a single house item
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


export default function HouseItem(props) {

    const [status, setStatus] = useState(true);
    function handleClick() {
        if (status) {
            props.addFavorite(props, props.price, props.name)
            setStatus(!status)
        }else {
            props.removeFavorite(props, props.price, props.name)
            setStatus(!status)
        }
    }

	return (
		<Card sx={{ width: 300, height: 540}}>
            <CardHeader
                title = {props.name}
            />
            <CardContent>
                <Typography paragraph  color="text.secondary">
                    $ {props.price} million | Size: {props.size} sqft
                    <br/> Location: {props.location}
                </Typography>
                {/* <Typography paragraph  color="text.secondary">
                    Location: {props.location} 
                </Typography> */}
                <Typography paragraph variant="body2" color="text.secondary">
                {props.description}
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                height="194"
                image={props.image}
                alt=" A haunted house..."
            />
            <CardContent>
                {/* <Button variant="outlined" color="secondary" onClick={() => props.cart(props.price, props.name)}>{buttonText}</Button> */}
                {/* <Button variant="outlined" color="secondary" onClick={() => setStatus(!status)}>{`${status ? 'Add to Favorites' : 'Remove From Favorites'}`}</Button> */}
                <Button variant="outlined" color="secondary" onClick={handleClick}>{`${status ? 'Add to Favorites' : 'Remove From Favorites'}`}</Button>

            </CardContent>
            {/* <img src={props.image} style={{ width: 300, height: 200 }}></img> */}
        </Card>
	);
}