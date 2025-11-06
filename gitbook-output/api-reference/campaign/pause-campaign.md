---
description: Pause a running campaign. Ongoing calls will complete, but no new calls will be initiated.
---

# Pause Campaign

**Endpoint:** `GET /pauseTheCampaign/:campaignId`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
## Path Parameters

<ParamField path="campaignId" type="string" required>
  The unique identifier of the campaign to pause
</ParamField>

## Response

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Indicates if the campaign was paused successfully |
| `data` | object | <Expandable title="properties">
    <ResponseField name="campaign_id" type="string">
      ID of the paused campaign |
| `status` | string | New status of the campaign (should be "paused") |
| `paused_at` | string | ISO 8601 timestamp when campaign was paused |
| `active_calls` | integer | Number of calls still in progress |
</Expandable>
</ResponseField>

<RequestExample>

```bash cURL
curl --request GET \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/pauseTheCampaign/550e8400-e29b-41d4-a716-446655440000' \
  --header 'x-api-key: your-api-key-here'
```

```javascript JavaScript
const campaignId = '550e8400-e29b-41d4-a716-446655440000';

const options = {
  method: 'GET',
  headers: {
    'x-api-key': 'your-api-key-here'
  }
};

fetch(`https://seamless-sandbox-dev-cm.oriserve.com/pauseTheCampaign/${campaignId}`, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

```python Python
import requests

campaign_id = "550e8400-e29b-41d4-a716-446655440000"
url = f"https://seamless-sandbox-dev-cm.oriserve.com/pauseTheCampaign/{campaign_id}"

headers = {
    "x-api-key": "your-api-key-here"
}

response = requests.get(url, headers=headers)
print(response.json())
```

</RequestExample>

<ResponseExample>

```json 200 Success
{
  "success": true,
  "data": {
    "campaign_id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "paused",
    "paused_at": "2024-01-16T14:30:00Z",
    "active_calls": 3
  },
  "message": "Campaign paused successfully. Active calls will complete normally."
}
```

```json 400 Bad Request
{
  "success": false,
  "message": "Campaign is not running",
  "error": "CAMPAIGN_NOT_RUNNING"
}
```

```json 404 Not Found
{
  "success": false,
  "message": "Campaign not found",
  "error": "NOT_FOUND"
}
```

</ResponseExample>

## Notes

- Active/ongoing calls will complete normally
- No new calls will be initiated after pause
- Campaign can be resumed using the Start Campaign endpoint
- Paused campaigns can be edited or deleted
