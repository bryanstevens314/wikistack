const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const app = express();

const PORT = 3000;
app.use(routes);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
module.exports = app;
