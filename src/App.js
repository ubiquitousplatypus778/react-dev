//Source of pictures: https://unsplash.com/s/photos/
//Source of house descriptions: https://www.descriptionari.com/quotes/

import "./App.css";
import { useState } from "react";
import { Button, Grid, Box } from '@mui/material';
import houseData from "./assets/data.json";
import HouseItem from "./components/HouseItem.js";
import CartItem from "./components/CartItem.js";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { ContactSupportOutlined, ContentPasteOffOutlined } from "@mui/icons-material";


/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
houseData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // keeps track of which boxes are checked
  // correspondence: [price1, price2, price3, size1, size2, size3, sort by price, popular, favorite]
  const [ischecked, setIsChecked] = useState([false, false, false, false, false, false, false, false, false])

  const [items, setItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [houses, setHouses] = useState(houseData);
  const [favHouses, setFavHouses] = useState([]); // stores the favorites


  const addFavorite = (house, price, name) => {
    setItems(items + 1);
    setTotalPrice(totalPrice + price);
    setFavHouses((favHouses) => [...favHouses, house]);
    
    console.log("addFavorite", favHouses)
  }
  const removeFavorite = (house, price, name) => {
    setItems(items - 1);
    setTotalPrice(totalPrice - price);

    let pos = favHouses.map(e => e.name).indexOf(house.name);
    let outputHouses = [...favHouses];
    outputHouses.splice(pos, 1);
    //outputHouses = favHouses.slice(0,pos).concat(favHouses.slice(pos + 1))
    setFavHouses(outputHouses); // remove the corresponding item
    console.log("removeFavorite", favHouses)
    console.log("index being removed", pos);

  }

  const sortPrice = event => {
    const checked = event.target.checked;
    console.log(checked)
    if (checked) {
      const houseDataCopy = [...housesToDisplay]
      houseDataCopy.sort((a, b) => {
        return a.price - b.price;
      })
      setHousesToDisplay(houseDataCopy);
    }
  }

  const reset = event => {
    setHousesToDisplay(houseData);
    setIsChecked([false, false, false, false, false, false, false, false, false]);
  }

  const copyHouses = [...houses] // a copy that does not get modified
  const [housesToDisplay, setHousesToDisplay] = useState(houseData)
  const [housesToDisplay2, setHousesToDisplay2] = useState([])
  const [filteredHouses, setFilteredHouses] = useState([])

  const toggleCheck2 = (index) => {
    const newChecked = [...ischecked]
    newChecked[index] = !newChecked[index]
    console.log("in toggleCheck2", newChecked)
    setIsChecked(newChecked)
  }

  const toggleCheck = (index) => {
    const newChecked = [...ischecked]
    newChecked[index] = !newChecked[index]
    console.log(newChecked)
    setIsChecked(newChecked)
        
    var filteredPrice = []
    var filteredSize = []
  
    if (newChecked[0]) {
      console.log(0)
      const newHouses = filteredPrice.concat(copyHouses.filter((house) => house.price < 3))
      filteredPrice = newHouses
    }
    if (newChecked[1]) {
      console.log(1)
      const newHouses = filteredPrice.concat(copyHouses.filter((house) => house.price > 3 && house.price < 6 ))
      filteredPrice = newHouses
    }
    if (newChecked[2]) {
      console.log(2)
      const newHouses = filteredPrice.concat(copyHouses.filter((house) => house.price > 6))
      filteredPrice = newHouses
    }
    if (!newChecked[0] && !newChecked[1] && !newChecked[2]) {
      console.log("special!")
      filteredPrice = copyHouses
    }
    if (newChecked[3]) {
      const newHouses = filteredSize.concat(copyHouses.filter((house) => house.size < 6000))
      filteredSize = newHouses
    }
    if (newChecked[4]) {
      const newHouses = filteredSize.concat(copyHouses.filter((house) => house.size > 6000 && house.size < 10000))
      filteredSize = newHouses
    }
    if (newChecked[5]) {
      const newHouses = filteredSize.concat(copyHouses.filter((house) => house.size > 10000))
      filteredSize = newHouses
    }
    if (!newChecked[3] && !newChecked[4] && !newChecked[5]) {
      filteredSize = copyHouses
    }
    //console.log(filtered)
    console.log(housesToDisplay)

    // Sort by price
    if (newChecked[6]) {
      const houseDataCopy = filteredPrice.filter(house => filteredSize.includes(house))
      houseDataCopy.sort((a, b) => {
        return a.price - b.price;
      })
      console.log(houseDataCopy)
      setHousesToDisplay(houseDataCopy)
    }else if(newChecked[7]) {
      const houseDataCopy = filteredPrice.filter(house => filteredSize.includes(house))
      houseDataCopy.sort((a, b) => {
        return a.size - b.size;
      })
      setHousesToDisplay(houseDataCopy)
    }else  { // sort by popular (default)
      setHousesToDisplay(filteredPrice.filter(house => filteredSize.includes(house)))
    }

  }

  return (
    <div className="App">
      {/* <h1>Find Your Dream House</h1> */}
      <Typography alignItems="center" variant="h3" gutterBottom>
        Find Your Dream House
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'row', padding: 10 }} alignItems="center" padding={4}>
        <Drawer
          sx={{ width: 180, flexShrink: 0, '& .MuiDrawer-paper': { width: 200, boxSizing: 'border-box', padding: 1 }, }} variant="permanent" anchor="left" padding={4} margin-left={4}>
          <p></p>
          <FormControl>
            <FormGroup>
              {/* <FormControlLabel onChange={reset} control={<Checkbox />} value={[0, 6000]} label="Reset" /> */}
              <Button variant="outlined" color="secondary" size="small" style={{maxWidth: '30px', maxHeight: '30px'}} onClick={reset}>Reset</Button>
            </FormGroup>
          </FormControl>
          <p></p>
          <FormControl>
            <FormLabel id="sort-by">Sort By</FormLabel>
            <RadioGroup>
              <FormControlLabel value="non" onChange={() => toggleCheck(6)} control={<Radio checked={ischecked[7]}/>} label="Non" />
              <FormControlLabel value="price" onChange={() => toggleCheck(6)} control={<Radio checked={ischecked[6]}/>} label="Price (low to high)" />
            </RadioGroup>
          </FormControl>
          <p></p>
          <FormControl>
            <FormLabel id="price">Price</FormLabel>
            <FormGroup>
              <FormControlLabel onChange={() => toggleCheck(0)} control={<Checkbox checked={ischecked[0]}/>} value={[0, 3]} label="< $ 3 million" />
              <FormControlLabel onChange={() => toggleCheck(1)} control={<Checkbox checked={ischecked[1]}/>} value={[3, 6]} label="$ 3 - 6 million" />
              <FormControlLabel onChange={() => toggleCheck(2)} control={<Checkbox checked={ischecked[2]}/>} value={[6, 100000]} label="> $ 6 million" />
            </FormGroup>
          </FormControl>
          <p></p>
          <FormControl>
            <FormLabel id="size">Size</FormLabel>
            <FormGroup>
              <FormControlLabel onChange={() => toggleCheck(3)} control={<Checkbox checked={ischecked[3]}/>} value={[0, 6000]} label="< 6000 sqft" />
              <FormControlLabel onChange={() => toggleCheck(4)} control={<Checkbox checked={ischecked[4]}/>} value={[6000, 10000]} label="6000 - 10000 sqft" />
              <FormControlLabel onChange={() => toggleCheck(5)} control={<Checkbox checked={ischecked[5]}/>} value={[10000, 1000000]} label="> 10000 sqft" />
            </FormGroup>
          </FormControl>
          
          {/* <div>
            <h2>Favorites</h2>
            <p>Current number of items: {items}</p>
            <p>Current total price: $ {totalPrice} million</p>
          </div> */}


        </Drawer>

        <Grid container padding={1} spacing={{ xs: 2, md: 3 }} direction="row" justifyContent="center" alignItems="center">
          {housesToDisplay.map((item, index) => ( // TODO: map houseData to HouseItem components // replace with HouseItem component
            <Grid item xs={12} md={6} lg={4} key={index}>
              <HouseItem addFavorite={addFavorite} removeFavorite={removeFavorite} image={item.image} name={item.name} description={item.description}
                price={item.price} size={item.size} location={item.location}></HouseItem>
            </Grid>
          ))}

        </Grid>

        <Drawer sx={{ width: 180, flexShrink: 0, '& .MuiDrawer-paper': { width: 200, boxSizing: 'border-box', padding: 1 }, }} variant="permanent" anchor="right" padding={4} margin-left={4}>
          <Typography alignItems="center" variant="h5" gutterBottom>
            <br/>Favorites 
          </Typography>
          <p>Current total price:<br/>$ {totalPrice} million</p>

          {favHouses.map((item, index) => ( // TODO: map houseData to HouseItem components // replace with HouseItem component
            <Grid item xs={12} md={6} lg={4} key={index}>
              <CartItem image={item.image} name={item.name} description={item.description}
                price={item.price} size={item.size} location={item.location}></CartItem>
            </Grid>
          ))}

        </Drawer>
      </Box>

    

    </div>
  );
}

export default App;



