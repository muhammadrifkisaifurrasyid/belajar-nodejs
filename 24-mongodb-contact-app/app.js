const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const { body, validationResult, check } = require("express-validator");
const methodeOverride = require("method-override");

require("./utils/db");
const contact = require("./model/contact");

const app = express();
const port = 3000;

// set up method override
app.use(methodeOverride("_method"));

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

// halaman form tambah data contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "form tambah data contact",
    layout: "layouts/main-layouts",
  });
});

// proses tambah data contact
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await contact.findOne({ nama: value });
      if (duplikat) {
        throw new Error("nama contact sudah terdaftar");
      }
      return true;
    }),
    check("email", "email tidak valid").isEmail(),
    check("nohp", "no hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "form tambah data contact",
        layout: "layouts/main-layouts",
        errors: errors.array(),
      });
    } else {
      contact.insertMany(req.body, (err, result) => {
        // kirimkan flash message
        req.flash("msg", "data contact berhasil ditambahkan");
        res.redirect("/contact");
      });
    }
  }
);

// proses delete contact
// app.get("/contact/delete/:nama", async (req, res) => {
//   const contact1 = await contact.findOne({nama: req.params.nama});

//   // jika contact tidak ada
//   if (!contact1) {
//     res.status(404);
//     res.send("<h1>404</h1>");
//   } else {
//     contact.deleteOne({nama: req.params.nama}).then(() => {
//       req.flash("msg", "data contact berhasil dihapus");
//       res.redirect("/contact");
//     });
//   }
// });
app.delete("/contact", (req, res) => {
  contact.deleteOne({ nama: req.body.nama }).then(() => {
    req.flash("msg", "data contact berhasil dihapus");
    res.redirect("/contact");
  });
});

// form ubah data contact
app.get("/contact/edit/:nama", async (req, res) => {
  const contact1 = await contact.findOne({ nama: req.params.nama });

  res.render("edit-contact", {
    title: "form ubah data contact",
    layout: "layouts/main-layouts",
    contact1,
  });
});

// proses ubah data contact
app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("nama contact sudah terdaftar");
      }
      return true;
    }),
    check("email", "email tidak valid").isEmail(),
    check("nohp", "no hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "form ubah data contact",
        layout: "layouts/main-layouts",
        errors: errors.array(),
        contact1: req.body,
      });
    } else {
      contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp
          }
        }
        ).then((result) => {
           // kirimkan flash message
      req.flash("msg", "data contact berhasil diubah");
      res.redirect("/contact");
        });
    }
  }
);

// halaman detail contact
app.get("/contact/:nama", async (req, res) => {
  const contact1 = await contact.findOne({ nama: req.params.nama });

  res.render("detail", {
    title: "halaman detail contact",
    layout: "layouts/main-layouts",
    contact1,
  });
});

app.listen(port, () => {
  console.log(`mongo contact app | listening at http://localhost:${port}`);
});
