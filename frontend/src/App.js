import "./styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Success from "./pages/Success";
import Times from "./pages/TimeSelect";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors/>}/>
		<Route path="/times" element={<Times/>}/>
		<Route path="/success" element={<Success/>}/>
      </Routes>
    </Router>
  );
}

export default App;
