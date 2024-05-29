const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const uri = `mongodb://tamngminh3:${password}@phonebook.nqebw2j.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 60000,
  socketTimeoutMS: 45000, // 45 seconds
  connectTimeoutMS: 30000 // 30 seconds
})
.then(
  () => { console.log('Database connection established!'); },
  err => { console.error('Connection error', err); }
)

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// })

const PersonModel = mongoose.model('Person', new mongoose.Schema({
  name: String,
  number: String
}))

const doc = new PersonModel({
  name: "Tamm",
  number: "1234"
})

doc.save().then(savedDoc => {
  console.log('saved!!!!')
})



// const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//   name: 'Tam',
//   number: '123'
// })

// person.save({
//   serverSelectionTimeoutMS: 30000
// }).then(result => {
//     console.log('saved!!')
//     mongoose.connection.close()
// })

// // Person.find({}).then(result => {
// //     result.forEach(note => {
// //       console.log(note)
// //     })
// //     mongoose.connection.close()
// //   })


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://tamngminh3:b2YidJ5xk4W7Yc4R@phonebook.nqebw2j.mongodb.net/?retryWrites=true&w=majority&appName=phonebook";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//     useUnifiedTopology: true
//   },
// });

// const client = new MongoClient(uri);


// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
