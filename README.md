# VoiceGenie Dialer Service API Documentation

Professional API documentation for the VoiceGenie Dialer Service - A comprehensive AI-powered voice campaign management system.

## 📚 About

This documentation provides complete information about all VoiceGenie APIs including:
- **Endpoints** - All available API endpoints
- **Methods** - HTTP methods (GET, POST, DELETE, etc.)
- **Headers** - Required and optional headers
- **Payloads** - Request body schemas
- **Responses** - Success and error responses
- **HTTP Status Codes** - All possible status codes
- **Error Handling** - What happens on failure
- **Performance Notes** - Heavy load scenarios
- **Rate Limiting** - Request limits per endpoint
- **Code Examples** - cURL, JavaScript, Python, PHP examples

## 🚀 Quick Start

### Option 1: Using Mintlify (Recommended - Same as Ringg.ai)

Mintlify is the same documentation platform used by Ringg.ai for professional API documentation.

#### Installation

```bash
# Install Mintlify CLI
npm install -g mintlify

# Navigate to docs directory
cd docs

# Start the local development server
mintlify dev
```

The documentation will be available at `http://localhost:3000`

#### Deploy to Production

**Option A: Deploy with Mintlify Cloud (Easiest)**

1. Create account at [mintlify.com](https://mintlify.com)
2. Connect your GitHub repository
3. Mintlify automatically deploys when you push to main branch
4. Get a public URL like: `https://your-company.mintlify.app`

**Option B: Self-hosted**

```bash
# Build the documentation
mintlify build

# Deploy to your web server (Nginx, Apache, etc.)
# Or use any static hosting service:
# - Vercel
# - Netlify  
# - AWS S3 + CloudFront
# - GitHub Pages
```

### Option 2: Using Swagger/OpenAPI

If you prefer Swagger UI:

```bash
# Install dependencies
npm install -g swagger-ui-express

# Create Express server to serve documentation
# (See setup-swagger.md for detailed instructions)
```

## 📁 Documentation Structure

```
docs/
├── mint.json                 # Main configuration file
├── introduction.mdx          # Getting started guide
├── authentication.mdx        # Authentication guide
└── api-reference/
    ├── authentication/
    │   ├── login.mdx
    │   ├── verify-login.mdx
    │   └── logout.mdx
    ├── campaign/
    │   ├── get-all-campaigns.mdx
    │   ├── get-campaign.mdx
    │   ├── upload-campaign-data.mdx
    │   ├── start-campaign.mdx
    │   ├── pause-campaign.mdx
    │   ├── delete-campaign.mdx
    │   ├── get-campaign-stats.mdx
    │   ├── get-campaign-history.mdx
    │   └── download-campaign-stats.mdx
    ├── contacts/
    │   ├── create-contact.mdx
    │   ├── get-contacts.mdx
    │   ├── get-contact.mdx
    │   └── delete-contact.mdx
    └── analytics/
        ├── get-day-wise-call-counts.mdx
        └── get-campaign-analytics.mdx
```

## 🎨 Customization

### Branding

Edit `docs/mint.json` to customize:

```json
{
  "name": "Your Company API",
  "logo": {
    "dark": "/logo/dark.svg",
    "light": "/logo/light.svg"
  },
  "colors": {
    "primary": "#0D9373",
    "light": "#07C983",
    "dark": "#0D9373"
  }
}
```

### Add Your Logos

Place your logo files in `docs/logo/`:
- `dark.svg` - Logo for dark mode
- `light.svg` - Logo for light mode
- `favicon.png` - Browser favicon

## 📝 Adding New Endpoints

To document a new API endpoint:

1. Create a new `.mdx` file in the appropriate folder
2. Use this template:

```mdx
---
title: "Endpoint Name"
api: "METHOD /endpoint/path"
description: "Brief description of what this endpoint does"
---

## Headers

<ParamField header="x-api-key" type="string" required>
  Your API key
</ParamField>

## Request

[Add parameters here]

## Response

[Add response structure here]

## Examples

[Add code examples here]
```

3. Add the file path to `docs/mint.json` navigation section

## 🌐 Hosting Options

### 1. Mintlify Cloud (Recommended)
- **Pros**: Automatic deployments, CDN, SSL, custom domain
- **Cost**: Free tier available
- **URL**: `https://your-company.mintlify.app`

### 2. Vercel
```bash
cd docs
vercel deploy
```

### 3. Netlify
```bash
cd docs
netlify deploy
```

### 4. AWS S3 + CloudFront
```bash
# Build documentation
mintlify build

# Upload to S3
aws s3 sync ./_build s3://your-bucket-name

# Configure CloudFront distribution
```

### 5. Your Own Server (Nginx)
```nginx
server {
    listen 80;
    server_name docs.yourdomain.com;
    
    root /var/www/docs/_build;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔒 Making Documentation Public

### Custom Domain Setup

1. **With Mintlify Cloud:**
   - Go to Settings → Custom Domain
   - Add your domain (e.g., `docs.yourdomain.com`)
   - Update DNS records as instructed

2. **Self-hosted:**
   - Point your domain to your server
   - Configure SSL certificate (Let's Encrypt recommended)

### Access Control (Optional)

If you want to restrict access:

```javascript
// Add authentication middleware
// Example: API key validation
app.use('/docs', (req, res, next) => {
  const apiKey = req.headers['x-doc-access-key'];
  if (validateKey(apiKey)) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
});
```

## 📊 Documentation Checklist

For each API endpoint, ensure you document:

- ✅ **Endpoint URL** - Full path with base URL
- ✅ **HTTP Method** - GET, POST, PUT, DELETE, PATCH
- ✅ **Description** - What the endpoint does
- ✅ **Headers** - All required and optional headers
- ✅ **Authentication** - Auth requirements (x-api-key)
- ✅ **Path Parameters** - URL parameters like `:id`
- ✅ **Query Parameters** - URL query strings
- ✅ **Request Body** - Payload schema and examples
- ✅ **Success Response** - 200/201 response structure
- ✅ **Error Responses** - All possible error codes (400, 401, 404, 429, 500)
- ✅ **Response Fields** - Description of each field
- ✅ **HTTP Status Codes** - What each code means
- ✅ **Code Examples** - cURL, JavaScript, Python, PHP
- ✅ **Rate Limits** - Requests per minute/hour
- ✅ **Performance Notes** - Heavy load behavior
- ✅ **Use Cases** - When to use this endpoint

## 🔄 Auto-generating Documentation

### From Code Comments (Future Enhancement)

You can use tools to auto-generate docs from your code:

```javascript
/**
 * @api {get} /campaign/:id Get Campaign
 * @apiName GetCampaign
 * @apiGroup Campaign
 * @apiHeader {String} x-api-key API authentication key
 * @apiParam {String} id Campaign unique ID
 * @apiSuccess {Boolean} success Request status
 * @apiSuccess {Object} data Campaign data
 */
router.get("/campaign/:id", authMiddleware, getCampaign);
```

Tools to consider:
- **apiDoc** - Generate docs from code comments
- **Swagger JSDoc** - Generate OpenAPI specs from comments
- **TypeDoc** - For TypeScript projects

## 🧪 Testing Documentation

Test your documentation before publishing:

```bash
# Check for broken links
mintlify broken-links

# Validate mint.json
mintlify validate

# Preview locally
mintlify dev
```

## 📈 Analytics

Track documentation usage:

1. **Mintlify Cloud**: Built-in analytics
2. **Google Analytics**: Add tracking code to `mint.json`
3. **PostHog**: Open-source analytics

```json
{
  "analytics": {
    "ga4": {
      "measurementId": "G-XXXXXXXXXX"
    }
  }
}
```

## 🆘 Support & Maintenance

### Updating Documentation

1. Edit the relevant `.mdx` files
2. Commit and push changes
3. Documentation auto-deploys (if using Mintlify Cloud)

### Versioning

For API versioning:

```
docs/
├── v1/
│   └── api-reference/
└── v2/
    └── api-reference/
```

Update `mint.json` to support multiple versions.

## 📚 Additional Resources

- [Mintlify Documentation](https://mintlify.com/docs)
- [OpenAPI Specification](https://swagger.io/specification/)
- [API Documentation Best Practices](https://swagger.io/resources/articles/best-practices-in-api-documentation/)

## 🤝 Contributing

To add or update documentation:

1. Clone the repository
2. Make changes to `.mdx` files
3. Test locally with `mintlify dev`
4. Submit a pull request

## 📞 Contact

For questions or issues with the documentation:
- Email: support@voicegenie.com
- GitHub Issues: [Project Issues](https://github.com/your-org/voicegenie-dialer-service/issues)

---

## Next Steps

1. **Customize branding** - Update logos and colors in `mint.json`
2. **Add remaining endpoints** - Document all your APIs
3. **Deploy to Mintlify Cloud** - Make it public
4. **Share with your team** - Get feedback
5. **Set up custom domain** - Use your own domain

**Ready to deploy?** Run `mintlify dev` to preview your documentation!
