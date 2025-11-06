---
description: Purchase a phone number from Plivo/Oridial
---

# Buy Phone Number

**Endpoint:** `POST /buy`

## 💳 Overview

Purchase an available phone number after searching. The number will be activated and added to your account.

---

##  Authentication

---

##  Request Body

    
    
  </Expandable>
</ParamField>

---

## Response

### Success Response (201 Created):
```json
{
  "success": true,
  "message": "Phone number purchased successfully",
  "data": {
    "api_id": "abc123-def456-ghi789",
    "numbers": [
      {
        "number": "919876543210",
        "status": "Success"
      }
    ],
    "number": "919876543210",
    "status": "fulfilled",
    "country_iso": "IN",
    "alias": "Sales Line - Mumbai",
    "application": "/v1/Account/MAXXXXXX/Application/app_abc123/",
    "monthly_rental_rate": "0.80000",
    "voice_rate": "0.00700",
    "sms_rate": "0.00350",
    "region": "Maharashtra, IN"
  }
}
```

<Note>
  **Database Record Created:** The phone number is automatically saved to MongoDB `PhoneNumber` collection with status `active`.
</Note>

### Error Responses:

#### 400 - Purchase Failed:
```json
{
  "success": false,
  "message": "Purchase failed",
  "data": {
    "error": "Number already purchased by another account"
  }
}
```

#### 400 - Invalid Number:
```json
{
  "success": false,
  "message": "Purchase failed",
  "data": {
    "error": "Number not available for purchase"
  }
}
```

#### 500 - Server Error:
```json
{
  "success": false,
  "message": "Internal server error",
  "data": null
}
```

---

## 💾 Database Schema (PhoneNumber Model)

After successful purchase, a record is created:

```javascript
{
  _id: ObjectId("..."),
  dialer: "plivo",
  number: "919876543210",
  status: "active",
  country_iso: "IN",
  agentIds: [],  // Array of Script IDs
  configuredAgentIdForInboundCalls: null,  // Script ID for inbound
  isDeleted: false,
  metadata: {
    alias: "Sales Line - Mumbai"
  },
  api_response: {
    // Full Plivo API response stored here
  },
  createdAt: "2024-01-16T10:30:00Z",
  updatedAt: "2024-01-16T10:30:00Z"
}
```

---

## Code Examples

### cURL:
```bash
curl -X POST "https://api.voicegenie.com/buy" \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "number": "919876543210",
    "config": {
      "alias": "Sales Line - Mumbai"
    }
  }'
```

### JavaScript:
```javascript
const axios = require('axios');

async function buyPhoneNumber(number, alias) {
  try {
    const response = await axios.post(
      'https://api.voicegenie.com/buy',
      {
        number,
        config: {
          alias
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'YOUR_API_KEY'
        }
      }
    );
    
    console.log('Number purchased:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Purchase failed:', error.response.data);
    throw error;
  }
}

// Example usage
buyPhoneNumber('919876543210', 'Sales Line - Mumbai');
```

### Python:
```python
import requests

def buy_phone_number(number, alias=None):
    url = "https://api.voicegenie.com/buy"
    
    headers = {
        "Content-Type": "application/json",
        "x-api-key": "YOUR_API_KEY"
    }
    
    payload = {
        "number": number,
        "config": {}
    }
    
    if alias:
        payload["config"]["alias"] = alias
    
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 201:
        data = response.json()['data']
        print(f"✅ Purchased: {data['number']}")
        print(f"   Monthly cost: ${data['monthly_rental_rate']}")
        print(f"   Voice rate: ${data['voice_rate']}/min")
        return data
    else:
        print("❌ Purchase failed:", response.json())
        return None

# Example
buy_phone_number("919876543210", "Sales Line - Mumbai")
```

---

## 🔄 Typical Workflow

```javascript
// 1. Search for available numbers
const searchResults = await axios.get('/search', {
  params: { country_iso: 'IN', type: 'local', limit: 10 }
});

// 2. Let user select a number
const selectedNumber = searchResults.data.data.objects[0].number;

// 3. Purchase the number
const purchase = await axios.post('/buy', {
  number: selectedNumber,
  config: { alias: 'Customer Support Line' }
});

// 4. Configure for inbound calls (optional)
await axios.post(`/numbers/${selectedNumber}/update`, {
  configuredAgentIdForInboundCalls: 'agent_script_id_123'
});

console.log('Number ready for use!');
```

---

##  Pricing

Purchase includes:
- **Setup Fee:** Usually $0 (check `setup_rate`)
- **Monthly Rental:** `monthly_rental_rate` (e.g., $0.80/month)
- **Usage Charges:**
  - Voice: `voice_rate` per minute
  - SMS: `sms_rate` per message

<Warning>
  Monthly rental is charged immediately upon purchase and then recurring monthly.
</Warning>

---

## 🚨 Common Issues

### 1. Number Already Taken:
```javascript
// Always check availability first
const isAvailable = await checkNumberAvailability(number);
if (!isAvailable) {
  console.error('Number no longer available');
}
```

### 2. Insufficient Balance:
Ensure your Plivo account has sufficient balance for the purchase and monthly rental.

### 3. Country Restrictions:
Some countries require additional verification. Check Plivo documentation for country-specific requirements.

---

## Rate Limits

| Plan | Requests/min | Max Numbers |
|------|--------------|-------------|
| Free | 10 | 1 |
| Basic | 60 | 10 |
| Pro | 300 | 100 |
| Enterprise | 1000 | Unlimited |

---

## Related Endpoints

- [Search Numbers](/api-reference/phone-numbers/search-numbers) - Find available numbers
- [List Account Numbers](/api-reference/phone-numbers/list-account-numbers) - View owned numbers
- [Update Number](/api-reference/phone-numbers/update-number) - Configure number settings
- [Unrent Number](/api-reference/phone-numbers/unrent-number) - Release number

---

**Tip:** Always search first to ensure number availability before attempting purchase. 🔍
