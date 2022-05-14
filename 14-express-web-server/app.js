const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  // res.send('Hello World!')
  res.sendFile('./index.html', {root: __dirname})
})

app.get('/about', (req, res) => {
  // res.send('ini adalah halaman about!')
  res.sendFile('./about.html', {root: __dirname})
})

app.get('/contact', (req, res) => {
  // res.send('ini adalah halaman contact!')
  res.sendFile('./contact.html', {root: __dirname})
})

app.get('/product/:id', (req, res) => {
  res.send(`product ID : ${req.params.id} <br>category ID : ${req.query.category}`)
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




























// const http = require("http");
// const port = 3000;
// const fs = require("fs");
// const rendeerHTML = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.write("error, file not found");
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// };

// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });
//     const url = req.url;
//     if (url === "/about") {
//       rendeerHTML("./about.html", res);
//     } else if (url === "/contact") {
//       rendeerHTML("./contact.html", res);
//     } else {
//       rendeerHTML("./index.html", res);
//     }
//   })
//   .listen(port, () => {
//     console.log(`listening on port ${port}`);
//   });
