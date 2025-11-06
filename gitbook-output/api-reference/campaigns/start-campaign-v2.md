---
description: Start a campaign with enhanced configuration options
---

# Start Campaign v2

**Endpoint:** `GET /startCampaignv2/:campaignId`

##  Overview

Start a campaign immediately with v2 endpoint that supports advanced features like scheduled calls and context-based dialing.

---

##  Authentication

---

##  Path Parameters

<ParamField path="campaignId" type="string" required>
  Campaign ID (MongoDB ObjectId)
  ```
  507f1f77bcf86cd799439013
  ```
</ParamField>

---

## Response

### Success Response (200 OK):
```json
{
  "success": true,
  "message": "Campaign started successfully",
  "data": {
    "campaign_id": "507f1f77bcf86cd799439013",
    "campaign_name": "Sales Outreach Q1",
    "status": "in_progress",
    "started_at": "2024-01-16T14:00:00Z",
    "total_contacts": 500,
    "scheduled_calls": 150,
    "immediate_calls": 350,
    "estimated_completion": "2024-01-16T18:00:00Z",
    "configuration": {
      "is_scheduled_call": true,
      "is_context_based_call": true,
      "redial_config": {
        "enabled": true,
        "max_attempts": 3,
        "retry_intervals": [3600, 7200, 14400]
      }
    }
  }
}
```

### Campaign Already Running (400 Bad Request):
```json
{
  "success": false,
  "message": "Campaign is already in progress",
  "error": {
    "code": "CAMPAIGN_ALREADY_RUNNING",
    "current_status": "in_progress",
    "started_at": "2024-01-16T13:00:00Z"
  }
}
```

---

## Code Examples

### cURL:
```bash
curl -X GET "https://api.voicegenie.com/startCampaignv2/507f1f77bcf86cd799439013" \
  -H "x-api-key: YOUR_API_KEY"
```

### JavaScript:
```javascript
const axios = require('axios');

async function startCampaignV2(campaignId) {
  try {
    const response = await axios.get(
      `https://api.voicegenie.com/startCampaignv2/${campaignId}`,
      {
        headers: {
          'x-api-key': 'YOUR_API_KEY'
        }
      }
    );
    
    console.log('✅ Campaign started');
    console.log('Total contacts:', response.data.data.total_contacts);
    console.log('Estimated completion:', response.data.data.estimated_completion);
    
    return response.data.data;
  } catch (error) {
    if (error.response?.data?.error?.code === 'CAMPAIGN_ALREADY_RUNNING') {
      console.log('{% hint style="warning" %}
Campaign already running');
{% endhint %}
    }
    throw error;
  }
}

// Example
startCampaignV2('507f1f77bcf86cd799439013');
```

---

## Features

### 1. Scheduled Calls Support:
Campaigns with `isScheduledCall: true` will respect individual contact schedules.

### 2. Context-Based Dialing:
When `isContextBasedCall: true`, AI uses custom context per contact.

### 3. Auto-Redial Configuration:
Automatically retries failed/unanswered calls based on `redialConfig`.

---

## Related Endpoints

- [Create Campaign](/api-reference/campaigns/create-campaign) - Create new campaign
- [Get Campaign Statuses](/api-reference/campaigns/get-campaign-statuses) - Monitor status
- [Redial Campaign Calls](/api-reference/campaigns/redial-campaign-calls) - Manual retry
