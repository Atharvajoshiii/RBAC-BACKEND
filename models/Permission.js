const mongoose = require('mongoose')
const permissionSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true, // Example: 'view_users', 'edit_users', 'delete_posts'
    },
    description: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
  });
  
module.exports = mongoose.model('Permission', permissionSchema);