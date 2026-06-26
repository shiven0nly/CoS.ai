const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

const app = express();

// Security HTTP headers
app.use(helmet());

// Rate Limiting (100 requests per 10 mins)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 100
});
app.use('/api', limiter);

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser
app.use(express.json());
// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

// Route imports
const auth = require('./routes/authRoutes');
const tasks = require('./routes/taskRoutes');
const ai = require('./routes/aiRoutes');
const schedules = require('./routes/scheduleRoutes');
const notifications = require('./routes/notificationRoutes');
const analytics = require('./routes/analyticsRoutes');
const calendar = require('./routes/calendarRoutes');

// Mount routers
app.use('/api/auth', auth);
app.use('/api/tasks', tasks);
app.use('/api/ai', ai);
app.use('/api/schedules', schedules);
app.use('/api/notifications', notifications);
app.use('/api/analytics', analytics);
app.use('/api/calendar', calendar);

// Base route test
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Custom Error Handler middleware mapping
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
