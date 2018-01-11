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
	})
	.catch(response => {
		console.log('not found');
	});
});

app.get("/films", (req, res) => {
  const url =
    "http://api.themoviedb.org/3/search/movie?api_key=b2db0b846ffa15ef4db7bf36989625c1&query=" +
    req.query.title
  axios({
    method: "get",
    responseType: "json",
    url: url
  })

  .then(apiRes => {
    res.send(apiRes.data.results[0])
  })
  .catch(response => {
		console.log('not found');
	});
})


app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'));