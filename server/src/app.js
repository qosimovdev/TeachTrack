const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/students", require("./routes/student.routes"));
app.use("/api/groups", require("./routes/group.routes"));
app.use("/api/courses", require("./routes/courseTemplate.routes"));
app.use("/api/lessons", require("./routes/lessonTemplate.routes"));
app.use("/api/group-lessons", require("./routes/groupLesson.routes"));

app.get("/", (req, res) => {
    res.send("TeachTrack API running...");
});

module.exports = app