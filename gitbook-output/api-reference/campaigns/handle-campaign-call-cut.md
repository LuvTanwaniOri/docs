---
description: Webhook to handle call hangup/cut events, trigger post-call processing, and update campaign records
---

# Handle Campaign Call Cut

**Endpoint:** `POST /handleCampaignCallCut`

## Overview

This endpoint is called when a call is hung up or cut unexpectedly. It:
1. Finds the voice session by `callId`
2. Triggers campaign record update via `handleCallHungUpResponse` if the call was part of a campaign
3. Queues or triggers post-call processing action based on brand configuration

---

## Request Body

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `callId` | string | ✅ Yes | - | Unique call identifier (CallUUID) |
| `callDuration` | number | ❌ No | - | Call duration in seconds |
| `callStatus` | string | ❌ No | - | Final call status (e.g., `completed`, `no-answer`, `busy`, `failed`) |
| `callHangupCause` | string | ❌ No | - | Reason for call hangup (e.g., `NORMAL_CLEARING`, `USER_BUSY`, `NO_ANSWER`) |
| `userPhoneNumber` | string | ❌ No | - | Phone number of the user/recipient |
---

## Response (Success - 200)

```json
{
  "status": "success",
  "data": {},
  "message": "Post call action called."
}
```

---

## Response (Error - 500)

```json
{
  "status": "failed",
  "data": {},
  "message": "Something went wrong!"
}
```

---

## Code Examples

<CodeGroup>

```javascript JavaScript
// Called by dialer webhook on call hangup
const response = await fetch('https://seamless-sandbox-dev-cm.oriserve.com//handleCampaignCallCut', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    callId: 'call-uuid-abc123',
    callDuration: 125,
    callStatus: 'completed',
    callHangupCause: 'NORMAL_CLEARING',
    userPhoneNumber: '919876543210'
  })
});

const data = await response.json();
console.log(data.message);
```

```python Python
import requests

response = requests.post(
    'https://seamless-sandbox-dev-cm.oriserve.com//handleCampaignCallCut',
    json={
        'callId': 'call-uuid-abc123',
        'callDuration': 125,
        'callStatus': 'no-answer',
        'callHangupCause': 'NO_ANSWER',
        'userPhoneNumber': '919876543210'
    }
)

data = response.json()
print(data['message'])
```

```bash cURL
curl -X POST https://seamless-sandbox-dev-cm.oriserve.com//handleCampaignCallCut \
  -H "Content-Type: application/json" \
  -d '{
    "callId": "call-uuid-abc123",
    "callDuration": 125,
    "callStatus": "busy",
    "callHangupCause": "USER_BUSY",
    "userPhoneNumber": "919876543210"
  }'
```

</CodeGroup>

---

## Processing Flow

1. **Voice Session Lookup:** Finds the voice session by `callId`
2. **Campaign Record Update:** If the call is part of a campaign (has `metaData.campaignId` and `metaData.campaignRecordId`), calls `handleCallHungUpResponse` to update campaign record status
3. **Post-Call Action:** Based on brand configuration:
   - **Queue Mode:** Adds a job to the `postCallProcessing` queue with action `postCallJobProcessingAction`
   - **Direct API Mode:** Makes a synchronous HTTP POST to the configured `ocsPostCallActionConfig.apiUrl`

---

## Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `callId` | string | Unique call identifier (matches VoiceSession.CallId) |
| `callDuration` | number | Duration of the call in seconds |
| `callStatus` | string | Final status (e.g., `completed`, `no-answer`, `busy`, `failed`) |
| `callHangupCause` | string | Hangup reason (SIP codes like `NORMAL_CLEARING`, `USER_BUSY`) |
| `userPhoneNumber` | string | Phone number of the call recipient |

---

## Notes

- **Webhook Endpoint:** Typically called by dialer webhooks (e.g., Plivo, Twilio) on call end
- **Campaign Integration:** If the call was part of a campaign, this endpoint updates the campaign record with final call status
- **Post-Call Processing:** Triggers analytics, reporting, or CRM updates via queue or direct API call
- **Brand Configuration:** Behavior depends on `BrandSpecificData.ocsPostCallActionConfig.type` (`queue` or direct API)
- **Queue Job:** If queue mode, job is added with `removeOnFail: false` for debugging and retry
- **Error Handling:** Errors are logged with metadata including `callId`, `phoneNumber`, and response details
- **Use Case:** Essential for updating campaign records when calls end unexpectedly or normally
- The `handleCallHungUpResponse` function handles campaign-specific logic like updating record status and triggering next call
