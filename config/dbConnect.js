var mysql = require('mysql');

function connectSerner(){
	var client = mysql.createConnection({
		host: 'localhost:8080',
		user: 'root',
		password: '123456',
		database: 'mooc'
	});
	return client;
}

function selectFun(client, username, callback){
	client.query('select Lpwd from learner where LearnerNickname="'+LearnerNickname+'"', function(err, results, field){
		if(err) throw err;
		callback(results);
	});
}

function insertFun(client, username, password, callback) {
	// body...
	client.query('insert into learner value(?,?)', [LearnerNickname, Lpwd], function(err, results){
		if (err) {
			console.log("error: ", err.message);
			return err;
		}
		callback(err);
	});
}

exports.connect = connectSerner;
exports.selectFun = selectFun;
exports.insertFun = insertFun;
