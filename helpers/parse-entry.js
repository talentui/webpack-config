module.exports = entry => {
    entry = entry || "./src/entry.js";
    if (entry instanceof Array || typeof entry === "string") {
        entry = { main: entry };
    }
    return entry;
};
