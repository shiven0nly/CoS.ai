{
  _id: ObjectId,
  userId: ObjectId, // Ref User
  title: String,
  description: String,
  parentGoal: String, // If generated from a broader goal
  status: String, // Enum: ['pending', 'in-progress', 'completed', 'deferred']
  priorityScore: Number, // Computed by Priority Engine
  estimatedMinutes: Number,
  deadline: Date,
  isAIGenerated: Boolean,
  orderIndex: Number, // For drag-and-drop or timeline placement
  createdAt: Date
}
