const Product = require("../models/product.model");

const getProducts = async(req, res) => {

    try {
          const Allproducts = await Product.find({});
          res.send(Allproducts)
        } catch (error) {
          res.send({message: "Error fetching all the products"})
        }
}

const getProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.json(product);
    
      } catch (error) {
        res.send({message: "Error getting a product by its ID"});
      }
}

const createProduct = async (req, res) => {
    try {
        const newProduct =  await Product.create(req.body);
        res.status(200).send(newProduct)
       } catch (error) {
         res.send({message: "Error creating a product"})
       }
}

const updatedProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
    
        if(!product) {
          res.send({message: "product not found"})
        }
    
        const updatedProduct = await Product.findById(id);
        res.send(updatedProduct);
    
      } catch (error) {
        res.send({message: "Error updating a product"})
      }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
          res.send({message: "Product not found"})
        }
        res.send({message: "Product deleted succesfully"})
    
      } catch (error) {
        res.send({message: "Error deleting a product"})
      }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updatedProduct,
    deleteProduct
};