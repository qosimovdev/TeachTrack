const router = require("express").Router();
const controller = require("../controller/lessonTemplate.controller");
const authCheck = require("../middleware/auth.middleware");

router.post("/", authCheck, controller.createLessonTemplate);
router.get("/", authCheck, controller.getLessonTemplates);
router.get("/:id", authCheck, controller.getLessonTemplate);
router.put("/:id", authCheck, controller.updateLessonTemplate);
router.delete("/:id", authCheck, controller.deleteLessonTemplate);

module.exports = router;