---
description: Retrieves a paginated list of campaigns for the current user with optional call count information.
---

# Get All Campaigns

**Endpoint:** `GET /fetchCampaignData`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
## Query Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `call_count` | boolean | ❌ No | true | Whether to include call count for each campaign (default: true) |
| `limit` | integer | ❌ No | 10 | Maximum number of campaigns to return (default: 10)
  
  Range: 1 ≤ limit ≤ 1000 |
| `offset` | integer | ❌ No | 0 | Number of campaigns to skip for pagination (default: 0)
  
  Range: offset ≥ 0 |
## Response

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Indicates if the request was successful |
| `data` | object | <Expandable title="properties">
    <ResponseField name="campaigns" type="array">
      Array of campaign objects
      
      <Expandable title="Campaign Object">
        <ResponseField name="id" type="string">
          Unique identifier for the campaign |
| `name` | string | Name of the campaign |
| `campaign_status` | string | Current status of the campaign
          
          **Values:** `completed`, `running`, `paused`, `scheduled`, `draft` |
| `created_at` | string | ISO 8601 timestamp of campaign creation |
| `updated_at` | string | ISO 8601 timestamp of last update |
| `campaign_start_time` | string | Scheduled start time for the campaign |
| `campaign_end_time` | string | Scheduled end time for the campaign |
| `total_count` | integer | Total number of contacts in the campaign |
| `registered_count` | integer | Number of contacts registered/loaded |
| `completed_count` | integer | Number of completed calls |
| `pagination` | object | <Expandable title="properties">
        <ResponseField name="total" type="integer">
          Total number of campaigns available |
| `limit` | integer | Number of items per page |
| `offset` | integer | Current offset for pagination |
</Expandable>
    </ResponseField>
    
    
        
        
        
        
      </Expandable>
    </ResponseField>
  </Expandable>
</ResponseField>

<RequestExample>

```bash cURL
curl --request GET \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/fetchCampaignData?limit=10&offset=0&call_count=true' \
  --header 'x-api-key: your-api-key-here'
```

```javascript JavaScript
const options = {
  method: 'GET',
  headers: {
    'x-api-key': 'your-api-key-here'
  }
};

fetch('https://seamless-sandbox-dev-cm.oriserve.com/fetchCampaignData?limit=10&offset=0', options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

```python Python
import requests

url = "https://seamless-sandbox-dev-cm.oriserve.com/fetchCampaignData"
headers = {
    "x-api-key": "your-api-key-here"
}
params = {
    "limit": 10,
    "offset": 0,
    "call_count": True
}

response = requests.get(url, headers=headers, params=params)
print(response.json())
```

```php PHP
<?php
$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://seamless-sandbox-dev-cm.oriserve.com/fetchCampaignData?limit=10&offset=0",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    "x-api-key: your-api-key-here"
  ],
]);

$response = curl_exec($curl);
curl_close($curl);

echo $response;
?>
```

</RequestExample>

<ResponseExample>

```json 200 Success
{
  "success": true,
  "data": {
    "campaigns": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Q4 Sales Campaign",
        "campaign_status": "completed",
        "created_at": "2024-01-15T14:30:00Z",
        "updated_at": "2024-01-15T16:45:00Z",
        "campaign_start_time": "2024-01-16T09:00:00Z",
        "campaign_end_time": "2024-01-17:00:00Z",
        "total_count": 150,
        "registered_count": 120,
        "completed_count": 85
      }
    ],
    "pagination": {
      "total": 25,
      "limit": 10,
      "offset": 0
    }
  }
}
```

```json 401 Unauthorized
{
  "success": false,
  "message": "Invalid or missing API key",
  "error": "UNAUTHORIZED"
}
```

```json 429 Rate Limit Exceeded
{
  "success": false,
  "message": "Too many requests. Please try again later.",
  "error": "RATE_LIMIT_EXCEEDED"
}
```

```json 500 Internal Server Error
{
  "success": false,
  "message": "An error occurred while fetching campaigns",
  "error": "INTERNAL_SERVER_ERROR"
}
```

</ResponseExample>

## Notes

- **Pagination**: Use `limit` and `offset` parameters to paginate through large result sets
- **Performance**: Setting `call_count=false` can improve response time for large datasets
- **Rate Limiting**: This endpoint has a rate limit of 100 requests per minute
- **Heavy Load**: For campaigns with 10,000+ contacts, response time may increase by 2-3 seconds
