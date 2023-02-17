var express = require('express');
// var session= require('session');
var router = express.Router();


var userModel=require('./AddModels/users');
var passport=require('passport');
var  productSchema=require('./AddModels/product');
var multerInstance=require("./multer");
var productController=require('./Controller/controller');
var productRepository=require('./Repositries/repositry');
const localStrategy=require("passport-local");
const app = require('../app');
const Product = require('./AddModels/product');
const { isValidObjectId, Promise } = require('mongoose');
const CartModels = require('./AddModels/Cart');
const Cart = require('./AddModels/Cart');

const Profilemulter = require("./ProfileMulter");

passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index',);
});

router.get('/login',function(req ,res ,next){
  res.render("login")
})


router.get('/register',function(req ,res ,next){
  res.render("register")
})

router.post("/register",function(req,res){
 const userData= new userModel({
    name:req.body.name,
    username:req.body.username,
    email:req.body.email,
  })
  userModel.register(userData,req.body.password)
  .then(function(registeredUser){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile');
      console.log(userData)
    })
  })
  .catch(function(err){
   console.log(err)
    res.redirect("/login")
  })
});

router.post("/login" , passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login"
}),function(req,res){});

router.get('/profile',async function(req ,res ,next){
  const LoggedInUser= await userModel.findOne({
    username:req.session.passport.user
    
  })
  console.log()
 var hui=await LoggedInUser.save();
//  console.log(hui)
  res.render("profile")
});

router.get('/logout',function(req ,res ){
  req.logOut(function(err){
    if(err) throw err;
      res.render("index")

  })
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}


router.get("/home",function(req,res){

  res.render("home")
})
// router.get("/CreatProduct",function(req,res){

//   res.render("CreatProduct")
// })

router.post("/items",multerInstance.upload.single('image'),productController.createProduct

);


router.get("/items",isLoggedIn,async(req,res)=>{
  const LoggedInUser= await userModel.findOne({
    username:req.session.passport.user
    
  })
  console.log()
 var hui=await LoggedInUser.save();
    const products= Product.find();
    return products
    .then(function(products){
      
      res.render('items',{products:products})
      // console.log(products)
    }) 

}) 


  router.get("/items/:id",isLoggedIn,async (req,res)=>{
    const LoggedInUser= await userModel.findOne({
      username:req.session.passport.user
      
    })
    console.log()
   var hui=await LoggedInUser.save();
    try{
      const item= await Product.findById({_id:req.params.id})
      
  
  res.render('details',{item:item});
// console.log(item)
}
catch (err){
console.log(err)
res.status(500).json({
error:err,
status:false,
})
}
  }
 );
router.delete("/items/:id",productController.removeProduct);

const cartController = require("./Controller/CartController");

router.post("/cart/:id", cartController.addItemToCart);
router.get("/cart/:id", cartController.getCart);
router.delete("/empty-cart/:id", cartController.emptyCart);

router.get("/allcart",cartController.Allcart)



router.post('/fileupload',isLoggedIn,Profilemulter.Profileupload.single('image'),async function(req,res,next){
  const LoggedInUser= await userModel.findOne({
    username:req.session.passport.user
    
  })
  LoggedInUser.profilePic= req.file.filename;
  await LoggedInUser.save();
  console.log(req.file)
  res.redirect("/profile",{LoggedInUser:LoggedInUser});
 });
    








module.exports = router;
