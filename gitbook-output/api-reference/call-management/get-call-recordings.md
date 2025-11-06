---
description: Retrieve call recording URLs and metadata
---

# Get Call Recordings

**Endpoint:** `GET /callRecordings`

## 🎙️ Overview

Fetch call recordings with S3 URLs, duration, and metadata. Supports filtering and pagination.

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
  "message": "Call recordings retrieved successfully",
  "data": {
    "recordings": [
      {
        "call_uuid": "call-uuid-abc123",
        "recording_url": "https://voicegenie-recordings.s3.amazonaws.com/recordings/2024/call-uuid-abc123.mp3",
        "duration": 345,
        "file_size": 2048576,
        "format": "mp3",
        "transcription_available": true,
        "campaign_id": "campaign_xyz789",
        "phone_number": "+919876543210",
        "status": "completed",
        "created_at": "2024-01-16T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "total_pages": 8
    }
  }
}
```

---

## Code Examples

### cURL:
```bash
curl -X GET "https://api.voicegenie.com/callRecordings?campaign_id=campaign_xyz789&page=1&limit=20" \
  -H "x-api-key: YOUR_API_KEY"
```

### JavaScript:
```javascript
const axios = require('axios');

async function getCallRecordings(filters = {}) {
  const response = await axios.get(
    'https://api.voicegenie.com/callRecordings',
    {
      params: {
        campaign_id: filters.campaign_id,
        start_date: filters.start_date,
        end_date: filters.end_date,
        page: filters.page || 1,
        limit: filters.limit || 20
      },
      headers: {
        'x-api-key': 'YOUR_API_KEY'
      }
    }
  );
  
  console.log(`Found ${response.data.data.pagination.total} recordings`);
  return response.data.data;
}

// Example
getCallRecordings({
  campaign_id: 'campaign_xyz789',
  start_date: '2024-01-01T00:00:00Z'
});
```

---

## Related Endpoints

- [Get Conversation Logs](/api-reference/call-management/get-conversation-logs) - Call transcripts
