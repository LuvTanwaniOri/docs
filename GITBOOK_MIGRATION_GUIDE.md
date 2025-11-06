# 📘 Mintlify to GitBook Migration Guide

## Overview
This guide will help you migrate your VoiceGenie API documentation from Mintlify (local .mdx) to GitBook (cloud platform).

---

## 🎯 Migration Strategy

### Current State
- ✅ Mintlify-based documentation with custom components
- ✅ Structured in folders with .mdx files
- ✅ Custom components: `<ParamField>`, `<ResponseField>`, `<Expandable>`, etc.

### Target State
- 📘 GitBook-compatible Markdown
- 📘 Standard Markdown syntax (tables, code blocks, callouts)
- 📘 Connected to GitHub for auto-sync

---

## 🔄 Step-by-Step Migration Process

### Step 1: Convert Mintlify Components to GitBook Markdown

GitBook doesn't support Mintlify's custom React components. You need to convert:

#### Before (Mintlify):
```mdx
<ParamField header="x-api-key" type="string" required>
  Your VoiceGenie API key for authentication
</ParamField>
```

#### After (GitBook):
```markdown
### Headers

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
```

---

### Step 2: Update Frontmatter

#### Mintlify Frontmatter:
```yaml
---
title: "Get All Campaigns"
api: "GET /fetchCampaignData"
description: "Retrieves campaigns"
---
```

#### GitBook Frontmatter:
```yaml
---
description: Retrieves campaigns
---

# Get All Campaigns

**Endpoint:** `GET /fetchCampaignData`
```

---

### Step 3: Convert Response Fields

#### Before (Mintlify):
```mdx
<ResponseField name="success" type="boolean">
  Indicates if the request was successful
</ResponseField>
```

#### After (GitBook):
```markdown
### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Indicates if the request was successful |
```

---

### Step 4: Convert Code Examples

GitBook supports standard Markdown code blocks. No changes needed here:

```json
{
  "success": true,
  "data": {...}
}
```

---

## 🚀 Migration Methods

### Option A: GitHub Sync (Recommended)

1. **Convert your files** using the provided script
2. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Convert docs to GitBook format"
   git push origin main
   ```
3. **Connect GitBook**:
   - Go to [GitBook](https://app.gitbook.com)
   - Create new Space → "Git Sync"
   - Connect your GitHub repository
   - Select the `/docs` folder
   - GitBook will auto-import and sync changes

### Option B: Manual Import

1. Convert files using the script
2. In GitBook → "Import" → "Upload Files"
3. Upload all converted `.md` files
4. Manually arrange in sidebar

### Option C: GitBook CLI

```bash
npm install -g gitbook-cli
gitbook init
gitbook serve
```

---

## 📋 Conversion Checklist

- [ ] Run conversion script on all `.mdx` files
- [ ] Review converted files for accuracy
- [ ] Update any custom images/assets paths
- [ ] Test all internal links
- [ ] Create `.gitbook.yaml` configuration
- [ ] Set up GitHub repository
- [ ] Connect GitBook to GitHub
- [ ] Configure sidebar navigation
- [ ] Test published documentation
- [ ] Update any external links pointing to old docs

---

## 📁 Recommended GitBook Structure

```
docs/
├── .gitbook.yaml          # GitBook configuration
├── README.md              # Introduction
├── authentication.md      # Auth guide
├── api-reference/
│   ├── README.md         # API Reference overview
│   ├── authentication/
│   │   ├── login.md
│   │   ├── logout.md
│   │   └── verify-login.md
│   ├── campaigns/
│   │   ├── get-all-campaigns.md
│   │   └── ...
│   └── ...
└── assets/               # Images, logos, etc.
```

---

## 🔧 GitBook Configuration File

Create `.gitbook.yaml` in your repository root:

```yaml
root: ./

structure:
  readme: introduction.md
  summary: SUMMARY.md

redirects:
  previous/path: new-path

integrations:
  github:
    enabled: true
```

Create `SUMMARY.md` for navigation:

```markdown
# Table of contents

* [Introduction](introduction.md)
* [Authentication](authentication.md)

## API Reference

* [Authentication](api-reference/authentication/README.md)
  * [Login](api-reference/authentication/login.md)
  * [Verify Login](api-reference/authentication/verify-login.md)
  * [Logout](api-reference/authentication/logout.md)

* [Campaigns](api-reference/campaigns/README.md)
  * [Get All Campaigns](api-reference/campaign/get-all-campaigns.md)
  * [Get Campaign](api-reference/campaign/get-campaign.md)
  * [Start Campaign](api-reference/campaign/start-campaign.md)
```

---

## 💡 Tips for Success

1. **Use GitBook's Markdown Features**:
   - Callouts: `{% hint style="info" %}...{% endhint %}`
   - Tabs: `{% tabs %}...{% endtabs %}`
   - Swagger/OpenAPI: Import directly if you have an OpenAPI spec

2. **Keep URLs Clean**:
   - GitBook auto-generates URLs from file paths
   - Use lowercase, hyphens, no spaces

3. **Test Locally First**:
   - Convert a few files
   - Review formatting
   - Then batch convert all files

4. **Maintain Version Control**:
   - Keep your Mintlify docs in a separate branch
   - Use Git Sync for automatic updates

---

## 🔄 Next Steps

1. Run the conversion script (see `convert-to-gitbook.js`)
2. Review the converted files in `gitbook-output/`
3. Set up your GitHub repository
4. Connect GitBook via Git Sync
5. Publish and share! 🎉

---

## 📞 Support

- GitBook Docs: https://docs.gitbook.com
- GitBook Support: https://www.gitbook.com/support
- Migration Questions: support@voicegenie.com
