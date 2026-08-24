# Deployment Guide

## Quick Start with Docker

### Prerequisites
- Docker & Docker Compose installed
- 2GB RAM minimum
- 500MB disk space

### Deploy

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Access at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000/api

---

## Production Deployment

### 1. VPS / Cloud Server

#### Ubuntu 20.04+

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker & Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER

# Clone repository
git clone https://github.com/flomopapice492-lgtm/ca-iptv-player.git
cd ca-iptv-player

# Configure environment
cp .env.example .env
nano .env  # Edit as needed

# Deploy
docker-compose up -d
```

#### Environment Variables

```env
# Backend
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://yourdomain.com

# Logging
LOG_LEVEL=info

# Security
HTTPS_ONLY=true
ALLOW_EXTERNAL_URLS=false
```

### 2. Nginx Reverse Proxy

```nginx
upstream backend {
  server localhost:5000;
}

server {
  listen 80;
  server_name yourdomain.com;
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name yourdomain.com;

  ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

  # Security headers
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "DENY" always;

  location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /api {
    proxy_pass http://backend;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

### 3. SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
```

### 4. Systemd Service

```ini
# /etc/systemd/system/ca-iptv.service
[Unit]
Description=CA IPTV Player
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/ca-iptv-player
ExecStart=/usr/bin/docker-compose up
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable ca-iptv
sudo systemctl start ca-iptv
```

---

## Heroku Deployment

```bash
# Login
heroku login

# Create app
heroku create ca-iptv-player

# Configure buildpacks
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add heroku/docker

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

---

## Performance Optimization

### 1. Caching

```bash
# Enable Redis
docker run -d -p 6379:6379 redis
```

Update backend:
```javascript
const redis = require('redis');
const client = redis.createClient();
```

### 2. CDN

For channel logos and static assets:
- Cloudflare (free)
- Akamai
- AWS CloudFront

### 3. Database

For SQLite → PostgreSQL migration:
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

---

## Monitoring

### Health Checks

```bash
# Check API health
curl http://localhost:5000/health

# Check frontend
curl http://localhost:3000
```

### Logs

```bash
# Docker logs
docker-compose logs -f backend

# File logs
tail -f logs/app.log
```

### Metrics

- Response time: Target < 500ms
- Uptime: Target 99.9%
- Error rate: Target < 0.1%

---

## Backup & Recovery

### Database Backup

```bash
# Backup EPG cache
tar -czf epg-backup.tar.gz epg-data/cache/

# Upload to S3/cloud storage
aws s3 cp epg-backup.tar.gz s3://backups/
```

### Recovery

```bash
# Restore from backup
aws s3 cp s3://backups/epg-backup.tar.gz .
tar -xzf epg-backup.tar.gz -C epg-data/
```

---

## Scaling

### Horizontal Scaling (Multiple Servers)

1. Use load balancer (nginx, HAProxy)
2. Deploy multiple backend/frontend instances
3. Share cache/database layer

### Vertical Scaling (More Resources)

1. Increase Docker memory limits
2. Upgrade server CPU/RAM
3. Optimize queries and caching

---

## Troubleshooting

### Port Already in Use

```bash
# Find process
sudo lsof -i :3000

# Kill process
sudo kill -9 <PID>
```

### Out of Memory

```bash
# Check usage
docker stats

# Increase memory limit
docker-compose.yml: "memory: 1GB"
```

### API Errors

1. Check backend logs
2. Verify EPG sources are accessible
3. Check rate limits
4. Restart services

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] Firewall configured
- [ ] Rate limiting active
- [ ] CORS properly configured
- [ ] No hardcoded secrets
- [ ] Regular updates
- [ ] Monitoring active
- [ ] Backups scheduled

---

For questions: See README.md or GitHub Issues
