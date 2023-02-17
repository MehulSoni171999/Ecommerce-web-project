const cartRepository = require('../Repositries/CartRepositry');
const productRepository = require('../Repositries/repositry');
const { findById, create } = require('../AddModels/users');
const Cart = require('../AddModels/Cart');

exports.addItemToCart = async (req, res) => {
    // const {
    //     productId
    // } = req.body;

    const productId= req.params.id;
    
    // const quantity = Number.parseInt(req.body.quantity);
    try {
        let cart = await cartRepository.cart();
        let productDetails = await productRepository.productById({_id:req.params.id});
             if (!productDetails) {
            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        }
        //--If Cart Exists ----
        
        //------------ This creates a new cart and then adds the item to the cart that has been created------------
    
            const cartData = {
                 productId: productId,
                    total: productDetails.price ,
                    price: productDetails.price,
                    image:productDetails.image,
          name:productDetails.name,
                
            }
          const  carty = await cartRepository.addItem(cartData);
        //   const itemscart=await cartRepository.addItem(items);
            // let data = await cart.save();
            const allcartdata =await carty.save();
            
            res.render("cart",{allcartdata:allcartdata});
        
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}
exports.getCart = async (req, res) => {
    try {
        let cart = await cartRepository.cart()
        if (!cart) {
            return res.status(400).json({
                type: "Invalid",
                msg: "Cart not Found",
            })
        }
        res.status(200).json({
            status: true,
            data: cart
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}

exports.emptyCart = async (req, res) => {
    
    const id= req.params.id;

    const DeletCart= Cart.findByIdAndRemove({_id:req.params.id});
       return DeletCart
    .then(function(DeletCart){
        console.log(DeletCart)
        res.render('allcart',{DeletCart:DeletCart})
  })
  .catch(err=>{
     res.json(err)
  })
}


exports.Allcart =async(req,res)=>{
    const allcart= Cart.find();
    return allcart
    
    .then(function(allcart){
      console.log(allcart)
      res.render('allcart',{allcart:allcart})
})
.catch(err=>{
   res.json(err)
})
}