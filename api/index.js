const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// data
const buildingData = require('./data/building.json');
const homeData = require('./data/home.json');
const filtersData = require('./data/filters.json');

// home
homeData.components[1].items[0].building = buildingData;
homeData.components[1].items[1].building = buildingData;
homeData.components[2].items[0].building = buildingData;
homeData.components[2].items[1].building = buildingData;

app.get('/', cors(),  (req, res) => res.json(homeData));
app.get('/filters', cors(), (req, res) => res.json(filtersData));

app.listen(port, () =>
  console.log(`Axpe API listening on http://localhost:${port}`)
);
