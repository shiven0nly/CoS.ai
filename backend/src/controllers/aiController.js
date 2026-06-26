const AppError = require('../utils/AppError');

// @desc    Breakdown a vague goal into subtasks
// @route   POST /api/ai/breakdown
// @access  Private
exports.breakdownGoal = async (req, res, next) => {
  try {
    const { goal } = req.body;
    if (!goal) return next(new AppError('Please provide a goal', 400));

    // MOCK AI LOGIC (Replace with Gemini/OpenAI API call later)
    const mockSubtasks = [
      { title: `Research ${goal}`, estimatedMinutes: 30 },
      { title: `Draft outline for ${goal}`, estimatedMinutes: 45 },
      { title: `Review and finalize`, estimatedMinutes: 20 },
    ];

    res.status(200).json({ success: true, data: mockSubtasks });
  } catch (error) {
    next(error);
  }
};

// @desc    Analyze schedule and rescue a deadline
// @route   POST /api/ai/rescue
// @access  Private
exports.rescueDeadline = async (req, res, next) => {
  try {
    // Mock logic for Hackathon
    res.status(200).json({ 
      success: true, 
      message: "Rescue Mode Triggered. 2 non-essential tasks deferred.",
      data: { deferredTasks: 2, savedMinutes: 120 } 
    });
  } catch (error) {
    next(error);
  }
};
