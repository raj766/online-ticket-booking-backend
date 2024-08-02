import session from 'express-session'
import "dotenv/config";
const midAuthAdmin = (req, res, next) => {
    const loggedIn = req.session && req.session.loggedIn; // Example condition
    if (!loggedIn) {
      return res.redirect(process.env.ADMIN_PREFIX);
    }
    next();
  };