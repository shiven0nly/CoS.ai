const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    parentGoalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'deferred'],
      default: 'pending'
    },
    priorityScore: { type: Number, default: 0 },
    estimatedMinutes: { type: Number, required: true, min: [5, 'Task must take at least 5 minutes'] },
    deadline: { type: Date },
    isAIGenerated: { type: Boolean, default: false },
    tags: [{ type: String }]
  },
  { timestamps: true }
);

// Compound Indexing for High-Performance Queries
// 1. Efficiently query open tasks for a user
taskSchema.index({ user: 1, status: 1 });
// 2. Efficiently query tasks nearing deadline for Priority Engine
taskSchema.index({ user: 1, deadline: 1 });

module.exports = mongoose.model('Task', taskSchema);
