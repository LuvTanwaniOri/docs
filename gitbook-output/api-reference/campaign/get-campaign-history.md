---
description: Retrieve call history and detailed logs for a specific campaign with pagination and filtering options.
---

# Get Campaign History

**Endpoint:** `POST /getHistory`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
## Body Parameters

## Response

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Indicates if the request was successful |
| `data` | object | <Expandable title="properties">
    <ResponseField name="history" type="array">
      Array of call history objects |
| `pagination` | object | Pagination information |
</Expandable>
</ResponseField>

<RequestExample>

```bash cURL
curl --request POST \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/getHistory' \
  --header 'x-api-key: your-api-key-here' \
  --header 'Content-Type: application/json' \
  --data '{
    "campaign_id": "550e8400-e29b-41d4-a716-446655440000",
    "limit": 50,
    "offset": 0,
    "status_filter": "answered"
  }'
```

</RequestExample>

<ResponseExample>

```json 200 Success
{
  "success": true,
  "data": {
    "history": [
      {
        "call_id": "call_123",
        "contact_name": "John Doe",
        "phone_number": "+919876543210",
        "status": "answered",
        "duration": 245,
        "call_time": "2024-01-16T10:30:00Z",
        "recording_url": "https://..."
      }
    ],
    "pagination": {
      "total": 750,
      "limit": 50,
      "offset": 0
    }
  }
}
```

</ResponseExample>
