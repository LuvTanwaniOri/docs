---
description: Invalidate the current authentication token and end the user session.
---

# Logout

**Endpoint:** `GET /logout`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key/token to invalidate |
## Response

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Indicates if logout was successful |
| `message` | string | Logout confirmation message |
<RequestExample>

```bash cURL
curl --request GET \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/logout' \
  --header 'x-api-key: your-api-key-here'
```

```javascript JavaScript
const options = {
  method: 'GET',
  headers: {
    'x-api-key': 'your-api-key-here'
  }
};

fetch('https://seamless-sandbox-dev-cm.oriserve.com/logout', options)
  .then(response => response.json())
  .then(data => {
    // Clear stored token
    localStorage.removeItem('apiKey');
    console.log(data);
  })
  .catch(err => console.error(err));
```

```python Python
import requests

url = "https://seamless-sandbox-dev-cm.oriserve.com/logout"

headers = {
    "x-api-key": "your-api-key-here"
}

response = requests.get(url, headers=headers)
print(response.json())
```

</RequestExample>

<ResponseExample>

```json 200 Success
{
  "success": true,
  "message": "Logout successful"
}
```

```json 401 Unauthorized
{
  "success": false,
  "message": "Invalid or missing token",
  "error": "UNAUTHORIZED"
}
```

</ResponseExample>

## Notes

- After logout, the token cannot be reused
- Client should clear stored tokens after successful logout
- No need to logout expired tokens
