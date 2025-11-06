---
description: Retrieve aggregated call statistics grouped by day for analytics and reporting.
---

# Get Day-wise Call Counts

**Endpoint:** `GET /getDayWiseCallCounts`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
## Query Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `start_date` | string | ✅ Yes | - | Start date for analytics (ISO 8601 format) |
| `end_date` | string | ✅ Yes | - | End date for analytics (ISO 8601 format) |
| `campaign_id` | string | ❌ No | - | Optional: Filter by specific campaign |
<RequestExample>

```bash cURL
curl --request GET \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/getDayWiseCallCounts?start_date=2024-01-01&end_date=2024-01-31' \
  --header 'x-api-key: your-api-key-here'
```

</RequestExample>

<ResponseExample>

```json 200 Success
{
  "success": true,
  "data": [
    {
      "date": "2024-01-16",
      "total_calls": 1250,
      "answered": 1000,
      "busy": 150,
      "no_answer": 100
    },
    {
      "date": "2024-01-17",
      "total_calls": 1500,
      "answered": 1200,
      "busy": 180,
      "no_answer": 120
    }
  ]
}
```

</ResponseExample>
