const router = require("express").Router()
const controller = require("../controller/groupLesson.controller")
const authCheck = require("../middleware/auth.middleware")

router.post("/", authCheck, controller.createGroupLesson)
router.get("/:id", authCheck, controller.getGroupLesson)
router.get("/", authCheck, controller.getGroupLessons)
router.patch("/:id", authCheck, controller.updateGroupLesson)
router.delete("/:id", authCheck, controller.deleteGroupLesson)

module.exports = router