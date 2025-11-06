---
description: Create a new user account with role-based access control (RBAC)
---

# Create User

**Endpoint:** `POST /createUser`

## 👤 Overview

Create new users for your organization with specific roles and permissions. Supports hierarchical access control for teams, managers, and agents.

---

##  Authentication

<Warning>
  Only **admin** and **manager** roles can create new users.
</Warning>

---

##  Request Body

---

## Response

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Whether user creation was successful |
| `message` | string | Success or error message |
| `data` | object | Created user details
  
  <Expandable title="User Object">
    <ResponseField name="user_id" type="string">
      Unique user identifier |
| `email` | string | User's email |
| `first_name` | string | First name |
| `last_name` | string | Last name |
| `role` | string | Assigned role |
| `status` | string | Account status: `active`, `inactive`, `suspended` |
| `permissions` | object | Effective permissions |
| `created_at` | string | ISO 8601 timestamp |
| `api_key` | string | Generated API key for this user (shown once) |
</Expandable>
</ResponseField>

### Success Response (201 Created):
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@company.com",
    "allowedRoutes": ["/campaign", "/contacts", "/analytics"],
    "accessLevel": "admin",
    "editScriptAppData": true,
    "viewHistoryTranscriptions": true,
    "viewVoiceComponentConfigs": true,
    "showQuotaStatusBox": true,
    "active": true,
    "isDeleted": false,
    "loginAttempts": 0,
    "continuousFailedAttemptsCount": 0,
    "isUserIdBlocked": false,
    "defaultRouteNames": ["/", "/logout", "/auth/login", "/auth/verifyLogin"],
    "createdAt": "2024-01-16T10:30:00Z",
    "updatedAt": "2024-01-16T10:30:00Z"
  }
}
```

<Note>
  **Password is NOT returned** in the response for security reasons. It is encrypted using bcryptjs before storage.
</Note>

### Error Responses:

#### 400 - Validation Error:
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": "Email already exists",
    "password": "Password must be at least 8 characters",
    "role": "Invalid role specified"
  }
}
```

#### 403 - Permission Denied:
```json
{
  "success": false,
  "error": "Permission denied",
  "message": "Only admin and manager roles can create users"
}
```

#### 429 - Rate Limit:
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "message": "Maximum 10 users can be created per hour",
  "retry_after": 3600
}
```

---

## 🎭 Role-Based Permissions

### Default Permissions by Role:

#### **Admin**
- Full system access
- Manage all users, campaigns, settings
- View all analytics and reports
- Configure billing and integrations

#### **Manager**
- Create and manage campaigns
- View team performance
- Manage assigned agents
- Export reports

#### **Agent**
- Handle assigned calls
- Update contact information
- View own performance metrics
- Limited campaign access

#### **Viewer**
- Read-only access
- View campaigns and reports
- No edit/delete permissions

---

## Code Examples

### cURL:
```bash
curl -X POST https://api.voicegenie.com/createUser \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "email": "john.doe@company.com",
    "password": "SecureP@ss123",
    "first_name": "John",
    "last_name": "Doe",
    "role": "agent",
    "phone_number": "+919876543210",
    "department": "Sales",
    "max_concurrent_calls": 3
  }'
```

### JavaScript (Node.js):
```javascript
const axios = require('axios');

async function createUser(userData) {
  try {
    const response = await axios.post(
      'https://api.voicegenie.com/createUser',
      {
        email: 'john.doe@company.com',
        password: 'SecureP@ss123',
        first_name: 'John',
        last_name: 'Doe',
        role: 'agent',
        phone_number: '+919876543210',
        department: 'Sales',
        max_concurrent_calls: 3
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'YOUR_API_KEY'
        }
      }
    );
    
    console.log('User created:', response.data.data);
    console.log('API Key (save this!):', response.data.data.api_key);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

createUser();
```

### Python:
```python
import requests

def create_user():
    url = "https://api.voicegenie.com/createUser"
    
    headers = {
        "Content-Type": "application/json",
        "x-api-key": "YOUR_API_KEY"
    }
    
    payload = {
        "email": "john.doe@company.com",
        "password": "SecureP@ss123",
        "first_name": "John",
        "last_name": "Doe",
        "role": "agent",
        "phone_number": "+919876543210",
        "department": "Sales",
        "max_concurrent_calls": 3
    }
    
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 201:
        data = response.json()
        print("User created:", data['data'])
        print("API Key (save this!):", data['data']['api_key'])
    else:
        print("Error:", response.json())

create_user()
```

---

## 🔒 Security Best Practices

### Password Requirements:
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character
- Not in common password list

### Password Validation:
```javascript
function validatePassword(password) {
  const requirements = [
    { regex: /.{8,}/, message: "At least 8 characters" },
    { regex: /[A-Z]/, message: "At least 1 uppercase letter" },
    { regex: /[a-z]/, message: "At least 1 lowercase letter" },
    { regex: /\d/, message: "At least 1 number" },
    { regex: /[@$!%*?&#]/, message: "At least 1 special character" }
  ];
  
  const errors = requirements
    .filter(req => !req.regex.test(password))
    .map(req => req.message);
  
  return {
    valid: errors.length === 0,
    errors
  };
}
```

---

## 🚨 Common Errors

### Email Already Exists:
```json
{
  "success": false,
  "error": "Email already exists",
  "suggestion": "Use a different email or recover existing account"
}
```

### Weak Password:
```json
{
  "success": false,
  "error": "Password does not meet requirements",
  "details": [
    "Must be at least 8 characters",
    "Must contain uppercase letter",
    "Must contain special character"
  ]
}
```

### Invalid Role:
```json
{
  "success": false,
  "error": "Invalid role",
  "allowed_roles": ["admin", "manager", "agent", "viewer"]
}
```

---

## Rate Limits

| Plan | Users/hour | Max Total Users |
|------|------------|-----------------|
| Free | 5 | 5 |
| Basic | 10 | 50 |
| Pro | 50 | 500 |
| Enterprise | Unlimited | Unlimited |

---

## Related Endpoints

- [Get All Users](/api-reference/users/get-all-users) - List all users
- [Update User](/api-reference/users/update-user) - Modify user details
- [Delete User](/api-reference/users/delete-user) - Remove user account
- [Authentication](/api-reference/authentication/login) - User login

---

## Best Practices

1. **Save API key immediately** - It's shown only once during creation
2. **Use strong passwords** - Enforce password policy
3. **Assign appropriate roles** - Follow principle of least privilege
4. **Set working hours** - Optimize agent scheduling
5. **Use manager hierarchy** - Organize teams effectively
6. **Monitor user activity** - Track login and API usage
7. **Implement MFA** - Add two-factor authentication
8. **Regular audits** - Review user access periodically

---

**Important:** The generated API key is displayed only once! Make sure to save it securely. 🔑
