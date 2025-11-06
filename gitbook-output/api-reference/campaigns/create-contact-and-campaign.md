---
description: Create a contact and campaign in one operation (convenience endpoint)
---

# Create Contact and Campaign

**Endpoint:** `POST /createContactAndCampaign`

## Overview

This is a convenience endpoint that combines contact creation and campaign creation in a single API call. It:
1. Creates a new contact with an auto-generated name: `{BRAND_NAME}_contact_{identifierName}`
2. Creates a new campaign with an auto-generated name: `{BRAND_NAME}_campaign_{identifierName}`

Both operations use the provided `userData` as the contact/campaign data.

---

## Request Body

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `identifierName` | string | ✅ Yes | - | Unique identifier used to generate contact and campaign names (e.g., `quick_outreach_001`) |
| `userData` | array | ✅ Yes | - | Array of user/contact records with phone numbers and other details |
| `userData[].phone_number` | string | ✅ Yes | - | Phone number in E.164 format (e.g., `919876543210`) |
| `userData[].name` | string | ❌ No | - | Contact name |
| `userData[].*` | any | ❌ No | - | Additional custom fields (e.g., `email`, `age`, `company`, etc.) |
### `userData` Array Item Structure

---

## Response (Success - 200)

```json
{
  "status": "success",
  "data": {
    "message": "Done"
  },
  "message": "Contact and campaign created."
}
```

---

## Response (Contact Creation Failed - 500)

```json
{
  "status": "failed",
  "data": {
    "message": "create contact failed"
  },
  "message": "contact creation failed!"
}
```

---

## Response (Campaign Creation Failed - 500)

```json
{
  "status": "failed",
  "data": {
    "message": "create campaign failed"
  },
  "message": "campaign creation failed!"
}
```

---

## Code Examples

<CodeGroup>

```javascript JavaScript
const response = await fetch('https://seamless-sandbox-dev-cm.oriserve.com//createContactAndCampaign', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    identifierName: 'quick_outreach_001',
    userData: [
      {
        phone_number: '919876543210',
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Corp'
      },
      {
        phone_number: '919876543211',
        name: 'Jane Smith',
        email: 'jane@example.com',
        company: 'Tech Inc'
      }
    ]
  })
});

const data = await response.json();
console.log(data.message);
```

```python Python
import requests

response = requests.post(
    'https://seamless-sandbox-dev-cm.oriserve.com//createContactAndCampaign',
    json={
        'identifierName': 'support_followup_002',
        'userData': [
            {
                'phone_number': '919876543210',
                'name': 'Customer A',
                'email': 'customera@example.com'
            },
            {
                'phone_number': '919876543211',
                'name': 'Customer B',
                'email': 'customerb@example.com'
            }
        ]
    }
)

data = response.json()
print(data['message'])
```

```bash cURL
curl -X POST https://seamless-sandbox-dev-cm.oriserve.com//createContactAndCampaign \
  -H "Content-Type: application/json" \
  -d '{
    "identifierName": "onboarding_campaign_003",
    "userData": [
      {
        "phone_number": "919876543210",
        "name": "New User",
        "email": "newuser@example.com"
      }
    ]
  }'
```

</CodeGroup>

---

## Generated Names

Based on your `identifierName` and the `BRAND_NAME` environment variable:

- **Contact Name:** `{BRAND_NAME}_contact_{identifierName}`
  - Example: `VoiceGenie_contact_quick_outreach_001`
  
- **Campaign Name:** `{BRAND_NAME}_campaign_{identifierName}`
  - Example: `VoiceGenie_campaign_quick_outreach_001`

---

## Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `identifierName` | string | Yes | Unique identifier for this contact/campaign pair |
| `userData` | array | Yes | Array of contact records with phone numbers and custom fields |
| `userData[].phone_number` | string | Yes | Phone number in E.164 format (required by Contact model) |
| `userData[].name` | string | No | Contact name |
| `userData[].*` | any | No | Additional custom fields stored in `otherDetails` |

---

## Notes

- **Convenience Endpoint:** Simplifies creating a contact list and campaign in one call
- **Auto-Naming:** Contact and campaign names are auto-generated using `BRAND_NAME` and `identifierName`
- **Sequential Operations:** Creates contact first, then campaign; if contact fails, campaign is not attempted
- **Same Data:** The `userData` array is used for both contact creation and campaign data
- **Error Handling:** Returns 500 if either contact or campaign creation fails
- **Use Case:** Quick setup for testing or for simple use cases where you want to create a contact list and immediately start a campaign
- **Internal Calls:** Uses `createContact` and `uploadCampaignData` controller functions internally
- **No Additional Config:** This endpoint does not support campaign scheduling, agent assignment, or advanced settings; use dedicated endpoints for those features
