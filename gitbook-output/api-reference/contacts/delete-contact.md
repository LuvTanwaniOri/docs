---
description: Permanently delete a contact from the system.
---

# Delete Contact

**Endpoint:** `GET /deleteContact/:contactId`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
## Path Parameters

<ParamField path="contactId" type="string" required>
  The unique identifier of the contact to delete
</ParamField>

<RequestExample>

```bash cURL
curl --request GET \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/deleteContact/contact_123' \
  --header 'x-api-key: your-api-key-here'
```

</RequestExample>

<ResponseExample>

```json 200 Success
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

```json 404 Not Found
{
  "success": false,
  "message": "Contact not found",
  "error": "NOT_FOUND"
}
```

</ResponseExample>
