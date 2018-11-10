const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
const app = express();
const db = require('./models/index.js');


const PORT = 3000;
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ //allows us to use req.body (this is a body parser...?)
  extended: true
}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/stylesheets"));
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);
app.get('/', (req, res) => {
  res.redirect('/wiki');
});
const init = async () => {
  await db.user.sync();
  await db.page.sync();
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};
init();
module.exports = app;
