const fs = require("fs");
function random_phrase() {
  const text = fs.readFileSync("phrases.txt", "utf-8");
  const phrases = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  return phrases[Math.floor(Math.random() * phrases.length)];
}
module.exports = random_phrase;
