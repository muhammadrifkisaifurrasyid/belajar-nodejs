const fs = require("fs");
const { builtinModules } = require("module");

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

// ambil semua data di contact.json
const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf8");
  const contacts = JSON.parse(file);
  return contacts;
};

// cari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
  return contact
}

module.exports = { findContact, loadContact };
