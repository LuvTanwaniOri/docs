---
description: Retrieve detailed information about a specific contact.
---

# Get Contact

**Endpoint:** `GET /fetchContact`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
## Query Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `contact_id` | string | ✅ Yes | - | The unique identifier of the contact |
<RequestExample>

```bash cURL
curl --request GET \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/fetchContact?contact_id=contact_123' \
  --header 'x-api-key: your-api-key-here'
```

</RequestExample>

<ResponseExample>

```json 200 Success
{
  "success": true,
  "data": {
    "id": "contact_123",
    "name": "John Doe",
    "phone_number": "+919876543210",
    "email": "john@example.com",
    "custom_fields": {
      "company": "Acme Corp"
    },
    "created_at": "2024-01-15T10:00:00Z"
  }
}
```

</ResponseExample>
