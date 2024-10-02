const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI);

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;