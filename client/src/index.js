// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// import { Provider } from 'react-redux';
// import store from './store';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//       <ToastContainer position="top-right" />
//     </Provider>
//   </React.StrictMode>
// );



import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from "./SocketContext"; // Import your ContextProvider

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ContextProvider>
				<App />
			</ContextProvider>
			<ToastContainer position="top-right" />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
