const User = require("../models/UserModel")
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtServices");

const createUser = (newUser) => {
    return new Promise( async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser;
        
        try {
            const checkUser = await User.findOne({ email: email });
            if (checkUser !== null) {
                resolve({
                    status: "OK",
                    message: "The Email is already",
                });
            }
            const hash = bcrypt.hashSync( password, 10)
            const createUser = await User.create({ 
                name,
                email, 
                password: hash,
                phone
            });
            if(createUser){
                resolve({
                    status: "Ok",
                    message: "User created successfully",
                    data: createUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise( async (resolve, reject) => {
        const {  email, password} = userLogin;
        
        try {
            const checkUser = await User.findOne({ email: email });
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "The use is not defind",
                });
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if(!comparePassword){
                resolve({
                    status: "ERR",
                    message: "The password is not correct",
                });
            }

            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            })

            console.log('««««« access_token »»»»»', access_token);

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            })
          
            console.log('««««« refresh_token »»»»»', refresh_token);
            resolve({
                status: "Ok",
                message: "successfully",
                access_token,
                refresh_token
            })
            
        } catch (e) {
            reject(e)
        }
    })
}


const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findById(id);  // Sử dụng findById với _id

            if (checkUser === null) {
                return resolve({
                    status: "ERR",
                    message: "User not found",
                });
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: "Ok",
                message: "User updated",
                data: updatedUser
            });
            
        } catch (e) {
            reject(e);
        }
    });
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({_id: id});  // Sử dụng findById với _id

            if (checkUser === null) {
                return resolve({
                    status: "ERR",
                    message: "User not found",
                });
            }

            await User.findByIdAndDelete(id);

            resolve({
                status: "Ok",
                message: "delete user success",
            });
            
        } catch (e) {
            reject(e);
        }
    });
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();

            resolve({
                status: "success",
                message: "get all user success",
                data: allUser,
            });
            
        } catch (e) {
            reject(e);
        }
    });
}

const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({_id: id});  // Sử dụng findById với _id

            if (user === null) {
                return resolve({
                    status: "ERR",
                    message: "User not found",
                });
            }

            resolve({
                status: "Ok",
                message: " user detail success",
                data: user,
            });
            
        } catch (e) {
            reject(e);
        }
    });
}

const logoutUser = (refreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            // // Example implementation:
            // const deletedRefreshToken = await RefreshToken.findOneAndDelete({ token: refreshToken });
            // if (deletedRefreshToken === null) {
            //     return resolve({
            //         status: "ERR",
            //         message: "Invalid refresh token",
            //     });
            // }
            resolve({
                status: "Ok",
                message: "User logged out successfully",
            });
            
        } catch (e) {
            reject(e);
        }
    }
    
    )
}


module.exports = {
    createUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
}