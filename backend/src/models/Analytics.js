const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
      set: d => {
        // Zero out time
        const date = new Date(d);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    },
    focusHours: { type: Number, default: 0 },
    tasksCompleted: { type: Number, default: 0 },
    habitsCompleted: { type: Number, default: 0 },
    energyLevelAvg: { type: Number, min: 1, max: 10, default: null } // 1-10 self-reported or AI-inferred
  },
  { timestamps: true }
);

// Compound index to ensure 1 analytics document per user per day.
// Also allows O(1) lookups for daily stats.
analyticsSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Analytics', analyticsSchema);
