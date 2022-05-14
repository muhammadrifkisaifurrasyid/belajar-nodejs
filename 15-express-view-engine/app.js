const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs')
app.use(expressLayouts)

app.get('/', (req, res) => {
  const mahasiswa = [
    { 
    nama: 'rifki',
    email: 'rifki@gmail.com'
  },
  {
    nama: 'imel',
    email: 'imel@gmail.com'
  },
  {
    nama: 'tiana',
    email: 'tiana@gmail.com'
  },
]

  res.render('index', {
    nama: 'rifki',
    title: 'halaman home',
    mahasiswa,
    layout: 'layouts/main-layouts', 
  })
})

app.get('/about', (req, res) => {
  // res.sendFile('./about.html', {root: __dirname})
  res.render('about', {
    title: 'halaman about',
    layout: 'layouts/main-layouts', 
  })
})

app.get('/contact', (req, res) => {
  // res.sendFile('./contact.html', {root: __dirname})
  res.render('contact', {
    title: 'halaman contact',
    layout: 'layouts/main-layouts', 
  })
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
