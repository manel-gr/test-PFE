exports.userRoute = (req, res) => {
    res.json({ message: "Route accessible à tous les utilisateurs authentifiés" })
  }
  
  exports.managerRoute = (req, res) => {
    res.json({ message: "Route accessible aux managers et RH" })
  }
  
  exports.rhRoute = (req, res) => {
    res.json({ message: "Route accessible uniquement aux RH" })
  }
  
  