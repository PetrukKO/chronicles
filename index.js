const http = require("http");
const fs = require("fs");
const random_phrase = require("./phrases.js");
const path = require("path");
const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const filePath = path.join(__dirname, "index.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.setHeader(
          "Access-Control-Allow-Origin",
          "https://fonts.cdnfonts.com"
        );
        res.writeHead(500);
        res.end("Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/styles.css") {
    const css = fs.readFileSync("styles.css");
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(css);
  } else if (req.url === "/panorama.js") {
    const panorama = fs.readFileSync("panorama.js");
    res.writeHead(200, { "Content-Type": "application/javascript" });
    res.end(panorama);
  } else if (req.url === "/phrases.js" && req.method === "GET") {
    const phrase = random_phrase();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ phrase: phrase }));
  } else if (req.url === "/public/fonts/Minecraft_1.1.ttf") {
    res.setHeader("Content-Type", "font/ttf");
    const fontPath = path.join(
      __dirname,
      "public",
      "fonts",
      "Minecraft_1.1.ttf"
    );
    fs.readFile(fontPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Ошибка при чтении шрифта");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "font/ttf",
        "Content-Length": data.length,
      });
      res.end(data);
    });
  } else if (req.url === "/public/images/chronicles.png") {
    res.setHeader("Content-Type", "image/png");
    const imagePath = path.join(
      __dirname,
      "public",
      "images",
      "chronicles.png"
    );
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Ошибка при чтении изображения");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": data.length,
      });
      res.end(data);
    });
  } else if (req.url === "/phrases.txt") {
    const filePath = path.join(__dirname, "phrases.txt");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
