var express    = require("express");
var path = require('path');


var fs = require('fs');
var https = require('https');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var passport = require('passport');
var flash    = require('connect-flash');

var app = express();


require('./config/passport')(passport); // pass passport for configuration

// set up our express application
//app.use(express.logger('dev'));
app.use( bodyParser.json());
app.use( bodyParser.urlencoded(({ extended: true }))); 
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser()); // read cookies (needed for auth)
app.use(cookieSession({ secret: 'NoteDeFraisSecret' })); // get information from html forms


//app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


var routes = require('./routes');
var RechercheAdminController = require('./routes/RechercheAdminController');
var path = require('path');
var frais = require('./routes/frais');





app.get('/frais', isLoggedIn, frais.list);
app.post('/frais/list_mois',isLoggedIn, frais.list_mois);
app.get('/frais/add', isLoggedIn,frais.add);
app.post('/frais/add',isLoggedIn, frais.save);
app.get('/frais/delete/:fraisId', isLoggedIn,frais.delete);
app.get('/frais/edit/:fraisId', isLoggedIn,frais.edit);
app.post('/frais/edit/:fraisId',isLoggedIn,frais.save_edit);


app.get('/admin/index',isLoggedIn,isAdmin, RechercheAdminController.listConsultant);
app.post('/admin/index',isLoggedIn,isAdmin,RechercheAdminController.listConsultant);
app.get('/admin/valider/:fraisId', isLoggedIn,isAdmin,RechercheAdminController.validerFrais);
app.get('/admin/commenter/:fraisId', isLoggedIn,isAdmin,RechercheAdminController.commenterFrais);
app.post('/admin/commenter/:fraisId', isLoggedIn,isAdmin,RechercheAdminController.save_commenterFrais);




app.get('/login',notLoggedIn,function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/frais', // redirect to the secure frais section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/login');
    });




app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/login');
});

app.use(function(req, res) {res.redirect('/frais');})

function isAdmin(req, res, next) {

	if (req.user.role==='admin')	return next();

	res.redirect('/login');


}


	

function notLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (!req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/frais');
}
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}



// There are many useful environment variables available in process.env.
// VCAP_APPLICATION contains useful information about a deployed application.
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
// TODO: Get application information and use it in your app.

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
// TODO: Get service credentials and communicate with bluemix services.

//// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
//var host = (process.env.VCAP_APP_HOST || 'localhost');
//// The port on the DEA for communication with the application:
//var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
var acces=require('./config/ipadress')

app.listen(acces.port,acces.host);
console.log('App started on port ' + acces.port);