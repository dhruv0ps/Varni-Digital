#!/bin/bash

echo "Starting deployment..."
cd /var/www/cswitch.varnidigital.shop/SwitchCraft || exit

# Pull the latest changes from GitHub
echo "Pulling latest changes..."
git pull origin main

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the Next.js app
echo "Building the app..."
npm run build

# Restart the PM2 process
echo "Restarting the server..."
pm2 restart Cswitch

echo "Deployment finished!"
