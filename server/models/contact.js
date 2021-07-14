const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String },
   status: { type: String}
});

module.exports = mongoose.model('Contact', contactSchema);
