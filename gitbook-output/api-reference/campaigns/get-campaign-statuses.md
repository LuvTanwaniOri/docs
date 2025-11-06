---
description: Retrieve all campaign statuses and progress metrics
---

# Get Campaign Statuses

**Endpoint:** `GET /getCampaignStatuses`

## Overview

Get real-time status information for all campaigns including call counts, success rates, and current state.

---

##  Authentication

---

##  Query Parameters

---

## Response

### Success Response (200 OK):
```json
{
  "success": true,
  "message": "Campaign statuses retrieved successfully",
  "data": {
    "campaigns": [
      {
        "campaign_id": "507f1f77bcf86cd799439013",
        "campaign_name": "Sales Outreach Q1",
        "status": "in_progress",
        "started_at": "2024-01-16T14:00:00Z",
        "total_contacts": 500,
        "call_statistics": {
          "total_calls": 500,
          "completed": 320,
          "in_progress": 15,
          "failed": 45,
          "no_answer": 80,
          "busy": 25,
          "queued": 15
        },
        "success_metrics": {
          "connection_rate": 85.5,
          "success_rate": 64.0,
          "average_call_duration": 245
        },
        "progress": {
          "percentage": 97.0,
          "estimated_completion": "2024-01-16T18:30:00Z"
        },
        "redial_info": {
          "total_redials": 12,
          "pending_redials": 3,
          "next_redial_at": "2024-01-16T16:00:00Z"
        }
      },
      {
        "campaign_id": "507f1f77bcf86cd799439014",
        "campaign_name": "Support Follow-up",
        "status": "completed",
        "started_at": "2024-01-15T09:00:00Z",
        "completed_at": "2024-01-15T15:30:00Z",
        "total_contacts": 200,
        "call_statistics": {
          "total_calls": 200,
          "completed": 185,
          "failed": 10,
          "no_answer": 5
        },
        "success_metrics": {
          "connection_rate": 92.5,
          "success_rate": 92.5,
          "average_call_duration": 180
        }
      }
    ],
    "summary": {
      "total_campaigns": 2,
      "active_campaigns": 1,
      "completed_campaigns": 1,
      "total_calls_today": 700,
      "success_rate_overall": 72.1
    }
  }
}
```

---

## Code Examples

### cURL:
```bash
curl -X GET "https://api.voicegenie.com/getCampaignStatuses" \
  -H "x-api-key: YOUR_API_KEY"
```

### JavaScript:
```javascript
const axios = require('axios');

async function getCampaignStatuses(filters = {}) {
  const response = await axios.get(
    'https://api.voicegenie.com/getCampaignStatuses',
    {
      params: filters,
      headers: {
        'x-api-key': 'YOUR_API_KEY'
      }
    }
  );
  
  const { campaigns, summary } = response.data.data;
  
  console.log('\n📊 Campaign Dashboard');
  console.log(`Total Campaigns: ${summary.total_campaigns}`);
  console.log(`Active: ${summary.active_campaigns}`);
  console.log(`Overall Success Rate: ${summary.success_rate_overall}%\n`);
  
  campaigns.forEach(campaign => {
    console.log(`📞 ${campaign.campaign_name}`);
    console.log(`   Status: ${campaign.status}`);
    console.log(`   Progress: ${campaign.progress?.percentage}%`);
    console.log(`   Completed: ${campaign.call_statistics.completed}/${campaign.total_contacts}`);
    console.log('');
  });
  
  return response.data.data;
}

// Example: Get only active campaigns
getCampaignStatuses({ status: 'in_progress' });
```

### Python:
```python
import requests

def get_campaign_statuses(status=None):
    url = "https://api.voicegenie.com/getCampaignStatuses"
    
    params = {}
    if status:
        params['status'] = status
    
    headers = {"x-api-key": "YOUR_API_KEY"}
    
    response = requests.get(url, params=params, headers=headers)
    
    if response.status_code == 200:
        data = response.json()['data']
        
        print(f"\n📊 Campaign Dashboard")
        print(f"Total Campaigns: {data['summary']['total_campaigns']}")
        print(f"Active: {data['summary']['active_campaigns']}")
        
        for campaign in data['campaigns']:
            print(f"\n📞 {campaign['campaign_name']}")
            print(f"   Status: {campaign['status']}")
            print(f"   Completed: {campaign['call_statistics']['completed']}/{campaign['total_contacts']}")
        
        return data
    
# Example
get_campaign_statuses(status='in_progress')
```

---

## Use Cases

### 1. Dashboard Monitoring:
```javascript
async function buildCampaignDashboard() {
  const data = await getCampaignStatuses();
  
  const activeCampaigns = data.campaigns.filter(c => c.status === 'in_progress');
  
  return activeCampaigns.map(campaign => ({
    id: campaign.campaign_id,
    name: campaign.campaign_name,
    progress: campaign.progress.percentage,
    successRate: campaign.success_metrics.success_rate,
    callsRemaining: campaign.call_statistics.queued
  }));
}
```

### 2. Alert on Low Success Rate:
```javascript
async function checkCampaignHealth() {
  const data = await getCampaignStatuses({ status: 'in_progress' });
  
  data.campaigns.forEach(campaign => {
    if (campaign.success_metrics.success_rate < 50) {
      console.warn(`{% hint style="warning" %}
Low success rate for ${campaign.campaign_name}: ${campaign.success_metrics.success_rate}%`);
{% endhint %}
      // Send alert
    }
  });
}
```

---

## Related Endpoints

- [Start Campaign v2](/api-reference/campaigns/start-campaign-v2) - Start campaign
- [Pause Campaign](/api-reference/campaigns/pause-campaign) - Pause active campaign
- [Get Campaign Analytics](/api-reference/analytics/get-campaign-analytics) - Detailed analytics
