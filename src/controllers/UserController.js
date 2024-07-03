const UserSevices = require('../services/UserSevices')
const JwtSevices = require('../services/JwtServices')

const createUser = async (req, res) => {
    try {
        console.log( req.body );
        const { name, email, password,confirmPassword, phone } = req.body;
        const reg =  /^\w+([-+.']\w+)*@\w+([-.]\w)*\.\w+([-.]\w+)*$/
        // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        const isCheckEmail = reg.test(email)

        if( !name || !email || !password || !confirmPassword || !phone ){
            return res.status(200).json({
                status : 'ERR',
                message: 'The input is required'
            });
        }else if (!isCheckEmail) {
            return res.status(200).json({
                status : 'ERR',
                message: 'The email is not valid'
            });
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status : 'ERR',
                message: 'Passwords do not match'
            });
        }

        const respone = await UserSevices.createUser(req.body)
        return res.status(200).json(respone);
    
    } catch (err) {
        return res.status(400).json({
            message: err
        });
    }
}
const loginUser = async (req, res) => {
    try {
        console.log( req.body );
        const { email, password } = req.body;
        const reg =  /^\w+([-+.']\w+)*@\w+([-.]\w)*\.\w+([-.]\w+)*$/
        // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        const isCheckEmail = reg.test(email)

        if( !email || !password ){
            return res.status(200).json({
                status : 'ERR',
                message: 'The input is required'
            });
        }else if (!isCheckEmail) {
            return res.status(200).json({
                status : 'ERR',
                message: 'The email is not valid'
            });
        }
        const respone = await UserSevices.loginUser(req.body)
        const {refresh_token,...newRespone} = respone
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false, // Set to true in production for HTTPS
            sameSite: 'strict'
          });
          
        return res.status(200).json(newRespone);
    
    } catch (err) {
        return res.status(400).json({
            message: err
        });
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: 'Ok',
            message: 'User logged out successfully'
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;

        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId input is required'
            });
        }

        const response = await UserSevices.updateUser(userId, data);
        return res.status(200).json(response);
    
    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The userId input is required'
            });
        }

        const response = await UserSevices.deleteUser(userId);
        return res.status(200).json(response);

    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const response = await UserSevices.getAllUser();
        return res.status(200).json(response);

    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
};

const getDetailUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The userId input is required'
            });
        }

        const response = await UserSevices.getDetailUser(userId);
        return res.status(200).json(response);

    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
};

// const refreshToken = async (req, res) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1]

//         if (!token) {
//             return res.status(400).json({
//                 status: 'ERR',
//                 message: 'The token is required'
//             });
//         }

//         const response = await JwtSevices.refreshTokenJwtService(token);
//         return res.status(200).json(response);

//     } catch (err) {
//         return res.status(400).json({
//             message: err.message
//         });
//     }
// };

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The token is required'
            });
        }

        const response = await JwtSevices.refreshTokenJwtService(token);
        return res.status(200).json(response);

    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
    refreshToken
}