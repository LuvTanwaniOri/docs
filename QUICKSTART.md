# 🚀 Quick Setup Guide

## Step 1: Install Mintlify

```bash
npm install -g mintlify
```

## Step 2: Navigate to docs folder

```bash
cd docs
```

## Step 3: Start local server

```bash
mintlify dev
```

Your documentation will be available at: `http://localhost:3000`

## Step 4: Customize (Optional)

1. **Update branding** in `mint.json`:
   - Company name
   - Logo paths
   - Colors
   - Contact info

2. **Add your logos** to `docs/logo/` folder:
   - `dark.svg` - Logo for dark theme
   - `light.svg` - Logo for light theme

3. **Update content**:
   - Edit `introduction.mdx` with your info
   - Update API base URLs in all endpoint files

## Step 5: Deploy to Public

### Option A: Mintlify Cloud (Easiest)

1. Go to [mintlify.com](https://mintlify.com)
2. Sign up for free
3. Connect your GitHub repository
4. Auto-deploys on every push to main branch
5. You'll get a URL like: `https://your-company.mintlify.app`

### Option B: Vercel (Free)

```bash
npm install -g vercel
cd docs
vercel deploy
```

### Option C: Your Own Server

```bash
# Build the static site
mintlify build

# Copy _build folder to your web server
scp -r _build/* user@server:/var/www/docs/
```

## 🎯 What's Included

- ✅ 18+ documented API endpoints
- ✅ Authentication endpoints (login, verify, logout)
- ✅ Campaign management APIs
- ✅ Contact management APIs
- ✅ Analytics APIs
- ✅ Request/Response examples in multiple languages
- ✅ Error handling documentation
- ✅ Rate limiting information
- ✅ Performance notes

## 📝 Next Steps

1. Review all endpoint documentation files
2. Update with your actual API base URL
3. Add any missing endpoints from your routes
4. Customize branding and colors
5. Deploy to make it public

## 🆘 Need Help?

Check the main [README.md](./README.md) for detailed instructions.

---

**Documentation Template Created Successfully! 🎉**

Run `mintlify dev` to see your documentation in action!
