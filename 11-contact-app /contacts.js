// const { rejects } = require("assert");
const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");
const { constants } = require("buffer");

// membuat folder data jika belum ada
const dirpath = "./data";
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}

// // membuat file json jika belum ada
const datapath = "data/contacts.json";
if (!fs.existsSync(datapath)) {
  fs.writeFileSync(datapath, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
  // const file = fs.readFileSync("data/contacts.json", "utf8");
  // const contacts = JSON.parse(file);
  const contacts = loadContact();

  // cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(chalk.red.bold("contact sudah terdaftar, gunakan nama lain!"));
    return false;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.bold("email tidak valid"));
      return false;
    }
  }

  // cek noHp
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red.bold("no hp tidak valid"));
    return false;
  }

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.green.bold("terimakasih telah memasukkan data."));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.bold("daftar contact :"));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  if (!contact) {
    console.log(chalk.red.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  console.log(chalk.cyan.bold(contact.nama));
  console.log(chalk.cyan.bold(contact.noHp));
  if (contact.email) {
    console.log(chalk.cyan.bold(contact.email));
  }
};

const deletContact = (nama) => {
  const contacts = loadContact();
  const newContact = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContact.length) {
    console.log(chalk.red.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContact));
  console.log(chalk.red.bold(`data contact ${nama} berhasil dihapus`));

};

module.exports = { deletContact, detailContact, listContact, simpanContact };
