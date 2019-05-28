var express = require('express');
var router = express.Router();

const users = [
  {name: 'John', age: 55},
  {name: 'Lili', age: 24},
  {name: 'Karl', age: 14},
  {name: 'Piter', age: 34},
]
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users)
});

module.exports = router;
