# Food Cravings Frontend - AI Coding Agent Instructions

## Project Architecture

This is a **React 18 + Vite** video-sharing platform with dual user types: regular users (consume reels) and food partners (upload content). The app follows a **mobile-first, TikTok-inspired vertical scroll design**.

### Key Components & Data Flow

- **Home** (`src/pages/general/Home.jsx`): Core reels feed with Intersection Observer API for auto-play/pause
- **Authentication**: Separate flows for users (`/login`, `/register`) and partners (`/partner/login`, `/partner/register`)  
- **Content Creation**: Food partners use drag-drop video upload in `src/pages/food_partner/createFood.jsx`
- **Profile Pages**: Partner storefronts at `/partner/:partnerId` with video grid layouts

### API Integration Pattern

All API calls use the centralized axios instance (`src/config/axios.js`) with:
```javascript
baseURL: 'http://localhost:3000'
withCredentials: true  // Essential for cookie-based auth
```

**Critical**: Always include `withCredentials: true` in requests. Forms use FormData for file uploads.

## Development Conventions

### File Structure Logic
- `pages/auth/`: Authentication flows (4 separate components)
- `pages/food_partner/`: Partner-specific features (create, profile)  
- `pages/general/`: Public pages (Home)
- `styles/`: Modular CSS files per feature (`auth.css`, `reels.css`, etc.)

### CSS Architecture
Uses CSS custom properties defined in `src/styles/theme.css`:
- Primary color: `var(--primary-color)` (#FC6C4C - Zomato orange)
- Auto dark mode support via `prefers-color-scheme`
- Consistent spacing: `var(--spacing-sm/md/lg/xl)`
- Form styling follows established patterns in `auth.css`

### Video Handling Patterns
1. **Reels Feed**: Uses `useRef` with Intersection Observer for performance
2. **File Uploads**: Validates file type/size, creates object URLs for preview
3. **Profile Grid**: Click-to-play with manual state management

### State Management
- Uses React hooks (no external state library)
- Video refs stored in `useRef({})` objects for multi-video management
- Error handling via local state with user-friendly messages

## Essential Commands

```bash
npm run dev        # Development server (localhost:5173)
npm run build      # Production build  
npm run lint       # ESLint validation
npm run preview    # Preview production build
```

## Development Workflow

1. **New Features**: Follow existing page structure in `src/pages/`
2. **API Integration**: Import `axios` from `src/config/axios.js`, always use `withCredentials: true`
3. **Styling**: Create feature-specific CSS files, import theme variables from `src/styles/theme.css`
4. **Routing**: Update `src/routes/AppRoutes.jsx` for new pages
5. **Forms**: Follow patterns in auth pages - controlled components with validation

## Gotchas & Critical Details

- **Video Performance**: Always use Intersection Observer for auto-play (see Home.jsx pattern)
- **Authentication**: Cookie-based, check for 401 responses and redirect to `/login`
- **File Upload**: Use FormData with `Content-Type: multipart/form-data` header
- **Mobile-First**: All components designed for vertical mobile experience first
- **ESLint**: Custom rule ignores uppercase variables (`varsIgnorePattern: '^[A-Z_]'`)

## Testing & Debugging

- Monitor network requests for proper `withCredentials` usage
- Video issues often relate to browser autoplay policies or CORS
- Use React DevTools for component state inspection
- Check console for ESLint warnings during development