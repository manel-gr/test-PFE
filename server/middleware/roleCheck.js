const roleCheck = (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "Authentification requise" })
      }
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Accès non autorisé" })
      }
      next()
    }
  }
  
  module.exports = roleCheck
  
  