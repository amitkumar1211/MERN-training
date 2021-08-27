var mysql = require('mysql');

// create a connection variable with the required details
var con = mysql.createConnection({
  host: "localhost",    // ip address of server running mysql
  user: "root",    // user name to your mysql database
  password: "root", // corresponding password
  database: "node_mysql_crud_db" // use the specified database
});

// make to connection to the database.
con.connect(function(err) {
  if (err) throw err;
  
  //query
  //var name = "Amit";
  //var query = "SELECT * FROM employees where first_name=" + mysql.escape(name);
  
  var query = "INSERT INTO employees (first_name, last_name, email) VALUES ?";
  
  var records = [
	['Rajiv', 'Sinha', 'rajiv@gmail.com'],
	['Sumit', 'Kumar', 'sumit@gmail.com'],
	['Rakesh', 'Sinha', 'rakesh@gmail.com']
  ];
  
  // if connection is successful
  con.query(query, [records], function (err, result, fields) {
	  
    // if any error while executing above query, throw error
    if (err) throw err;
	
    // iterate for all the rows in result
    /*Object.keys(result).forEach(function(key) {
      var row = result[key];
      console.log(row.first_name)
    });*/
  });
});

