---
description: Download a comprehensive Excel/CSV report of campaign statistics and call details.
---

# Download Campaign Stats

**Endpoint:** `GET /downloadCampaignStats`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
## Query Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | ✅ Yes | - | The unique identifier of the campaign |
| `format` | string | ❌ No | xlsx | Export format: `xlsx` or `csv` |
## Response

The endpoint returns a downloadable file (Excel or CSV) containing:
- Contact details
- Call status for each contact
- Call duration
- Timestamps
- Custom field data
- Call recordings URLs

<RequestExample>

```bash cURL
curl --request GET \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/downloadCampaignStats?campaign_id=550e8400-e29b-41d4-a716-446655440000&format=xlsx' \
  --header 'x-api-key: your-api-key-here' \
  --output campaign_report.xlsx
```

```javascript JavaScript
const campaignId = '550e8400-e29b-41d4-a716-446655440000';
const format = 'xlsx';

fetch(`https://seamless-sandbox-dev-cm.oriserve.com/downloadCampaignStats?campaign_id=${campaignId}&format=${format}`, {
  headers: {
    'x-api-key': 'your-api-key-here'
  }
})
.then(response => response.blob())
.then(blob => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'campaign_report.xlsx';
  a.click();
});
```

</RequestExample>

## Notes

- **File Size**: Large campaigns (50,000+ contacts) may generate files of 10+ MB
- **Processing Time**: Report generation may take 30-60 seconds for large campaigns
- **Rate Limiting**: 10 downloads per hour per campaign
