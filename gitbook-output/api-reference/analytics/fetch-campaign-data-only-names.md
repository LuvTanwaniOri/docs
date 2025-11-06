---
description: Returns list of campaign names and IDs for dropdowns and filters (non-deleted, non-hidden campaigns only)
---

# Fetch Campaign Data - Names Only

**Endpoint:** `GET /fetchCampaignDataOnlyNamesAndAll`

## Overview

Returns a lightweight list of all campaigns with just essential fields: `_id`, `campaignName`, `campaignId`, `status`, `createdAt`, and `updatedAt`. Used in UI dropdowns, filters, and campaign selectors.

Only returns campaigns where:
- `isDeleted: false`
- `isHidden: false`

---

## Response

```json
{
  "status": "success",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "campaignName": "Q1 Sales Outreach",
      "campaignId": "CAMP-2024-001",
      "status": "running",
      "createdAt": "2024-01-10T08:30:00.000Z",
      "updatedAt": "2024-01-16T14:22:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439014",
      "campaignName": "Support Follow-up",
      "campaignId": "CAMP-2024-002",
      "status": "completed",
      "createdAt": "2024-01-12T09:15:00.000Z",
      "updatedAt": "2024-01-15T18:45:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439015",
      "campaignName": "Customer Feedback Survey",
      "campaignId": "CAMP-2024-003",
      "status": "paused",
      "createdAt": "2024-01-14T11:00:00.000Z",
      "updatedAt": "2024-01-14T16:30:00.000Z"
    }
  ],
  "message": "Data loaded..."
}
```

---

## Error Response (500)

```json
{
  "status": "failed",
  "data": {},
  "message": "Failed"
}
```

---

## Code Examples

<CodeGroup>

```javascript JavaScript
const response = await fetch('https://api.voicegenie.ai/fetchCampaignDataOnlyNamesAndAll');

const data = await response.json();
console.log(data.data); // Array of campaigns

// Use in a dropdown
data.data.forEach(campaign => {
  console.log(`${campaign.campaignName} (${campaign.status})`);
});
```

```python Python
import requests

response = requests.get('https://api.voicegenie.ai/fetchCampaignDataOnlyNamesAndAll')
data = response.json()

for campaign in data['data']:
    print(f"{campaign['campaignName']} - {campaign['campaignId']} [{campaign['status']}]")
```

```bash cURL
curl -X GET https://api.voicegenie.ai/fetchCampaignDataOnlyNamesAndAll
```

</CodeGroup>

---

## Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `_id` | string | MongoDB ObjectId of the campaign document |
| `campaignName` | string | Human-readable campaign name |
| `campaignId` | string | Unique campaign identifier (business ID) |
| `status` | string | Current campaign status (e.g., `running`, `paused`, `completed`, `stopped`) |
| `createdAt` | string (ISO 8601) | Campaign creation timestamp |
| `updatedAt` | string (ISO 8601) | Last update timestamp |

---

## Notes

- **Sorted:** Campaigns are returned sorted by `createdAt` in descending order (newest first)
- **Lightweight:** Only essential fields are returned; use other endpoints for detailed campaign data
- **Filtering:** Only non-deleted (`isDeleted: false`) and non-hidden (`isHidden: false`) campaigns are included
- **No Pagination:** Returns all matching campaigns in a single response
- **Ideal for UI:** Perfect for populating dropdowns, multi-select filters, and campaign name autocomplete
- The `campaignId` is typically a business-friendly ID like `CAMP-2024-001` (different from MongoDB `_id`)
