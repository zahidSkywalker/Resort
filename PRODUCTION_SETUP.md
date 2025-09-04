# Production Deployment Guide

## Prerequisites

1. **Server Requirements**:
   - Ubuntu 20.04+ or similar Linux distribution
   - Docker and Docker Compose installed
   - Domain name pointing to your server
   - SSL certificate (Let's Encrypt recommended)

2. **External Services**:
   - Stripe account with live API keys
   - Cloudinary account for image storage
   - Resend account for email sending
   - Sentry account for error monitoring

## Setup Steps

### 1. Environment Configuration

```bash
# Copy the environment template
cp env.production.example .env.production

# Edit with your production values
nano .env.production
```

**Required Environment Variables**:
- `NEXTAUTH_URL`: Your production domain (e.g., https://yourdomain.com)
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `POSTGRES_PASSWORD`: Strong database password
- `STRIPE_SECRET_KEY`: Your live Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook endpoint secret
- `CLOUDINARY_URL`: Your Cloudinary connection string
- `RESEND_API_KEY`: Your Resend API key
- `SENTRY_DSN`: Your Sentry project DSN

### 2. SSL Certificate Setup

For production, use Let's Encrypt instead of self-signed certificates:

```bash
# Install Certbot
sudo apt install certbot

# Generate certificate
sudo certbot certonly --standalone -d yourdomain.com

# Copy certificates to ssl directory
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/key.pem
sudo chown $USER:$USER ssl/*.pem
```

### 3. Deploy Application

```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### 4. Database Setup

The deployment script will automatically:
- Generate Prisma client
- Run database migrations
- Seed the database (if `SEED_DATABASE=true`)

### 5. Verify Deployment

```bash
# Check service status
docker compose -f docker-compose.prod.yml ps

# Check application health
curl -f https://yourdomain.com/api/health

# View logs
docker compose -f docker-compose.prod.yml logs -f
```

## Security Checklist

- [ ] All environment variables are set with production values
- [ ] SSL certificates are properly configured
- [ ] Database password is strong and unique
- [ ] Stripe webhook endpoint is configured
- [ ] Sentry monitoring is active
- [ ] Firewall is configured (ports 80, 443 only)
- [ ] Regular backups are scheduled

## Monitoring

- **Health Checks**: Application health endpoint at `/api/health`
- **Error Tracking**: Sentry integration for error monitoring
- **Logs**: Structured logging with Pino
- **Database**: PostgreSQL with health checks

## Maintenance

### Update Application
```bash
git pull origin main
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d
```

### Database Backup
```bash
docker compose -f docker-compose.prod.yml exec postgres pg_dump -U resort_user resort > backup.sql
```

### SSL Certificate Renewal
```bash
sudo certbot renew
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/key.pem
docker compose -f docker-compose.prod.yml restart nginx
```

## Troubleshooting

### Common Issues

1. **Build Failures**: Check Node.js version compatibility
2. **Database Connection**: Verify PostgreSQL is running and accessible
3. **SSL Issues**: Ensure certificates are valid and properly configured
4. **Environment Variables**: Verify all required variables are set

### Logs
```bash
# Application logs
docker compose -f docker-compose.prod.yml logs web

# Database logs
docker compose -f docker-compose.prod.yml logs postgres

# Nginx logs
docker compose -f docker-compose.prod.yml logs nginx
```


