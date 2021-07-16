const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String },
   status: { type: String},
   time: { type: Number},
   details: { type: String},
   date: { type: Date}
});

module.exports = mongoose.model('Todo', todoSchema);
