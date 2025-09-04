#!/bin/bash

# Production deployment script
set -e

echo "🚀 Starting production deployment..."

# Check if required environment variables are set
required_vars=("POSTGRES_PASSWORD" "NEXTAUTH_SECRET" "STRIPE_SECRET_KEY" "RESEND_API_KEY" "NEXTAUTH_URL")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Error: $var environment variable is not set"
        echo "Please create a .env.production file with all required variables"
        exit 1
    fi
done

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ Error: .env.production file not found"
    echo "Please copy env.production.example to .env.production and fill in your values"
    exit 1
fi

# Load environment variables
export $(cat .env.production | grep -v '^#' | xargs)

# Generate SSL certificates (self-signed for demo, use Let's Encrypt in production)
echo "🔐 Setting up SSL certificates..."
mkdir -p ssl
if [ ! -f ssl/cert.pem ] || [ ! -f ssl/key.pem ]; then
    # Extract domain from NEXTAUTH_URL
    DOMAIN=$(echo $NEXTAUTH_URL | sed 's|https://||' | sed 's|http://||')
    openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=$DOMAIN"
    echo "✅ SSL certificates generated for $DOMAIN"
else
    echo "✅ SSL certificates already exist"
fi

# Build and deploy
echo "🏗️ Building application..."
docker compose -f docker-compose.prod.yml build --no-cache

echo "🔄 Starting services..."
docker compose -f docker-compose.prod.yml up -d

echo "⏳ Waiting for services to be ready..."
sleep 30

# Run database migrations (safer, repeatable)
echo "🗄️ Running database migrations..."
docker compose -f docker-compose.prod.yml exec web sh -c "npx prisma generate && npx prisma migrate deploy"

# Seed database if requested
if [ "$SEED_DATABASE" = "true" ]; then
    echo "🌱 Seeding database..."
    docker compose -f docker-compose.prod.yml exec web npm run seed
fi

# Check if services are running
if docker compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "✅ Deployment successful!"
    echo "🌐 Application is running at: $NEXTAUTH_URL"
    echo "📊 Check logs with: docker compose -f docker-compose.prod.yml logs -f"
    echo "🔍 Health check: curl -f $NEXTAUTH_URL/api/health"
else
    echo "❌ Deployment failed. Check logs:"
    docker compose -f docker-compose.prod.yml logs
    exit 1
fi
