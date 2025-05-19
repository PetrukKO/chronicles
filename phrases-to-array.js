//фразы в документе должны быть только в "" кавычках

const fs = require("fs");
const text = fs.readFileSync("phrases.txt", "utf-8");
const array = text
  .split(/\r?\n/)
  .map((line) => {
    line.trim();
    line = `"${line}"`;
    return line;
  })
  .join(", ");
console.log("[" + array + "]");
