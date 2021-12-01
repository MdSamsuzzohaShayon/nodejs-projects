const express = require('express');
const router = express.Router();
const path = require('path');

const players = [
  {
    id: 1,
    name: "Ashraf Hakimi",
    address: "Algeria"
  },
  {
    id: 2,
    name: "Earling Haaland",
    address: "Norway"
  },
  {
    id: 3,
    name: "Cristiano Ronaldo",
    address: "Portugal"
  }
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ players });
});




router.post('/add', (req, res, next) => {

  // const { name, address } = JSON.parse(req.body);
  console.log(req.body);
  // players.push({
  //   id: players.length + 1,
  //   name,
  //   address
  // });
  res.json(players);
});

module.exports = router;
