const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const wikiRoutes = require('./routes/wiki');
const app = express();
const db = require('./models/index.js');


const PORT = 3000;
app.use(routes);
app.use(wikiRoutes);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/stylesheets"));

const init = async () => {
  await db.User.sync();
  await db.Page.sync();
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};
init();
module.exports = app;
