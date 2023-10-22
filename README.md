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

- Open the project in your prefered code editor. Open the terminal and navigate to the Chatly project's **client** directory by running the command: `cd client`

- Install front-end dependencies by running the command: `npm install`

- Create a **.env** file in the client directory, in order to store the API Keys and supply the following credentials.
```
REACT_APP_GOOGLE_CLIENT_ID =        
REACT_APP_SERVER_URL = 'http://localhost:8000'
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

8. **Using the Google Client ID in Chatly**

   - Now that you have obtained your Google Client ID, Open the `.env` file in the `client` directory and update the following environment variable:

     `REACT_APP_GOOGLE_CLIENT_ID = your-google-client-id` 

By following these steps, you can obtain a Google Client ID and integrate Google login and registration functionality into the Chatly application.

### Getting ChatGPT API Key - AI Chatbot Integration

Chatly provides the option to integrate an AI-powered chatbot for enhanced user interactions. To enable this feature, you'll need to obtain an API key from ChatGPT by OpenAI. Here's how to get started:

1. **Sign Up or Log In to OpenAI**

   - If you don't already have an OpenAI account, visit the OpenAI website and sign up. If you have an existing account, log in.

     [OpenAI Sign Up/Login](https://beta.openai.com/)

2. **Navigate to the API section**

    - After logging in, in the top right corner of your screen you'll see an icon with your account name. Click it to open the dropdown menu then click "View API keys".

3. **Generate a new API key**

    - Now you're in the API keys section, you should see a button "Create new secret key". Click on that button to generate a new API key. After you enter a name for your key, click the "Create secret key" button.


4. **Save your API key**

    - Next, you will see your secret key that has been generated. Make sure to copy your secret key and paste it into whatever application you need it for.

5. **Follow OpenAI's Documentation**

    - OpenAI provides comprehensive documentation and guidelines on how to use their API, including how to generate API keys, API endpoints, and example code snippets.

For reference, here's the OpenAI API documentation:

[OpenAI API Documentation](https://platform.openai.com/docs/api-reference/introduction)

4. **Integrate the API Key**

   - Once you have obtained an API key. Open the `.env` file in the `client` directory and update the following environment variable:

     `OPENAI_API_KEY = your-openai-api-key`

You are now done with the front-end setup, now move on to the back-end code setup on your local machine.

### Back-End Setup
- Open the project in your prefered code editor. Open the terminal and navigate to the Chatly project's **server** directory by running the command: `cd server`

- Install back-end dependencies by running the command: `npm install`

- Create a **.env** file in the server directory, in order to store the API Keys and supply the following credentials. Use the same Google Client ID which you have created for the frontend.
```
PORT = 8000

MONGODB_URL=

JWT_SECRET=

BASE_URL = "http://localhost:3000"
 
```

### MongoDB Atlas Database Configuration

Chatly utilizes MongoDB Atlas, a cloud-based database service, to store user profiles, messages, and group chat data. To get your Chatly application connected to MongoDB Atlas, follow these steps:

1: **MongoDB Atlas Sign Up**

  - If you haven't already, sign up for MongoDB Atlas, a cloud-hosted MongoDB service, by visiting the official website:

    [MongoDB Atlas Sign Up](https://www.mongodb.com/cloud/atlas/register)

Follow the registration steps to create your MongoDB Atlas account.

2. **Create a New Cluster**

Once you've registered and logged in to your MongoDB Atlas account, you'll need to create a new cluster to host your MongoDB database. Follow these steps:

- In your MongoDB Atlas dashboard, click the "Clusters" option.

- Click the "Build a New Cluster" button.

- Follow the configuration options, such as selecting your preferred cloud provider, region, and cluster tier. You can choose the free tier or any tier that suits your needs.

- Click "Create Cluster" to initiate the cluster creation process. This may take a few minutes.

3. **MongoDB Atlas Connection URL**

Now that you have your MongoDB Atlas cluster set up, you'll need to create a connection URL to configure your Chatly backend. Follow these steps to obtain the connection URL:

1. In your MongoDB Atlas dashboard, locate the cluster you've just created.

2. Click "Connect."

3. Choose "Connect your application."

4. Select your Node.js version and copy the connection string provided.

5. Replace `<password>` with your MongoDB Atlas password and `<dbname>` with your desired database name.

Your MongoDB Atlas connection URL should resemble:

`mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority`


4. **Update the Chatly Backend**

Open the `.env` file in the `server` directory of the Chatly project. Modify the `MONGODB_URL` environment variable with your MongoDB Atlas connection URL:


`MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority`

Your Chatly backend is now set to connect to MongoDB Atlas. Make sure to secure your .env file and do not share your MongoDB Atlas credentials publicly.


### JWT Secret Key Setup

Chatly uses JSON Web Tokens (JWT) for secure user authentication. To set up the `JWT_SECRET` key in your Chatly backend, follow these steps:

1. **Create a JWT Secret Key**

   - The `JWT_SECRET` is a secret key used to sign and verify JWTs, ensuring the authenticity of user requests. You can create a strong, random secret key using a password manager or a secure key generator. Make sure it's a long, complex string of characters that is difficult to guess.

   You can use a command-line tool like `openssl` to generate a random JWT secret key:

   `openssl rand -base64 64`

   This will generate a 64-character random key.

2. **Configure the JWT_SECRET in the Backend**
   
   - In the backend, open the .env file located in the server directory. Add the JWT_SECRET variable and set it to the secret key you generated:

    `JWT_SECRET=your-jwt-secret-key`

It's essential to keep your JWT_SECRET key secure and confidential. Do not share it in public repositories or expose it in any way. 

By following these steps, you ensure the security and confidentiality of your MongoDB Atlas credentials and JWT_SECRET key, which are vital for the operation and security of your Chatly application.

For any concerns or questions regarding security and setup, consult the respective MongoDB and JWT documentation or seek support from their resources.

## Running the Chatly Application

Now that you've set up the Chatly backend and frontend, you're ready to run the application. Follow these simple steps:

#### Front-End:

1. Open a terminal and navigate to the client directory of the project folder:

   `cd Chatly/client`

2. Start the development server:

   `npm start`

This will launch the Chatly front-end, making it accessible in your web browser at `http://localhost:3000`. You can now interact with the user interface.

#### Back-End:

1. Open a new terminal window and navigate to the server directory of the project folder:

    `cd Chatly/server`

2. Start the back-end server:

    `npm start`

With both the front-end and back-end running, Chatly is ready for real-time messaging, user authentication, and group chat functionality.

Feel free to explore the application, send and receive messages, and customize your profile. If you encounter any issues or have questions, refer to the documentation or seek assistance from the Chatly community.

Enjoy using Chatly for seamless communication and collaboration!