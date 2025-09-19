const express = require("express");
const {router} = require("./routes/routes")
const cors = require("cors")
const cookieparser = require("cookie-parser")

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieparser())
app.use(express.json());
app.use(router);

const PORT = 4000;
app.listen(PORT, ()  => {
    console.log(`server running on http://localhost:${PORT}`)
});


