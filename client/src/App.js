import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Regsiter from './pages/Register';
import Home from './pages/Home';
import Start from './components/Start';
import AIBotComponent from './components/AIBotComponent';
import Video from './pages/Video';
// function isUserAuthenticated() {
// 	const token = localStorage.getItem("userToken"); // You can use sessionStorage or any other storage method as needed
// 	return !!token;
// }
function App() {
  //const isAuthenticated = isUserAuthenticated();

  return (
		<Router>
			<Routes>
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/register" element={<Regsiter />} />
				<Route exact path="/chats" element={<Home />} />
				<Route exact path="/chatbot" element={<AIBotComponent />} />
				<Route exact path="/" element={<Start />} />
				<Route path="/video/:name/:id" element={<Video />} />
			</Routes>
		</Router>
	);
}

export default App;
