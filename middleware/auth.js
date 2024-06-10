const User = require('../models/User');

const isAdmin = async(req, res, next) => {
    try{
        const user = await User.findById(req.user.id);
        if(user && user.isAdmin){
            return next();
        }
        res.status(403).json({error: "You do not have permission to perform this action"});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}