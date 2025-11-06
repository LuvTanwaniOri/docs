---
description: Retry failed or unanswered calls from a campaign
---

# Redial Campaign Calls

**Endpoint:** `POST /redialCampaignCalls`

## 🔄 Overview

Manually trigger redial for specific calls or all failed/unanswered calls in a campaign.

---

##  Authentication

---

##  Request Body

### Redial Criteria Fields:

### Example Request 1 (Specific Calls):
```json
{
  "campaign_id": "507f1f77bcf86cd799439013",
  "call_uuids": [
    "call-uuid-abc123",
    "call-uuid-def456"
  ]
}
```

### Example Request 2 (Bulk Redial):
```json
{
  "campaign_id": "507f1f77bcf86cd799439013",
  "redial_criteria": {
    "statuses": ["no-answer", "busy"],
    "max_previous_attempts": 2,
    "exclude_dnc": true
  }
}
```

---

## Response

### Success Response (200 OK):
```json
{
  "success": true,
  "message": "Redial initiated successfully",
  "data": {
    "campaign_id": "507f1f77bcf86cd799439013",
    "redial_batch_id": "redial-batch-xyz789",
    "total_calls_to_redial": 45,
    "calls_scheduled": 43,
    "calls_excluded": 2,
    "excluded_reasons": {
      "dnc_list": 1,
      "max_attempts_reached": 1
    },
    "estimated_start_time": "2024-01-16T15:00:00Z",
    "redial_config": {
      "retry_interval": 3600,
      "max_attempts": 3
    }
  }
}
```

---

## Code Examples

### cURL:
```bash
curl -X POST "https://api.voicegenie.com/redialCampaignCalls" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_id": "507f1f77bcf86cd799439013",
    "redial_criteria": {
      "statuses": ["no-answer", "busy"],
      "max_previous_attempts": 2
    }
  }'
```

### JavaScript:
```javascript
const axios = require('axios');

async function redialCampaignCalls(campaignId, criteria) {
  const response = await axios.post(
    'https://api.voicegenie.com/redialCampaignCalls',
    {
      campaign_id: campaignId,
      redial_criteria: criteria
    },
    {
      headers: {
        'x-api-key': 'YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    }
  );
  
  const { total_calls_to_redial, calls_scheduled } = response.data.data;
  console.log(`✅ Scheduled ${calls_scheduled} of ${total_calls_to_redial} calls for redial`);
  
  return response.data.data;
}

// Example: Redial all unanswered calls
redialCampaignCalls('507f1f77bcf86cd799439013', {
  statuses: ['no-answer'],
  max_previous_attempts: 2,
  exclude_dnc: true
});
```

---

## Use Cases

### 1. Smart Retry Logic:
```javascript
async function retryFailedCalls(campaignId) {
  // First attempt: busy and no-answer
  await redialCampaignCalls(campaignId, {
    statuses: ['busy', 'no-answer'],
    max_previous_attempts: 1
  });
  
  // Wait 2 hours, then retry again
  setTimeout(async () => {
    await redialCampaignCalls(campaignId, {
      statuses: ['no-answer'],
      max_previous_attempts: 2
    });
  }, 7200000);
}
```

### 2. Specific Number Retry:
```javascript
async function retrySpecificNumbers(campaignId, callUuids) {
  const response = await axios.post(
    'https://api.voicegenie.com/redialCampaignCalls',
    {
      campaign_id: campaignId,
      call_uuids: callUuids
    },
    {
      headers: { 'x-api-key': 'YOUR_API_KEY' }
    }
  );
  
  return response.data.data;
}
```

---

## Related Endpoints

- [Start Campaign v2](/api-reference/campaigns/start-campaign-v2) - Start campaign
- [Get Campaign Statuses](/api-reference/campaigns/get-campaign-statuses) - View call statuses
