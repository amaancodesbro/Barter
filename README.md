# Barter

A full-stack marketplace application that allows users to exchange items with each other instead of buying and selling them.

Barter enables users to create item listings, browse available products, specify what they are looking for in exchange, and send swap requests to other users. The application includes authentication, image uploads, swap management, and contact exchange after a swap is accepted.

The project was built to understand and implement a complete full-stack application using the MERN ecosystem, from React-based UI and REST APIs to authentication, database persistence, and file handling.

## Features

### User Authentication
- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected backend routes using authentication middleware
- Persistent authentication between frontend requests

### Marketplace Listings
- Create item listings
- Specify item name, condition, category, and desired exchange item
- Browse available listings
- Search and filter marketplace listings
- View detailed listing information
- Support for listing availability and swapped states

### Multiple Image Uploads
- Upload multiple images when creating a listing
- Image validation and file-size restrictions using Multer
- Uploaded images served through the Express backend
- MongoDB stores image paths while image files remain in the upload storage
- Frontend supports both legacy single-image listings and newer multi-image listings

### Swap Request System
- Send swap requests to other users
- View incoming and outgoing requests
- Accept or reject requests
- Persist request status in MongoDB
- Automatically mark a listing as `Swapped` after an accepted request
- Prevent swapped listings from being selected for new swaps

### Contact Exchange
- Manage phone and WhatsApp contact details
- Contact information is only made available for relevant accepted swaps
- WhatsApp, phone, and email contact actions
- Contact information persists through MongoDB

### Frontend Experience
- React-based single-page application
- Client-side navigation using React Router
- Responsive marketplace interface
- Search and browsing experience
- Listing cards and detailed listing views
- Form handling and API integration
- Conditional UI based on authentication and listing/swap state

### Data & Persistence
- MongoDB Atlas for persistent application data
- Mongoose models for users, listings, and swap requests
- CRUD operations across application resources
- Migration of legacy JSON-based data into MongoDB

## Tech Stack

### Frontend
- **HTML5** — application structure and semantic markup
- **CSS3** — responsive layouts, styling, cards, forms, navigation, and visual design
- **JavaScript (ES6+)** — application logic, API communication, event handling, and data processing
- **React** — component-based user interface development and frontend state management
- **React Router** — client-side routing and navigation between application pages
- **Vite** — frontend development server and build tool

### Backend
- **Node.js** — JavaScript runtime for the backend
- **Express.js** — REST API development, routing, middleware, and HTTP request handling
- **Multer** — multipart/form-data processing and multiple image uploads
- **JWT (JSON Web Tokens)** — token-based authentication
- **bcrypt** — secure password hashing and password verification

### Database
- **MongoDB Atlas** — cloud-hosted NoSQL database
- **Mongoose** — MongoDB ODM used for schemas, models, queries, and database operations

### Development & Version Control
- **Git** — source control and version history
- **GitHub** — repository hosting and project version control
- **VS Code** — development environment
- **REST APIs** — communication between the React frontend and Express backend

### Architecture
Barter follows a MERN-based full-stack architecture:

**MongoDB → Express.js → React → Node.js**

The React frontend communicates with the Express/Node.js backend through HTTP/REST API requests. The backend handles authentication, application logic, file uploads, and database operations through Mongoose and MongoDB Atlas.

---

## 🏗️ How Barter Works

Barter follows a client-server architecture where the React frontend communicates with a Node.js/Express backend through REST APIs. The backend handles authentication, application logic, file uploads, and database operations, while MongoDB Atlas provides persistent data storage.

### Application Flow

User
 │
 ▼
React + Vite Frontend
 │
 │ HTTP / REST API requests
 ▼
Node.js + Express Backend
 │
 ├── Authentication
 │     ├── bcrypt
 │     └── JWT
 │
 ├── Business Logic
 │     ├── Listings
 │     ├── Swap Requests
 │     └── Contact Information
 │
 ├── File Uploads
 │     └── Multer
 │
 ▼
Mongoose
 │
 ▼
MongoDB Atlas

User fills listing form
        ↓
React collects form data
        ↓
FormData sends listing + images
        ↓
POST /listings
        ↓
Express receives request
        ↓
Multer processes uploaded files
        ↓
Listing data + image paths are stored
        ↓
Mongoose writes document to MongoDB
        ↓
Backend returns response
        ↓
React updates the application

This architecture separates the frontend presentation layer from the backend API and database layer, allowing the application to be developed, tested, and deployed as separate layers.

---

## 🔐 Authentication

Barter uses token-based authentication to protect user-specific functionality and backend routes.

### Registration

When a user creates an account:

