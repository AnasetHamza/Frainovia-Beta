var express    = require("express");
var path = require('path');
var fs = require('fs');
var https = require('https');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var passport = require('passport');
var flash    = require('connect-flash');
var RechercheAdminController = require('./routes/RechercheAdminController');
var frais = require('./routes/frais');
var acces=require('./config/ipadress');
var pass=require('./config/funct');

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




app.get('/frais', pass.isLoggedIn, frais.list);
app.post('/frais/list_mois',pass.isLoggedIn, frais.list_mois);
app.get('/frais/add', pass.isLoggedIn,frais.add);
//app.post('/frais/add',pass.isLoggedIn, frais.save);
//app.get('/frais/delete/:fraisId', pass.isLoggedIn,frais.delete);
//app.get('/frais/edit/:fraisId', pass.isLoggedIn,frais.edit);
//app.post('/frais/edit/:fraisId',pass.isLoggedIn,frais.save_edit);
	

app.get('/admin/index',pass.isLoggedIn,pass.isAdmin, RechercheAdminController.listConsultant);
app.post('/admin/index',pass.isLoggedIn,pass.isAdmin,RechercheAdminController.listConsultant);
app.get('/admin/valider/:fraisId', pass.isLoggedIn,pass.isAdmin,RechercheAdminController.validerFrais);
app.get('/admin/commenter/:fraisId', pass.isLoggedIn,pass.isAdmin,RechercheAdminController.commenterFrais);
app.post('/admin/commenter/:fraisId', pass.isLoggedIn,pass.isAdmin,RechercheAdminController.save_commenterFrais);




app.get('/login',pass.notLoggedIn,function(req, res) {
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

app.listen(acces.port,acces.host);
console.log('App started on port ' + acces.port);