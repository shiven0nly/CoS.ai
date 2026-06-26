const { GoogleGenerativeAI } = require('@google/generative-ai');
const AppError = require('../utils/AppError');
const validateFields = require('../utils/validateFields');
const {
  buildOrchestratePrompt,
  buildRescuePrompt,
  buildSchedulePrompt,
  buildPriorityPrompt,
  buildCoachingPrompt,
} = require('../utils/buildPrompt');

// ─────────────────────────────────────────────────────────────────────────────
// Gemini AI Client (initialised once, reused across all controllers)
// ─────────────────────────────────────────────────────────────────────────────
const genAI  = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model  = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

/**
 * Send a prompt to Gemini and return parsed JSON.
 * Wraps the call so the model is always instructed to return strict JSON.
 */
const callGemini = async (prompt) => {
  const systemInstruction = 'You are an AI Chief of Staff. Always respond ONLY with valid JSON — no markdown, no prose, no code fences. Respond with the exact JSON schema requested in the prompt.';
  const result = await model.generateContent(`${systemInstruction}\n\n${prompt}`);
  const text   = result.response.text().trim();

  // Strip accidental markdown fences if Gemini wraps anyway
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
  return JSON.parse(cleaned);
};

/**
 * Same but for the Coach endpoint which returns Markdown, not JSON.
 */
const callGeminiMarkdown = async (prompt) => {
  const systemInstruction = 'You are an encouraging AI Productivity Coach. Respond using clean Markdown — headings, bold text, bullet points. Be concise, practical, and never shame the user.';
  const result = await model.generateContent(`${systemInstruction}\n\n${prompt}`);
  return result.response.text().trim();
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Orchestrate full day
// @route   POST /api/ai/orchestrate
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
exports.orchestrateDay = async (req, res, next) => {
  try {
    const { currentTime, deadlines, taskList, energyLevel, calendarAvailability } = req.body;

    if (validateFields({ taskList }, ['taskList'], next)) return;

    const prompt = buildOrchestratePrompt({ currentTime, energyLevel, calendarAvailability, taskList });
    const orchestration = await callGemini(prompt);

    return res.status(200).json({
      success: true,
      ...(process.env.NODE_ENV === 'development' && { _debug_prompt: prompt }),
      orchestration,
    });
  } catch (err) {
    // JSON parse failure from Gemini → 502
    if (err instanceof SyntaxError) {
      return next(new AppError('AI returned an unexpected response format. Please retry.', 502));
    }
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    AI Crisis Planner (Rescue Mode)
// @route   POST /api/ai/rescue
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
exports.rescueDeadline = async (req, res, next) => {
  try {
    const { timeRemainingMinutes, tasksDue } = req.body;

    if (validateFields({ tasksDue }, ['tasksDue'], next)) return;

    const safeTime       = Math.max(0, Number(timeRemainingMinutes) || 0);
    const totalEstimated = tasksDue.reduce((sum, t) => sum + (Number(t.estimatedMinutes) || 0), 0);
    const isImpossible   = totalEstimated > safeTime;

    const prompt    = buildRescuePrompt({ timeRemainingMinutes: safeTime, totalEstimated, isImpossible, tasksDue });
    const crisisPlan = await callGemini(prompt);

    return res.status(200).json({ success: true, crisisPlan });
  } catch (err) {
    if (err instanceof SyntaxError) {
      return next(new AppError('AI returned an unexpected response format. Please retry.', 502));
    }
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Generate granular daily schedule
// @route   POST /api/ai/generate-schedule
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
exports.generateSchedule = async (req, res, next) => {
  try {
    const { tasks, priority, energy, availableTime, calendar, deadline } = req.body;

    if (validateFields({ tasks }, ['tasks'], next)) return;

    const prompt      = buildSchedulePrompt({ tasks, priority, energy, availableTime, calendar, deadline });
    const schedulePlan = await callGemini(prompt);

    return res.status(200).json({ success: true, schedulePlan });
  } catch (err) {
    if (err instanceof SyntaxError) {
      return next(new AppError('AI returned an unexpected response format. Please retry.', 502));
    }
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Priority Engine: Rank tasks
// @route   POST /api/ai/rank-priorities
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
exports.rankPriorities = async (req, res, next) => {
  try {
    const { tasks, userEnergyLevel } = req.body;

    if (validateFields({ tasks }, ['tasks'], next)) return;

    const prompt        = buildPriorityPrompt({ tasks, userEnergyLevel });
    const priorityEngine = await callGemini(prompt);

    return res.status(200).json({ success: true, priorityEngine });
  } catch (err) {
    if (err instanceof SyntaxError) {
      return next(new AppError('AI returned an unexpected response format. Please retry.', 502));
    }
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Productivity Coach (returns Markdown)
// @route   POST /api/ai/coach
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
exports.productivityCoach = async (req, res, next) => {
  try {
    const { tasksCompleted = 0, tasksRemaining = 0, focusHours = 0, blockers } = req.body;

    const prompt          = buildCoachingPrompt({ tasksCompleted, tasksRemaining, focusHours, blockers });
    const coachingMessage  = await callGeminiMarkdown(prompt);

    return res.status(200).json({ success: true, coachingMessage });
  } catch (err) {
    next(err);
  }
};
