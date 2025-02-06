const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports.protect = async (req, res, next) => {
  // check if token hai?
  if (req.cookies.token) {
    // agr token h toh usko verify kro
    try {
      // toh aapke token se data ko bhr nikalenga, wo data jo hmne save kiya tha wo h email
      const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      // ab hm user ko find kr le rhe h email ke base pr
      req.user = await userModel
        .findOne({ email: data.email })
        .select("-password"); // mtlb ki email ke basis pr find krne pr sb mil gya na ab bss isme se password mt save krna iss user mei
      // ab iss user ko hm save kr denge req ke andr
      // req.user = user

      next();
    } catch (error) {
        // token is not valid, user not authenticated
        return res.status(401).json({ msg: "Cookie match nhi kri" });
    }
  }

  if(!req.cookies.token){
    // token nahi hai, user nahi authenticated
    return res.status(401).json({ msg: "Cookie nhi h yrrrr" });
  }
};
