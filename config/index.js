if (process.env.NODE_ENV === 'production') {
    module.exports = {
        facebook: {
            pageAccessToken: process.env.pageAccessToken,
            verifyToken: process.env.verifyToken,
            appSecret: process.env.appSecret,
            BBY_API_KEY: process.env.BBY_API_KEY
        }
    }
} else {
    module.exports = require('./development.json');
}