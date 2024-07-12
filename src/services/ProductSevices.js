const Product = require("../models/ProductModel")

const createProduct = (newProduct) => {
    return new Promise( async (resolve, reject) => {
        const { name, type, image, price, description, countInStock, rating, discount, selled } = newProduct;
        
        try {
            const checkProduct = await Product.findOne({ name: name });
            if (checkProduct !== null) {
                resolve({
                    status: "OK",
                    message: "The name of product is already",
                });
            }
            const createdProduct = await Product.create({ 
                name,
                type, 
                image, 
                price, 
                description, 
                countInStock, 
                rating,
                discount,
                selled
            });

            if(createdProduct){
                resolve({
                    status: "Ok",
                    message: "created product successfully",
                    data: createdProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            });  

            if (checkProduct === null) {
                return resolve({
                    status: "ERR",
                    message: "product is not found",
                });
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: "Ok",
                message: "product updated",
                data: updatedProduct
            });
            
        } catch (e) {
            reject(e);
        }
    });
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({_id: id});  // Sử dụng findById với _id

            if (checkProduct === null) {
                return resolve({
                    status: "ERR",
                    message: "product not found",
                });
            }

            await Product.findByIdAndDelete(id);

            resolve({
                status: "Ok",
                message: "delete product success",
            });
            
        } catch (e) {
            reject(e);
        }
    });
}

const getAllProduct = (limit , page, sort, filter ) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()

            if(sort){
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort);

                resolve({
                    status: "success",
                    message: "sort product success",
                    total: totalProduct,
                    data: allProductSort,
                    currentPage: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit),
                });
            }

            if(filter){

                const allProductFilter = await Product.find({ [filter[0]] : { '$regex': filter[1], '$options': 'i' }}).limit(limit).skip(page * limit); // // Thêm '$options': 'i' để không phân biệt chữ hoa chữ thường
                
                resolve({
                    status: "success",
                    message: "filter product success",
                    total: totalProduct,
                    data: allProductFilter,
                    currentPage: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit),
                });
            }

            const allProduct = await Product.find().limit(limit).skip(page * limit);

            resolve({
                status: "success",
                message: "get all product success",
                total: totalProduct,
                data: allProduct,
                currentPage: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit),
            });
            
        } catch (e) {
            reject(e);
        }
    });
}

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({_id: id});  // Sử dụng findById với _id

            if (product === null) {
                return resolve({
                    status: "ERR",
                    message: "product not found",
                });
            }

            resolve({
                status: "Ok",
                message: " product detail success",
                data: product,
            });
            
        } catch (e) {
            reject(e);
        }
    });
}


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailProduct
}