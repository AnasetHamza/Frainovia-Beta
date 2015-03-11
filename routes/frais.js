
/*
 * GET users listing.
 */
var mysql      = require('mysql');
 
var dbconfig = require('../config/database');

var pool      =    mysql.createPool(dbconfig.db);


exports.list = function(req, res){

        pool.getConnection(function(err,connection){

            if (err) {
                //connection.release();
                res.json({"code" : 100, "status" : "Error in connection database","err":err});
                return;
              }   

              console.log('connected as id ' + connection.threadId);
             
              var query = connection.query('SELECT *, DATE_FORMAT(T_Frais.date, \'%d/%m/%y\') as date FROM T_Frais WHERE T_Frais.consultant=? and MONTH(T_Frais.date) = EXTRACT( MONTH FROM CURRENT_DATE )',[req.user.username],function(err,rows)
              {
                  connection.release();
                  if(!err) {
                  res.render('frais',{page_title:"frais - Node.js",data:rows,user:req.user});
                  console.log(rows);
                  }
                 
               });
              // connection.on('error', function(err) {      
              //       res.json({"code" : 100, "status" : "Error in connection database"});
              //       return;     
              // });
               
               console.log(query.sql);
          });
  
};


exports.list_mois = function(req, res){

        var input = JSON.parse(JSON.stringify(req.body));
        console.log(input);

        var data = {
                    
                    mois: input.mois,
                    annee:input.annee
                };

        pool.getConnection(function(err,connection){

            if (err) {
                connection.release();
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
              }   

              console.log('connected as id ' + connection.threadId);
             
             // var query = connection.query('SELECT *, DATE_FORMAT(T_Frais.date, \'%d/%m/%y\') as date FROM T_Frais WHERE MONTH(T_Frais.date) = ? and YEAR(T_Frais.date) = ?',[data.mois[0],data.mois[1]],function(err,rows)
              var query = connection.query('SELECT *,DATE_FORMAT(T_Frais.date, \'%d/%m/%y\') as date FROM T_Frais WHERE T_Frais.consultant=? and YEAR(T_Frais.date)=? and MONTH(T_Frais.date) = ? ',[req.user.username,input.annee,input.mois],function(err,rows)
              {
                   connection.release();
                  if(!err) {
                  res.render('frais',{page_title:"frais - Node.js",data:rows,user:req.user});
                  console.log(rows);
                  }
                 
               });
              connection.on('error', function(err) {      
                    res.json({"code" : 100, "status" : "Error in connection database"});
                    return;     
              });
               
               console.log(query.sql);
          });
  
};



exports.add = function(req, res){
        res.render('ajouterFrais',{page_title:"Add frais - Node.js",user:req.user});
};



exports.edit = function(req, res){
    
        var fraisId = req.params.fraisId;
        pool.getConnection(function(err,connection){

          if (err) {
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
            } 

            console.log('connected as id ' + connection.threadId);
           
            var query = connection.query('SELECT *,DATE_FORMAT(T_Frais.date, \'%Y-%m-%d\') as date FROM T_Frais WHERE fraisId = ?',[fraisId],function(err,rows){
                connection.release();
                if(!err) {
                      res.render('editerFrais',{page_title:"Edit frais - Node.js",data:rows,user:req.user});
                      console.log(rows);  
                }
               
             });
            connection.on('error', function(err) {      
                  res.json({"code" : 100, "status" : "Error in connection database"});
                  return;     
            });
             

             console.log(query.sql);
        });


};

/*Save the customer*/
exports.save = function(req,res){
    

        var input = JSON.parse(JSON.stringify(req.body));
        console.log(input.date);
        var data = {
                    
                    libelle: input.libelle,
                    date   : input.date,
                    client : input.client,
                    consultant: req.user.username,
                    type   : input.type,
                    cout   : input.cout,
                    status : "En cours",
                    commentaireConsultant:input.commentaireConsultant
                };

                console.log(data.status);

        pool.getConnection(function(err,connection){

          if (err) {
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
            } 

            console.log('connected as id ' + connection.threadId);
           
            var query = connection.query("INSERT INTO T_Frais set ? ",data,function(err,rows){
                connection.release();
                if(!err) {
                      res.redirect('/frais');
                }
               
             });
            connection.on('error', function(err) {      
                  res.json({"code" : 100, "status" : "Error in connection database"});
                  return;     
            });
             
             console.log(query.sql);
        });

};

exports.save_edit = function(req,res){
    
          var input = JSON.parse(JSON.stringify(req.body));
          var fraisId = req.params.fraisId;
          var data = {
                      
                      libelle:input.libelle,
                      client : input.client,
                      type   : input.type,
                      cout   : input.cout,
                      commentaireConsultant:input.commentaireConsultant
                  };
          pool.getConnection(function (err, connection) {
          
                if (err) {
                connection.release();
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
              } 

              console.log('connected as id ' + connection.threadId);
              
              var query = connection.query("UPDATE T_Frais set ? WHERE fraisId = ? ",[data,fraisId], function(err, rows)
              {
                connection.release();
        
                if(!err) {
                        res.redirect('/frais');
                  }
                 
               });

              connection.on('error', function(err) {      
                    res.json({"code" : 100, "status" : "Error in connection database"});
                    return;     
              });
               
              console.log(query.sql);
          });

};

exports.delete = function(req,res){
          
         var fraisId = req.params.fraisId;
        
         pool.getConnection(function (err, connection) {

            if (err) {
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
            } 
            
            console.log('connected as id ' + connection.threadId);

            var query = connection.query("DELETE FROM T_Frais  WHERE fraisId = ? ",[fraisId], function(err, rows)
            {
                  connection.release();
                  console.log(rows);
                  if(err)  console.log("Error deleting : %s ",err );
                
                 res.redirect('/frais');
                 console.log(query.sql);
            });
            
         });

};



///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
//*********Partie Admin*********///////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////


exports.adminlistFraisConsultantMois = function(req, res){

          var input = JSON.parse(JSON.stringify(req.body));
          var data = {
                      
                      consultantId: input.consultantId,
                      mois: input.mois,
                      annee:input.annee
                   
                  };

                console.log(data);  
        pool.getConnection(function(err,connection){

            if (err) {
                //connection.release();
                res.json({"code" : 100, "status" : "Error in connection database","err":err});
                return;
              }   

              console.log('connected as id ' + connection.threadId);
             
              var query = connection.query('SELECT *,DATE_FORMAT(T_Frais.date, \'%d/%m/%y\') as date FROM T_Frais WHERE T_Frais.consultantId=? and YEAR(T_Frais.date)=? and MONTH(T_Frais.date) = ? ',[input.consultantId,input.annee,input.mois],function(err,rows)
              {
                // if (err) {
                // //connection.release();
                // res.json({"code" : 100, "status" : "Error in connection database","err":err});
                // return;
                // }   
                   connection.release();
                  if(!err) {
                  res.render('adminFrais',{page_title:"frais - Node.js",data:rows,user:req.user});
                  //console.log(rows);
                  }
                 
               });
              // connection.on('error', function(err) {      
              //       res.json({"code" : 100, "status" : "Error in connection database"});
              //       return;     
              // });
               
               console.log(query.sql);
          });
  
};







