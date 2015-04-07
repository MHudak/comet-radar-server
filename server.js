var express = require('express');
var app = express();
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : '69.195.124.139',
  user     : 'bsxpccom_teamX',
  password : 'C$1RFKqdCr&w',
  database : 'bsxpccom_cometradar'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

app.use(express.static('CometRadarAdmin'));

// app.get('/api/getRoutes', function (req, res) {
// 	//res.send('Hello World!');
// 	connection.query('SELECT * FROM `routes` ', function (error, results, fields) {
//   // error will be an Error if one occurred during the query
//   // results will contain the results of the query
//   // fields will contain information about the returned results fields (if any)
//   		console.log('Error: ' + error);
//   		console.log('Results: ' + results);
//   		res.send(results);
//   		//connection.end(function(err) {
//   	// The connection is terminated now
// 		//});
// 	});	
  	
// });

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});



