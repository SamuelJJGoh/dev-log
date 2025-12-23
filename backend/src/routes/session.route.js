import {Router} from "express";
import { createSession, getSessions, getSession, updateSession, deleteSession } from "../controllers/session.controller.js";

const router = Router();

router.route("/createSession").post(createSession)
router.route("/getSessions").get(getSessions)
router.route("/getSession/:id").get(getSession)
router.route("/updateSession/:id").patch(updateSession)
router.route("/deleteSession/:id").delete(deleteSession)

export default router;