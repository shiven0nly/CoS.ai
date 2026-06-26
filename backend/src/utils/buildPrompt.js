/**
 * OCP/SRP: Centralise all LLM prompt construction here.
 * Controllers pass in context; this file owns the "how to prompt" logic.
 * When AI integration is wired up, only this file changes — not the controllers.
 */

const buildOrchestratePrompt = ({ currentTime, energyLevel, calendarAvailability, taskList }) => `
You are an AI Executive Assistant.
Based on the following parameters:
- Current Time: ${currentTime}
- Energy Level: ${energyLevel}
- Calendar Availability: ${JSON.stringify(calendarAvailability)}
- Tasks: ${JSON.stringify(taskList)}

Generate a strictly typed JSON response:
{
  "taskBreakdown": [{ "parentTask": "Task A", "steps": [] }],
  "priorityRanking": ["taskId1", "taskId2"],
  "todaysPlan": [{ "timeSlot": "09:00", "task": "..." }],
  "suggestedSchedule": "...",
  "riskAnalysis": "...",
  "deadlineRescuePlan": "...",
  "motivationalCoaching": "..."
}`;

const buildRescuePrompt = ({ timeRemainingMinutes, totalEstimated, isImpossible, tasksDue }) => `
You are an AI Crisis Planner. The user is behind schedule.
- Time Remaining: ${timeRemainingMinutes} minutes
- Minimum Required Work: ${totalEstimated} minutes
- Tasks: ${JSON.stringify(tasksDue)}
- Completion is ${isImpossible ? 'IMPOSSIBLE' : 'AT RISK'}.

Output STRICTLY:
{
  "status": "IMPOSSIBLE | HIGH RISK",
  "analysis": "...",
  "emergencyStrategy": "...",
  "essentialPriority": ["taskId1"],
  "suggestedShortcuts": [{"task": "...", "shortcut": "..."}],
  "droppedTasks": ["taskId_dropped"],
  "actionPlan": [{"step": 1, "action": "...", "timeLimit": "..."}]
}`;

const buildSchedulePrompt = ({ tasks, priority, energy, availableTime, calendar, deadline }) => `
You are an AI Time-Blocking Expert.
- Tasks: ${JSON.stringify(tasks)}
- Priorities: ${priority}
- Energy Level: ${energy}
- Available Time: ${availableTime}
- Calendar Events: ${JSON.stringify(calendar)}
- Deadlines: ${deadline}

Place deep work during high-energy periods and admin during low-energy.
Output STRICTLY:
{
  "timeBlocks": [{ "startTime": "09:00", "endTime": "10:30", "task": "...", "label": "...", "intensity": "high|medium|low" }],
  "breaks": [{ "startTime": "10:30", "endTime": "10:45", "label": "..." }],
  "deepWorkSessions": 2,
  "bufferTimeTotalMinutes": 45,
  "reviewSession": { "startTime": "16:45", "endTime": "17:00", "label": "..." }
}`;

const buildPriorityPrompt = ({ tasks, userEnergyLevel }) => `
You are the Priority Engine of an AI Chief of Staff.
User's Energy Level: ${userEnergyLevel}
Tasks: ${JSON.stringify(tasks)}

Rank tasks by: deadline proximity, difficulty vs energy, importance, estimated time, risk, dependencies.

Output STRICTLY:
{
  "rankedTasks": [{ "taskId": "...", "title": "...", "priorityScore": 95, "explanation": "..." }],
  "topRecommendation": "..."
}`;

const buildCoachingPrompt = ({ tasksCompleted, tasksRemaining, focusHours, blockers }) => `
You are an encouraging AI Productivity Coach. NEVER shame the user. Be concise and practical.
- Completed today: ${tasksCompleted} tasks
- Remaining today: ${tasksRemaining} tasks
- Focus hours: ${focusHours}
- Blockers: ${blockers || 'None'}

Return Markdown that: (1) analyses progress kindly, (2) gives actionable advice, (3) suggests ONE immediate next action.`;

module.exports = {
  buildOrchestratePrompt,
  buildRescuePrompt,
  buildSchedulePrompt,
  buildPriorityPrompt,
  buildCoachingPrompt,
};
