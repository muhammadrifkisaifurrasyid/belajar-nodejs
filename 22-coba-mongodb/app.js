const { MongoClient } = require("mongodb");
// const db = require("mongodb/lib/db");
const uri =
  "mongodb+srv://muhammadRifki02:muhammad02@cluster0.tzny5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "rifki";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log("koneks gagal");
  }
  // console.log("koneksi berhasil");

  // ambil database
  const db = client.db(dbName);

  // menampilkan semua data yg ada di collection muhammadRifki
  // console.log(db.collection('muhammadRifki').find().toArray((error, result) => console.log(result)))

  // menampikan data yg ada di clollection muhammadRifki berdasarkan kriteria
  // console.log(
  //   db
  //     .collection("muhammadRifki")
  //     .find({nama: 'tiana'})
  //     .toArray((error, result) => console.log(result))
  // );

  // mengubah data berdasarkan id
  // const updatePromise = db.collection("muhammadRifki").updateOne(
  //   {
  //     // _id: ObjectID('62711c87a64f885db0709650')
  //     nama: "tiana tamarasari",
  //   },
  //   {
  //     $set: {
  //       email: "tiana@proton.com",
  //     },
  //   }
  // );
  // updatePromise
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log(error));

  // mengubah data lebih dari 1 berdasarkan kriteria
  // db.collection('muhammadRifki').updateMany(
  //   {
  //     nama: 'muhammad rifki'
  //   },
  //   {
  //     $set:{
  //       nama: 'muhammad rifki saifurrasyid'
  //     }
  //   }
  // )

  // // mengahpus 1 data
  // db.collection("muhammadRifki")
  //   .deleteOne({
  //     nama: "tiana tamarasari",
  //   })
  //   .then((result) => console.log(result))
  //   .catch((eror) => console.log(eror));
  // mengahpus lebih daari 1 data
  db.collection("muhammadRifki")
  .deleteMany({
    nama: "muhammad rifki saifurrasyid",
  })
  .then((result) => console.log(result))
  .catch((eror) => console.log(eror));
});
