## RBAC-backend

### Overview
This is the backend for the RBAC application, built using Node.js and Express. It handles user authentication, role management, and permissions.

### Features
- User registration and login
- Role-based access control
- Permission management
- JWT authentication

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Atharvajoshiii/RBAC-BACKEND
    ```
2. Navigate to the project directory:
    ```bash
    cd RBAC-BACKEND
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Configuration
1. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    JWT_SECRET=your_jwt_secret
    MONGO_URI=your_mongodb_uri
    ```

### Running the Application
1. Start the server:
    ```bash
    npm start
    ```
2. The server will run on `http://localhost:5000`.

### API Endpoints

#### User Routes
- **Register a new user**
  ```http
  POST /api/users/register
  ```
  Request body:
  ```json
  {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123",
     "roleName": "User"
  }
  ```

- **Login**
  ```http
  POST /api/users/login
  ```
  Request body:
  ```json
  {
     "email": "john@example.com",
     "password": "password123"
  }
  ```

- **Logout**
  ```http
  POST /api/users/logout
  ```

#### Role Routes
- **Create a new role**
  ```http
  POST /api/roles
  ```
  Request body:
  ```json
  {
     "name": "Admin",
     "permissions": ["create_user", "delete_user"]
  }
  ```

- **Get all roles**
  ```http
  GET /api/roles
  ```

- **Assign a role to a user**
  ```http
  POST /api/roles/assign-role
  ```
  Request body:
  ```json
  {
     "userId": "user_id",
     "roleName": "Admin"
  }
  ```

#### Permission Routes
- **Create a new permission**
  ```http
  POST /api/permissions
  ```
  Request body:
  ```json
  {
     "name": "create_user"
  }
  ```

- **Get all permissions**
  ```http
  GET /api/permissions
  ```

### Middleware
- **verifyToken**: Middleware to verify JWT token.
- **verifyRole**: Middleware to verify user role.

### Models
- **User**: Represents a user in the application.
- **Role**: Represents a role with specific permissions.
- **Permission**: Represents a permission that can be assigned to roles.


### Contributing
Contributions are welcome! Please open an issue or submit a pull request.

### Contact
For any inquiries, please contact atharvajoshi814@gmail.com.
