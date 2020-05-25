/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var jwt = require('jsonwebtoken');

module.exports = {

  /**
   * Check the provided email address and password, and if they
   * match a real user in the database, sign in to Activity Overlord.
   */
  login: async function (req, res) {

    // Try to look up user using the provided email address
    var user = await User.findOne({
      email: req.param('email')
    })

    if (!user) {
  sails.log('Could not find Finn, sorry.');
}
else {
        // Compare password attempt from the form params to the encrypted password
      // from the database (`user.password`)
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({

        error: function (err){
          return res.negotiate(err);
        },

        // If the password from the form params doesn't checkout w/ the encrypted
        // password from the database...
        incorrect: function (){
          sails.log('password dont match');
          return res.notFound();
        },

        success: function (){
          sails.log('correct password');
          var token = jwt.sign({user: user.id}, "secret")
          // Store user id in the user session
          req.session.me = user.id;
        
              res.cookie('sailsjwt', token, {
              signed: true,
            })
            

          // All done- let the client know that everything worked.
              return res.json({
                id: user.id
              });
        }
      });
}


  },

  /**
   * Sign up for a user account.
   */
  signup:  async function(req, res) {
  	var Passwords = require('machinepack-passwords');
  	Passwords.encryptPassword({
      password: req.param('password'),
      difficulty: 10,
    }).exec( (err, encryptedPassword) =>{
    	if(err){
    		return res.negotiate(err);
        sails.log('problem encrypting password');
    	}
    	else {
    		var newUser = User.create({
              email: req.param('email'),
              encryptedPassword: encryptedPassword,
            }).fetch().exec( (err,newUser)=>{
            	if (err) {
                console.log("err: ", err.code);
                // If this is a uniqueness error about the email attribute,
                // send back an easily parseable status code.
                if (err.code === 'E_UNIQUE') {
                  sails.log('email is not unique');
                  return res.emailAddressInUse();
                }
              }
              else{
              // Log user in
              req.session.me = newUser.id;
              sails.log('welcome new user');
              var token = jwt.sign({user: newUser.id},"secret")
              
              res.cookie('sailsjwt', token, {
                signed: true,
              });
              

              sails.log(token)

              // Send back the id of the new user
              return res.json({
                id: newUser.id
              });
              }
            	
            } )
    }
})
},


  /**
   * Log out of Activity Overlord.
   * (wipes `me` from the sesion)
   */
  logout: function (req, res) {

    // Look up the user record from the database which is
    // referenced by the id in the user session (req.session.me)
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return res.negotiate(err);

      // If session refers to a user who no longer exists, still allow logout.
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.backToHomePage();
      }

      // Wipe out the session (log out)
      req.session.me = null;
      res.clearCookie('sailsjwt');

      // Either send a 200 OK or redirect to the home page
      return res.backToHomePage();

    });
  }


}



