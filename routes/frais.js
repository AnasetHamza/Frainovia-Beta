//var request=require('request');

var request = require('request-json');
var client = request.createClient('http://localhost:8080/FrainoviaBack/');

exports.list = function(req, res){


	client.post('http://localhost:8080/FrainoviaBack1/frais',req.user.username,function (error, response, body) {
		  if (!error && response.statusCode == 200) {

			  res.render('frais',{page_title:"frais - Node.js",data:body,user:req.user});			  
		  }
		});
	
};

exports.list_mois = function(req, res){
	
  var data = {
		"consultant":req.user.username,
		"mois": req.body.mois
  	};

  
	client.post('http://localhost:8080/FrainoviaBack1/fraismois',data,function (error, response, body) {
		  if (!error && response.statusCode == 200) {

			  res.render('frais',{page_title:"frais - Node.js",data:body,user:req.user});

		  }
		});
	
};

exports.delete = function(req,res){
	console.log(req.params.fraisId);
	client.post('http://localhost:8080/FrainoviaBack1/removeFrais/'+req.params.fraisId,req.user.username,function (error, response, body) {
		  if (!error && response.statusCode == 200) {					
			  res.render('frais',{page_title:"frais - Node.js",data:body,user:req.user});			  
		  }
		});

};

exports.add = function(req, res){
        res.render('ajouterFrais',{page_title:"Add frais - Node.js",user:req.user});
};




