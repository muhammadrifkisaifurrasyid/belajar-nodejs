const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://muhammadRifki02:muhammad02@cluster0.tzny5.mongodb.net/rifki?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

// membuat schema
// const contact = mongoose.model("contact", {
//   nama: {
//     type: String,
//     required: true,
//   },
//   nohp: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//   },
// });

// menambah 1 data
// const contact1 = new contact({
//     nama: 'tiana',
//     nohp: '08724621',
//     email: 'tiana@gmail.com'
// })

// simpan ke collection
// contact1.save().then(result => console.log(result)).catch(error => console.log(error))
