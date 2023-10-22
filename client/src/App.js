import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Regsiter from './pages/Register';
import Home from './pages/Home';
import Start from './components/Start';
import AIBotComponent from './components/AIBotComponent';
import Voice from './components/Voice';
import Video from './pages/Video';
function App() {
  return (
		// <div className="bg-[#cca33d]" >

		<Router>
			<Routes>
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/register" element={<Regsiter />} />
				<Route exact path="/chats" element={<Home />} />
				<Route exact path="/chatbot" element={<AIBotComponent />} />
				<Route exact path="/" element={<Start />} />
				<Route exact path="/voice" element={<Voice />} />
				<Route path="/video/:name/:id" element={<Video/>} />
			</Routes>
		</Router>
	);
}

export default App;
