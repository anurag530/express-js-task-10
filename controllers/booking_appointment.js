const Product = require('../models/user');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddUser = async (req, res, next) => {
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

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then( product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch(err=>console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then(product=>{
      product.title=updatedTitle;
      product.price=updatedPrice;
      product.description=updatedDesc;
      product.imageUrl=updatedImageUrl;
      return product.save();
    })
    .then(result=>{
      console.log('updated product!');
      res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
  
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product=>{
      return product.destroy();
    })
    .then(result=>{
      console.log('destroyed product');
      res.redirect('/admin/products');
    })
   .catch(err=>console.log(err));
};
