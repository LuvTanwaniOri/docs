---
description: Release and delete a rented phone number
---

# Unrent Phone Number

**Endpoint:** `DELETE /numbers/:number`

## 🗑️ Overview

Unrent a phone number from Plivo and remove it from your account. This action is irreversible.

---

##  Authentication

---

##  Path Parameters

<ParamField path="number" type="string" required>
  Phone number to unrent (E.164 format)
  ```
  919876543210
  ```
</ParamField>

---

## Response

### Success Response (200 OK):
```json
{
  "success": true,
  "message": "Phone number unrented successfully",
  "data": {
    "number": "919876543210",
    "plivo_response": {
      "message": "deleted",
      "api_id": "api-request-uuid"
    },
    "database_update": {
      "isDeleted": true,
      "deleted_at": "2024-01-16T15:00:00Z"
    },
    "final_charges": {
      "prorated_rental": "1.25",
      "total_charged": "1.25"
    }
  }
}
```

### Number Has Active Campaigns (400 Bad Request):
```json
{
  "success": false,
  "message": "Cannot unrent number with active campaigns",
  "error": {
    "code": "NUMBER_IN_USE",
    "active_campaigns": ["507f1f77bcf86cd799439013"],
    "recommendation": "Stop all campaigns using this number first"
  }
}
```

---

## Code Examples

### cURL:
```bash
curl -X DELETE "https://api.voicegenie.com/numbers/919876543210" \
  -H "x-api-key: YOUR_API_KEY"
```

### JavaScript:
```javascript
const axios = require('axios');

async function unrentPhoneNumber(number) {
  try {
    const response = await axios.delete(
      `https://api.voicegenie.com/numbers/${number}`,
      {
        headers: {
          'x-api-key': 'YOUR_API_KEY'
        }
      }
    );
    
    console.log('✅ Number unrented successfully');
    console.log('Final charges:', response.data.data.final_charges);
    
    return response.data.data;
  } catch (error) {
    if (error.response?.data?.error?.code === 'NUMBER_IN_USE') {
      console.error('❌ Cannot unrent: Number has active campaigns');
      console.log('Active campaigns:', error.response.data.error.active_campaigns);
    }
    throw error;
  }
}

// Example
unrentPhoneNumber('919876543210');
```

---

## Important Notes

1. **Irreversible Action**: Once unrented, the number may be assigned to another customer
2. **Active Campaigns**: Stop all campaigns using this number before unrenting
3. **Prorated Charges**: You'll be charged for the days used in the current month
4. **Soft Delete**: Number record is marked as deleted but retained for historical records

---

## Related Endpoints

- [List Account Numbers](/api-reference/phone-numbers/list-account-numbers) - View all numbers
- [Buy Number](/api-reference/phone-numbers/buy-number) - Purchase new number
