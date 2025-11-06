---
description: Handle AI dialer webhook callbacks with call data
---

# AI Dialer Callback

**Endpoint:** `POST /aiDialerCallbackWithData`

## 🔄 Overview

Webhook endpoint for receiving call status updates and events from AI dialer system. Used internally by VoiceGenie infrastructure.

---

##  Authentication

---

##  Request Body

### Call Data Fields:

### Example Request:
```json
{
  "call_uuid": "call-uuid-abc123",
  "event": "call_ended",
  "campaign_id": "507f1f77bcf86cd799439013",
  "phone_number": "+919876543210",
  "call_data": {
    "duration": 245,
    "recording_url": "https://voicegenie-recordings.s3.amazonaws.com/recordings/2024/call-uuid-abc123.mp3",
    "transcript": [
      {
        "timestamp": "2024-01-16T10:30:15Z",
        "role": "assistant",
        "content": "Hi, I'm Alex from VoiceGenie."
      },
      {
        "timestamp": "2024-01-16T10:30:22Z",
        "role": "user",
        "content": "Hello"
      }
    ],
    "outcome": "completed",
    "sentiment": {
      "overall": "positive",
      "confidence": 0.87
    },
    "custom_data": {
      "lead_score": 85,
      "interest_level": "high"
    }
  },
  "timestamp": "2024-01-16T10:35:00Z"
}
```

---

## Response

### Success Response (200 OK):
```json
{
  "success": true,
  "message": "Callback processed successfully",
  "data": {
    "call_uuid": "call-uuid-abc123",
    "processed_at": "2024-01-16T10:35:01Z",
    "actions_taken": [
      "campaign_record_updated",
      "analytics_recorded",
      "webhook_triggered"
    ]
  }
}
```

---

## Code Examples

### JavaScript (Server-side webhook handler):
```javascript
const express = require('express');
const crypto = require('crypto');

const app = express();

// Verify webhook signature
function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const expectedSignature = hmac.update(JSON.stringify(payload)).digest('hex');
  return signature === expectedSignature;
}

app.post('/webhook/ai-dialer-callback', express.json(), async (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const secret = process.env.WEBHOOK_SECRET;
  
  // Verify signature
  if (!verifyWebhookSignature(req.body, signature, secret)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  const { call_uuid, event, call_data } = req.body;
  
  console.log(`📞 Call Event: ${event} for ${call_uuid}`);
  
  // Process based on event type
  switch (event) {
    case 'call_answered':
      await handleCallAnswered(call_uuid, call_data);
      break;
    case 'call_ended':
      await handleCallEnded(call_uuid, call_data);
      break;
    case 'call_failed':
      await handleCallFailed(call_uuid, call_data);
      break;
  }
  
  res.json({
    success: true,
    message: 'Callback processed'
  });
});

async function handleCallEnded(callUuid, callData) {
  console.log(`✅ Call completed: ${callUuid}`);
  console.log(`Duration: ${callData.duration}s`);
  console.log(`Outcome: ${callData.outcome}`);
  console.log(`Sentiment: ${callData.sentiment?.overall}`);
  
  // Update CRM, send notifications, etc.
}
```

---

## Event Types

### 1. `call_initiated`:
Call has been queued and dialing started.

### 2. `call_ringing`:
Phone is ringing, waiting for answer.

### 3. `call_answered`:
Call was answered, conversation starting.

### 4. `call_ended`:
Call completed successfully. Includes full transcript and recording.

### 5. `call_failed`:
Call failed due to error or unreachable number.

---

## Related Endpoints

- [Get Conversation Logs](/api-reference/call-management/get-conversation-logs) - Retrieve full transcript
- [Get Call Recordings](/api-reference/call-management/get-call-recordings) - Access recordings
