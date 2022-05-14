const { argv } = require("process");
const yargs = require("yargs");
const contact = require('./contacts');

yargs.command({
  command: "add",
  describe: "menambahkan contaact baru",
  builder: {
    nama: {
      describe: 'nama lengkap',
      demanOption: true,
      type: 'string'
    },
    email: {
      describe: 'Email',
      demanOption: false,
      type: 'string'
    },
    noHp: {
      describe: 'nomor Hp',
      demanOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    contact.simpanContact(argv.nama, argv.email, argv.noHp);
  },
  })
  .demandCommand();

  // menampilkan daftar semua nama dan no hp
  yargs.command({
    command: "list",
  describe: "menampilkan semua nama dan no hp contaact",
  handler() {
    contact.listContact()
  },
  });

  // menampilkan detail contact
  yargs.command({
    command: "detail",
  describe: "menampilkan detail sebuah contaact berdassarkan nama",
  builder: {
    nama: {
      describe: 'nama lengkap',
      demanOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    contact.detailContact(argv.nama);
  },
  })

  // menghapus contact berdasarkan nama
  yargs.command({
    command: "delet",
  describe: "menghapus sebuah contaact berdassarkan nama",
  builder: {
    nama: {
      describe: 'nama lengkap',
      demanOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    contact.deletContact(argv.nama);
  },
  })

yargs.parse();
