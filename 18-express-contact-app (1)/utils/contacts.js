const res = require("express/lib/response");
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

// menuliskan / menimpa file contact.json dengan data yg baru
const saveContacts = (contacts) => {
  fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts))
}

// menambahkan data contact baru
const addContact = (contact) =>{
  const contacts = loadContact()
  contacts.push(contact)
  saveContacts(contacts)
}

// cek nama yg duplikat
const cekDuplikat = (nama) => {
  const contacts = loadContact()
  return contacts.find(contact => contact.nama === nama)
}

// hapus contact
const deletContact = nama => {
  const contacts = loadContact()
  const filteredContacts = contacts.filter(contact => contact.nama !== nama)
  // console.log(filteredContacts)
  saveContacts(filteredContacts)
}

const updateContacts = contactBaru => {
  const contacts = loadContact()
  // hilangkan contact nama yg namanya sama dgn nama lama
  const filteredContacts = contacts.filter(contact => contact.nama !== contactBaru.oldNama)
  delete contactBaru.oldNama
  filteredContacts.push(contactBaru)
  saveContacts(filteredContacts)
}

module.exports = { addContact, findContact, loadContact, cekDuplikat, deletContact, updateContacts };
