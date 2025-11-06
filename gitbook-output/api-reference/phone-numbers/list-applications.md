---
description: List Plivo/Telephony applications linked to account
---

# List Applications

**Endpoint:** `GET /applications`

## Overview

Placeholder listing applications (webhook endpoints/apps) tied to your telephony provider.

---

## Response (example)

```json
{
  "success": true,
  "data": [
    {"app_id":"app_abc123","app_name":"VoiceGenie Production","voice_url":"https://api.voicegenie.com/call-handler"}
  ]
}
```
