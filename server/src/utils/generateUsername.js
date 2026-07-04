exports.generateUsername = async (fullName) => {
    const base = fullName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "");

    let username = base;
    let counter = 1;

    while (await Student.findOne({ where: { username } })) {
        username = `${base}${counter}`;
        counter++;
    }

    return username;
};