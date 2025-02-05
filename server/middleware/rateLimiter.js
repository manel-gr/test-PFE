const rateLimit = require("express-rate-limit")

exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives
  message: "Trop de tentatives de connexion, veuillez réessayer après 15 minutes",
})

