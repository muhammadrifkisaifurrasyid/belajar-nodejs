const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require("./utils/db");
const contact = require("./model/contact");

const app = express();
const port = 3000;

// set up EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// hslaman home
app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "rifki",
      email: "rifki@gmail.com",
    },
    {
      nama: "imel",
      email: "imel@gmail.com",
    },
    {
      nama: "tiana",
      email: "tiana@gmail.com",
    },
  ];

  res.render("index", {
    nama: "rifki",
    title: "halaman home",
    mahasiswa,
    layout: "layouts/main-layouts",
  });
});

// halaman about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "halaman about",
    layout: "layouts/main-layouts",
  });
});

// halaman contact
app.get("/contact", async (req, res) => {
  //   contact.find().then(contact => {
  //       res.send(contact)
  //   })

  const contacts = await contact.find();

  res.render("contact", {
    title: "halaman contact",
    layout: "layouts/main-layouts",
    contacts,
    msg: req.flash("msg"),
  });
});

// halaman detail contact
app.get("/contact/:nama", async (req, res) => {
  const contact = await contact.findOne({ nama: req.params.nama });

  res.render("detail", {
    title: "halaman detail contact",
    layout: "layouts/main-layouts",
    contact,
  });
});

app.listen(port, () => {
  console.log(`mongo contact app | listening at http://localhost:${port}`);
});
