import HomePage from "../src/components/HomePage";
import Preferences from "../src/components/Preferences";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Preferences" element={<Preferences />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
