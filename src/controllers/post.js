const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);
const queryString = require("query-string");
// pool.on('connection', function (connection) {
//     connection.query('SET SESSION auto_increment_increment=1');
// });

pool.on("error", (err) => {
  console.log(err);
});

module.exports = {
  // getAll: function (req, res) {
  //   pool.getConnection(function (err, connection) {
  //     if (err) throw err;
  //     connection.query(
  //       "select article.*,channel.* from article join channel on channel.id = article.id_channel ",
  //       function (error, results) {
  //         if (error) throw error;
  //         res.send({
  //           status: 200,
  //           message: "Success",
  //           response: results,
  //         });
  //       }
  //     );
  //     connection.release();
  //   });
  // },
  getAll: function (req, res) {
    let query = queryString.parse(req.url);
    let page = query.page || 1;
    let limit = query.limit || 10;
    let offset = (page - 1) * limit;
    let sql = `select article.*,channel.* from article join channel on channel.id = article.id_channel limit ${offset},${limit}`;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(sql, function (error, results) {
        if (error) throw error;
        res.send({
          status: 200,
          message: "Success",
          response: results,
        });
      });
      connection.release();
    });
  }
};
