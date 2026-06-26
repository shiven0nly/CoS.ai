const AppError = require('../utils/AppError');

// @desc    Orchestrate full day: breakdown, rank, schedule, and rescue
// @route   POST /api/ai/orchestrate
// @access  Private
exports.orchestrateDay = async (req, res, next) => {
  try {
    const { 
      currentTime, 
      deadlines, 
      taskList, 
      energyLevel, 
      calendarAvailability 
    } = req.body;

    // VALIDATION
    if (!taskList || taskList.length === 0) {
      return next(new AppError('Must provide a taskList for orchestration.', 400));
    }

    // THE PROMPT TEMPLATE (You will push this to Gemini/OpenAI)
    const promptTemplate = `
      You are an AI Executive Assistant.
      Based on the following parameters:
      - Current Time: ${currentTime}
      - Energy Level: ${energyLevel}
      - Calendar Availability: ${JSON.stringify(calendarAvailability)}
      - Tasks: ${JSON.stringify(taskList)}
      
      Generate a strictly typed JSON response containing:
      {
        "taskBreakdown": [{ "parent": "Task A", "steps": [] }],
        "priorityRanking": ["taskId1", "taskId2"],
        "todaysPlan": [{ "timeSlot": "09:00", "task": "..." }],
        "suggestedSchedule": [...],
        "riskAnalysis": "Analysis string",
        "deadlineRescuePlan": "Contingency steps if delay occurs",
        "motivationalCoaching": "Hard-hitting executive truth"
      }
    `;

    // MOCK AI ENGINE RESPONSE (Mimics exactly what the LLM will return)
    // Later replace with: const response = await openai.chat.completions.create(...)
    const mockStructuredResponse = {
      taskBreakdown: [
        {
          parentTask: taskList[0]?.title || "Primary Goal",
          steps: ["Research dependencies", "Draft architecture", "Execute implementation"]
        }
      ],
      priorityRanking: taskList.map(t => t.id || t.title),
      todaysPlan: [
        { timeSlot: "09:00 - 10:30", task: "Deep Work: Database Schema", energyRequired: "High" },
        { timeSlot: "11:00 - 11:30", task: "Admin & Emails", energyRequired: "Low" }
      ],
      suggestedSchedule: "Block 09:00-11:00 for core engineering. Use post-lunch for admin tasks since your inputted energy is Low.",
      riskAnalysis: deadlines?.length > 0 
        ? "High Risk: Only 4 free hours today, but 6 hours of tasks due tomorrow."
        : "Low Risk: Calendar density matches task estimates.",
      deadlineRescuePlan: "If you fall behind by 2pm, instantly defer 'Admin Emails' to tomorrow to protect the engineering delivery at 5pm.",
      motivationalCoaching: "You build momentum by executing the hardest thing first. Don't look at the whole mountain; just take the first step. Let's conquer the morning."
    };

    res.status(200).json({ 
      success: true, 
      promptUsedForDebugging: process.env.NODE_ENV === 'development' ? promptTemplate : undefined,
      orchestration: mockStructuredResponse 
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Trigger AI Crisis Planner (Rescue Mode)
// @route   POST /api/ai/rescue
// @access  Private
exports.rescueDeadline = async (req, res, next) => {
  try {
    const { timeRemainingMinutes, tasksDue } = req.body;

    if (!tasksDue || tasksDue.length === 0) {
      return next(new AppError('Must provide tasksDue to evaluate rescue plan.', 400));
    }

    const totalEstimated = tasksDue.reduce((sum, task) => sum + (task.estimatedMinutes || 0), 0);
    const isImpossible = totalEstimated > timeRemainingMinutes;

    const crisisPrompt = `
      You are an AI Crisis Planner. The user is behind schedule.
      - Time Remaining: ${timeRemainingMinutes} minutes
      - Minimum Required Work: ${totalEstimated} minutes
      - Tasks: ${JSON.stringify(tasksDue)}
      
      Completion is ${isImpossible ? "IMPOSSIBLE" : "AT RISK"}.
      Generate a realistic emergency rescue strategy prioritizing essential work, suggesting shortcuts, and dropping unnecessary tasks. 
      Output STRICTLY this JSON structure:
      {
        "status": "IMPOSSIBLE | HIGH RISK",
        "analysis": "Short analysis of remaining time vs work.",
        "emergencyStrategy": "High level strategy",
        "essentialPriority": ["taskId1"],
        "suggestedShortcuts": [{"task": "taskId1", "shortcut": "Use generic auth instead of custom."}],
        "droppedTasks": ["taskId_dropped"],
        "actionPlan": [{"step": 1, "action": "Do X immediately", "timeLimit": "30m"}]
      }
    `;

    // MOCK RESPONSE
    const mockRescue = {
      status: isImpossible ? "IMPOSSIBLE" : "HIGH RISK",
      analysis: `You have ${timeRemainingMinutes}m but ${totalEstimated}m of work. Standard completion will fail. We must cut scope.`,
      emergencyStrategy: "Drop the analytics page. Hardocde the frontend mock data to speed up the demo. Focus exclusively on the working AI backend logic.",
      essentialPriority: tasksDue.map(t => t.id || t.title).slice(0, 2),
      suggestedShortcuts: [{ task: "Auth UI", shortcut: "Copy-paste pre-built Tailwind auth components and forego tests." }],
      droppedTasks: tasksDue.map(t => t.id || t.title).slice(2),
      actionPlan: [
        { step: 1, action: "Lock in the core API endpoint", timeLimit: "45m" },
        { step: 2, action: "Wire the frontend with hardcoded user bypass", timeLimit: "15m" }
      ]
    };

    res.status(200).json({ 
      success: true, 
      crisisPlan: mockRescue 
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Generate a granular daily schedule
// @route   POST /api/ai/generate-schedule
// @access  Private
exports.generateSchedule = async (req, res, next) => {
  try {
    const { 
      tasks, 
      priority, 
      energy, 
      availableTime, 
      calendar, 
      deadline 
    } = req.body;

    // VALIDATION
    if (!tasks || tasks.length === 0) {
      return next(new AppError('Must provide tasks to generate a schedule.', 400));
    }

    const schedulePrompt = `
      You are an AI Time-Blocking Expert.
      Given:
      - Tasks: ${JSON.stringify(tasks)}
      - Priorities: ${priority}
      - Energy Level: ${energy}
      - Available Time: ${availableTime}
      - Calendar Events: ${JSON.stringify(calendar)}
      - Deadlines: ${deadline}

      Generate an optimal timeline placing deep work during high energy periods and admin during low energy.
      Ensure there is buffer time between context switching. End the day with a Review Session.
      STRICT JSON OUPUT format:
      {
        "timeBlocks": [{ "startTime": "09:00", "endTime": "10:30", "taskId": "...", "label": "Deep Work" }],
        "breaks": [{ "startTime": "10:30", "endTime": "10:45", "label": "Coffee Break" }],
        "deepWorkSessions": 2,
        "bufferTimeTotalMinutes": 45,
        "reviewSession": { "startTime": "16:45", "endTime": "17:00", "label": "Day Review & Planner" }
      }
    `;

    // MOCK RESPONSE
    const mockSchedule = {
      timeBlocks: [
        { startTime: "09:00", endTime: "11:00", task: tasks[0]?.title || "Primary Deep Work", label: "Deep Work Session ⚡", intensity: 'high' },
        { startTime: "11:30", endTime: "12:30", task: tasks[1]?.title || "Secondary Task", label: "General Work", intensity: 'medium' },
        { startTime: "13:30", endTime: "15:00", task: "Emails & Admin", label: "Low Energy Operations", intensity: 'low' }
      ],
      breaks: [
        { startTime: "11:00", endTime: "11:15", label: "Walk / Stretch Break" },
        { startTime: "12:30", endTime: "13:30", label: "Lunch & Detach" },
        { startTime: "15:00", endTime: "15:15", label: "Brain Buffer" }
      ],
      deepWorkSessions: 1,
      bufferTimeTotalMinutes: 90,
      reviewSession: { startTime: "16:45", endTime: "17:00", label: "Review Day & Stage Tomorrow" }
    };

    res.status(200).json({ 
      success: true, 
      schedulePlan: mockSchedule 
    });

  } catch (error) {
    next(error);
  }
};



