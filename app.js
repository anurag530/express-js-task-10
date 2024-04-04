const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const db=require('./util/database');

const sequelize=require('./util/database');


const Product=require('./models/product')
const user=require('./models/user')

const Cart=require('./models/cart');
const CartItem=require('./models/cart-item');

var cors=require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const userRoutes=require('./routes/bookin_appointment');

/*db.execute('SELECT * FROM products').then(result=>{
    console.log(result[0],result[1]);
})
.catch(err=>{
    console.log(err);
});

*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    user.findByPk(1)
    .then(createdUser=>{
        req.createdUser=createdUser;
        next();
    })
       .catch(err=>console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/user',userRoutes);







app.use(errorController.get404);


Product.belongsTo(user,{constraints:true,onDelete:'CASCADE'});
user.hasMany(Product);

user.hasOne(Cart);
Cart.belongsTo(user);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

sequelize
//.sync({force:true})
.sync()
.then(result=>{

    //console.log(result);
    return user.findByPk(1);
    
})
.then(foundUser=>{
    if(!foundUser){
        //console.log(foundUser);
        return user.create({name:'subh',email:'test@test.com',phonenumber:'7654321'})
    }
    return (foundUser);
    // return Promise.resolve(foundUser);
})
.then(createdUser=>{
    //console.log(createdUser);

    return createdUser.createCart();
    //app.listen(3000);
})

.then(cart=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
});

// app.listen(3000);
