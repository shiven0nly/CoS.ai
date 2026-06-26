{
  _id: ObjectId,
  email: String, // Unique
  passwordHash: String,
  name: String,
  preferences: {
    workingHoursStart: String, // e.g., "09:00"
    workingHoursEnd: String    // e.g., "17:00"
  },
  createdAt: Date
}
