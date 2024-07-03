const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign({
        ...payload, //không muốn id và isAdmin nằm tromng {} payload thì dùng 
        // payload,
    }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
    return access_token
}

const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        ...payload,
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
    return refresh_token
}

const refreshTokenJwtService = async (token) => {
    return new Promise( (resolve, reject) => {
        try {

            // console.log('««««« token »»»»»', token);

            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if(err) {
                    resolve({
                        status: "ERR",
                        message: "the authentication  !!!",
                    });
                }
                // console.log('««««« user »»»»»', user);
    
                const access_token = await genneralAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin,
                })

                // console.log('««««« access_token »»»»»', access_token);

                resolve({
                    status: "Ok",
                    message: "refresh token success",
                    access_token
                });
            })

            
        } catch (e) {
            reject(e);
        }
    });
}



module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}