# Fix for Module Import Error

The error was caused by an incorrect import path in `AuthContext.tsx` that included `.js` extension.

## Fixed
Changed from:
```typescript
import { User } from '../types/index.js';
```

To:
```typescript
import { User } from '../types';
```

## Steps to Clear Cache and Restart

### Option 1: Quick Restart (Recommended)
1. Stop the dev server (Ctrl+C)
2. Delete cache and restart:
```bash
cd frontend
rm -rf node_modules/.vite
npm run dev
```

### Option 2: Full Clean (If Option 1 doesn't work)
```bash
cd frontend
rm -rf node_modules/.vite
rm -rf dist
npm run dev
```

### Option 3: Browser Cache
If still having issues, also clear browser cache:
- Chrome/Edge: Ctrl+Shift+Delete or F12 > Network tab > Disable cache
- Firefox: Ctrl+Shift+Delete
- Or use Incognito/Private mode

## Verify Fix
After restarting, you should see the app load without the import error. Check browser console (F12) for any remaining errors.
