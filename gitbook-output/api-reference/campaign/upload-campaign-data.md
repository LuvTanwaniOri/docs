---
description: Upload contact data for a new or existing campaign. Supports bulk upload of contacts with custom fields.
---

# Upload Campaign Data

**Endpoint:** `POST /uploadCampaignData`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
| `Content-Type` | string | ❌ No | Must be `application/json` or `multipart/form-data` for file uploads |
## Body Parameters

    
    
    
    
    
    
  </Expandable>
</ParamField>

## Response

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Indicates if the upload was successful |
| `data` | object | <Expandable title="properties">
    <ResponseField name="campaign_id" type="string">
      ID of the campaign (created or updated) |
| `uploaded_count` | integer | Number of contacts successfully uploaded |
| `failed_count` | integer | Number of contacts that failed to upload |
| `errors` | array | Array of error objects for failed uploads |
</Expandable>
</ResponseField>

<RequestExample>

```bash cURL
curl --request POST \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/uploadCampaignData' \
  --header 'x-api-key: your-api-key-here' \
  --header 'Content-Type: application/json' \
  --data '{
    "campaign_name": "Summer Sale Campaign",
    "script_id": "script_123",
    "schedule_time": "2024-06-01T09:00:00Z",
    "contacts": [
      {
        "phone_number": "+919876543210",
        "name": "John Doe",
        "email": "john@example.com",
        "custom_fields": {
          "product_interest": "Premium Plan",
          "lead_source": "Website"
        }
      },
      {
        "phone_number": "+919876543211",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "custom_fields": {
          "product_interest": "Basic Plan",
          "lead_source": "Referral"
        }
      }
    ]
  }'
```

```javascript JavaScript
const campaignData = {
  campaign_name: "Summer Sale Campaign",
  script_id: "script_123",
  schedule_time: "2024-06-01T09:00:00Z",
  contacts: [
    {
      phone_number: "+919876543210",
      name: "John Doe",
      email: "john@example.com",
      custom_fields: {
        product_interest: "Premium Plan",
        lead_source: "Website"
      }
    }
  ]
};

const options = {
  method: 'POST',
  headers: {
    'x-api-key': 'your-api-key-here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(campaignData)
};

fetch('https://seamless-sandbox-dev-cm.oriserve.com/uploadCampaignData', options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

```python Python
import requests
import json

url = "https://seamless-sandbox-dev-cm.oriserve.com/uploadCampaignData"

headers = {
    "x-api-key": "your-api-key-here",
    "Content-Type": "application/json"
}

payload = {
    "campaign_name": "Summer Sale Campaign",
    "script_id": "script_123",
    "schedule_time": "2024-06-01T09:00:00Z",
    "contacts": [
        {
            "phone_number": "+919876543210",
            "name": "John Doe",
            "email": "john@example.com",
            "custom_fields": {
                "product_interest": "Premium Plan",
                "lead_source": "Website"
            }
        }
    ]
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
    "campaign_id": "550e8400-e29b-41d4-a716-446655440000",
    "uploaded_count": 150,
    "failed_count": 0,
    "errors": []
  },
  "message": "Campaign data uploaded successfully"
}
```

```json 400 Bad Request
{
  "success": false,
  "message": "Invalid request data",
  "error": "BAD_REQUEST",
  "details": {
    "field": "contacts",
    "issue": "Phone number format invalid"
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

```json 413 Payload Too Large
{
  "success": false,
  "message": "Request payload exceeds 500MB limit",
  "error": "PAYLOAD_TOO_LARGE"
}
```

```json 500 Internal Server Error
{
  "success": false,
  "message": "Failed to process campaign data",
  "error": "INTERNAL_SERVER_ERROR"
}
```

</ResponseExample>

## Notes

- **Batch Size**: For optimal performance, upload contacts in batches of 1,000 or fewer
- **File Upload**: When uploading CSV/Excel files, use `multipart/form-data` content type
- **Custom Fields**: You can include unlimited custom fields per contact
- **Heavy Load**: Uploading 10,000+ contacts may take 30-60 seconds
- **Rate Limiting**: This endpoint has a rate limit of 50 requests per minute
- **Duplicate Detection**: Duplicate phone numbers within the same campaign will be automatically skipped
