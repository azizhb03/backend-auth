const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');
const privateRouter = require("./routes/private.routes")
const checkAuth = require("./checkAuth")
const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "welcome to my express api"
    })
})
app.use ("/auth", authRouter)
app.use ("/api", checkAuth,privateRouter)


app.listen(8080, () => {
    console.log("listening on 8080")
})