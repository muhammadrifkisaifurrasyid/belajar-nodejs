const http = require("http");
const port = 3000;
const fs = require("fs");
const rendeerHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("error, file not found");
    } else {
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    const url = req.url;
    if (url === "/about") {
      rendeerHTML("./about.html", res);
    } else if (url === "/contact") {
      rendeerHTML("./contact.html", res);
    } else {
      rendeerHTML("./index.html", res);
    }
  })
  .listen(port, () => {
    console.log(`listening on port ${port}`);
  });
