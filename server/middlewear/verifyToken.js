const jwt = require("jsonwebtoken")

const key = process.env.jsonKey

const verifyjwt=(req,res,next)=>{
  const token = req.headers.jtoken;
  try{
  const user = jwt.verify(token, key)
  if(user)
  {
    req.user = user;
  next();
  }
}
catch(e){
  res.sendStatus(401);
}
}

module.exports = verifyjwt