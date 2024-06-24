// const { withAuth } = require('@clerk/clerk-sdk-node');

// const requireAuth = (req, res, next) => {
//   withAuth(req, res, () => {
//     if (!req.auth.sessionId) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     next();
//   });
// };

// module.exports = requireAuth;
