# saana-challenge

This challenge was developed with sails, angular and mongodb.
The authentication was implemented with jwt tokens.


## frontend description

The application is divided into 3 modules: App, Auth and Private.
"App" is the root module, "Auth" countains all authentication related functionality and "Private" contains the welcome component.

### routing
- only 2 routes are accepted:
- /landing (default) : allows login or register
- /welcome (requires auth) : allows logout and view quote collection

Access to welcome page requires a positive signal from auth-guard (client-side control that enforces there is a jwt token with the expected name)

Both registration and login forms perform email and password validation and unlock the submit function once the inputs are valid.
There is no failure behaviour on the UI, but the responses from the server provide enought information (check console).   


## backend description

The backend consists in 2 modules: Users and Dummy.

the backend accepts 4 routes:
- 'POST /signup': 'UsersController.signup',
- 'POST /login': 'UsersController.login',
- 'GET /logout': 'UsersController.logout',
- 'GET /dummy': 'DummyController.getData'


login and signup are public but the others are kept private using the policy "isAuthenticated" which calls the helper method "verifyToken"

## deployment & dockerization

## user guide

- open a terminal in saana-challenge folder
- run ./launcher.sh
- open your browser and navigate to http://0.0.0.0:4200/

you can register a new user, login with a previously create user, logout and view quotes loaded from Dummy collection
