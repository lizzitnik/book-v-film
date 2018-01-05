const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.static('.'));

app.get('/books', (req, res) => {
	var parseString = require("xml2js").parseString ;
	const url = "https://www.goodreads.com/book/title.xml";
	const params = {
		title: req.query.title,
		key: 'l6jtaoe1eJZYhsc7jYckEw'
	};

	axios({ 
		method: "get", 
		data: params,
		responseType: "json", 
		url: url 
	})
	.then(apiRes => { 
		let result = parseString(apiRes.data, (err, result) => {
		 res.send(JSON.stringify(result)); 
		}); 
	});
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));