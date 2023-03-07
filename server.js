import express from "express"
import Router from "./routes/index"
const app = express()
const port = process.env.PORT || 5000
app.use(Router)
app.listen(port, ()=>console.log(`Listening on port ${port}`))
