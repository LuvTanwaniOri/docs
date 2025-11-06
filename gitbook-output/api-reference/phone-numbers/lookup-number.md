---
description: Lookup carrier, format, and validation information for a phone number via Plivo
---

# Lookup Number

**Endpoint:** `GET /lookup/:number`

## Overview

Validates a phone number and retrieves carrier, type, format, and country information using Plivo's phone number lookup API.

---

## Path Parameters

<ParamField path="number" type="string" required>
  Phone number to lookup (E.164 format recommended, e.g., `+919876543210` or `919876543210`)
</ParamField>

---

## Response (Success - 200)

```json
{
  "status": "success",
  "data": {
    "api_id": "d5b46820-8e4e-11ef-8ccf-0242ac110004",
    "phone_number": "+919876543210",
    "country": {
      "name": "India",
      "iso2": "IN"
    },
    "format": {
      "e164": "+919876543210",
      "international": "+91 98765 43210",
      "national": "098765 43210",
      "rfc3966": "tel:+91-98765-43210"
    },
    "carrier": {
      "mobile_country_code": "404",
      "mobile_network_code": "11",
      "name": "Vodafone Idea",
      "type": "mobile",
      "ported": "unknown"
    },
    "resource_uri": "/v1/Number/+919876543210"
  },
  "message": "Phone number lookup successful"
}
```

---

## Response (Failure - 400)

```json
{
  "status": "failed",
  "data": {
    "api_id": "d5b46820-8e4e-11ef-8ccf-0242ac110004",
    "error": "invalid phone number"
  },
  "message": "Failed to lookup phone number"
}
```

---

## Response (Server Error - 500)

```json
{
  "status": "failed",
  "data": {},
  "message": "Internal server error"
}
```

---

## Code Examples

<CodeGroup>

```javascript JavaScript
// Lookup a phone number
const number = '919876543210';
const response = await fetch(`https://api.voicegenie.ai/lookup/${number}`);

const data = await response.json();
console.log(`Carrier: ${data.data.carrier.name}`);
console.log(`Type: ${data.data.carrier.type}`);
console.log(`Country: ${data.data.country.name} (${data.data.country.iso2})`);
```

```python Python
import requests

number = '+919876543210'
response = requests.get(f'https://api.voicegenie.ai/lookup/{number}')

data = response.json()
print(f"Carrier: {data['data']['carrier']['name']}")
print(f"Type: {data['data']['carrier']['type']}")
print(f"Country: {data['data']['country']['name']}")
```

```bash cURL
curl -X GET https://api.voicegenie.ai/lookup/919876543210
```

</CodeGroup>

---

## Field Descriptions

### Data Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `api_id` | string | Plivo API request identifier |
| `phone_number` | string | Phone number in E.164 format |
| `country.name` | string | Country name |
| `country.iso2` | string | Country ISO-2 code |
| `format.e164` | string | E.164 formatted number |
| `format.international` | string | International format with spacing |
| `format.national` | string | National format |
| `format.rfc3966` | string | RFC 3966 tel URI format |
| `carrier.mobile_country_code` | string | Mobile Country Code (MCC) |
| `carrier.mobile_network_code` | string | Mobile Network Code (MNC) |
| `carrier.name` | string | Carrier/operator name |
| `carrier.type` | string | Phone type (e.g., `mobile`, `landline`, `voip`) |
| `carrier.ported` | string | Porting status (e.g., `unknown`, `yes`, `no`) |
| `resource_uri` | string | Plivo resource URI for this lookup |

---

## Notes

- **Powered by Plivo:** This endpoint uses Plivo's phone number lookup API
- **E.164 Format:** Accepts numbers with or without `+` prefix
- **Carrier Detection:** Returns carrier name, type (mobile/landline), and network codes
- **Format Options:** Returns multiple format variations (E.164, international, national, RFC 3966)
- **Ported Numbers:** May indicate if a number has been ported (though often returns `unknown`)
- **Use Cases:** 
  - Validate phone numbers before purchasing
  - Identify carrier for routing decisions
  - Format numbers consistently across your application
- **Rate Limits:** Subject to Plivo's API rate limits and pricing
- **Error Handling:** Returns 400 for invalid numbers, 500 for server/API errors
