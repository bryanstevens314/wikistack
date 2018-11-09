const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const app = express();
const { db } = require('./models');

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const PORT = 3000;
app.use(routes);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));

const init = async () => {
    await db.User.sync();
    await db.Page.sync();
    app.listen(PORT, () => {
      console.log(`App listening in port ${PORT}`);
    });
}
init();
module.exports = app;
