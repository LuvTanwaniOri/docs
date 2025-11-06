---
description: Upload campaign data and automatically start execution
---

# Upload Campaign Data and Run

**Endpoint:** `POST /uploadCampaignDataAndRun`

##  Overview

Upload contact list and campaign configuration, then immediately start the campaign. One-step process combining upload and execution.

---

##  Authentication

---

##  Request Body

### Redial Config Fields:

### Contact Object Fields:

### Example Request:
```json
{
  "campaignName": "Q1 Sales Outreach",
  "agentId": "507f1f77bcf86cd799439012",
  "isScheduledCall": false,
  "isContextBasedCall": true,
  "redialConfig": {
    "enabled": true,
    "maxAttempts": 3,
    "retryIntervals": [3600, 7200, 14400]
  },
  "contacts": [
    {
      "phone_number": "+919876543210",
      "name": "John Doe",
      "email": "john@example.com",
      "custom_data": {
        "company": "Acme Corp",
        "industry": "Technology",
        "deal_value": "50000"
      }
    },
    {
      "phone_number": "+919123456789",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "custom_data": {
        "company": "Beta Inc",
        "industry": "Finance"
      }
    }
  ]
}
```

---

## Response

### Success Response (200 OK):
```json
{
  "success": true,
  "message": "Campaign created and started successfully",
  "data": {
    "campaign": {
      "_id": "507f1f77bcf86cd799439013",
      "campaignName": "Q1 Sales Outreach",
      "campaignId": "CAMP-2024-001",
      "status": "in_progress",
      "agentId": "507f1f77bcf86cd799439012",
      "totalContacts": 2,
      "isScheduledCall": false,
      "isContextBasedCall": true,
      "createdAt": "2024-01-16T16:00:00Z",
      "campaignStartTime": "2024-01-16T16:00:05Z"
    },
    "execution_status": {
      "calls_queued": 2,
      "calls_initiated": 0,
      "estimated_completion": "2024-01-16T16:15:00Z"
    },
    "redial_config": {
      "enabled": true,
      "maxAttempts": 3,
      "retryIntervals": [3600, 7200, 14400]
    }
  }
}
```

---

## Code Examples

### cURL:
```bash
curl -X POST "https://api.voicegenie.com/uploadCampaignDataAndRun" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "campaignName": "Q1 Sales Outreach",
    "agentId": "507f1f77bcf86cd799439012",
    "isContextBasedCall": true,
    "redialConfig": {
      "enabled": true,
      "maxAttempts": 3
    },
    "contacts": [
      {
        "phone_number": "+919876543210",
        "name": "John Doe",
        "custom_data": {
          "company": "Acme Corp"
        }
      }
    ]
  }'
```

### JavaScript:
```javascript
const axios = require('axios');

async function uploadAndRunCampaign(campaignData) {
  const response = await axios.post(
    'https://api.voicegenie.com/uploadCampaignDataAndRun',
    campaignData,
    {
      headers: {
        'x-api-key': 'YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    }
  );
  
  const { campaign, execution_status } = response.data.data;
  
  console.log('✅ Campaign created and started');
  console.log(`Campaign ID: ${campaign.campaignId}`);
  console.log(`Status: ${campaign.status}`);
  console.log(`Calls Queued: ${execution_status.calls_queued}`);
  console.log(`Estimated Completion: ${execution_status.estimated_completion}`);
  
  return response.data.data;
}

// Example: Quick campaign launch
uploadAndRunCampaign({
  campaignName: 'Q1 Sales Outreach',
  agentId: '507f1f77bcf86cd799439012',
  isContextBasedCall: true,
  redialConfig: {
    enabled: true,
    maxAttempts: 3,
    retryIntervals: [3600, 7200]
  },
  contacts: [
    {
      phone_number: '+919876543210',
      name: 'John Doe',
      custom_data: {
        company: 'Acme Corp',
        deal_value: '50000'
      }
    }
  ]
});
```

---

## Use Cases

### 1. Quick Campaign Launch:
Best for immediate execution without manual start step.

### 2. Context-Based AI Calls:
Set `isContextBasedCall: true` and provide `custom_data` for personalized AI conversations.

### 3. Auto-Retry Configuration:
Configure `redialConfig` for automatic retry of failed/unanswered calls.

---

## Important Notes

1. **Automatic Start**: Campaign starts immediately after upload
2. **Max Contacts**: Limit of 1000 contacts per request
3. **Context Data**: Used by AI for personalization when `isContextBasedCall: true`
4. **Scheduled Calls**: Requires `scheduledCallDateTime` for each contact if `isScheduledCall: true`

---

## Related Endpoints

- [Upload Campaign Data](/api-reference/campaigns/upload-campaign-data) - Upload without starting
- [Start Campaign v2](/api-reference/campaigns/start-campaign-v2) - Manual start
- [Get Campaign Statuses](/api-reference/campaigns/get-campaign-statuses) - Monitor progress
