const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');

// models import here
const Product = require('./models/product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const CartItem = require('./models/cart-item');


// code logic here
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

sequelize.sync(
  // {force:true}
  // {alter:true}
)
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com', username: 'Jayant Singh'});
    }
    return user;
  })
  .then(() => {
    // console.log(user);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
    console.log('we are good to go');
  });
