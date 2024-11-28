const express = require('express');
const Permission = require('../models/Permission');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new permission
router.post('/', verifyToken, verifyRole('Admin'), async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the permission already exists
    const existingPermission = await Permission.findOne({ name });
    if (existingPermission) {
      return res.status(400).json({
        success: false,
        message: 'Permission already exists',
        data: null,
      });
    }

    // Create the permission
    const permission = new Permission({ name });
    await permission.save();

    res.status(201).json({
      success: true,
      message: 'Permission created successfully',
      data: permission,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
      data: null,
    });
  }
});

// Get all permissions
router.get('/', verifyToken, verifyRole('Admin'), async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json({
      success: true,
      message: 'Permissions fetched successfully',
      data: permissions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
      data: null,
    });
  }
});

module.exports = router;