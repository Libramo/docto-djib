#!/bin/bash

# Check if a commit message was provided
if [ -z "$1" ]; then
  echo "❌ Please provide a commit message."
  echo "Usage: ./gitpush.sh 'Your commit message here'"
  exit 1
fi

# Stage all changes
git add .

# Commit with the provided message
git commit -m "$1"

# Get the current branch name
branch=$(git rev-parse --abbrev-ref HEAD)

# Push to the current branch
if git push origin "$branch"; then
  echo "✅ Changes pushed to $branch!"
else
  echo "❌ Failed to push changes to $branch."
  exit 1
fi
