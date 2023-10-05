import jwt from 'jsonwebtoken';
import ENV from '../config.js';

/** Middleware for authentication */
export default async function Authenticate(req, res, next) {
  try {
    // access authorized header to validate request
    const token = req.headers.authorization.split(' ')[1];

    // get user details
    const decoded = await jwt.verify(token, ENV.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
}
