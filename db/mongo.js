const MongoClient = require('mongodb').MongoClient;

let state = {
  db: null,
}
module.exports = {
  connect: function(url, dbName, done) {
    if (state.db) return done()

    MongoClient.connect(url,  { useNewUrlParser: true }, function(err, client) {
      if (err) return done(err);
      let database;
      if(dbName) {
        database = client.db(dbName);
      } else {
        database = client;
      }
      state.db = database;
      done();
    })
  },
  get db() {
    if(state.db) {
      return state.db;
    }
  },
  close: function(done) {
    if (state.db) {
      state.db.close(function(err, result) {
        state.db = null;
        state.mode = null;
        done(err);
      })
    }
  }
}
