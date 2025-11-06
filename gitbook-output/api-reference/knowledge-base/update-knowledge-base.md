---
description: Upload knowledge base documents for AI training (supports file upload)
---

# Update Knowledge Base

**Endpoint:** `POST /updateKnowledgeBase`

## Overview

Update or upload knowledge base content via file upload. Supports PDF, TXT, DOCX, JSON formats.

---

##  Authentication

---

##  Request (Multipart Form Data)

---

## Response

### Success Response (200 OK):
```json
{
  "success": true,
  "message": "Knowledge base updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "filename": "knowledge_base_v2.pdf",
    "size": 2048576,
    "content": "Extracted text content...",
    "metadata": {
      "category": "product_docs",
      "version": "v2.0",
      "tags": ["features", "pricing", "faq"]
    },
    "updatedAt": "2024-01-16T10:30:00Z"
  }
}
```

---

## Code Examples

### cURL:
```bash
curl -X POST "https://api.voicegenie.com/updateKnowledgeBase" \
  -H "x-api-key: YOUR_API_KEY" \
  -F "knowledge_base=@/path/to/knowledge_base.pdf" \
  -F 'metadata={"category":"product_docs"}'
```

### JavaScript (with FormData):
```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function updateKnowledgeBase(filePath) {
  const form = new FormData();
  form.append('knowledge_base', fs.createReadStream(filePath));
  form.append('metadata', JSON.stringify({
    category: 'product_docs',
    tags: ['features', 'pricing']
  }));
  
  const response = await axios.post(
    'https://api.voicegenie.com/updateKnowledgeBase',
    form,
    {
      headers: {
        ...form.getHeaders(),
        'x-api-key': 'YOUR_API_KEY'
      }
    }
  );
  
  console.log('Uploaded:', response.data.data);
}

updateKnowledgeBase('./knowledge_base.pdf');
```

### Python:
```python
import requests

def update_knowledge_base(file_path):
    url = "https://api.voicegenie.com/updateKnowledgeBase"
    
    headers = {
        "x-api-key": "YOUR_API_KEY"
    }
    
    files = {
        "knowledge_base": open(file_path, "rb")
    }
    
    data = {
        "metadata": '{"category":"product_docs"}'
    }
    
    response = requests.post(url, headers=headers, files=files, data=data)
    
    if response.status_code == 200:
        print("✅ Knowledge base updated!")
        print(response.json()['data'])
    else:
        print("❌ Error:", response.json())

update_knowledge_base("./knowledge_base.pdf")
```

---

## 🔧 Multer Configuration

The endpoint uses **Multer** for file upload:
```javascript
const multer = require('multer');
const upload = multer();

router.post("/updateKnowledgeBase", 
  authMiddleware, 
  upload.single("knowledge_base"), 
  updateKnowledgeBase
);
```

**Field Name:** `knowledge_base` (must match in form-data)

---

## Related Endpoints

- [Fetch Knowledge Base](/api-reference/knowledge-base/fetch-knowledge-base) - Get current content
