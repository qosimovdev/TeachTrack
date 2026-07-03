const router = require("express").Router()
const controller = require("../controller/auth.controller")
const authCheck = require("../middleware/auth.middleware")

router.post("/register", controller.register)
router.post("/login", controller.login)
router.get("/me", authCheck, controller.getMe)

module.exports = router