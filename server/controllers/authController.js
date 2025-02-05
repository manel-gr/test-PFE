const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
  try {
    const { username, password, email, num, role } = req.body
    const user = new User({ username, password, email, num, role })
    await user.save()
    res.status(201).json({ message: "Utilisateur créé avec succès" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Identifiants invalides" })
    }
    const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })
    res.json({ token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getProfile = (req, res) => {
  res.json({ user: req.user })
}

