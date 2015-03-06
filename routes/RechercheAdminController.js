
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


exports.index = function(req, res){
  res.render('indexAdmin', { title: 'Hello World' });
};

exports.listConsultant = function(req, res){

        var input = JSON.parse(JSON.stringify(req.body));

        pool.getConnection(function(err,connection){

                        if (err) {
                            connection.release();
                            res.json({"code" : 100, "status" : "Error in connection database"});
                            return;
                          }   

                          console.log('connected as id ' + connection.threadId);
             
                        var query = connection.query('SELECT consultantId,nom,prenom FROM T_Consultant ',function(err,rows)
                        {
                                     if (err) {
                                        connection.release();
                                        res.json({"code" : 100, "status" : "Error in connection database"});
                                        return;
                                    }
                                    var query = connection.query('SELECT *,DATE_FORMAT(T_Frais.date, \'%d/%m/%y\') as date FROM T_Frais WHERE T_Frais.consultant=? and YEAR(T_Frais.date)=? and MONTH(T_Frais.date) = ? ',[input.consultant,input.annee,input.mois],function(err,rows2)
                                    {
                                         if (err) {
                                            connection.release();
                                            res.json({"code" : 100, "status" : "Error in connection database"});
                                            return;
                                        }
                                        

                                        console.log(rows);

                                        console.log(rows2);
                                        connection.release();
                                        if(!err) {
                                        
                                          res.render('indexAdmin',{nom:input.consultant,mois:input.mois,annee:input.annee,data:rows,data2:rows2,user:req.user});
                                        
                                         }
                                   
                                   
                                    });

                        // connection.on('error', function(err) {      
                        //       res.json({"code" : 100, "status" : "Error in connection database"});
                        //       return;     
                        // });
                         
                         // console.log(query1.sql);
                         // console.log(query2.sql);
                    });
    });
  
};


exports.validerFrais = function(req,res){
    
          var input = JSON.parse(JSON.stringify(req.body));
          var fraisId = req.params.fraisId;

          pool.getConnection(function (err, connection) {
          
                if (err) {
                connection.release();
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
              } 

              console.log('connected as id ' + connection.threadId);
              
              var query = connection.query("UPDATE T_Frais set T_Frais.status= \'Validé\' WHERE fraisId = ? ",[fraisId], function(err, rows)
              {
                connection.release();
        
                if(!err) {
                        res.redirect('/admin/index');
                  }
                 
               });

              connection.on('error', function(err) {      
                    res.json({"code" : 100, "status" : "Error in connection database"});
                    return;     
              });
               
              console.log(query.sql);
          });

};



exports.commenterFrais = function(req, res){
    
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
                      res.render('adminCommenter',{page_title:"Edit frais - Node.js",data:rows,user:req.user});
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

exports.save_commenterFrais = function(req,res){
    
          var input = JSON.parse(JSON.stringify(req.body));
          var fraisId = req.params.fraisId;
          // var data = {
                      
          //             libelle:input.libelle,
          //             client : input.client,
          //             type   : input.type,
          //             cout   : input.cout,
          //             commentaireConsultant:input.commentaireConsultant
          //         };
          pool.getConnection(function (err, connection) {
          
                if (err) {
                connection.release();
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
              } 

              console.log('connected as id ' + connection.threadId);
              
              var query = connection.query("UPDATE T_Frais set T_Frais.commentaireAdmin=? WHERE fraisId = ? ",[input.commentaireAdmin,fraisId], function(err, rows)
              {
                connection.release();
        
                if(!err) {
                        res.redirect('/admin/index');
                  }
                 
               });

              connection.on('error', function(err) {      
                    res.json({"code" : 100, "status" : "Error in connection database"});
                    return;     
              });
               
              console.log(query.sql);
          });

};

