#!/bin/bash

echo "🔧 Resolving README conflicts..."

# Configure git
git config --local user.email "action@github.com"
git config --local user.name "GitHub Action"

# Fetch latest changes
echo "Fetching latest changes..."
git fetch origin master

# Reset to remote master to resolve conflicts
echo "Resetting to remote master..."
git reset --hard origin/master

# Check if there are any local changes
if git diff --quiet; then
    echo "No local changes to commit"
    exit 0
fi

# Add and commit any changes
echo "Committing changes..."
git add README.md SECURITY-REPORT.md
git commit -m "🔄 Resolve README conflicts [skip ci]" || echo "No changes to commit"

# Push changes
echo "Pushing changes..."
git push origin master || echo "Push failed"

echo "✅ Conflict resolution complete"
