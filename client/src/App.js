import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Regsiter from './pages/Register';
import Home from './pages/Home';
import SetAvatar from './pages/SetAvatar';
import Start from './components/Start';

function App() {
  return (
    // <div className="bg-[#cca33d]" >
      
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Regsiter />} />
          <Route exact path="/setAvatar" element={<SetAvatar />} />
          <Route exact path="/chats" element={<Home />} />
          <Route exact path="/" element={<Start />} />
        </Routes>
      </Router>
  );
}

export default App;
