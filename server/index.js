require("dotenv").config()
const express = require("express")
const connectDB = require("./config/database")
const authRoutes = require("./routes/auth")
const roleCheck = require("./middleware/roleCheck")

const app = express()

// Connexion à la base de données
connectDB()

app.use(express.json())
app.use("/auth", authRoutes)

// Exemple de routes protégées par rôle
app.get("/user-route", roleCheck(["user", "manager", "rh"]), (req, res) => {
  res.json({ message: "Route accessible à tous les utilisateurs authentifiés" })
})

app.get("/manager-route", roleCheck(["manager", "rh"]), (req, res) => {
  res.json({ message: "Route accessible aux managers et RH" })
})

app.get("/rh-route", roleCheck(["rh"]), (req, res) => {
  res.json({ message: "Route accessible uniquement aux RH" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`))

