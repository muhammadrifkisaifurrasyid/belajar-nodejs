const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {loadContact, findContact} = require('./utils/contacts')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(expressLayouts)

app.use(express.static('public'))
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
  res.render('about', {
    title: 'halaman about',
    layout: 'layouts/main-layouts', 
  })
})

app.get('/contact', (req, res) => {
  const contacts = loadContact()
  // console.log(contacts)
  res.render('contact', {
    title: 'halaman contact',
    layout: 'layouts/main-layouts', 
    contacts,
  })
})

app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama)
  res.render('detail', {
    title: 'halaman detail contact',
    layout: 'layouts/main-layouts', 
    contact,
  })
}) 

app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
