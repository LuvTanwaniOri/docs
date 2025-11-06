---
description: Update phone number configuration and settings
---

# Update Phone Number

**Endpoint:** `POST /numbers/:number/update`

## ⚙️ Overview

Modify phone number settings including alias, application assignment, and script configuration.

---

##  Authentication

---

##  Path Parameters

<ParamField path="number" type="string" required>
  Phone number (E.164 format)
  ```
  919876543210
  ```
</ParamField>

---

##  Request Body

### Example Request:
```json
{
  "alias": "Sales Team - Mumbai",
  "app_id": "app_abc123",
  "agent_ids": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"],
  "configured_agent_id_for_inbound_calls": "507f1f77bcf86cd799439012"
}
```

---

## Response

### Success Response (200 OK):
```json
{
  "success": true,
  "message": "Phone number updated successfully",
  "data": {
    "plivo_response": {
      "message": "changed",
      "api_id": "api-request-uuid"
    },
    "database_update": {
      "number": "919876543210",
      "metadata": {
        "alias": "Sales Team - Mumbai"
      },
      "agentIds": [
        "507f1f77bcf86cd799439012",
        "507f1f77bcf86cd799439013"
      ],
      "configuredAgentIdForInboundCalls": "507f1f77bcf86cd799439012",
      "updatedAt": "2024-01-16T12:00:00Z"
    }
  }
}
```

---

## Code Examples

### cURL:
```bash
curl -X POST "https://api.voicegenie.com/numbers/919876543210/update" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "alias": "Sales Team - Mumbai",
    "app_id": "app_abc123",
    "agent_ids": ["507f1f77bcf86cd799439012"],
    "configured_agent_id_for_inbound_calls": "507f1f77bcf86cd799439012"
  }'
```

### JavaScript:
```javascript
const axios = require('axios');

async function updatePhoneNumber(number, config) {
  const response = await axios.post(
    `https://api.voicegenie.com/numbers/${number}/update`,
    config,
    {
      headers: {
        'x-api-key': 'YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    }
  );
  
  console.log('✅ Number updated:', response.data.message);
  return response.data.data;
}

// Example: Configure for inbound calls
updatePhoneNumber('919876543210', {
  alias: 'Customer Support Line',
  agent_ids: ['507f1f77bcf86cd799439012'],
  configured_agent_id_for_inbound_calls: '507f1f77bcf86cd799439012'
});
```

---

## Related Endpoints

- [Get Phone Number](/api-reference/phone-numbers/get-number) - Current configuration
- [Get Inbound Call Config](/api-reference/call-management/get-inbound-call-config) - Test inbound setup
