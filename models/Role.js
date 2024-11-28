const mongoose = require('mongoose')
const roleSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true, // Roles like 'Admin', 'User' should be unique
    },
    permissions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission', // Reference to the Permission schema
    }],
  }, {
    timestamps: true,
  });
  
module.exports = mongoose.model('Role', roleSchema);