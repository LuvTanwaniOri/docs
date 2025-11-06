---
description: Update user-specific customizations for a script
---

# Update User Script Data

**Endpoint:** `POST /updateUserSpecificScriptData`

##  Overview

Modify user-specific script configurations without affecting the base script template.

---

##  Authentication

---

##  Request Body

### User Specific Data Fields:

### Example Request:
```json
{
  "script_id": "507f1f77bcf86cd799439012",
  "user_id": "507f1f77bcf86cd799439011",
  "user_specific_data": {
    "custom_prompts": [
      {
        "trigger": "greeting",
        "text": "Hello from Acme Corp, how can I assist you?"
      },
      {
        "trigger": "goodbye",
        "text": "Thank you for calling Acme Corp. Have a great day!"
      }
    ],
    "variables": {
      "company_name": "Acme Corp",
      "support_email": "support@acme.com",
      "business_hours": "9 AM to 6 PM IST"
    },
    "custom_actions": [
      {
        "event": "call_ended",
        "webhook_url": "https://api.example.com/call-ended",
        "method": "POST"
      }
    ]
  }
}
```

---

## Response

### Success Response (200 OK):
```json
{
  "success": true,
  "message": "User-specific script data updated successfully",
  "data": {
    "script_id": "507f1f77bcf86cd799439012",
    "user_id": "507f1f77bcf86cd799439011",
    "user_specific_data": {
      "custom_prompts": [
        {
          "trigger": "greeting",
          "text": "Hello from Acme Corp, how can I assist you?"
        }
      ],
      "variables": {
        "company_name": "Acme Corp",
        "support_email": "support@acme.com"
      },
      "custom_actions": [
        {
          "event": "call_ended",
          "webhook_url": "https://api.example.com/call-ended"
        }
      ]
    },
    "updated_at": "2024-01-16T13:00:00Z"
  }
}
```

---

## Code Examples

### JavaScript:
```javascript
const axios = require('axios');

async function updateUserScriptData(scriptId, userId, customData) {
  const response = await axios.post(
    'https://api.voicegenie.com/updateUserSpecificScriptData',
    {
      script_id: scriptId,
      user_id: userId,
      user_specific_data: customData
    },
    {
      headers: {
        'x-api-key': 'YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    }
  );
  
  console.log('✅ User script data updated');
  return response.data.data;
}

// Example: Customize greetings
updateUserScriptData(
  '507f1f77bcf86cd799439012',
  '507f1f77bcf86cd799439011',
  {
    custom_prompts: [{
      trigger: 'greeting',
      text: 'Hello from Acme Corp!'
    }],
    variables: {
      company_name: 'Acme Corp'
    }
  }
);
```

---

## Related Endpoints

- [Fetch Script](/api-reference/scripts/fetch-script) - Get base script
- [Create Script](/api-reference/scripts/create-script) - New script
