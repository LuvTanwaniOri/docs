---
description: Authenticate user with email/password and Google reCAPTCHA, returns user config and sets httpOnly cookie token
---

# Login

**Endpoint:** `POST /auth/login`

##  Overview

Authenticates a user by validating their credentials and Google reCAPTCHA token. On successful authentication, the API:
- Sets a secure, httpOnly cookie named `token` containing the JWT
- Returns user profile, script data, brand config, and feature flags
- **Does NOT return the token in the response body** (it's in the cookie)

---

##  Request Body

---

## Response (Success)

```json
{
  "status": "success",
  "data": {
    "showQuotaStatusBox": true,
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "generativeBotScript": true,
    "allowedRoutes": ["/dashboard", "/campaigns", "/analytics"],
    "editScriptAppData": false,
    "viewHistoryTranscriptions": false,
    "viewVoiceComponentConfigs": false,
    "scriptData": {
      "_id": "script_id_here",
      "botName": "My AI Assistant",
      "prompt": "You are a helpful assistant...",
      "analyticsPrompt": "Extract key entities..."
    },
    "brandSpecificData": {
      "id": "brand_config_id",
      "campaignDialConfig": {
        "maxCallsPerCampaign": 1000,
        "dialPacing": 2
      },
      "showQuotaStatusBox": true
    },
    "agentLoginDetails": {
      "lastLogin": "2024-01-16T10:30:00Z",
      "loginCount": 42
    }
  },
  "message": "user Login Successful."
}
```

**Note:** The JWT token is set in an httpOnly cookie named `token` (not returned in the response body).

---

## Error Responses

### Missing Required Fields (422)
```json
{
  "status": "failed",
  "data": "Auth Failed",
  "message": ""
}
```

### Invalid Credentials (401)
```json
{
  "status": "failed",
  "data": {},
  "message": "Invalid email or password"
}
```

### reCAPTCHA Validation Failed (401)
```json
{
  "status": "failed",
  "data": {
    "message": "Login Failed!"
  },
  "message": "Login Failed"
}
```

### Server Error (500)
```json
{
  "status": "failed",
  "data": {},
  "message": "user Login Failed."
}
```

---

## Cookie Details

- **Name:** `token`
- **Type:** httpOnly (not accessible via JavaScript)
- **Max Age:** 24 hours (1000 * 60 * 60 * 24 ms)
- **Secure:** true
- **Path:** `/`
- **SameSite:** `None` (dev environment only)

---

## Code Examples

<CodeGroup>

```javascript JavaScript
const response = await fetch('https://seamless-sandbox-dev-cm.oriserve.com//auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include', // Important: include cookies
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securePassword123',
    recaptchaVal: 'recaptcha_token_from_google'
  })
});

const data = await response.json();
console.log(data.data.name); // User's name
// Token is in httpOnly cookie, not in response body
```

```python Python
import requests

response = requests.post(
    'https://seamless-sandbox-dev-cm.oriserve.com//auth/login',
    json={
        'email': 'user@example.com',
        'password': 'securePassword123',
        'recaptchaVal': 'recaptcha_token_from_google'
    }
)

data = response.json()
print(data['data']['name'])
# Cookie is stored automatically by requests library
```

```bash cURL
curl -X POST https://seamless-sandbox-dev-cm.oriserve.com//auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "user@example.com",
    "password": "securePassword123",
    "recaptchaVal": "recaptcha_token_from_google"
  }'
```

</CodeGroup>

---

## Notes

- The JWT token is **never returned in the response body** for security reasons; it's only set as an httpOnly cookie
- Include `credentials: 'include'` in fetch requests or use a cookie-aware HTTP client
- The reCAPTCHA token must be obtained from Google's reCAPTCHA v2/v3 on the client side
- `scriptData` contains the full script configuration used by the frontend script app
- `allowedRoutes` determines which UI routes the user can access
- Feature flags like `editScriptAppData`, `viewHistoryTranscriptions`, `viewVoiceComponentConfigs` control UI permissions
