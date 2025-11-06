#!/bin/bash

# VoiceGenie GitBook Quick Deploy Script
# This script helps you quickly deploy your documentation to GitHub and GitBook

echo "═══════════════════════════════════════════════════════════════"
echo "   VoiceGenie API Docs - GitBook Deployment Helper"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check if we're in the right directory
if [ ! -f "SUMMARY.md" ] || [ ! -f ".gitbook.yaml" ]; then
    echo "❌ Error: Please run this script from the gitbook-output directory"
    echo ""
    echo "Run this command first:"
    echo "  cd /home/oriserve/Desktop/docs/gitbook-output"
    echo ""
    exit 1
fi

echo "📍 Current directory: $(pwd)"
echo ""

# Step 1: Check Git status
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 1: Checking Git status"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ ! -d ".git" ]; then
    echo "📁 Git not initialized. Initializing now..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""

# Step 2: Configure Git (if needed)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 2: Git Configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -z "$(git config user.name)" ]; then
    echo "⚠️  Git user.name not configured"
    echo ""
    read -p "Enter your name: " git_name
    git config --global user.name "$git_name"
    echo "✅ Git user.name set to: $git_name"
else
    echo "✅ Git user.name: $(git config user.name)"
fi

if [ -z "$(git config user.email)" ]; then
    echo "⚠️  Git user.email not configured"
    echo ""
    read -p "Enter your email: " git_email
    git config --global user.email "$git_email"
    echo "✅ Git user.email set to: $git_email"
else
    echo "✅ Git user.email: $(git config user.email)"
fi

echo ""

# Step 3: Stage files
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 3: Staging files"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

git add .
echo "✅ All files staged"
echo ""

# Show what will be committed
echo "Files to be committed:"
git status --short | head -10
if [ $(git status --short | wc -l) -gt 10 ]; then
    echo "... and $(( $(git status --short | wc -l) - 10 )) more files"
fi
echo ""

# Step 4: Commit
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 4: Creating commit"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

git commit -m "VoiceGenie API documentation for GitBook" -m "Converted from Mintlify to GitBook format. Ready to publish."
echo "✅ Commit created"
echo ""

# Step 5: Add remote
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 5: Configure GitHub Remote"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if git remote get-url origin &> /dev/null; then
    echo "✅ Remote 'origin' already configured:"
    echo "   $(git remote get-url origin)"
    echo ""
    read -p "Do you want to change it? (y/N): " change_remote
    if [ "$change_remote" = "y" ] || [ "$change_remote" = "Y" ]; then
        read -p "Enter your GitHub username: " github_user
        read -p "Enter repository name (e.g., voicegenie-docs): " repo_name
        git remote set-url origin "https://github.com/$github_user/$repo_name.git"
        echo "✅ Remote updated to: https://github.com/$github_user/$repo_name.git"
    fi
else
    echo "⚠️  No remote configured"
    echo ""
    echo "Please create a repository on GitHub first:"
    echo "  https://github.com/new"
    echo ""
    read -p "Enter your GitHub username: " github_user
    read -p "Enter repository name (e.g., voicegenie-docs): " repo_name
    
    git remote add origin "https://github.com/$github_user/$repo_name.git"
    echo "✅ Remote added: https://github.com/$github_user/$repo_name.git"
fi

echo ""

# Step 6: Push to GitHub
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 6: Push to GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

read -p "Ready to push to GitHub? (Y/n): " confirm_push
if [ "$confirm_push" != "n" ] && [ "$confirm_push" != "N" ]; then
    git branch -M main
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Successfully pushed to GitHub!"
    else
        echo ""
        echo "❌ Push failed. Please check your GitHub credentials and repository."
        echo ""
        echo "Common issues:"
        echo "  1. Repository doesn't exist - create it at https://github.com/new"
        echo "  2. Authentication failed - set up SSH keys or use personal access token"
        echo "  3. Branch protection rules - check repository settings"
        exit 1
    fi
else
    echo "⏭️  Skipping push. You can push manually later with:"
    echo "   git push -u origin main"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✅ Git Setup Complete!"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Go to GitBook: https://app.gitbook.com"
echo "2. Click 'New Space' → 'Import from Git'"
echo "3. Select GitHub and authorize"
echo "4. Choose your repository"
echo "5. Click 'Import'"
echo "6. Review and publish!"
echo ""
echo "📚 Documentation:"
echo "  • NEXT_STEPS.md - Detailed instructions"
echo "  • MIGRATION_CHECKLIST.md - Track your progress"
echo ""
echo "🎉 Your documentation is ready for GitBook!"
echo "═══════════════════════════════════════════════════════════════"
