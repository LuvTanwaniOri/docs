# 🚀 VoiceGenie API Documentation - GitBook Migration

This repository contains the VoiceGenie API documentation, ready to be published on GitBook.

## 📦 What's Included

- ✅ **Complete API documentation** converted from Mintlify to GitBook format
- ✅ **Conversion script** (`convert-to-gitbook.js`) for automated migration
- ✅ **GitBook configuration** (`.gitbook.yaml`)
- ✅ **Navigation structure** (`SUMMARY.md`)
- ✅ **Migration guide** (`GITBOOK_MIGRATION_GUIDE.md`)

## 🎯 Quick Start

### Option 1: Run the Conversion Script (Recommended)

```bash
# Install Node.js dependencies (if any)
npm install

# Run the conversion script
node convert-to-gitbook.js

# Your converted files will be in gitbook-output/
```

### Option 2: Use Current Files Directly

The repository already includes GitBook-compatible files:
- `introduction.mdx` → Ready for GitBook
- `authentication.mdx` → Ready for GitBook
- `SUMMARY.md` → Navigation structure
- `.gitbook.yaml` → Configuration

## 📘 Publishing to GitBook

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "VoiceGenie API documentation for GitBook"

# Add your GitHub remote
git remote add origin https://github.com/your-username/voicegenie-docs.git

# Push
git push -u origin main
```

### Step 2: Connect GitBook

1. Go to [GitBook](https://app.gitbook.com)
2. Sign in or create an account
3. Click **"New Space"**
4. Select **"Git Sync"**
5. Choose **"GitHub"** as your provider
6. Authorize GitBook to access your repository
7. Select your repository: `your-username/voicegenie-docs`
8. Select the branch: `main`
9. Click **"Import"**

### Step 3: Configure & Publish

1. **Review**: GitBook will import your files automatically
2. **Arrange**: Adjust sidebar navigation if needed (uses `SUMMARY.md`)
3. **Customize**: Add logo, colors, custom domain in Space Settings
4. **Publish**: Click "Publish" to make it live!

Your documentation will be available at:
```
https://docs.gitbook.io/your-space-name
```

Or with a custom domain:
```
https://docs.voicegenie.com
```

## 🔄 Automatic Sync

Once connected, GitBook will automatically sync with your GitHub repository:
- **Push to GitHub** → GitBook updates automatically
- **Edit in GitBook** → Changes sync back to GitHub (if enabled)

## 📁 Project Structure

```
docs/
├── .gitbook.yaml              # GitBook configuration
├── SUMMARY.md                 # Navigation/Table of Contents
├── introduction.mdx           # Introduction page
├── authentication.mdx         # Authentication guide
├── convert-to-gitbook.js      # Conversion script
├── GITBOOK_MIGRATION_GUIDE.md # Detailed migration guide
└── api-reference/             # API endpoint documentation
    ├── authentication/
    ├── campaign/
    ├── contacts/
    ├── scripts/
    ├── analytics/
    ├── users/
    ├── knowledge-base/
    ├── phone-numbers/
    ├── call-management/
    ├── settings/
    ├── third-party/
    ├── webhooks/
    ├── websockets/
    └── automation/
```

## 🔧 Conversion Script Details

The `convert-to-gitbook.js` script automatically converts:

- ✅ Mintlify `<ParamField>` → Markdown tables
- ✅ Mintlify `<ResponseField>` → Markdown tables
- ✅ Mintlify `<Expandable>` → Collapsible sections
- ✅ Custom frontmatter → GitBook frontmatter
- ✅ API endpoint declarations → Markdown badges

## 🎨 Customization

### Update Branding

Edit `.gitbook.yaml`:
```yaml
root: ./

structure:
  readme: introduction.md
  summary: SUMMARY.md

# Add custom theme
theme:
  logo: /assets/logo.png
  favicon: /assets/favicon.png
```

### Update Navigation

Edit `SUMMARY.md` to change the sidebar structure:
```markdown
# Table of Contents

* [Introduction](introduction.md)
* [Your New Section](new-section.md)
  * [Sub Page](new-section/sub-page.md)
```

### Add Custom Domain

In GitBook:
1. Go to Space Settings
2. Select "Custom Domain"
3. Add your domain: `docs.voicegenie.com`
4. Update DNS records as instructed

## 📚 Resources

- [GitBook Documentation](https://docs.gitbook.com)
- [GitBook Markdown Guide](https://docs.gitbook.com/content-creation/markdown)
- [Git Sync Guide](https://docs.gitbook.com/getting-started/git-sync)
- [Migration Guide](./GITBOOK_MIGRATION_GUIDE.md)

## 🐛 Troubleshooting

### Images not loading?
- Ensure image paths are relative: `./assets/image.png`
- Or use absolute URLs: `https://example.com/image.png`

### Links broken?
- Use relative paths: `[Link](../other-page.md)`
- Internal links must point to `.md` files

### Custom components not working?
- GitBook doesn't support Mintlify React components
- Use the conversion script to convert them to standard Markdown

## 📧 Support

- **Documentation Issues**: [GitHub Issues](https://github.com/your-username/voicegenie-docs/issues)
- **API Support**: support@voicegenie.com
- **GitBook Support**: https://www.gitbook.com/support

## 📄 License

© 2025 VoiceGenie. All rights reserved.
