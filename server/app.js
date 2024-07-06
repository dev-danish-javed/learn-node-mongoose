const express = require('express');
const app = express();
const api = require('./api');
const morgan = require('morgan'); // logger
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.set('port', 8081);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.use('/api', api);
app.get('/', (req, res) => {
	res.send('Hello World!');
  });
app.use(express.static('static'));

app.use(morgan('dev'));

app.use(function(req, res){
	const err = new Error('Not found');
	err.status = 404;
	res.json(err);
});

mongoose.connect('mongodb://localhost:27017/virtualstandups', {useNewUrlParser: true})
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log('Connected to Mongo');
	app.listen(app.get('port'), function(){
		console.log('Api server listening to port : ', app.get('port'));
	})
});