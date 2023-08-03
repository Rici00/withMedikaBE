/* Import package */
const express = require('express')
const database = require('./db')
const cors = require('cors')
require('dotenv').config();
// ✅ Auth controller import
const { register, login } = require("./controllers/auth/userController")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.listen(3001, () => {
    console.log(`Server berjalan pada port: 3001`)
})

// ✅ Route untuk register dan login
app.post('/register', cors(), register)
app.post('/login', cors(), login)
app.get("/", (req, res) => {
    res.send("Express on Vercel");
});