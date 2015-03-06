
/*
 * GET users listing.
 */
var mysql      = require('mysql');
 
var pool      =    mysql.createPool({
    connectionLimit : 85, //important
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'erp_db',
    debug    :  false
});


exports.list = function(req, res){

  pool.getConnection(function(err,connection){

      if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
       
        var query = connection.query('SELECT * FROM T_Frais',function(err,rows)
        {
             connection.release();
            if(!err) {
            res.render('customers',{page_title:"Customers - Node.js",data:rows});
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
  res.render('add_customer',{page_title:"Add Customers - Node.js"});
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
       
        var query = connection.query('SELECT * FROM T_Frais WHERE fraisId = ?',[fraisId],function(err,rows){
            connection.release();
            if(!err) {
                  res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:rows});
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
    var data = {
                
                libelle : input.libelle,
                client : input.client,
                type   : input.type,
                cout   : input.cout,
                commentaireConsultant:input.commentaireConsultant
            };

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
                  res.redirect('/customers');
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
                  res.redirect('/customers');
            }
           
         });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
         
        console.log(query.sql);
    });

};

exports.delete_customer = function(req,res){
          
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

             if(err)  console.log("Error deleting : %s ",err );
            
             res.redirect('/customers');
             console.log(query.sql);
        });
        
     });

};


