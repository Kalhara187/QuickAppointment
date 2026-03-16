# Frontend Project Structure

## Directory Layout

```
src/
├── components/          # Reusable React components
│   ├── Button.tsx
│   ├── Modal.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorAlert.tsx
│   └── index.ts
├── pages/              # Page components (routes)
│   └── HomePage.tsx
├── services/           # API services and external integrations
│   └── appointmentService.ts
├── hooks/              # Custom React hooks
│   └── useAsync.ts
├── utils/              # Utility functions
│   └── helpers.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── assets/             # Static assets (images, icons, etc.)
├── App.tsx             # Main App component
├── App.css             # App styles
├── main.tsx            # Entry point
└── index.css           # Global styles

public/
└── index.html          # HTML template

Configuration files:
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
├── .eslintrc.json      # ESLint configuration
└── .gitignore          # Git ignore rules
```

## Getting Started

### Install Dependencies
\`\`\`
npm install
\`\`\`

### Development Server
\`\`\`
npm run dev
\`\`\`

The app will open at `http://localhost:3000`

### Build for Production
\`\`\`
npm run build
\`\`\`

### Lint Code
\`\`\`
npm run lint
\`\`\`

## Project Structure Explanation

- **components/**: Reusable UI components (Button, Modal, Spinner, etc.)
- **pages/**: Page-level components that correspond to routes
- **services/**: API communication and external service integration
- **hooks/**: Custom React hooks for shared logic
- **utils/**: Helper functions and utilities
- **types/**: Type definitions and interfaces
- **assets/**: Images, SVGs, and other static files
- **public/**: Static HTML and public assets

## Key Features

- ✅ React 18 with TypeScript
- ✅ Vite for fast development and build
- ✅ React Router for navigation
- ✅ Axios for API calls
- ✅ React Query for data fetching
- ✅ ESLint for code quality
- ✅ Path aliases for cleaner imports

## Environment Variables

Create a `.env` file in the root directory:

\`\`\`
VITE_API_BASE_URL=http://localhost:8000/api
\`\`\`

## Next Steps

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Create your first feature in the `pages/` and `components/` folders
4. Update API endpoints in `services/appointmentService.ts`
5. Add new routes to `App.tsx`
