const express = require('express');
const app = express();

const PORT = process.env.PORT || 80;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./app')(app);

app.listen(PORT, (req, res) => {
  console.log('Server is running at ' + PORT);
});