---
description: Retrieve comprehensive analytics and performance metrics across all campaigns.
---

# Get Campaign Analytics

**Endpoint:** `GET /getCampaignAnalyticsNumber`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
## Query Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `date_range` | string | ❌ No | last_30_days | Predefined date range: `today`, `yesterday`, `last_7_days`, `last_30_days`, `custom` |
| `start_date` | string | ❌ No | - | Required if date_range is `custom` |
| `end_date` | string | ❌ No | - | Required if date_range is `custom` |
<RequestExample>

```bash cURL
curl --request GET \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/getCampaignAnalyticsNumber?date_range=last_30_days' \
  --header 'x-api-key: your-api-key-here'
```

</RequestExample>

<ResponseExample>

```json 200 Success
{
  "success": true,
  "data": {
    "total_campaigns": 45,
    "active_campaigns": 12,
    "total_calls": 125000,
    "success_rate": 78.5,
    "average_call_duration": 234,
    "top_performing_campaigns": []
  }
}
```

</ResponseExample>
