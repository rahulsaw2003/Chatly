# Chatly - Real-Time Chat Website

Chatly is a real-time chat website that leverages the power of modern web technologies to provide users with seamless real-time communication. Built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) and enriched with Socket.io, Redux Toolkit, and Tailwind CSS

## Features

- **Real-Time Messaging**: Send and receive text messages instantly in one-on-one or group chats for dynamic interactions.

- **Emojis in Messages**: Add fun and expression to your conversations by using emojis.

- **Group Chat Functionality**: Create, join, and manage group chats for team discussions, social gatherings, or interest-based communities.

- **User Registration and Authentication**: Securely register and log in to Chatly, ensuring the safety of user accounts and data.

- **Profile Customization**: Personalize your Chatly experience by customizing your avatar and display name.

- **Search Functionality**: Easily find and navigate through chat history with an integrated search feature.

- **Responsive Design**: Enjoy a seamless experience on various devices, thanks to Chatly's responsive user interface.

- **Clean and Intuitive UI**: Chatly's user interface is designed to be modern, clean, and user-friendly. It's highly customizable using Tailwind CSS.

### Optional Features

- **AI-Powered Chatbot**: Get intelligent assistance from an AI chatbot that can answer questions, provide information, and perform tasks.

- **Video Calling**: Connect through face-to-face video calls, maintaining real-time communication with friends and colleagues.


## System Architecture

Chatly's system architecture is thoughtfully designed to provide real-time communication and a user-friendly experience. It comprises three main components:

1. **Front-End:**

   The front-end of this website is built using React.js, a framework known for its dynamic and responsive user interfaces. It's responsible for handling user interactions and displaying real-time updates. Here's how the front-end is structured:

   - **React Components**: The application is organized into React components, following the principles of Atomic Design, which aids in efficient design and development.
   - **Redux Toolkit**: To maintain a consistent user experience and manage the application's state, we utilize Redux.
   - **Socket.io**: Real-time communication is achieved with Socket.io, ensuring instant message updates and synchronization.

2. **Back-End:**

   The back-end of this website relies on Node.js and Express.js, providing RESTful APIs and real-time communication capabilities. It's responsible for user authentication, messaging, and database interactions. Here's how the back-end is structured:

   - **Express.js**: Express.js is used to create RESTful APIs, allowing the front-end to interact with the server. It takes care of user registration, authentication, and message processing.
   - **Socket.io**: On the server-side, Socket.io establishes real-time communication between users, ensuring instant message delivery.
   - **AI Integration (Optional)**: As an optional feature, Chatly integrates AI for chatbot functionality, powered by the OpenAI library, providing intelligent assistance.

3. **Database:**

   Chatly relies on MongoDB, a NoSQL database, for storing user profiles, messages, and group chat data. The database component plays a pivotal role in ensuring data persistence and retrieval. Here's how the database architecture is structured:

   - **MongoDB**: MongoDB is chosen for its adaptability and scalability, making it an efficient choice for storing user data and chat history.
   - **Data Modeling**: Data is organized into collections, including users, messages, and chat models, which allows for structured access to information.

This system architecture empowers Chatly to offer real-time messaging, group chat functionality, user authentication, and a seamless user experience. By using React.js for the front-end, Node.js and Express.js for the back-end, and MongoDB for the database, we ensure the application's efficiency and scalability. Also, the AI integration with the OpenAI library enhances user engagement through chatbot assistance.


## Data Flow

The data flow within Chatly is a pivotal element of its real-time messaging system, enabling seamless data exchange from user input to the database and back to the user. This process involves the following key steps:

1. **User Input**: Users actively engage with the Chatly front-end, where they compose and transmit text messages or initiate video and audio calls.

2. **Front-End Processing**: The front-end adeptly handles user inputs, preparing the data for transmission. It sends data to the back-end using RESTful APIs for text messaging or WebRTC for video and audio calls.

3. **Back-End Processing**: On the back-end, user messages or call requests are received and meticulously processed. This step includes the validation of user credentials and the management of message routing. For video and audio calls, the back-end establishes a peer connection through WebRTC.

4. **Database Interaction**: When data needs to be persisted, the back-end interfaces with the MongoDB database. This includes the storage of user profiles, group chat data, and the history of messages. MongoDB's flexibility and scalability make it an ideal choice for managing user data.

5. **Real-Time Communication**: The application relies on Socket.io to ensure real-time message delivery. Messages are swiftly broadcasted to the relevant chat rooms or individual users, ensuring that chat participants receive immediate updates.

