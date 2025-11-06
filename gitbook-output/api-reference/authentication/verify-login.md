---
description: Verify if the current authentication token is valid and retrieve user information.
---

# Verify Login

**Endpoint:** `POST /auth/verifyLogin`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key/token |
| `Content-Type` | string | ❌ No | Must be `application/json` |
## Response

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Indicates if the token is valid |
| `data` | object | <Expandable title="properties">
    <ResponseField name="valid" type="boolean">
      Whether the token is currently valid |
| `user` | object | <Expandable title="User Object">
        <ResponseField name="id" type="string">
          Unique user identifier |
| `email` | string | User's email address |
| `name` | string | User's full name |
| `role` | string | User's role in the system |
| `expires_at` | string | ISO 8601 timestamp when the token expires |
</Expandable>
    </ResponseField>
    
    
  </Expandable>
</ResponseField>

<RequestExample>

```bash cURL
curl --request POST \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/auth/verifyLogin' \
  --header 'x-api-key: your-api-key-here' \
  --header 'Content-Type: application/json'
```

```javascript JavaScript
const options = {
  method: 'POST',
  headers: {
    'x-api-key': 'your-api-key-here',
    'Content-Type': 'application/json'
  }
};

fetch('https://seamless-sandbox-dev-cm.oriserve.com/auth/verifyLogin', options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

```python Python
import requests

url = "https://seamless-sandbox-dev-cm.oriserve.com/auth/verifyLogin"

headers = {
    "x-api-key": "your-api-key-here",
    "Content-Type": "application/json"
}

response = requests.post(url, headers=headers)
print(response.json())
```

</RequestExample>

<ResponseExample>

```json 200 Success
{
  "success": true,
  "data": {
    "valid": true,
    "user": {
      "id": "user_123456",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "manager"
    },
    "expires_at": "2024-12-31T23:59:59Z"
  }
}
```

```json 401 Unauthorized
{
  "success": false,
  "message": "Invalid or expired token",
  "error": "UNAUTHORIZED"
}
```

</ResponseExample>
