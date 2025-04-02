import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Feedback from "./pages/feedback/Feedback";
import Aboutus from "./pages/aboutus/Aboutus";
import StudentLogin from "./components/Login/StudentLogin";
import PlacementLogin from "./components/Login/PlacementLogin";
import EduroamLogin from "./components/Login/EduromLogin";
import GuestLogin from "./components/Login/GuestLogin";
import Info from "./pages/info/Info";
import { useState, useEffect } from "react";


function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<StudentLogin setUser={setUser} />} />
        <Route path="/placement-login" element={<PlacementLogin setUser={setUser} />} />
        <Route path="/eduroam-login" element={<EduroamLogin setUser={setUser} />} />
        <Route path="/guest-login" element={<GuestLogin setUser={setUser} />} />
        <Route path="/info" element={<Info user={user} />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/about-us" element={<Aboutus />} />
      </Routes>
    </Router>
  );
}

export default App;