```text
User submits registration form
        ↓
React sends registration data
        ↓
POST /users/register
        ↓
Express validates the request
        ↓
Password is hashed using bcrypt
        ↓
User document is stored in MongoDB
        ↓
Registration response is returned

Passwords are not stored as plain-text values. The backend uses bcrypt to hash passwords before storing them in the database.

### Login

When a registered user logs in:

User submits email + password
        ↓
React sends login request
        ↓
POST /users/login
        ↓
Backend finds the user
        ↓
bcrypt verifies the password
        ↓
JWT is generated
        ↓
Token is returned to the frontend

### Protected Routes

Protected backend routes use authentication middleware to verify the JWT before allowing access.

React request
     │
     │ Authorization: Bearer <token>
     ▼
Express route
     │
     ▼
Authentication middleware
     │
     ├── Invalid / missing token → Unauthorized
     │
     └── Valid token
             ↓
       Identify authenticated user
             ↓
       Continue to route handler

       This authentication flow separates authentication responsibilities between the frontend and backend. The frontend sends the token with protected requests, while the backend remains responsible for verifying the token and authorizing access to protected route handlers.

       ---

## 🖼️ Listing & Image Upload System

Barter supports marketplace listings with multiple image uploads. The listing system combines React form handling, `FormData`, Express routes, Multer file processing, and MongoDB persistence.

### Listing Creation Flow

```text
User fills listing form
        ↓
React collects listing data
        ↓
FormData packages text fields + image files
        ↓
POST /listings
        ↓
Express receives multipart request
        ↓
Multer processes uploaded images
        ↓
Images are saved to upload storage
        ↓
Image paths are stored in the listing document
        ↓
Mongoose saves listing to MongoDB
        ↓
Backend returns listing response

---

## 🔄 Swap Request Workflow

The swap system is the core business workflow of Barter. It allows users to propose exchanges, manage incoming and outgoing requests, and complete a swap through an accept/reject flow.

### Swap Flow

```text
User views another listing
        ↓
Selects an item to offer
        ↓
Sends swap request
        ↓
Request stored in MongoDB
        ↓
Recipient reviews request
        ↓
   ┌────┴────┐
   ↓         ↓
Reject     Accept
   ↓         ↓
Request    Listing
remains    becomes
rejected   "Swapped"
             ↓
      Contact information
      becomes available

---

## 📞 Contact System

Barter includes a contact-exchange system that allows users to manage their contact details and share them with the relevant swap partner after a swap has been accepted.

### Contact Settings

Authenticated users can update:

- Phone number
- WhatsApp number

The Contact Settings page retrieves the user's existing contact information and allows it to be updated through:

```text
GET /users/contact
        ↓
Load saved contact details
        ↓
User edits phone / WhatsApp
        ↓
PATCH /users/contact
        ↓
Updated information stored in MongoDB

---

## 📂 Project Structure

