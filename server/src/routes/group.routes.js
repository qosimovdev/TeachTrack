const router = require("express").Router()
const controller = require("..//controller/group.controller")
const authCheck = require("../middleware/auth.middleware")

router.post("/", authCheck, controller.createGroup)
router.get("/", authCheck, controller.getGroups)
router.get("/:id", authCheck, controller.getGroup)
router.patch("/:id", authCheck, controller.updateGroup)
router.delete("/:id", authCheck, controller.deleteGroup)

module.exports = router