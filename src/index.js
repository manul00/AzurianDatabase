'use strict'
var express = require('express');
//var router= require('./routes/users');
var app = express();
var con = require('./database.js');
var cors = require('cors');
var bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3700);

//midlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());


//routes
// app.get('/getOne',(req,res)=>{
// 	let user = req.query.userName;
	
// 	let query = `SELECT userName FROM users WHERE userName = '${user}'`;
	
// 	con.query(query,(e,rows,fields)=>{
// 		if(e){
// 			console.log(e);
// 		}
// 		else
// 		{

// 			res.json(rows);
// 		}
// 	});
// });

app.get('/get',(req, res)=>{
	con.query('SELECT * from users',(e,rows,fields)=>{
	if(e){
		console.log(e);
	}
		
	else {	

		res.json(rows);
		}
	});
});


app.post('/create',(req,res)=>{
	var params = req.body;
	
	
	// var params = req.query;
	var name = params.userName;
	var age = params.age;
	var job = params.jobTitle;

	let query = `INSERT INTO users (userName, age, jobTitle) VALUES ('${name}','${age}','${job}')`;
    
	
  		con.query(query,(e,rows,fields)=>{

	//con.query("INSERT INTO users (userName, age, jobTitle) VALUES (name,age,job,),(e,rows,fields)=>{
		if (e){
			console.log(e);
		}
		else {
		res.json({Status: 'User added'});	
		}
	});

});

app.delete('/delete',(req,res)=>{
	var userNa = req.query;
	
	var id = userNa.id;
	let query = `DELETE FROM users WHERE id = '${id}' `;

	con.query(query ,(e,rows,fields)=>{
		if(e){
			console.log(e);
		}
		else
		{   
			res.json({Stats:'User deleted', id : id});
			
		}
	});
});

app.put('/put',(req, res)=>{
	const {id, userName,age,jobTitle} = req.body;
	let query = `UPDATE users SET userName = '${userName}', age = '${age}', jobTitle='${jobTitle}' WHERE id = '${id}' `
	
	// console.log(req.body);
	// console.log(query);
	// res.json({updated: 'updated'});
	con.query (query,(e,rows,fields)=>{
		if(e){
			console.log(e);
		}
		else {
			res.json({Status: 'User Modified', id: id});
			
		}

	});

});


//uploading th serve
app.listen(app.get('port'),()=>{
	console.log('server running');
});
