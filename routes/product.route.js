const express = require("express");
const router = express.Router();
const {getProducts, getProduct, createProduct, updatedProduct, deleteProduct} = require("../controllers/product.controller.js");

// get all the products
router.get('/', getProducts);

//get a specific prpoduct based on its ID
router.get('/:id', getProduct);

// post method to create a new product
router.post('/', createProduct)

// updating a product based on its ID
router.put('/:id', updatedProduct)

//deleting the product by ID 
router.delete('/:id', deleteProduct)
module.exports = router;