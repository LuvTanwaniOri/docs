---
description: Retrieves detailed information about a specific campaign by its unique identifier.
---

# Get Campaign by ID

**Endpoint:** `GET /campaign/:id`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
## Path Parameters

<ParamField path="id" type="string" required>
  The unique identifier of the campaign
</ParamField>

## Response

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Indicates if the request was successful |
| `data` | object | <Expandable title="Campaign Details">
    <ResponseField name="id" type="string">
      Unique identifier for the campaign |
| `name` | string | Name of the campaign |
| `campaign_status` | string | Current status of the campaign
      
      **Values:** `completed`, `running`, `paused`, `scheduled`, `draft` |
| `script_id` | string | ID of the script associated with this campaign |
| `contact_ids` | array | Array of contact IDs included in this campaign |
| `total_count` | integer | Total number of contacts |
| `completed_count` | integer | Number of completed calls |
| `failed_count` | integer | Number of failed calls |
| `created_at` | string | ISO 8601 timestamp of campaign creation |
| `updated_at` | string | ISO 8601 timestamp of last update |
</Expandable>
</ResponseField>

<RequestExample>

```bash cURL
curl --request GET \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/campaign/550e8400-e29b-41d4-a716-446655440000' \
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

fetch(`https://seamless-sandbox-dev-cm.oriserve.com/campaign/${campaignId}`, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

```python Python
import requests

campaign_id = "550e8400-e29b-41d4-a716-446655440000"
url = f"https://seamless-sandbox-dev-cm.oriserve.com/campaign/{campaign_id}"

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
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Q4 Sales Campaign",
    "campaign_status": "running",
    "script_id": "660e8400-e29b-41d4-a716-446655440001",
    "contact_ids": ["c1", "c2", "c3"],
    "total_count": 150,
    "completed_count": 45,
    "failed_count": 5,
    "created_at": "2024-01-15T14:30:00Z",
    "updated_at": "2024-01-16T10:15:00Z"
  }
}
```

```json 404 Not Found
{
  "success": false,
  "message": "Campaign not found",
  "error": "NOT_FOUND"
}
```

```json 401 Unauthorized
{
  "success": false,
  "message": "Invalid or missing API key",
  "error": "UNAUTHORIZED"
}
```

</ResponseExample>
