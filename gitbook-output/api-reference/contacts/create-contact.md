---
description: Create a new contact in the system that can be added to campaigns.
---

# Create Contact

**Endpoint:** `POST /createContact`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
## Body Parameters

<RequestExample>

```bash cURL
curl --request POST \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/createContact' \
  --header 'x-api-key: your-api-key-here' \
  --header 'Content-Type: application/json' \
  --data '{
    "phone_number": "+919876543210",
    "name": "John Doe",
    "email": "john@example.com",
    "custom_fields": {
      "company": "Acme Corp",
      "designation": "Manager"
    }
  }'
```

</RequestExample>

<ResponseExample>

```json 200 Success
{
  "success": true,
  "data": {
    "contact_id": "contact_123",
    "phone_number": "+919876543210",
    "name": "John Doe",
    "created_at": "2024-01-16T10:30:00Z"
  }
}
```

```json 400 Bad Request
{
  "success": false,
  "message": "Invalid phone number format",
  "error": "INVALID_PHONE_NUMBER"
}
```

</ResponseExample>
