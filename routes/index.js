import express from "express"
const Router = express.Router()
import {getStatus, getStats} from "../constrollers/AppController" 
Router.route("/status" ).get(getStatus)
Router.route("/stats").get(getStats)
export default Router
