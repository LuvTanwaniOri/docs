---
description: Start a paused or scheduled campaign immediately.
---

# Start Campaign

**Endpoint:** `GET /startCampaign/:campaignId`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
## Path Parameters

<ParamField path="campaignId" type="string" required>
  The unique identifier of the campaign to start
</ParamField>

## Response

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Indicates if the campaign was started successfully |
| `data` | object | <Expandable title="properties">
    <ResponseField name="campaign_id" type="string">
      ID of the started campaign |
| `status` | string | New status of the campaign (should be "running") |
| `started_at` | string | ISO 8601 timestamp when campaign was started |
</Expandable>
</ResponseField>

<RequestExample>

```bash cURL
curl --request GET \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/startCampaign/550e8400-e29b-41d4-a716-446655440000' \
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

fetch(`https://seamless-sandbox-dev-cm.oriserve.com/startCampaign/${campaignId}`, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

```python Python
import requests

campaign_id = "550e8400-e29b-41d4-a716-446655440000"
url = f"https://seamless-sandbox-dev-cm.oriserve.com/startCampaign/{campaign_id}"

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
    "status": "running",
    "started_at": "2024-01-16T10:30:00Z"
  },
  "message": "Campaign started successfully"
}
```

```json 400 Bad Request - Campaign Already Running
{
  "success": false,
  "message": "Campaign is already running",
  "error": "CAMPAIGN_ALREADY_RUNNING"
}
```

```json 404 Not Found
{
  "success": false,
  "message": "Campaign not found",
  "error": "NOT_FOUND"
}
```

```json 422 Unprocessable Entity
{
  "success": false,
  "message": "Campaign cannot be started. Missing required configuration.",
  "error": "INVALID_CAMPAIGN_STATE",
  "details": {
    "missing": ["script_id", "contacts"]
  }
}
```

</ResponseExample>

## Notes

- Campaign must have contacts and a script configured before starting
- Starting an already running campaign will return an error
- Campaign will begin calling contacts immediately after starting
