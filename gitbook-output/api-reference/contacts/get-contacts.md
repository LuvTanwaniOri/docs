---
description: Retrieve a paginated list of all contacts.
---

# Get All Contacts

**Endpoint:** `GET /fetchContacts`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
## Query Parameters

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `limit` | integer | ❌ No | 50 | Maximum number of contacts to return |
| `offset` | integer | ❌ No | 0 | Number of contacts to skip for pagination |
<RequestExample>

```bash cURL
curl --request GET \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/fetchContacts?limit=50&offset=0' \
  --header 'x-api-key: your-api-key-here'
```

</RequestExample>

<ResponseExample>

```json 200 Success
{
  "success": true,
  "data": {
    "contacts": [
      {
        "id": "contact_123",
        "name": "John Doe",
        "phone_number": "+919876543210",
        "email": "john@example.com"
      }
    ],
    "pagination": {
      "total": 5000,
      "limit": 50,
      "offset": 0
    }
  }
}
```

</ResponseExample>
