const createError = require('http-errors');

const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const loggers = require('./utils/logger-util');
const sitesRouter = require('./routes/sites');

const app = express();
loggers.initLoggers();
loggers.getLogger('general').info('Loggers initiated successfully');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sites', sitesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