6. **Response to User**: After successful database interactions and real-time communication, the back-end forwards responses to the front-end. The front-end displays messages in real-time and updates the user interface accordingly, ensuring that users stay informed and engaged.

This data flow ensures that user interactions and data are processed efficiently and delivered in real-time.


## Design Principles

### Atomic Design

Chatly employs Atomic Design principles to structure its user interface. Atomic Design is a methodology that breaks down complex interfaces into smaller, reusable components, offering a consistent and organized design system. This approach enhances the user experience and facilitates customization using technologies like Tailwind CSS.

The UI components are structured into atoms, molecules, organisms, and templates, ensuring a cohesive and scalable design. This design philosophy contributes to a user-friendly application, reflecting the principles I've learned during my undergraduate studies.

### Responsive Design

In addition to Atomic Design, Chatly incorporates responsive design techniques, ensuring accessibility and optimization for various screen sizes and devices. Whether it's a desktop computer, tablet, or smartphone, Chatly adapts to provide a seamless and enjoyable user experience.

## Configuration and Setup

Setting up Chatly on your local development environment is straightforward and involves several steps. This guide will walk you through the process to ensure you can run the application seamlessly.

### Prerequisites

Before getting started, ensure you have the following prerequisites installed on your system:

1. **Node.js**: Download and install Node.js from [nodejs.org](https://nodejs.org/). Node.js is required for both the back-end and front-end of Chatly.

2. **MongoDB**: Install and run MongoDB. You can download MongoDB Community Edition from the official website at [mongodb.com](https://www.mongodb.com/try/download/community).

### Clone the Repository

Start by cloning the Chatly repository to your local machine using Git:

git clone https://github.com/rahulsaw2003/Chatly.git

Or you can also download as zip and unzip on your local machine.

### Front-End Setup
- Open the project in your prefered code editor. Open the terminal and navigate to the Chatly project's **client** directory by running the command: **cd client**

- Install front-end dependencies by running the command: **npm install**

- Create a **.env** file in the client directory, in order to store the API Keys and supply the following credentials.
```
REACT_APP_GOOGLE_CLIENT_ID =        
REACT_APP_SERVER_URL='http://localhost:8000'
REACT_APP_CHATBOT_API_KEY = 
```

### Getting a Google Client ID

To enable Google login and registration in Chatly, you'll need a Google Client ID. Follow these steps to obtain one:

1. **Create a Project on Google Cloud Console:**

   - Open a web browser and navigate to the [Google Cloud Console](https://console.cloud.google.com/).
   - Sign in with your Google account or create one if you don't have an account.

2. **Create a New Project:**

   - Click the project drop-down and select "New Project."
   - Give your project a name, and you can optionally choose a billing account (you may need to set up billing if you haven't already).

3. **Enable the Google+ API:**

   - In the sidebar, click on "APIs & Services" and then select "Library."
   - In the "API Library," search for "Google+ API."
   - Click on it, and then click the "Enable" button.

4. **Create OAuth 2.0 Client ID:**

   - In the sidebar, navigate to "APIs & Services" > "Credentials."
   - Click the "Create Credentials" drop-down and select "OAuth client ID."
   - Select "Web application" as the application type.

5. **Configure OAuth Consent Screen:**

   - If prompted, configure your OAuth consent screen. This is the screen that users see when they log in with Google. Provide the required details.
   - In the Test Users section, provide the Email ID through which you want to test the Google Login/Registration
6. **Create Credentials:**
   - Now go to the Credentials tab and Create Credentials, then select the OAuth client ID.
   - In the next page select Web Application as the Application type and name your OAuth Client.

   - In the "Authorized JavaScript origins" section, add the URL where your Chatly application is hosted. For local development, it is going to be `http://localhost:3000` for local development or your production URL. Also provide 2nd URL as `http://localhost`
   - In the "Authorized redirect URIs" section, You can leave it as empty or you can add the URL where Google should redirect users after they log in. For local development, it is going to be `http://localhost:3000/login` for local development or your production URL.

7. **Obtain the Google Client ID:**

   - After configuring the OAuth consent screen and authorized origins, click "Create" to generate the OAuth 2.0 Client ID.
   - Your Client ID and Client Secret will be displayed on the screen. Make sure to copy and store the Client ID securely.

## Using the Google Client ID in Chatly

Now that you have obtained your Google Client ID, you can integrate it into your Chatly application. Assign it to the `REACT_APP_GOOGLE_CLIENT_ID` in client side **.env** file

By following these steps, you can obtain a Google Client ID and integrate Google login and registration functionality into the Chatly application.