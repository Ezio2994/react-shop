# The Sicilian Shop

I've built this app to showcase my skills on react, The app is usable either if you sign in with google or
as a guest. <br>

## Firebase
The dataBase (with the products the user admin want to sell), it's built on cloud firestore so that the quantity of the products it's updated everytime a user buy something therefore products cannot be oversold.

## Admin
By requesting the admin right to me (You can do it by contacting me on ezio.intravaia@hotmail.com), the user admin can add, update or remove product to the app from the setting app without having to approch firebase.

## Guests
As a user guest when something is added in the cart, through an API which get the guest user IP address, the product added on the cart is going to be attached to the guest user API therefore
when the guest user comes back another day is still going to find everything that was left on the cart.

## User
By signin in with google, the user is going to have the chance to save products as favourites. <br>
Products added as favourites or put in the cart are going to be saved to user.uid in cloud firestore.

