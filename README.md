## 🔐 Auth Flow

SnippetLogger uses **JWT (JSON Web Tokens)** for authenticating users and protecting private API routes.

### User Signup (`/api/auth/signup`)

- User provides `username`, `email`, and `password`.
- Password is hashed using **bcrypt** before storing.
- User data is saved to **MongoDB**.

### User Login (`/api/auth/login`)

- User sends `email` and `password`.
- Backend verifies credentials.
- If valid, a **JWT token** is generated and returned.


### 🔐 Protected Routes

For all private endpoints (such as creating, updating, or deleting snippets), the client must include the JWT token in the request headers:


### 🔑 Token Format


```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
