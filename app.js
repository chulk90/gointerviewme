var env = process.env.NODE_ENV || 'production',
  config = require('./config')[env];

var express = require('express'),
  http = require('http'),
  path = require('path'),
  OAuth = require('oauth'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  nodemailer = require('nodemailer');

var app = express();
var transport = nodemailer.createTransport();

/*******************************************************************
 *                     SET UP ALL ENVIRONMENTS
 ******************************************************************/

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(express.cookieParser('TODO Random String: Fitbit is awesome!'));
//app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(__dirname + '/views/assets'));

/*******************************************************************
 *                 ENABLE DEVELOPMENT ENVIRONMENT
 ******************************************************************/

//if ('development' == app.get('env')) {
//  app.use(express.errorHandler());
//}

/*******************************************************************
 *            CONNECT TO DATABASE AND INITIALIZE MODEL
 ******************************************************************/

//mongoose.connect(config.db);
//require('./models/user');

/*******************************************************************
 *                       DEFINE CONTROLLERS
 ******************************************************************/

var IndexController = require('./controllers/index');

/*******************************************************************
 *                          DEFINE ROUTES
 ******************************************************************/

app.get('/', IndexController.index);
//app.get('/assets/', function (req, res) {
//  res.redirect('/views/assets/');
//});

app.get('/send', function (req, res) {
  var mailOptions = {
    from: req.query.from,
    to: 'chulk90@terpmail.umd.edu',
    subject: 'Go Interview Me Applicant',
    text: req.query.name + req.query.content
  };
  console.log(mailOptions);
  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Message sent: " + info.message);
      res.end("sent");
//      console.log(res);
    };
  });
});

/*******************************************************************
 *                        START THE SERVER
 ******************************************************************/

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});