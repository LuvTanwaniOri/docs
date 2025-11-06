---
description: Create a new AI conversation script for voice campaigns with custom prompts, variables, and flow logic.
---

# Create Script

**Endpoint:** `POST /createScript`

## Headers

| Header | Type | Required | Description |
| --- | --- | --- | --- |
| `x-api-key` | string | ✅ Yes | Your VoiceGenie API key for authentication |
| `Content-Type` | string | ❌ No | Must be `application/json` |
## Body Parameters

    
    
    
    
    
    
    
    
  </Expandable>
</ParamField>

    
    
    
    
  </Expandable>
</ParamField>

    
    
    
    
  </Expandable>
</ParamField>

    
    
    
    
  </Expandable>
</ParamField>

## Response

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Indicates if script was created successfully |
| `data` | object | <Expandable title="properties">
    <ResponseField name="script_id" type="string">
      Unique identifier for the created script |
| `script_name` | string | Name of the script |
| `created_at` | string | ISO 8601 timestamp of creation |
| `version` | string | Script version number |
</Expandable>
</ResponseField>

<RequestExample>

```bash cURL
curl --request POST \
  --url 'https://seamless-sandbox-dev-cm.oriserve.com/createScript' \
  --header 'x-api-key: your-api-key-here' \
  --header 'Content-Type: application/json' \
  --data '{
    "script_name": "Sales Outreach Script",
    "script_description": "Cold calling script for product demo booking",
    "script_content": {
      "initial_prompt": "Hi {name}, this is Alex from {company}. How are you today?",
      "system_prompt": "You are a friendly sales representative. Be concise and professional.",
      "variables": {
        "name": "Contact Name",
        "company": "Company Name",
        "product": "Product Name"
      },
      "conversation_flow": [
        {
          "step": 1,
          "prompt": "I am calling to discuss {product}",
          "expected_responses": ["interested", "not_interested", "more_info"]
        }
      ],
      "end_call_conditions": ["booking_confirmed", "not_interested", "callback_requested"]
    },
    "language": "en-US",
    "accent": "american",
    "voice_settings": {
      "speed": 1.0,
      "pitch": 0,
      "voice_id": "alex_male_professional"
    },
    "ai_settings": {
      "model": "gpt-4",
      "temperature": 0.7,
      "max_tokens": 150
    },
    "call_settings": {
      "max_duration": 600,
      "silence_timeout": 10,
      "recording_enabled": true
    }
  }'
```

```javascript JavaScript
const scriptData = {
  script_name: "Sales Outreach Script",
  script_description: "Cold calling script for product demo booking",
  script_content: {
    initial_prompt: "Hi {name}, this is Alex from {company}. How are you today?",
    system_prompt: "You are a friendly sales representative.",
    variables: {
      name: "Contact Name",
      company: "Company Name"
    }
  },
  language: "en-US",
  accent: "american",
  voice_settings: {
    speed: 1.0,
    pitch: 0
  },
  ai_settings: {
    model: "gpt-4",
    temperature: 0.7
  }
};

fetch('https://seamless-sandbox-dev-cm.oriserve.com/createScript', {
  method: 'POST',
  headers: {
    'x-api-key': 'your-api-key-here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(scriptData)
})
.then(response => response.json())
.then(data => console.log(data));
```

```python Python
import requests

url = "https://seamless-sandbox-dev-cm.oriserve.com/createScript"

headers = {
    "x-api-key": "your-api-key-here",
    "Content-Type": "application/json"
}

payload = {
    "script_name": "Sales Outreach Script",
    "script_description": "Cold calling script for product demo booking",
    "script_content": {
        "initial_prompt": "Hi {name}, this is Alex from {company}.",
        "system_prompt": "You are a friendly sales representative.",
        "variables": {
            "name": "Contact Name",
            "company": "Company Name"
        }
    },
    "language": "en-US",
    "accent": "american"
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
    "created_at": "2024-01-16T10:30:00Z",
    "version": "1.0.0"
  },
  "message": "Script created successfully"
}
```

```json 400 Bad Request
{
  "success": false,
  "message": "Invalid script configuration",
  "error": "BAD_REQUEST",
  "details": {
    "field": "script_content.initial_prompt",
    "issue": "Initial prompt cannot be empty"
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

```json 422 Validation Error
{
  "success": false,
  "message": "Script validation failed",
  "error": "VALIDATION_ERROR",
  "details": {
    "language": "Unsupported language code",
    "accent": "Accent not available for selected language"
  }
}
```

</ResponseExample>

## Script Variables

You can use these dynamic variables in your script:

| Variable | Description | Example |
|----------|-------------|---------|
| `{name}` | Contact's name | John Doe |
| `{company}` | Company name | Acme Corp |
| `{email}` | Contact's email | john@acme.com |
| `{phone}` | Contact's phone | +1234567890 |
| `{custom_field_name}` | Any custom field | Custom value |

## AI Models Available

| Model | Best For | Response Time | Cost |
|-------|----------|---------------|------|
| `gpt-3.5-turbo` | Fast responses | ~500ms | Low |
| `gpt-4` | Complex conversations | ~1-2s | Medium |
| `gpt-4-turbo` | Balance of speed & quality | ~800ms | Medium-High |

## Voice Accents Available

- **English:** `american`, `british`, `australian`, `indian`, `neutral`
- **Spanish:** `spain`, `mexican`, `argentinian`
- **French:** `france`, `canadian`
- **German:** `standard`, `austrian`
- **Hindi:** `standard`, `delhi`, `mumbai`

## Best Practices

1. **Keep prompts concise** - Aim for 15-20 words per prompt
2. **Use natural language** - Write as you would speak
3. **Define clear end conditions** - Specify when to end the call
4. **Test with variables** - Ensure all variables are properly mapped
5. **Set appropriate timeouts** - Balance between responsiveness and patience
6. **Monitor AI temperature** - Lower (0.3-0.5) for consistent responses, higher (0.7-0.9) for creative

## Performance Notes

- **Script Creation**: Typically completes in < 1 second
- **Validation**: Complex scripts may take 2-3 seconds to validate
- **AI Model Loading**: First call with new model may add 5-10 seconds latency
- **Rate Limiting**: 50 script creations per hour

## Use Cases

1. **Sales Outreach** - Cold calling scripts for lead generation
2. **Customer Support** - Automated support call scripts
3. **Appointment Booking** - Schedule confirmation scripts
4. **Survey Calls** - Automated survey scripts
5. **Follow-up Calls** - Post-purchase follow-up scripts
6. **Debt Collection** - Professional collection reminder scripts

## Security Considerations

- Scripts are encrypted at rest
- Sensitive data in variables is masked in logs
- API key required for all operations
- Scripts can be versioned and rolled back

## Related Endpoints

- [Fetch Script](/api-reference/scripts/fetch-script) - Get script details
- [Update Script](/api-reference/scripts/update-script) - Modify existing script
- [Get Accents & Languages](/api-reference/scripts/get-accents-languages) - List available options
