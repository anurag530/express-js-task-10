const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const db=require('./util/database');

const sequelize=require('./util/database');

const user=require('./models/user')

var cors=require('cors');

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

/*db.execute('SELECT * FROM products').then(result=>{
    console.log(result[0],result[1]);
})
.catch(err=>{
    console.log(err);
});

*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.post('/user/add-user',async(req,res,next)=>{

    try{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;

    const data=await user.create({amount:amount,description:description,category:category});
    res.status(201).json({newUserDetail:data});
    } catch(err){
        res.status(500).json({
            error:err
        })
    }
})

app.use(errorController.get404);

sequelize
.sync()
.then(result=>{
    // console.log(result);
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
});

// app.listen(3000);
