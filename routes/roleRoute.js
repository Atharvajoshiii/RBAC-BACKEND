const express = require('express');
const Role = require('../models/Role');
const User = require('../models/User')
const Permission = require('../models/Permission');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new role
router.post('/', verifyToken, verifyRole('Admin'), async (req, res) => {
  try {
    const { name, permissions } = req.body;

    // Check if role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) return res.status(400).json({ message: 'Role already exists' });

    // Validate permissions
    const permissionDocs = await Permission.find({ name: { $in: permissions } });
    if (permissionDocs.length !== permissions.length) {
      return res.status(400).json({ message: 'Some permissions are invalid' });
    }

    // Create new role
    const role = new Role({ name, permissions: permissionDocs.map((p) => p._id) });
    await role.save();

    res.status(201).json({ message: 'Role created successfully', role });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all roles
router.get('/roles', verifyToken, verifyRole('Admin'), async (req, res) => {
  try {
    const roles = await Role.find().populate('permissions');
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/assign-role', verifyToken, async (req, res) => {
    try {
      const { userId, roleName } = req.body;
  
      // Find the role
      const role = await Role.findOne({ name: roleName });
      if (!role) return res.status(404).json({ message: 'Role not found' });
  
      // Update the user with the new role
      const user = await User.findByIdAndUpdate(userId, { role: role._id }, { new: true });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json({ message: 'Role assigned successfully', user });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

module.exports = router;