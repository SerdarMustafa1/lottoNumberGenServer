console.log('chicken');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
const port = 8321;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/numbers', function(request, response) {
	var timesRun = 0;
	var interval = setInterval(function() {
		timesRun += 1;
		if (timesRun === 6) {
			clearInterval(interval);
		}
		const luckyNumber = Math.floor(Math.random() * 100 + 1);
		response.json(luckyNumber);
		console.log(luckyNumber);
	}, 1000);
	setTimeout(function() {}, 1000);
});

https.createServer(app);
app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
-f;