```text
Barter/
│
├── index.js
├── auth.js
├── package.json
├── package-lock.json
├── migrate-listings.js
├── migrate-swap-requests.js
│
├── models/
│   ├── users.js
│   ├── listings.js
│   └── swapRequests.js
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   │
│   └── src/
│       ├── main.jsx
│       ├── Router.jsx
│       ├── App.jsx
│       ├── Browse.jsx
│       ├── CreateListing.jsx
│       ├── ListingDetails.jsx
│       ├── Login.jsx
│       ├── Register.jsx
│       ├── SwapRequests.jsx
│       ├── ContactSettings.jsx
│       ├── HowItWorks.jsx
│       ├── About.jsx
│       └── components/
│           └── ListingCard.jsx
│
└── README.md

---
---

## 🔌 API Overview

Barter uses a REST-style API built with Node.js and Express. Protected endpoints use JWT authentication through the `Authorization: Bearer <token>` header.

### User & Authentication Routes

| Method | Endpoint | Authentication | Description |
|--------|----------|----------------|-------------|
| `POST` | `/users/register` | No | Register a new user |
| `POST` | `/users/login` | No | Authenticate a user and return a JWT |
| `GET` | `/user` | No | Retrieve users without password fields |
| `GET` | `/users/contact` | Yes | Retrieve the authenticated user's contact details |
| `PATCH` | `/users/contact` | Yes | Update the authenticated user's phone and WhatsApp details |

### Listing Routes

| Method | Endpoint | Authentication | Description |
|--------|----------|----------------|-------------|
| `GET` | `/listings` | No | Retrieve all listings |
| `GET` | `/listings/:id` | No | Retrieve a specific listing |
| `POST` | `/listings` | Yes | Create a listing and upload up to 5 images |
| `PUT` | `/listings/:id` | Yes | Update a listing owned by the authenticated user |
| `DELETE` | `/listings/:id` | Yes | Delete a listing owned by the authenticated user |

### Swap Request Routes

| Method | Endpoint | Authentication | Description |
|--------|----------|----------------|-------------|
| `POST` | `/swap-requests` | Yes | Create a new swap request |
| `GET` | `/swap-requests` | Yes | Retrieve the authenticated user's incoming and outgoing requests |
| `PUT` | `/swap-requests/:id` | Yes | Accept or reject a pending swap request |

When a swap request is accepted, the associated listing is updated to a `swapped` status.

### Static Image Files

Uploaded listing images are served through:

    /uploads/<filename>

The Express server exposes the local `uploads/` directory through the `/uploads` route.
---

## ⚙️ Installation

### 1. Clone the repository

    git clone <repository-url>
    cd Barter

### 2. Install backend dependencies

From the project root:

    npm install

### 3. Install frontend dependencies

Open a terminal inside the `frontend/` directory:

    cd frontend
    npm install

### 4. Configure environment variables

Create the required `.env` files using the environment variables described in the **Environment Variables** section.

### 5. Start the backend

From the project root:

    node index.js

### 6. Start the frontend

From the `frontend/` directory:

    npm run dev

The frontend and backend run as separate processes during local development.

---

## 🔑 Environment Variables

Barter uses environment variables to keep configuration values and sensitive credentials separate from the application source code.

### Backend

Create a `.env` file in the project root:

    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

### Frontend

Create a `.env` file inside the `frontend/` directory:

    VITE_API_URL=http://localhost:3000

The frontend uses `VITE_API_URL` as the base URL for communicating with the Express backend.

The `.env` files are excluded from version control through `.gitignore` and should never be committed to the repository.

For production deployment, the environment values should be configured through the hosting platform rather than hardcoded into the source code.

---

## 🧠 Technical Challenges & Solutions

Building Barter involved solving several practical full-stack development problems across the frontend, backend, database, authentication, file handling, and application logic.

### 1. Migrating Application Data from JSON to MongoDB

The project initially used local JSON files for application data. As the application evolved, persistent database storage was introduced using MongoDB Atlas and Mongoose.

Existing listing and swap-request data had to be migrated without losing the previously created records.

The migration process introduced dedicated migration scripts that transferred the existing data into MongoDB while retaining local backups for safety.

**Key learning:** Migrating from local file-based storage to a database requires careful handling of existing data, schema structure, and one-time migration operations.

### 2. Debugging an Undefined MongoDB Connection URI

During development, the backend failed to connect to MongoDB because the MongoDB connection string was being evaluated as `undefined`.

The issue was traced to the environment configuration rather than the MongoDB connection logic itself. After correcting the `.env` configuration and restarting the backend process, the connection was restored.

**Key learning:** Environment variables are loaded when the backend process starts, so configuration changes require the server to be restarted. Debugging the actual value being passed to the database connection was essential.

### 3. Extending Listings from Single Images to Multiple Images

The original listing system supported a single image through an `image` field. The application was later extended to support multiple images through an `images` array.

Multer was introduced to process multipart/form-data requests and handle multiple uploaded files. The backend generates unique filenames, validates image types, applies file-size limits, and stores the resulting file paths with the listing.

**Key learning:** File uploads require different request handling from normal JSON requests. `FormData`, multipart requests, Multer, filesystem storage, and database references all work together to implement the upload pipeline.

### 4. Maintaining Compatibility with Existing Listings

After introducing the `images` array, older listings still contained the original `image` field.

Instead of breaking existing data, the frontend was designed to recognize both formats. This allowed migrated listings and newly created listings to continue working within the same application.

**Key learning:** Changing a data model in an existing application requires considering previously stored data and maintaining compatibility during the transition.

### 5. Implementing Secure Authentication

Authentication required more than simply checking whether a user existed.

The registration flow hashes passwords using bcrypt before storing them. During login, the backend verifies the submitted password and generates a JWT containing the authenticated user's identity.

Protected endpoints use authentication middleware to verify the JWT before allowing the request to continue.

**Key learning:** Authentication involves multiple layers: password hashing, password verification, token generation, token transmission, token verification, and protected route handling.

### 6. Managing Swap Request State

The swap system required more than simply creating a request document.

A request can move between states such as pending, accepted, or rejected. Accepting a request also changes the associated listing to `Swapped` and removes it from the available swap-item selection.

The state must persist in MongoDB so that the correct result remains visible after refreshing the application.

**Key learning:** Application features often involve state transitions across multiple related pieces of data. Backend business logic must keep these state changes consistent.

### 7. Restricting Contact Information to Accepted Swaps

Contact information needed to remain separate from publicly visible listing information.

Users can maintain their phone and WhatsApp details through the Contact Settings system, but relevant contact information becomes available to the other user only after a swap request has been accepted.

**Key learning:** Authorization is different from authentication. Knowing who a user is is not enough; the backend must also determine whether that user is authorized to access specific information.

### 8. Separating Frontend and Backend Configuration

The frontend originally depended on backend URLs during development. As the project moved toward deployment readiness, these URLs were centralized through the `VITE_API_URL` environment variable.

This allows the same frontend codebase to communicate with different backend environments without changing individual API calls throughout the application.

**Key learning:** Environment-based configuration makes applications easier to maintain and prepares the codebase for separate development and production environments.

### 9. Debugging Backend Route Availability

The Contact Settings frontend initially received a `404` response when requesting `GET /users/contact`.

The route implementation was present, but the running Express process had not yet been restarted after the backend changes. Restarting the server loaded the updated route and resolved the issue.

**Key learning:** When debugging an API route, the problem may be in the route itself, the request URL, or the currently running server process. Checking the server state and HTTP response helped isolate the issue.

### 10. Managing Local Files Safely with Git

As the project evolved, local uploads, environment files, migration data, backups, and macOS-generated files were present in the project directory.

The `.gitignore` configuration was updated to prevent sensitive or unnecessary local files from being committed. Tracked legacy JSON data was also removed from Git tracking while preserving the local files.

Before the final commit, the repository was reviewed using Git status and tracked-file inspection rather than blindly staging the entire project.

**Key learning:** Version control is not just committing code. A professional repository requires deliberate staging, appropriate `.gitignore` rules, and verification of what will actually be published.

---

## 🧪 Testing

The main application workflows were tested during development to verify frontend behavior, backend API responses, database persistence, authentication, and state changes.

### Core Functional Tests

- User registration and login
- JWT authentication and protected routes
- Listing creation
- Multiple image uploads
- Listing persistence after refresh
- Marketplace browsing and search
- Listing details
- Sending swap requests
- Viewing incoming and outgoing swap requests
- Accepting swap requests
- Rejecting swap requests
- Persisting accepted/rejected request states
- Updating listing status to `Swapped`
- Removing swapped listings from available swap-item selection
- Updating phone and WhatsApp contact details
- Persisting contact details after refresh
- Restricting contact information to accepted swap partners
- Navigation between major application pages

### API & Data Verification

Backend behavior was verified through the application's frontend flows and database state.

Testing included checking that:

- API requests reached the intended Express routes
- Protected endpoints required authentication
- MongoDB documents were created and updated correctly
- Uploaded image paths were stored with listings
- Swap request status changes persisted in MongoDB
- Listing status changes persisted after accepting a swap
- Contact information updates persisted after refresh

### Development Verification

Git status and tracked-file inspection were also used before publishing the project to ensure that sensitive and unnecessary local files such as `.env`, `node_modules`, uploaded files, backups, and legacy local data were not included in the repository.

---

## 🚀 Future Improvements

The current version of Barter focuses on the core barter workflow, authentication, listings, image uploads, swap requests, and contact exchange. The following improvements could extend the platform into a more complete and scalable marketplace.

### Door-to-Door Courier Integration

Integrate third-party courier and logistics services to support door-to-door pickup and delivery of items involved in accepted barter exchanges.

Potential features include:

- Pickup and delivery address management
- Courier booking after a swap is accepted
- Delivery status and tracking
- Shipping cost calculation
- Integration with third-party courier APIs

### Improved UI/UX

Further improve the visual experience with:

- More polished listing cards and image galleries
- Improved mobile responsiveness
- Smoother navigation and interactions
- Better loading, empty, and error states
- Additional animations and visual feedback

### Advanced Search & Filtering

Expand marketplace discovery with filters such as:

- Category
- Item condition
- Location
- Desired item
- Availability status

### Real-Time Messaging

Add a messaging system that allows users to communicate directly about an exchange before accepting a swap request.

### Notifications

Introduce in-app and email notifications for important events such as:

- New swap requests
- Accepted or rejected requests
- New messages
- Delivery updates

### Ratings & Reputation

Allow users to rate each other after completing a successful exchange, creating a basic reputation system that can help users make more informed exchanges.

### Cloud-Based Image Storage

Move listing images from local server storage to a cloud-based storage service for more reliable production deployment, scalability, and persistent file storage.

---

## 👨‍💻 Author

**Amaan Shaikh**

## 👨‍💻 Author

**Amaan Shaikh**

Computer Science graduate focused on full-stack web development, backend development, and practical software engineering.

### Project Ownership

The concept and idea behind Barter were entirely my own. I built this project as a hands-on application for learning, deployment, and professional growth over a two-month development period.

The project was developed to strengthen my understanding of full-stack development by working through real application requirements, debugging challenges, database integration, authentication, file handling, and deployment preparation.

### Technologies & Concepts Practiced

- JavaScript
- React
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- JWT Authentication
- bcrypt
- Multer
- Git & GitHub

This project represents my practical progression from building individual features to developing and preparing a complete full-stack application for deployment with guidance. 
