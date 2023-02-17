const mongoose =require("mongoose");

mongoose.connect("mongodb://localhost/ecommerce");

const productSchema= new mongoose.Schema({
   
    name:{type:String,
        required:true},
    price:{type:String,
    required:true},
    
    image:{
        type:String,
        default:'def.jpg',
      required:true,
    },




});

 const Product=mongoose.model("Product",productSchema);
 module.exports=Product;



     
// const creatdocuments= async ()=>{
//       try{
//         const shoesProduct=new Product({

//     Productname:"addidas",
//     description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum obcaecati"
// ,
//     price:1000,
//     category:"shoes",
//     img:"https://images.pexels.com/photos/1701205/pexels-photo-1701205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
// })

// const jacketProduct=new Product({

//     Productname:"woodland",
//     description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum obcaecati"
// ,
//     price:5000,
//     category:"jacket",
//     img:"https://images.pexels.com/photos/6712068/pexels-photo-6712068.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
// })

// const laptopProduct=new Product({

//     Productname:"acer",
//     description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum obcaecati"
// ,
//     price:60000,
//     category:"laptop",
//     img:"https://images.pexels.com/photos/459653/pexels-photo-459653.jpeg?auto=compress&cs=tinysrgb&w=600",
// })
      
// const result= await Product.insertMany([shoesProduct,jacketProduct,laptopProduct]);

// console.log(result);

//   }
//   catch(err){
//     console.log(err)
//   }
// };
// // creatdocuments();

// var done=0;
// for (var i=0; i<products.length; i++){
// products[i].save(function(err,result){
//     done++;
//     if(done === products.length){
// exist();
//     }
// });
// }
// console.log(products);
// function exit(){
//     mongoose.disconnect();
// }

  






