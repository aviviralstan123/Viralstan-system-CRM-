# Viralstan Client Website

Public-facing React + Vite website powered by backend APIs.

## Local Setup

1. Install dependencies
```bash
npm install
```

2. Start frontend
```bash
npm run dev
```

By default local API calls use `/api` and are proxied to `http://localhost:5000` via `vite.config.js`.

If you want direct API URL instead of proxy, set `VITE_API_URL` in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## Production Setup

### Environment variable
Set this only when frontend and backend are on different domains:
```env
VITE_API_URL=https://api.yourdomain.com/api
```

If frontend and backend are behind same domain/reverse proxy, keep `VITE_API_URL` unset and serve backend at `/api`.

### Build and preview
```bash
npm run build
npm run preview
```

## SPA Routing (Important)

Client routes like `/blogs/123` need rewrite to `index.html`.

Already included:
- `vercel.json` for Vercel
- `netlify.toml` for Netlify

For Nginx, add equivalent fallback:

```nginx
location / {
  try_files $uri /index.html;
}
```

## API Endpoints Used

- `GET /blogs`
- `GET /blogs/id/:id`
- `GET /services`
- `GET /industries`
- `GET /reviews`

## Scripts

- `npm run dev` - start development server
- `npm run build` - build production bundle
- `npm run preview` - preview production build
- `npm run lint` - run lint checks
