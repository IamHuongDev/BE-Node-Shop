const ProductSevices = require('../services/ProductSevices')

const createProduct = async (req, res) => {
    try {
        console.log( req.body );
        const { name, type, image, price, description, countInStock, rating, discount, selled } = req.body;

        console.log('««««« req.body »»»»»', req.body);

        if( !name || !type || !image || !price || !countInStock || !rating  ){
            return res.status(200).json({
                status : 'ERR',
                message: 'The input is required'
            });
        }

        const respone = await ProductSevices.createProduct(req.body)

        return res.status(200).json({
            status: 'OK',
            message: 'Product created successfully',
            data: respone
        });
    
    } catch (err) {
        return res.status(400).json({
            message: err
        });
    }
}


const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;

        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId input is required'
            });
        }

        const response = await ProductSevices.updateProduct(productId, data);
        return res.status(200).json({
            status: 'OK',
            message: 'Product updated successfully',
            data: response
        });
    
    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The productId input is required'
            });
        }

        const response = await ProductSevices.deleteProduct(productId);
        return res.status(200).json(response);

    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
};

const getAllProduct = async (req, res) => {
    // console.log('««««« req.query »»»»»', req.query);
    try {
        const {limit , page, sort, filter  } = req.query
        const response = await ProductSevices.getAllProduct(Number(limit || 15) , Number(page || 0), sort, filter );
        return res.status(200).json(response);

    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
};

const getDetailProduct = async (req, res) => {
    try {
        const ProductId = req.params.id;

        if (!ProductId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The ProductId input is required'
            });
        }

        const response = await ProductSevices.getDetailProduct(ProductId);
        return res.status(200).json(response);

    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
};



module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailProduct,
}