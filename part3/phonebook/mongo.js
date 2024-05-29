const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

if (process.argv.length > 3) {
    const password = process.argv[2]
    const newName = process.argv[3]
    const newNumber = process.argv[4]
    
    const uri = `mongodb+srv://tamadmin:${password}@cluster0.qvqsovb.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
    
    mongoose.set('strictQuery',false)
    mongoose.connect(uri, {
        serverSelectionTimeoutMS: 100000, // 30 seconds
        socketTimeoutMS: 60000, // 45 seconds
        connectTimeoutMS: 60000 // 30 seconds
    })
    .then(() => {
        console.log('Database connection established!') 
        const personSchema = new mongoose.Schema({
            name: String,
            number: String
        })
    
        const Person = mongoose.model('Person', personSchema)
    
        const person = new Person({
            name: newName,
            number: newNumber
        })
    
        person.save().then(result => {
            console.log(`added ${newName} number ${newNumber} to phonebook`)
            mongoose.connection.close()
        })
    
        // Person.find({}).then(result => {
        //     result.forEach(person => {
        //     console.log(person)
        //     })
        //     mongoose.connection.close()
        // })
    }, 
        err => { 
            console.error('Connection error', err); 
        }
    )

} else {
    const password = process.argv[2]
    const uri = `mongodb+srv://tamadmin:${password}@cluster0.qvqsovb.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
    mongoose.set('strictQuery',false)

    mongoose.connect(uri, {
        serverSelectionTimeoutMS: 100000, // 30 seconds
        socketTimeoutMS: 60000, // 45 seconds
        connectTimeoutMS: 60000 // 30 seconds
    })
    .then(() => {
        console.log('Database connection established!') 
        const personSchema = new mongoose.Schema({
            name: String,
            number: String
        })
    
        const Person = mongoose.model('Person', personSchema)
    
        Person.find({}).then(result => {
            console.log('phonebook:')
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
    }, 
        err => { 
            console.error('Connection error', err); 
        }
    )
}

// mongoose.connect(uri, {
//     serverSelectionTimeoutMS: 100000, // 30 seconds
//     socketTimeoutMS: 60000, // 45 seconds
//     connectTimeoutMS: 60000 // 30 seconds
// })
// .then(() => {
//     console.log('Database connection established!') 
//     const personSchema = new mongoose.Schema({
//         name: String,
//         number: String
//     })

//     const Person = mongoose.model('Person', personSchema)

//     // const person = new Person({
//     //     name: "Quan",
//     //     number: "012344"
//     // })

//     // person.save().then(result => {
//     //     console.log('person saved!!')
//     //     mongoose.connection.close()
//     // })

//     Person.find({}).then(result => {
//         result.forEach(person => {
//         console.log(person)
//         })
//         mongoose.connection.close()
//     })
// }, 
//     err => { 
//         console.error('Connection error', err); 
//     }
// )

// mongoose.connection.close()