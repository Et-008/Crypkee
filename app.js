var express = require('express')
var app = express()
var path = require('path')
// var request = require('request')

app.set('view engine', 'ejs')
const rp = require('request-promise');
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '5000',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': '216ef3ac-3973-49a6-830f-d245e164a550'
  },
  json: true,
  gzip: true
};



app.use(express.static(__dirname + 'views'));
app.use(express.static(path.join(__dirname, '/public')));
app.get('/', function (req, res) {
	rp(requestOptions).then(response => {
		var results = {};
		Body = response.data;
	res.render('landing_page', {Body: Body});
	})
})

app.get('/all', function (req, res) {
	rp(requestOptions).then(response => {
		var results = {};
		Body = response.data;
		res.render('all', {Body: Body});
	}).catch((err) => {
	  	console.log('API call error:', err.message);
		});
})

app.get('/:crc', function (req, res) {
	var quest = req.params.crc;
	rp(requestOptions).then(response => {
		var results = {};
		Body = response.data;
	res.render('crypkee', {Body: Body, quest: quest});
	})
})


app.listen(3000, function() {
	console.log('Server has been started!')
});