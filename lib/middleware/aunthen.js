const jwt = require('jsonwebtoken');
//we have this authentication so that the secrets can be accessed by anyone signed in. 


module.exports = async (req, res, next) => {
  try{
    const cookies = req.cookies[process.env.COOKIE_NAME];
    const payload = jwt.verify(cookies, process.env.JWT_SECRET);
    req.user = payload;
    next();
    
  } catch (error) {
    error.message = 'Please sign in to view content';
    error.status = 401;
    next(error); 
  }
};
