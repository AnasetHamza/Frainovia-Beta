// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

var mysql      = require('mysql');
 
var pool      =    mysql.createPool({
    connectionLimit : 85, //important
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'erp_db',
    debug    :  false
});


// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(

        function(user, done) {
       
            done(null,user);
        }

        );

    // used to deserialize the user
    // passport.deserializeUser(function(id, done) {
    //     connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
    //         done(err, rows[0]);
    //     });
    // });


    //=========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy
                ({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
                    },
                        function(req, username, password, done)
                        {
                            
                                if(username===password && username==='sakah'){

                                        return done(null,{username:username,password:password,role:'admin'});

                                }
                                 if(username===password){

                                        return done(null,{username:username,password:password});

                                }
                                else{
                                    return done(null, false, req.flash('loginMessage', 'Nom ou mot de passe Incorrect(s)'));
                                }

                        }
        )
    );
}

//     // =========================================================================
//     // LOCAL LOGIN =============================================================
//     // =========================================================================
//     // we are using named strategies since we have one for login and one for signup
//     // by default, if there was no name, it would just be called 'local'

//     passport.use(
//         'local-login',
//         new LocalStrategy({
//             // by default, local strategy uses username and password, we will override with email
//             usernameField : 'username',
//             passwordField : 'password',
//             passReqToCallback : true // allows us to pass back the entire request to the callback
//         },
//         function(req, username, password, done) { // callback with email and password from our form
            
//             pool.getConnection(function(err,connection){

//                 if (err) {
//                     //connection.release();
//                     res.json({"code" : 100, "status" : "Error in connection database","err":err});
//                     return;
//                   }   

//               console.log('connected as id ' + connection.threadId);
             
//             var query=connection.query("SELECT * FROM T_Consultant WHERE username = ?",[username], function(err, rows){
//                 if (err)
//                     return done(err);
//                 if (!rows.length) {
//                     return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
//                 }

//                 // if the user is found but the password is wrong
//                 if (password != rows[0].password)
//                     return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

//                 // all is well, return successful user
//                 return done(null, rows[0]);
//             });
//               // connection.on('error', function(err) {      
//               //       res.json({"code" : 100, "status" : "Error in connection database"});
//               //       return;     
//               // });
               
//                console.log(query.sql);
//           });

            
//         })
//     );
// };


    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    // passport.use(
    //     'local-signup',
    //     new LocalStrategy({
    //         // by default, local strategy uses username and password, we will override with email
    //         usernameField : 'username',
    //         passwordField : 'password',
    //         passReqToCallback : true // allows us to pass back the entire request to the callback
    //     },
    //     function(req, username, password, done) {
    //         // find a user whose email is the same as the forms email
    //         // we are checking to see if the user trying to login already exists
    //         connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
    //             if (err)
    //                 return done(err);
    //             if (rows.length) {
    //                 return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
    //             } else {
    //                 // if there is no user with that username
    //                 // create the user
    //                 var newUserMysql = {
    //                     username: username,
    //                     password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
    //                 };

    //                 var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

    //                 connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
    //                     newUserMysql.id = rows.insertId;

    //                     return done(null, newUserMysql);
    //                 });
    //             }
    //         });
    //     })
    // );

    