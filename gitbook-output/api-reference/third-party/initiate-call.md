---
description: Initiate a single outbound call via third-party webhook
---

# Initiate Call

**Endpoint:** `POST /initiateCall`

## 📞 Overview

Trigger an outbound AI call to a single contact. This endpoint is designed for third-party integrations and webhooks.

---

##  Authentication

<Note>
  This endpoint uses **webhook-based authentication** or **API key**. Check with your integration setup.
</Note>

---

##  Request Body

---

## Response

### Success Response (200 OK):
```json
{
  "success": true,
  "message": "Call initiated successfully",
  "data": {
    "call_uuid": "call-uuid-abc123",
    "status": "initiated",
    "phone_number": "+919876543210",
    "agent_id": "507f1f77bcf86cd799439011",
    "initiated_at": "2024-01-16T10:30:00Z"
  }
}
```

### Error Response (400):
```json
{
  "success": false,
  "message": "Invalid phone number",
  "error": "Phone number must be in E.164 format"
}
```

---

## Code Examples

### cURL:
```bash
curl -X POST "https://api.voicegenie.com/initiateCall" \
  -H "Content-Type: application/json" \
  -d '{
    "phone_number": "+919876543210",
    "agent_id": "507f1f77bcf86cd799439011",
    "custom_data": {
      "customer_name": "John Doe"
    }
  }'
```

### JavaScript:
```javascript
const axios = require('axios');

async function initiateCall(phoneNumber, agentId, customData = {}) {
  try {
    const response = await axios.post(
      'https://api.voicegenie.com/initiateCall',
      {
        phone_number: phoneNumber,
        agent_id: agentId,
        custom_data: customData
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Call initiated:', response.data.data.call_uuid);
    return response.data.data;
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

// Example
initiateCall('+919876543210', '507f1f77bcf86cd799439011', {
  customer_name: 'John Doe',
  product_interest: 'Premium Plan'
});
```

### Python:
```python
import requests

def initiate_call(phone_number, agent_id, custom_data=None):
    url = "https://api.voicegenie.com/initiateCall"
    
    payload = {
        "phone_number": phone_number,
        "agent_id": agent_id,
        "custom_data": custom_data or {}
    }
    
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        data = response.json()['data']
        print(f"✅ Call initiated: {data['call_uuid']}")
        return data
    else:
        print("❌ Error:", response.json())
        return None

# Example
initiate_call(
    "+919876543210",
    "507f1f77bcf86cd799439011",
    {"customer_name": "John Doe"}
)
```

---

## Related Endpoints

- [Initiate Batch Call](/api-reference/third-party/initiate-batch-call) - Call multiple contacts
- [Initiate Batch Call Using Sheet](/api-reference/third-party/initiate-batch-call-using-sheet) - Upload file
