const Task = require('../models/Task');
const AppError = require('../utils/AppError');
const { validationResult } = require('express-validator');

// @desc    Get all tasks for user
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort('-deadline');
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return next(new AppError(errors.array()[0].msg, 400));
    }

    req.body.user = req.user.id;
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new AppError('Task not found', 404));
    if (task.user.toString() !== req.user.id)
      return next(new AppError('Not authorized to update this task', 403));

    // Prevent malicious body injection from overriding the owner
    delete req.body.user;

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new AppError('Task not found', 404));
    if (task.user.toString() !== req.user.id)
      return next(new AppError('Not authorized to delete this task', 403));

    await task.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
