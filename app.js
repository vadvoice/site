const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db/index');
const mongoConfig = require('./config/config').mongo;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


console.log(` SUPET IMPORTANT: ${process.env.NODE_ENV}!!!!!!!!!`);
console.log({ THIS_IS_CURRENT_ENV: process.env });
let mongoConnectionURI = '';
if(process.env.NODE_ENV === 'production') {
  mongoConnectionURI = process.env.MONGODB_URI
  const testExamples = `mongodb://${mongoConfig.user}:${mongoConfig.pass}@ds131905.mlab.com:31905/${mongoConfig.db}`;
  console.log({ testExamples });
} else {
  // development && staging
  mongoConnectionURI = `mongodb://${mongoConfig.user}:${mongoConfig.pass}@ds131905.mlab.com:31905/${mongoConfig.db}`
}
const parsedURI = path.parse(mongoConnectionURI);
console.log('-----------------------');
console.log(`mongoConnectionURI:::: ${mongoConnectionURI}, parsedURI.name::: ${parsedURI.name}`);

const PORT = process.env.PORT || 3000;
db.mongo.connect(mongoConnectionURI, parsedURI.name, err => {
  if (err) {
    console.error('Unable to connect to Mongo.', err);
    db.mongo.close(err => {
      console.log('close error: ', err);
    });
    process.exit(1)
  } else {
    
    app.listen(PORT, function() {
      console.log('Listening on port 3000...')
    })
  }
})

// temparary ignore app export
// module.exports = app;
