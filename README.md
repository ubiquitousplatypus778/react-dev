# Development

### Link to Deployed Website
https://ubiquitousplatypus778.github.io/react-dev/

### Goal and Value of the Application
The interface is designed to help users view the information of a list of properties and select a property of their choice. 

### Usability Principles Considered
I used a grid layout to better present the list of houses. A panel of checkboxes is located to the left of the house cards to provide filters and sorting methods and help users better navigate through the website.

### Organization of Components
I used two components: HouseItem and CartItem to organize the code. HouseItem is used to render cards of houses that contain their names, prices, locations and short descriptions. CartItem is used to render items that have been added to the "Favorites".

### How Data is Passed Down Through Components
I used "props" to pass down data to the components. For the HouseItem, I also used a state to record whether the "Add to Favorites" button on the house cards has been clicked or not. 

### How the User Triggers State Changes
Whenever a checkbox is checked, the state "isChecked" changes according to the corresponding checkbox, which then cause React to rerender the webpage with the updated information. When the "Add to Favorites" button or "Remove from Favorites" button is clicked, the state "status" within the HouseItem component is changed and the house is added to or removed from "favHouses".

