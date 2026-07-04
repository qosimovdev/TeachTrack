const router = require("express").Router()
const controller = require("../controller/courseTemplate.controller")
const authCheck = require("../middleware/auth.middleware")

router.post("/", authCheck, controller.createCourseTemplate)
router.get("/", authCheck, controller.getCourseTemplates)
router.get("/:id", authCheck, controller.getCourseTemplate)
router.patch("/:id", authCheck, controller.updateCourseTemplate)
router.delete("/:id", authCheck, controller.deleteCourseTemplate)

module.exports = router