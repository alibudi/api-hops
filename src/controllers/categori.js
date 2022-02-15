const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

// pool.on('connection', function (connection) {
//     connection.query('SET SESSION auto_increment_increment=1');
// });

pool.on('error',(err)=>{
    console.log(err);
    });

    module.exports ={
        getAll: function(req,res){
            pool.getConnection(function(err,connection){
                if(err) throw err;
                connection.query('SELECT * FROM channel',function(error,results){
                    if(error) throw error;
                    res.send({
                        "status": 200,
                        "message": "Success",
                        "response": results
                    });
                });
                    connection.release();
        })
    },

    getById: function(req,res){
        pool.getConnection(function(err,connection){
            if(err) throw err;
            connection.query('SELECT * FROM channel WHERE slug = ?',[req.params.slug],function(error,results){
                if(error) throw error;
                res.send({
                    "status": 200,
                    "message": "Success",
                    "response": results
                });
            });
                connection.release();
        })
    },

    
}