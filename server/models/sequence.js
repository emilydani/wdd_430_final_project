const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   id: { type: String, required: true },
   maxContactId: { type: Number }
});

module.exports = mongoose.model('Sequence', sequenceSchema);
