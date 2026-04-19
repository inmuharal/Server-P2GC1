const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const {authorization} = req.headers
    console.log(authorization,'disini euy');
    

    if (!authorization) {
      throw { name: "Unauthenticated" };
    }

    const [type, access_token] = authorization.split(" ");
    console.log(access_token,'ini access token');
    

    if (type !== "Bearer" || !access_token) {
      throw { name: "JsonWebTokenError" };
    }
      
     const payload = verifyToken(access_token);
  

    const user = await User.findByPk(payload.id);

    if (!user) {
      
      throw { name: "Unauthenticated" };
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next()
  } catch (err) {
    
    next(err);
  }
}

module.exports = authentication;
