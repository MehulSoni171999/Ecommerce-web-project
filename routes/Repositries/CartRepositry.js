const Cart = require("../AddModels/Cart");
exports.cart = async () => {
    const carts = await Cart.find().populate({
        path: "productId",
        select: "name price total image"
    });;
    return carts[0];
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}