const requireEmail2FA = (req, res, next) => {
  if (req.session && req.session.twofa_verified) {
    return next();
  }
  return res.status(403).json({ message: "Email 2FA verification required" });
}
module.exports = requireEmail2FA;