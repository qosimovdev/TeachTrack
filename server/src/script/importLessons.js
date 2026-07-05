const fs = require("fs");
const path = require("path");
const { LessonTemplate } = require("../model");

async function importLessons() {
    try {
        const filePath = path.join(__dirname, "../data/html.json");
        const lessons = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        if (!Array.isArray(lessons)) {
            throw new Error("JSON must be an array");
        }
        const result = await LessonTemplate.bulkCreate(lessons, {
            validate: true,
        });
        console.log(`✅ Inserted: ${result.length} lessons`);
    } catch (err) {
        console.error("❌ Import error:", err);
    } finally {
        process.exit();
    }
}

importLessons();