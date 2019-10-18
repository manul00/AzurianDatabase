var express = require('express'); 
var mysql = require('mysql');
var bodyParser= require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'manuel',
	multiStatements: true
}); 

con.connect((e)=>{
	if(e){
		console.log(e);
		return
	}
	else{
		console.log('Conected to database');
	}
});
module.exports=con;