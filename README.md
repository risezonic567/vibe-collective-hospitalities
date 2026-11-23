# Vibe Collective Hospitality

Next.js site for [vibecollectivehospitality.com](https://vibecollectivehospitality.com).

## Local

```bash
cp .env.example .env
npm install
npm run dev
```

## VPS (Docker + Nginx)

App listens on host `127.0.0.1:6300` → container `:3000`. Nginx should proxy the domain and forward client IP:

```nginx
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $host;
proxy_set_header X-Forwarded-Proto $scheme;
```

Push to `main` triggers GitHub Actions deploy (`git pull` + `docker compose up -d --build`).
