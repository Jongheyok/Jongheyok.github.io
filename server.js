const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const socketIo = require('socket.io');

const User = require('./models/User');
const app = express();
const port = process.env.PORT || 8080;

// MongoDB 연결 설정 추가
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true // 이 부분 추가
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB 연결 에러:'));
mongoose.connection.once('open', () => {
  console.log('MongoDB 연결 성공');
});

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Session middleware
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) { 
      return done(err); 
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) { 
        return done(err); 
      }
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  });
}));

// Static folder
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

// Socket.io setup
const io = socketIo(server);
io.on('connection', socket => {
  console.log('User connected');
});
