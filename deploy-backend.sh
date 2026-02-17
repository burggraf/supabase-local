#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting backend deployment..."

# 1. Push Database Migrations
echo "📦 Pushing database migrations..."
supabase db push

# 2. Update Remote Config (if needed)
# Note: config.toml changes usually require manual review or specific CLI flags
# but 'supabase config push' is often what people want for things like Auth/Storage settings.
# echo "⚙️ Pushing configuration..."
# supabase config push

# 3. Deploy Edge Functions (if you had any)
if [ -d "supabase/functions" ]; then
  echo "⚡ Deploying edge functions..."
  supabase functions deploy
else
  echo "ℹ️ No edge functions found, skipping."
fi

echo "✅ Backend deployment complete!"
