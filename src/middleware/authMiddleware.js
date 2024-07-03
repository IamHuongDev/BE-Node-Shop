 const jwt = require('jsonwebtoken')
 const dotenv = require('dotenv')

 dotenv.config()

 const authMiddleWare = (req, res, next) => {

    console.log('««««« checkToken »»»»»', req.headers.authorization);
    
    const token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'the authentication'
            });
        }
        
        // console.log('««««« user »»»»»', user);

        
        if(user?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'you are not admin'
            });
        }
        
    })
 }

 const authUserMiddleWare = (req, res, next) => {

    
    const token = req.headers.authorization.split(' ')[1]

    const userId = req.params.id

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'the authentication'
            });
        }
        
        // console.log('««««« user »»»»»', user);


        if(user?.isAdmin || user?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'the authentication!!!'
            });
        }
        
    })
 }

module.exports = {
    authMiddleWare, // admin
    authUserMiddleWare
}