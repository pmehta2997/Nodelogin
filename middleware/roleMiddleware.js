const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

module.exports = authorizeRoles;

function requireEmail2FA(req, res, next) {
  if (req.session && req.session.twofa_verified) {
    return next();
  }
  return res.status(403).json({ message: "Email 2FA verification required" });
}
