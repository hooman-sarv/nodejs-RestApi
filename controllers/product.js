const Product = require('../models/product')


module.exports.getProduct = (req , res , next) => {
    Product.find()
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => {
            return res.status(500).json({
                error : 'can not get products'
            })
        })
}

module.exports.addProduct = (req,res,next) => {
        const product = new Product({
            productName: req.body.productName,
            price : req.body.price
        })
        product.save()
            .then(result => {
                return res.status(200).json({
                    msg:'Product Created',
                    createdProduct:result
                })
            })
            .catch(err => {
                return res.status(500).json({
                    error : 'cannot add product'
                })
            })
    }

