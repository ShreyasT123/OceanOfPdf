# OceanOfPDF

A Next.js web application for managing and sharing PDF books, featuring a modern UI with animations and a comprehensive component library.

## System Architecture

This application is built using the **Next.js 16** framework with the **App Router** for routing and server-side rendering. It follows a component-based architecture with reusable UI components, API routes for backend functionality, and a focus on performance and user experience.

### Key Technologies
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives for accessibility
- **Animations**: Framer Motion for smooth transitions
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Deployment**: Docker for containerization

### Folder Structure
```
/
├── app/                    # Next.js App Router pages and API routes
│   ├── api/               # API endpoints (e.g., books upload)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── ui/               # UI primitives (carousel, etc.)
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions and constants
├── public/               # Static assets (e.g., books folder)
├── Dockerfile            # Containerization config
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

## Libraries and Usage

### Core Dependencies

- **next**: ^16.1.1 - React framework for production with App Router, SSR, and API routes.
- **react**: ^19.2.3 - UI library for building components.
- **react-dom**: ^19.2.3 - React DOM renderer.

### UI and Styling
- **@radix-ui/react-* (multiple)**: Accessible UI primitives for dialogs, menus, tooltips, etc. Used throughout the app for consistent, keyboard-navigable components.
- **framer-motion**: 12.23.26 - Animation library for smooth transitions, parallax effects, and interactive elements like carousels.
- **tailwindcss**: ^4.1.9 - Utility-first CSS framework for styling. Configured with custom fonts (Inter, Playfair, Oswald) and colors (orange #FF4500, blue #4ce1f5).
- **tailwind-merge**: ^3.3.1 - Merges Tailwind classes efficiently.
- **tailwindcss-animate**: ^1.0.7 - Additional animation utilities.
- **class-variance-authority**: ^0.7.1 - Manages component variants.
- **clsx**: ^2.1.1 - Conditionally joins CSS classes.
- **lucide-react**: ^0.454.0 - Icon library for UI elements.
- **next-themes**: ^0.4.6 - Theme switching (light/dark mode).

### Forms and Validation
- **react-hook-form**: ^7.60.0 - Performant form handling.
- **@hookform/resolvers**: ^3.10.0 - Resolvers for validation libraries.
- **zod**: 3.25.76 - Schema validation for forms and API.

### Components and Interactions
- **embla-carousel-react**: 8.5.1 - Carousel component for image/showcase sliders.
- **react-resizable-panels**: ^2.1.7 - Resizable panel layouts.
- **vaul**: ^1.1.2 - Drawer component.
- **cmdk**: 1.0.4 - Command palette component.
- **input-otp**: 1.4.1 - OTP input field.
- **react-day-picker**: 9.8.0 - Date picker component.
- **sonner**: ^1.7.4 - Toast notifications.

### Data and Utilities
- **date-fns**: 4.1.0 - Date manipulation utilities.
- **recharts**: 2.15.4 - Chart library for data visualization.
- **jose**: ^6.2.2 - JSON Web Token handling (likely for auth).
- **dotenv**: ^17.4.0 - Environment variable loading.

### Analytics and Build
- **autoprefixer**: ^10.4.20 - CSS vendor prefixing.

### Dev Dependencies
- **@types/* (multiple)**: TypeScript type definitions.
- **postcss**: ^8.5 - CSS processing.
- **typescript**: 5.9.3 - TypeScript compiler.
- **tw-animate-css**: 1.3.3 - Additional Tailwind animations.

## Installation

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local` (if needed, e.g., for API keys).

## Running the Application

- Development: `npm run dev`
- Build: `npm run build`
- Start production: `npm start`
- Lint: `npm run lint`

## Deployment

The app includes a Dockerfile for containerized deployment. Build and run with Docker:

```bash
docker build -t oceanoftpdf .
docker run -p 3000:3000 oceanoftpdf
```

Deploy to Vercel or other platforms supporting Next.js.

## API Routes

- `/api/books/upload`: Handles PDF book uploads.

## Features

- Responsive design with mobile-first approach.
- Animated carousels and parallax effects.
- Form validation and error handling.
- Theme switching.
- PDF upload and management.</content>
<parameter name="filePath">c:\Users\sstha\Desktop\ai_\web\b_\README.md