const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  desscriptioin:{
    type: String,
    required: true
  },
  tag:{
    type: String,
    default:"General"
  },
  date:{
    type: date,
    default : Date.now
  },
});
module.export=mongoose.model('notes',NotesSchema);