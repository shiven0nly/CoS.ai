
/src
│
├── /assets                   # Static files like images, fonts, and global SVGs
│   ├── /images
│   └── /icons
│
├── /components               # Global, reusable, "dumb" UI components
│   ├── /common               # Buttons, Inputs, Modals, Spinners, Tooltips
│   └── /ui                   # Highly stylized elements (e.g., GlassCard, NeonButton)
│
├── /constants                # Global immutable variables
│   ├── apiRoutes.ts          # e.g., TASKS_ENDPOINT = '/api/v1/tasks'
│   └── themeManager.ts       # Color codes, sizing, font pairings
│
├── /features                 # FEATURE-BASED ARCHITECTURE (The Core)
│   ├── /auth
│   │   ├── /components       # Auth-specific UI (e.g., LoginForm, RegisterForm)
│   │   ├── /hooks            # Custom hooks (e.g., useAuth)
│   │   ├── /services         # Axios API calls (e.g., authService.ts)
│   │   ├── /slices           # Redux Toolkit slice (e.g., authSlice.ts)
│   │   └── /types            # TypeScript interfaces for auth data
│   │
│   ├── /tasks                # Everything related to task management
│   │   ├── /components       # TaskCard, KanbanBoard, TaskInputBar
│   │   ├── /hooks            # useTasks, usePriorityEngine
│   │   ├── /services         # taskService.ts (CRUD ops via Axios)
│   │   ├── /slices           # taskSlice.ts (State for tasks)
│   │   └── /types            # ITask, ITaskPayload
│   │
│   └── /aiAssistant          # Everything related to the AI Chief of Staff
│       ├── /components       # ChatBubble, AssistantSidebar, RescueModeModal
│       ├── /hooks            # useAIPrompt
│       ├── /services         # aiService.ts (Calls to OpenAI/Gemini wrapper)
│       └── /slices           # aiSlice.ts
│
├── /hooks                    # Global React Hooks
│   ├── useClickOutside.ts
│   ├── useWindowSize.ts
│   └── useDebounce.ts
│
├── /layouts                  # Structural page wrappers
│   ├── MainLayout.tsx        # Includes Sidebar, Header, and AI Assistant Pane
│   └── AuthLayout.tsx        # Minimal layout for Login/Register (no sidebar)
│
├── /pages                    # Route-level components (Aggregators)
│   ├── DashboardPage.tsx     # Glues Dashboard features together
│   ├── TaskManagerPage.tsx
│   ├── SchedulePage.tsx
│   ├── AnalyticsPage.tsx
│   └── SettingsPage.tsx
│
├── /services                 # Global API configurations (Axios)
│   ├── api.ts                # Base Axios instance with base URL & interceptors
│   └── interceptors.ts       # Automatic JWT token injection, 401 redirect logic
│
├── /store                    # Redux Toolkit setup
│   ├── index.ts              # configureStore (combines all slices)
│   └── hooks.ts              # Typed useDispatch and useSelector
│
├── /types                    # Global generic TypeScript definitions
│   └── index.ts              # Interfaces shared across multiple features
│
├── /utils                    # Pure helper functions (No React logic)
│   ├── formatters.ts         # Date/Time formatting (e.g., formatTime to 09:00 AM)
│   ├── calculators.ts        # Priority math algorithms
│   └── validators.ts         # Regex, form validation logic
│
├── App.tsx                   # Main entry. Context Providers & Theme wrappers
├── main.tsx                  # React DOM rendering
└── routes.tsx                # Centralized React Router configuration
