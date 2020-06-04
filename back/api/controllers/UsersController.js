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
    var user = await Users.findOne({
      email: req.param('email')
    })

    if (!user) {
  sails.log('Could not find Finn, sorry.');
// All done- let the client know that everything worked.
  return res.json({
    result: "no such user"
  });
}
else {
        // Compare password attempt from the form params to the encrypted password
      // from the database (`user.password`)
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({

        error: function (err){
             return res.json({
                data: err
              });
        },

        // If the password from the form params doesn't checkout w/ the encrypted
        // password from the database...
        incorrect: function (){
          sails.log('password dont match');
              return res.json({
                data: "wrong password"
              });
        },

        success: function (){
          sails.log('correct password');
          var token = jwt.sign({user: user.id}, sails.config.tokenSecret)
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
  	sails.log("signup:");
  	sails.log(req.param("password"));
  	var Passwords = require('machinepack-passwords');
  	Passwords.encryptPassword({
      password: req.param('password'),
      difficulty: 10,
    }).exec( (err, encryptedPassword) =>{
    	if(err){
        sails.log('problem encrypting password');
        sails.log(err);
        return res.json({
                data: err
              });
    	}
    	else {
    		var newUser = Users.create({
              email: req.param('email'),
              encryptedPassword: encryptedPassword,
            }).fetch().exec( (err,newUser)=>{
            	if (err) {
                sails.log("err2: ", err.code);
                // E_INVALID_NEW_RECORD
                // If this is a uniqueness error about the email attribute,
                // send back an easily parseable status code.
                if (err.code === 'E_INVALID_NEW_RECORD') {
                  sails.log(err);
                  return res.json({
                data: err
              });
                }
                if (err.code === 'E_UNIQUE') {
                  sails.log(err);
                  return res.json({
                data: err
              });
                }
              }
              else{

              // Log user in
              req.session.me = newUser.id;
              sails.log('welcome new user');
              var token = jwt.sign({user: newUser.id},sails.config.tokenSecret)
              sails.log(token)
              res.cookie('sailsjwt', token, {
                signed: true,
              })
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
  	  	sails.log("logout:");
      req.session.destroy(function(err) {
          setTimeout(function(){
      return res.json({});
          }, 2500); // redirect wait time 2.5 seconds
        });


   // });
  }


}



