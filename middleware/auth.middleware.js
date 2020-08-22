//require('dotenv').config();

module.exports.auth = (req, res, next) => {
  if(!req.signedCookies.key){
    res.sendStatus(403);
    return;
  }
  if(req.signedCookies.key !== process.env.KEY_SECRET){
    res.sendStatus(403);
    return;
  }
  next();
};