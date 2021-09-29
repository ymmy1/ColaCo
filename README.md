# <img src="https://i.imgur.com/CW7vYWm.png" alt="drawing" width="40px"/> ColaCo Vending
ColaCo Vending is a webpage that acts as the UI for customers to buy virtual sodas. It looks and feels as much like a traditional soda
vending machine. When the customer purchases a soda, the browser will download a JSON
soda file. The vending machine will to generate the correct soda file based off the purchase.

There is a built HTTP API that allows an admin to check the status of the vending
machine and re-stock it. 

The backend is built using NodeJS and React for the frontend.


## Getting Started with colaCo
* npm install (to install node packages from package.json)
* npx json-server --watch data/soda_api.json --port 8000 (creates HTML API)
* npm start (Run the application)

## Usage
### Log in as Admin or Customer

![](https://i.imgur.com/jwBkLiz.png)

#### Customer Page

![](https://i.imgur.com/LLeor4o.png)

##### Select a Drink!
![](https://i.imgur.com/qIDKAlt.png)
##### Make a Deposit!
![](https://i.imgur.com/JqfG0tQ.png)
##### Hit Buy!
![](https://i.imgur.com/bvTFQT5.png)
##### Get a JSON file receipt
![](https://i.imgur.com/CQqno1x.png)

#### Admin Page
![](https://i.imgur.com/GTEZ42p.png)
##### Update Prices & Restock!
![](https://i.imgur.com/X4NhJgt.png)

## Footer
### Coming Soon Features
There are lots of interesting features ideas that can be implemented to this project, some of the ideas are listed below: 
#### Admin Page
* Adding New soda
* Fully Editing existing soda Info
* Total Sells Count
* Total Profit Count
* ...
#### Customer Page
* Availability to deposit different amounts of money
* Availability to delete an item from the cart
* Availability to fully erase all drink from the cart
* ...