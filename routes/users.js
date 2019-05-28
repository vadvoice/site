const express = require('express');
const router = express.Router();
const mongoDb = require('../db/index').mongo;

const users = [
  {name: 'John', age: 55},
  {name: 'Lili', age: 24},
  {name: 'Karl', age: 14},
  {name: 'Piter', age: 34},
];
/* GET users listing. */
router.get('/', async function(req, res, next) {
  return mongoDb.db.collection('users').insertMany(users, (err, result) => {
    if(err) {
      console.log('ooops:', err)
    }
    console.log({ inserted: result.insertedIds });

    return res.end(`I'm done inserted rows: ${result.insertedCount}`);
  })
});

module.exports = router;
