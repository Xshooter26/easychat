# EasyChat

EasyChat is a full-stack real-time chat application built using the MERN (MongoDB, Express, React, Node.js) stack with Socket.IO for real-time communication. This project provides a seamless and responsive platform for users to engage in instant messaging.

## Features

- **Real-time Chat**: Send and receive messages instantly using Socket.IO.
- **User Authentication**: Secure sign-up, login, and logout functionality with password encryption.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **User Profiles**: Manage user profiles with personalized settings.
- **Typing Indicators**: See when someone is typing in a chat.
- **Emoji and GIF Support**: Express yourself with emojis and GIFs.
- **Online Status**: View the online/offline status of users.


## Tech Stack

### Frontend
- **React.js**: Component-based UI development.
- **Zustand**: Lightweight state management.
- **Tailwind CSS**: Utility-first CSS framework for styling and responsiveness.

### Backend
- **Node.js**: JavaScript runtime.
- **Express.js**: Web application framework.
- **Socket.IO**: Real-time bi-directional communication.
- **MongoDB**: NoSQL database for storing user and chat data.

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js**
- **MongoDB**
- **npm or yarn**

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Xshooter26/easychat.git
   ```

2. Navigate to the project directory:
   ```bash
   cd easychat
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. Set up the environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```
     PORT=5001
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     SOCKET_PORT=your_socket_port
     ```

5. Start MongoDB server:
   ```bash
   mongod
   ```

6. Run the backend server:
   ```bash
   cd backend
   npm run start
   ```

7. Run the frontend application:
   ```bash
   cd frontend
   npm start
   ```

8. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

   Or visit the deployed application at:
   ```
   https://easychat-v1g3.onrender.com/
   ```

## Folder Structure
```
/easychat
|-- /frontend
|   |-- /src
|       |-- /components
|       |-- /constants
|       |-- /lib
|       |-- /pages
|       |-- /skeleton
|       |-- App.jsx
|       |-- index.css
|       |-- main.jsx
|-- /backend
|    |-- /src
|       |-- /controllers
|       |-- /lib
|       |-- /middleware
|       |-- /models
|       |-- /routes
|       |-- index.js
```

## Usage

1. Register a new account or log in with existing credentials.
2. Start chatting with other users.
3. Enjoy real-time messaging with features like typing indicators and notifications.

## Contributions
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push the changes to your fork.
5. Open a pull request.

=
---

Feel free to star ⭐ the repository if you find it useful!
