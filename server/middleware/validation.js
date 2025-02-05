const { body, validationResult } = require("express-validator")
const sanitizeHtml = require("sanitize-html")

exports.validateUser = [
  body("username")
    .isLength({ min: 3, max: 30 })
    .withMessage("Le nom d'utilisateur doit contenir entre 3 et 30 caractères")
    .trim()
    .escape(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    .withMessage(
      "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
    ),
  body("email").isEmail().withMessage("Email invalide").normalizeEmail(),
  body("num").isMobilePhone().withMessage("Numéro de téléphone invalide"),
  body("role").isIn(["user", "manager", "rh"]).withMessage("Rôle invalide"),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // Sanitize inputs
    req.body = Object.keys(req.body).reduce((acc, key) => {
      acc[key] = sanitizeHtml(req.body[key])
      return acc
    }, {})
    next()
  },
]

