const mongoose = require('mongoose');

const scheduleBlockSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  label: { type: String, required: true }, // e.g., 'Deep Work', 'Meetings'
  isFixed: { type: Boolean, default: false } // If true, AI cannot reschedule this block
});

const scheduleSchema = new mongoose.Schema(
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
        // Sets time to 00:00:00 for normalization
        const date = new Date(d);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
    },
    blocks: [scheduleBlockSchema]
  },
  { timestamps: true }
);

// Scalability: Ensure 1 schedule document per user per day.
scheduleSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Schedule', scheduleSchema);
