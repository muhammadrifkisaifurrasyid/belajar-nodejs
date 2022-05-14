// core module
// file system

const fs = require('fs');

// menuliskan string ke file  secara syncrhonus
// // console.log(fs);
// try {
// fs.writeFileSync('data/test.txt', 'hello world secara synchronus!');
// } catch(e) {console.log(e)} 

// menuliskan string ke file  secara asyncrhonus
// fs.writeFile('data/test.txt', 'hello world secara asynchronus', e => console.log(e));

// membaca file secara synchronus
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

// membaca file secara asynchronus
// const data = fs.readFile('data/test.txt', 'utf-8', (err, data ) => {
//     if (err) throw e;
//     console.log(data);
// });

// readline
const readline = require('readline');
const rl = readline.createInterface({ 
    input : process.stdin,
    output : process.stdout
});

rl.question('masukkan nama anda : ',(nama) => {
    rl.question('masukkan no HP anda :', (noHP) => {
        // console.log(`terimakasih ${nama} sudah menginputkan ${noHP}`);
        const contact = {nama, noHP};
        const file = fs.readFileSync("data/contacts.json", "utf8");
        // console.log(file);
        const contacts = JSON.parse(file);
        // console.log(contacts);
        contacts.push(contact);
        // console.log(contacts);
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
        console.log('terimakasih telah memasukkan data.');
        rl.close();
    });
});