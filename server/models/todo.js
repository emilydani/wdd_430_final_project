const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String },
   status: { type: String}
});

module.exports = mongoose.model('Todo', todoSchema);
