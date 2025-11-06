---
description: Retrieve details of an existing AI conversation script including all configuration, variables, and conversation flow.
---

# Fetch Script

**Endpoint:** `POST /fetchScript`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
## Body Parameters

## Response

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Indicates if the request was successful |
| `data` | object | <Expandable title="Script Details">
    <ResponseField name="script_id" type="string">
      Unique identifier |
| `script_name` | string | Script name |
| `script_content` | object | Complete script configuration |
| `language` | string | Script language |
| `accent` | string | Voice accent |
| `version` | string | Current version |
| `created_at` | string | Creation timestamp |
| `updated_at` | string | Last update timestamp |
| `usage_stats` | object | <Expandable title="Usage Statistics (if requested)">
        <ResponseField name="total_calls" type="integer">
          Total calls using this script |
| `success_rate` | number | Conversion success rate percentage |
| `avg_duration` | integer | Average call duration in seconds |
</Expandable>
    </ResponseField>
  </Expandable>
</ResponseField>

<RequestExample>

```bash cURL
curl --request POST \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/fetchScript' \
  --header 'x-api-key: your-api-key-here' \
  --header 'Content-Type: application/json' \
  --data '{
    "script_id": "script_abc123xyz",
    "include_history": false,
    "include_analytics": true
  }'
```

```javascript JavaScript
const options = {
  method: 'POST',
  headers: {
    'x-api-key': 'your-api-key-here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    script_id: 'script_abc123xyz',
    include_analytics: true
  })
};

fetch('https://seamless-sandbox-dev-cm.oriserve.com/fetchScript', options)
  .then(response => response.json())
  .then(data => console.log(data));
```

```python Python
import requests

url = "https://seamless-sandbox-dev-cm.oriserve.com/fetchScript"

headers = {
    "x-api-key": "your-api-key-here",
    "Content-Type": "application/json"
}

payload = {
    "script_id": "script_abc123xyz",
    "include_analytics": True
}

response = requests.post(url, headers=headers, json=payload)
print(response.json())
```

</RequestExample>

<ResponseExample>

```json 200 Success
{
  "success": true,
  "data": {
    "script_id": "script_abc123xyz",
    "script_name": "Sales Outreach Script",
    "script_content": {
      "initial_prompt": "Hi {name}, this is Alex from {company}.",
      "system_prompt": "You are a friendly sales representative.",
      "variables": {
        "name": "Contact Name",
        "company": "Company Name"
      }
    },
    "language": "en-US",
    "accent": "american",
    "version": "1.2.0",
    "created_at": "2024-01-16T10:30:00Z",
    "updated_at": "2024-01-18T14:20:00Z",
    "usage_stats": {
      "total_calls": 1250,
      "success_rate": 34.5,
      "avg_duration": 185
    }
  }
}
```

```json 404 Not Found
{
  "success": false,
  "message": "Script not found",
  "error": "NOT_FOUND"
}
```

</ResponseExample>

## Notes

- Scripts are cached for 5 minutes for faster retrieval
- Analytics data updated every hour
- Rate Limiting: 100 requests per minute
