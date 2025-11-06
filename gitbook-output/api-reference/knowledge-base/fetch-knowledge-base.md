---
description: Retrieve knowledge base documents for AI context
---

# Fetch Knowledge Base

**Endpoint:** `GET /fetchKnowledgeBase`

## 📚 Overview

Get the knowledge base content that AI uses for context during conversations.

---

##  Authentication

---

## Response

### Success Response (200 OK):
```json
{
  "success": true,
  "message": "Knowledge base retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "content": "VoiceGenie is an AI-powered dialer service...",
    "documents": [
      {
        "title": "Product Overview",
        "content": "VoiceGenie offers...",
        "metadata": {
          "category": "product",
          "tags": ["features", "pricing"]
        }
      },
      {
        "title": "Common FAQs",
        "content": "Q: How does pricing work? A: ...",
        "metadata": {
          "category": "faq"
        }
      }
    ],
    "updatedAt": "2024-01-16T10:30:00Z",
    "createdAt": "2024-01-10T08:00:00Z"
  }
}
```

---

## Code Examples

### cURL:
```bash
curl -X GET "https://api.voicegenie.com/fetchKnowledgeBase" \
  -H "x-api-key: YOUR_API_KEY"
```

### JavaScript:
```javascript
const axios = require('axios');

async function fetchKnowledgeBase() {
  const response = await axios.get(
    'https://api.voicegenie.com/fetchKnowledgeBase',
    {
      headers: { 'x-api-key': 'YOUR_API_KEY' }
    }
  );
  
  console.log('Knowledge Base:', response.data.data);
  return response.data.data;
}
```

---

## Related Endpoints

- [Update Knowledge Base](/api-reference/knowledge-base/update-knowledge-base) - Upload new content
