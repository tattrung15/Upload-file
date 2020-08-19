//require('dotenv').config();

module.exports.authLogin = (req, res, next) => {
  const { password } = req.body;
  if(password !== process.env.PASSWORD){
    res.sendStatus(401);
    return;
  }
  next();
};