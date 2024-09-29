const mongoose = require('mongoose');

const password = process.env.PASSWORD;

const url = `mongodb+srv://serafimkvashnin:${password}@fullstackopen.zzchu.mongodb.net/noteApp?retryWrites=true&w=majority&appName=FullstackOpen`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
    content: 'MongoDB default driver is Cumbersome',
    important: true,
});

// note.save().then((result) => {
//     console.log('Note saved', result);
//     mongoose.connection.close();
// });

Note.find({ content: 'Html is easy' }).then((result) => {
    result.forEach((note) => {
        console.log(note);
    });
    mongoose.connection.close();
});
