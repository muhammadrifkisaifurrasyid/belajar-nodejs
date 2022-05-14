const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact, addContact, cekDuplikat, deletContact, updateContacts } = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const req = require('express/lib/request')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

// konfigurasi flash
app.use(cookieParser('secret'))
app.use(session({
  cookie: {maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))
app.use(flash())

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
    msg: req.flash('msg')
  })
})

// halaman form tambah data contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'form tambah data contact',
    layout: 'layouts/main-layouts', 
  })
})

// proses data contact
app.post('/contact', [
  body('nama').custom((value) => {
    const duplikat = cekDuplikat(value)
    if(duplikat) {
      throw new Error('nama contact sudah terdaftar')
    }
  return true
  }),
  check('email', 'email tidak valid').isEmail(),
  check('nohp', 'no hp tidak valid').isMobilePhone('id-ID'),

], (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    // return res.status(400).json({errors: errors.array()})
    res.render('add-contact', {
      title: 'form tambah data contact',
      layout: 'layouts/main-layouts', 
      errors: errors.array(),
    })
  } else {
    addContact(req.body)

    // kirimkan flash message
    req.flash('msg', 'data contact berhasil ditambahkan')

    res.redirect('/contact')
  }
})

// proses delete contact
app.get('/contact/delete/:nama', (req, res) => {
  const contact = findContact(req.params.nama)

  // jika contact tidak ada
  if(!contact ) {
    res.status(404)
    res.send('<h1>404</h1>')
  } else {
    deletContact(req.params.nama)
    req.flash('msg', 'data contact berhasil dihapus')
    res.redirect('/contact')
  }
})

// form ubah data contact
app.get('/contact/edit/:nama', (req, res) => {
  const contact = findContact(req.params.nama)

  res.render('edit-contact', {
    title: 'form ubah data contact',
    layout: 'layouts/main-layouts', 
    contact,
  })
})

// proses ubah data
app.post('/contact/update', [
  body('nama').custom((value, {req}) => {
    const duplikat = cekDuplikat(value)
    if(value !== req.body.oldNama && duplikat) {
      throw new Error('nama contact sudah terdaftar')
    }
  return true
  }),
  check('email', 'email tidak valid').isEmail(),
  check('nohp', 'no hp tidak valid').isMobilePhone('id-ID'),

], (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    // return res.status(400).json({errors: errors.array()})
    res.render('edit-contact', {
      title: 'form ubah data contact',
      layout: 'layouts/main-layouts', 
      errors: errors.array(),
      contact: req.body,
    })
  } else {
    updateContacts(req.body)

    // kirimkan flash message
    req.flash('msg', 'data contact berhasil diubah')

    res.redirect('/contact')
  }
})

 // halaman detail contact
app.get('/contact/:nama', async (req, res) => {
  // const contact = findContact(req.params.nama)
  const contact = await contact.findOne({nama: req.params.nama})

  res.render('detail', {
    title: 'halaman detail contact',
    layout: 'layouts/main-layouts', 
    contact,
  })
}) 

// app.use('/', (req, res) => {
//   res.status(404)
//   res.send('<h1>404</h1>')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
