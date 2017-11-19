var express = require('express');
var app = express();

var pg = require("pg"); // This is the postgres database connection module.
const connectionString = "postgres://postgres:root@localhost:5432/budget";

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getUser', function(request, response) {
	getUser(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function getUser(request, response) {	
	console.log("get User");	
	var id = request.query.id;

	if(id!=null){
		console.log("id not NULL");	
		// use a helper function to query the DB, and provide a callback for when it's done
		getUserFromDb(id, function(error, result) {
			// This is the callback function that will be called when the DB is done.
			// The job here is just to send it back.

			// Make sure we got a row with the person, then prepare JSON to send back
			if (error || result == null || result.length != 1) {
				response.status(500).json({success: false, data: error});
			} else {
				var person = result[0];
				response.status(200).json(result[0]);
			}
		});		
	}else{
		console.log("The Id is null");	
	}

	
}

function getUserFromDb(id, callback) {
	console.log("Getting user from DB with id: " + id);

	var client = new pg.Client(connectionString);

	client.connect(function(err) {
		if (err) {
			console.log("Error connecting to DB: ")
			console.log(err);
			callback(err, null);
		}

		var sql = "SELECT id, name FROM user WHERE id = $1::int";
		var params = [id];

		var query = client.query(sql, params, function(err, result) {
			// we are now done getting the data from the DB, disconnect the client
			client.end(function(err) {
				if (err) throw err;
			});

			if (err) {
				console.log("Error in query: ")
				console.log(err);
				callback(err, null);
			}

			console.log("Found result: " + JSON.stringify(result.rows));

			// call whatever function the person that called us wanted, giving it
			// the results that we have been compiling
			callback(null, result.rows);
		});
	});

} 