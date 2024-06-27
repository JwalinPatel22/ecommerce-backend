const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg: "No token found, authorization denied"})
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({error: "Invalid Token"})
    }
}

module.exports = auth;