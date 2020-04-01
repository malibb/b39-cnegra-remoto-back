const jwt = require('jsonwebtoken');
const { getOneAuthorByEmail } = require('../services/AuthorService');

const verifyToken = async req => {
    try {
        const Authorization = req.get('Authorization');
        if (Authorization) {
            // JWT sadsdfadsds.sadsdasdad.sasdadfdsfsd
            const formatedToken = Authorization.replace('JWT ','');
            // sadsdfadsds.sadsdasdad.sasdadfdsfsd
            const payload = jwt.verify(formatedToken, process.env.SECRET_KEY_JWT);
            if(!payload) return req;
            const userAuth = await getOneAuthorByEmail(payload.email);
            if (!userAuth) return req;
            return userAuth;
        } else {
            return {};
        }
    }catch (e) {
        throw new Error(e.message);
    }
};

module.exports = verifyToken;