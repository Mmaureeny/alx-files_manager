import express from "express"
const Router = express.Router()
import {f} from "../controllers/AppController" 
Router.route("/status" ).get(f.getStatus)
Router.route("/stats").get(f.getStats)
export default Router
