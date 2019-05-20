const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = 3000;

var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/plans', db.getPlans);
//app.get("/plans/:id", db.getPlanById);
app.post('/plans', urlencodedParser, db.createPlan);

app.post('/testpost', urlencodedParser, function(req, res) {
  console.log(req.body);
});
app.put('/plans/:id', db.updatePlan);
//app.delete("/plans/:id", db.deletePlan);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});