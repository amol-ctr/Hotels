const jwt=require('jsonwebtoken');

// middleware for token verification
const jwtMiddleware=(req,res,next)=>{

    // First check
    const authorization=req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error:'Token not found!'});
    }

    // Extract the token from request headers
    const token=req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error:'Unauthorized'});
    }

    try {
        // Verify the jwt token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);//Returns payload in return and stored in variable decoded

        // Attach user info to request object
        req.user=decoded;
        next();
    } 
    catch (err) {
        console.log(err);
        res.status(401).json({error:'Invalid Token'});
    }
}

// Function to generate JWT Token
const generatetoken=(userData)=>{
    // Generate a new token using userData
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000}); // expires in 8 hours
}

module.exports={jwtMiddleware,generatetoken};