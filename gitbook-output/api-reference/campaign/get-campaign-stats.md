---
description: Retrieve detailed statistics and performance metrics for a specific campaign.
---

# Get Campaign Stats

**Endpoint:** `GET /getCampaignStats/:campaignId`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
## Path Parameters

<ParamField path="campaignId" type="string" required>
  The unique identifier of the campaign
</ParamField>

## Response

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Indicates if the request was successful |
| `data` | object | <Expandable title="Campaign Statistics">
    <ResponseField name="campaign_id" type="string">
      Unique identifier of the campaign |
| `campaign_name` | string | Name of the campaign |
| `total_contacts` | integer | Total number of contacts in the campaign |
| `calls_completed` | integer | Number of successfully completed calls |
| `calls_failed` | integer | Number of failed calls |
| `calls_in_progress` | integer | Number of calls currently in progress |
| `calls_pending` | integer | Number of calls yet to be initiated |
| `success_rate` | number | Percentage of successful calls (0-100) |
| `average_call_duration` | integer | Average call duration in seconds |
| `total_call_duration` | integer | Total duration of all calls in seconds |
| `call_status_breakdown` | object | <Expandable title="Status Breakdown">
        <ResponseField name="answered" type="integer">
          Calls answered by recipient |
| `busy` | integer | Recipient was busy |
| `no_answer` | integer | No answer from recipient |
| `failed` | integer | Failed due to technical issues |
| `voicemail` | integer | Reached voicemail |
| `started_at` | string | ISO 8601 timestamp when campaign started |
| `completed_at` | string | ISO 8601 timestamp when campaign completed (null if still running) |
</Expandable>
    </ResponseField>
    
    
    
    
  </Expandable>
</ResponseField>

<RequestExample>

```bash cURL
curl --request GET \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/getCampaignStats/550e8400-e29b-41d4-a716-446655440000' \
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

fetch(`https://seamless-sandbox-dev-cm.oriserve.com/getCampaignStats/${campaignId}`, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

```python Python
import requests

campaign_id = "550e8400-e29b-41d4-a716-446655440000"
url = f"https://seamless-sandbox-dev-cm.oriserve.com/getCampaignStats/{campaign_id}"

headers = {
    "x-api-key": "your-api-key-here"
}

response = requests.get(url, headers=headers)
stats = response.json()
print(f"Success Rate: {stats['data']['success_rate']}%")
```

</RequestExample>

<ResponseExample>

```json 200 Success
{
  "success": true,
  "data": {
    "campaign_id": "550e8400-e29b-41d4-a716-446655440000",
    "campaign_name": "Q4 Sales Campaign",
    "total_contacts": 1000,
    "calls_completed": 750,
    "calls_failed": 150,
    "calls_in_progress": 50,
    "calls_pending": 50,
    "success_rate": 83.33,
    "average_call_duration": 245,
    "total_call_duration": 183750,
    "call_status_breakdown": {
      "answered": 750,
      "busy": 80,
      "no_answer": 50,
      "failed": 20,
      "voicemail": 100
    },
    "started_at": "2024-01-16T09:00:00Z",
    "completed_at": null
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

```json 500 Internal Server Error
{
  "success": false,
  "message": "Failed to retrieve campaign statistics",
  "error": "INTERNAL_SERVER_ERROR"
}
```

</ResponseExample>

## Performance Notes

- **Response Time**: Typically < 500ms for campaigns with < 10,000 contacts
- **Heavy Load**: Campaigns with 50,000+ contacts may take 2-3 seconds
- **Real-time Data**: Statistics are updated in real-time as calls complete
- **Caching**: Stats are cached for 30 seconds to improve performance
- **Rate Limiting**: 200 requests per minute per campaign

## Use Cases

- **Dashboard Display**: Show real-time campaign performance
- **Monitoring**: Track campaign progress programmatically
- **Reporting**: Generate custom reports and analytics
- **Alerting**: Set up alerts based on success rates or completion status
