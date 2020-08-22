//require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

const conn = mongoose.createConnection(mongoURI, {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require('./app')(app, conn, mongoose);

app.listen(PORT, () => {
  console.log('Server started on ' + PORT);
});
