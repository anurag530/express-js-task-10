const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const db=require('./util/database');

const sequelize=require('./util/database');

const user=require('./models/user')

var cors=require('cors');

const app = express();
app.use(express.json());
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


app.use('/user/add-user',async(req,res,next)=>{

    try{
        console.log(req.body);
    const name=req.body.name;
    const email=req.body.email;
    const phonenumber=req.body.phonenumber;

    const data=await user.create({name:name,email:email,phonenumber:phonenumber});
    console.log(data);
    res.status(201).json({newUserDetail:data});
    } catch(err){
        res.status(500).json({
            error:err
        })
    }
})


app.get('/user/get-users',async(req,res,next)=>{

    try{
    const users=await user.findAll();
    res.status(200).json({allusers:users});
    }catch(error){
        console.log('Get user is failing', JSON.stringify(error))
        res.status(500).json({
            error:error
        }) 
    }
})

app.use(errorController.get404);

sequelize
// .sync({force:true})
.sync()
.then(result=>{
    // console.log(result);
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
});

// app.listen(3000);
