import { Router } from "express";
import { createResource, getResources, getResource, updateResource, deleteResource } from "../controllers/resource.controller.js";

const router = Router();

router.route("/createResource").post(createResource)
router.route("/getResources").get(getResources)
router.route("/getResource/:id").get(getResource)
router.route("/updateResource/:id").patch(updateResource)
router.route("/deleteResource/:id").delete(deleteResource)

export default router;