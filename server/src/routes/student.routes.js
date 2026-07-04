const router = require("express").Router()
const controller = require("../controller/student.controller")
const authCheck = require("../middleware/auth.middleware")
const roleCheck = require("../middleware/role.middleware")

router.post("/", authCheck, roleCheck(["TEACHER"]), controller.createStudent)
router.post("/login", controller.loginStudent)
router.get("/me", authCheck, controller.getMe)

module.exports = router