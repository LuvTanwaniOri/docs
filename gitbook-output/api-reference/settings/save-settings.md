---
description: Save user preferences and application settings
---

# Save Settings

**Endpoint:** `POST /saveSettings`

## ⚙️ Overview

Store user-specific settings including UI preferences, notification settings, and campaign defaults.

---

##  Authentication

---

##  Request Body

### Settings Object Fields:

### Example Request:
```json
{
  "user_id": "507f1f77bcf86cd799439011",
  "settings": {
    "theme": "dark",
    "notifications": {
      "email": true,
      "sms": false,
      "push": true,
      "webhook": true
    },
    "campaign_defaults": {
      "auto_retry": true,
      "max_retries": 3,
      "retry_interval": 3600,
      "working_hours": {
        "start": "09:00",
        "end": "18:00"
      }
    },
    "dashboard_layout": {
      "widgets": ["calls", "analytics", "quota"],
      "default_date_range": "last_7_days"
    }
  }
}
```

---

## Response

### Success Response (200 OK):
```json
{
  "success": true,
  "message": "Settings saved successfully",
  "data": {
    "user_id": "507f1f77bcf86cd799439011",
    "settings": {
      "theme": "dark",
      "notifications": {
        "email": true,
        "sms": false,
        "push": true,
        "webhook": true
      },
      "campaign_defaults": {
        "auto_retry": true,
        "max_retries": 3,
        "retry_interval": 3600,
        "working_hours": {
          "start": "09:00",
          "end": "18:00"
        }
      },
      "dashboard_layout": {
        "widgets": ["calls", "analytics", "quota"],
        "default_date_range": "last_7_days"
      }
    },
    "updated_at": "2024-01-16T12:30:00Z"
  }
}
```

---

## Code Examples

### cURL:
```bash
curl -X POST "https://api.voicegenie.com/saveSettings" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "507f1f77bcf86cd799439011",
    "settings": {
      "theme": "dark",
      "notifications": {
        "email": true,
        "push": true
      }
    }
  }'
```

### JavaScript:
```javascript
const axios = require('axios');

async function saveSettings(userId, settings) {
  const response = await axios.post(
    'https://api.voicegenie.com/saveSettings',
    {
      user_id: userId,
      settings: settings
    },
    {
      headers: {
        'x-api-key': 'YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    }
  );
  
  console.log('✅ Settings saved');
  return response.data.data;
}

// Example: Enable dark mode
saveSettings('507f1f77bcf86cd799439011', {
  theme: 'dark',
  notifications: {
    email: true,
    push: true
  }
});
```

---

## Related Endpoints

- [Get Settings](/api-reference/settings/get-settings) - Retrieve current settings
