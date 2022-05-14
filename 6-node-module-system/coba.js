// console.log('hello world');
function cetakNama(nama) {return `halo nama saya ${nama}`;}
const pi = 3.14;
const mahasiswa = {
    nama : 'rifki',
    umur : 16,
    cetakMhs() {return `halo, nama saya ${this.nama}, saya umur ${this.umur} tahun`}
};
class Orang {
    constructor() {
        console.log(`object orang telah dibuat!!`)
    }
}

// module.exports.pi = pi;
// module.exports.cetakNama = cetakNama;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

module.exports = {cetakNama, mahasiswa, pi, Orang};